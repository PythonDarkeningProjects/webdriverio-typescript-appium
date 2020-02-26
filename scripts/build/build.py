#!/usr/bin/python

""" Build an iOS/Android application for Appium

Requirements:
    1. Python 2.7 or above is required
    2. Xcode (download it from the app store)

Comments:
    - REPOSITORY: make sure that you have the correct rights, if not upload you id_rsa.pub to bitbucket
        following this guide: (https://confluence.atlassian.com/bitbucket/set-up-an-ssh-key-728138079.html)
    - MY_UPLOAD_KEY_STORE: follow this document to get one:
        https://facebook.github.io/react-native/docs/signed-apk-android#generating-an-upload-key

This script was tested on a Mac OS system, for Windows system may do not works!
"""

from __future__ import print_function

from modules import parser as args

import os
import subprocess
import sys
import shutil

REPOSITORY = 'git@bitbucket.org:tcpdev/mobile-clock.git'
MY_UPLOAD_KEY_STORE = '/Library/Java/JavaVirtualMachines/jdk1.8.0_231.jdk/Contents/Home/my-upload-key.keystore'


class Build:
    def __init__(self):
        self.args = args.Parser().get_args()

        self.__repo_name = REPOSITORY.split('/')[1].replace('.git', '')
        self.__path = '/tmp'
        self.__repo_local_path = '{0}/{1}'.format(self.__path, self.__repo_name)
        self.__current_branch = ''

        self.__common_actions(self.args.branch, self.args.commit)

        if self.args.target == 'android':
            self.__android(self.args.environment)
        else:
            self.__ios(self.args.environment)

    def __clone_repository(self):
        if os.path.isdir(self.__repo_local_path):
            print('(info) removing {repo_local_path} ...'.format(repo_local_path=self.__repo_local_path))
            os.system('rm -rf {repo_local_path}'.format(repo_local_path=self.__repo_local_path))
        os.system('git -C {path} clone {repo}'.format(path=self.__path, repo=REPOSITORY))

    def __git_checkout(self, branch, commit):
        os.system('git -C {path} checkout {branch} &> /dev/null'.format(path=self.__repo_local_path, branch=branch))
        self.__current_branch = os.popen('git -C {path} rev-parse --abbrev-ref HEAD'.format(
            path=self.__repo_local_path)).read().rstrip('\r\n')
        os.system('git -C {path} checkout {commit} &> /dev/null'.format(path=self.__repo_local_path, commit=commit))

    def __git_verify(self, branch, commit):
        current_commit = os.popen('git -C {path} rev-parse --verify HEAD'.format(
            path=self.__repo_local_path)).read().rstrip('\r\n')
        expected_commit = os.popen('git -C {path} rev-parse origin/{branch} 2> /dev/null'.format(
                 path=self.__repo_local_path,  branch=branch)).read().rstrip('\r\n') if commit == 'HEAD' else commit

        if self.__current_branch != branch:
            sys.exit('(err) current branch is: {0}, expected branch is: {1}'.format(self.__current_branch, branch))
        elif current_commit != expected_commit:
            sys.exit('(err) current commit is: {0}, expected commit is:  {1}'.format(current_commit, expected_commit))

    def __install_dep(self):
        os.chdir(self.__repo_local_path)
        os.system('yarn install')

    def __common_actions(self, branch, commit):
        self.__clone_repository()
        if os.path.isdir(self.__repo_local_path):
            self.__git_checkout(branch, commit)
            self.__git_verify(branch, commit)
            self.__install_dep()

    def __copy_app(self):
        
        output_dir = self.args.output

        if self.args.target == 'android':
            app_name = 'app-{env}.apk'.format(env=self.args.environment)
            app_path = '{path}/android/app/build/outputs/apk/{env}/{app}'.format(
                path=self.__repo_local_path, env=self.args.environment, app=app_name)
        else:
            app_name = 'mobileClock.app'
            app_path = '{path}/ios/build/mobileClock/Build/Products/{env}-iphonesimulator/{app}'.format(
                path=self.__repo_local_path, env=self.args.environment, app=app_name)
        
        if output_dir and (os.path.isfile(app_path) or os.path.isdir(app_path)):
            os.system('mkdir -p {0}'.format(output_dir))
            os.system('cp -r {app_path} {output_dir}'.format(app_path=app_path, output_dir=output_dir))
            print('(info) app successfully builded in: {output_dir}/{app_name}'.format(
                output_dir=output_dir, app_name=app_name))
        elif os.path.isfile(app_path) or os.path.isdir(app_path):
            print('(info) app successfully builded in: {app_path}'.format(app_path=app_path))
        

    def __android(self, environment):
        if environment == 'Debug':
            subprocess.call(['yarn', 'start'], shell=True)
            os.system('react-native run-android')
        else:
            if not os.path.isfile(MY_UPLOAD_KEY_STORE):
                sys.exit('(err) {0} does not exits'.format(MY_UPLOAD_KEY_STORE))

            app_gradle_properties = '{path}/android/gradle.properties'.format(path=self.__repo_local_path)

            with open(app_gradle_properties, 'a') as gradle_properties:
                gradle_properties.write(
                    '\nMYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore'
                    '\nMYAPP_UPLOAD_KEY_ALIAS=my-key-alias'
                    '\nMYAPP_UPLOAD_STORE_PASSWORD=123456'
                    '\nMYAPP_UPLOAD_KEY_PASSWORD=123456'
                )

            shutil.copyfile(
                MY_UPLOAD_KEY_STORE, '{path}/android/app/my-upload-key.keystore'.format(path=self.__repo_local_path))

            build_gradle = '{path}/android/app/build.gradle'.format(path=self.__repo_local_path)

            with open(build_gradle, 'r') as in_file:
                buffer = in_file.read()

            new_build_gradle = []

            for index, value in enumerate(buffer.split('\n')):
                new_build_gradle.append(value)

                if 'signingConfigs {' in value:
                    new_build_gradle.insert(
                        index + 6,
                        '        release {'
                        '\n            if (project.hasProperty(\'MYAPP_UPLOAD_STORE_FILE\')) {'
                        '\n                storeFile file(MYAPP_UPLOAD_STORE_FILE)'
                        '\n                storePassword MYAPP_UPLOAD_STORE_PASSWORD'
                        '\n                keyAlias MYAPP_UPLOAD_KEY_ALIAS'
                        '\n                keyPassword MYAPP_UPLOAD_KEY_PASSWORD'
                        '\n            }'
                        '\n        }')
                elif 'proguardFiles getDefaultProguardFile' in value:
                    new_build_gradle.insert(index + 2, '            signingConfig signingConfigs.release')

            with open(build_gradle, 'w') as outfile:
                outfile.write('\n'.join(new_build_gradle))

            os.chdir('{repo_local_path}/android'.format(repo_local_path=self.__repo_local_path))
            os.system('./gradlew bundleRelease')
            os.chdir(self.__repo_local_path)
            os.system('react-native run-android --variant=release')

        self.__copy_app()

    def __ios(self, environment):
        os.system('react-native run-ios --configuration {env}'.format(env=self.args.environment))
        self.__copy_app()


if __name__ == '__main__':
    Build()

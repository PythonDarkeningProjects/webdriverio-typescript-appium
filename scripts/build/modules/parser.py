#!/usr/bin/python

import argparse


class Parser:

    def __init__(self):
        self.__parser = argparse.ArgumentParser(description='Build script for Mobile Clock Apps', add_help=False)
        self.__optional_args = self.__parser.add_argument_group('optional arguments')
        self.__required_args = self.__parser.add_argument_group('required arguments')

        self.__optional_args.add_argument(
            '-h', '--help',
            action="help", help="show this help message and exit"
        )

        self.__optional_args.add_argument(
            '-b', '--branch', default='develop',
            help='branch to perform the git checkout, default=develop'
        )

        self.__optional_args.add_argument(
            '-c', '--commit', default='HEAD',
            help='commit to perform to git checkout, default=HEAD'
        )

        self.__optional_args.add_argument(
            '-o', '--output',
            help='output folder'
        )

        self.__required_args.add_argument(
            '-t', '--target', choices=['android', 'ios'],
            help='the device target for which the application will be built',
            required=True
        )
        self.__required_args.add_argument(
            '-e', '--environment', choices=['Release', 'Debug'],
            help='the environment for build the application',
            required=True
        )

        self.__args = self.__parser.parse_args()

    def get_args(self):
        return self.__args

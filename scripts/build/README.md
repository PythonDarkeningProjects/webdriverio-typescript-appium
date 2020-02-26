# Description
Helper script to build mobileClock application for iOS and Android

# How to use

## Build an iOS application

### Release
```
python build.py -t ios -e Release
```

### Debug
```
python build.py -t ios -e Debug
```

## Build an Android application

### Release
```
python build.py -t android -e Release
```

### Debug
```
python build.py -t android -e Debug
```

## Required Arguments
* `-t | --target`:  the device target for which the application will be built
* `-e | --environment`:  the environment for build the application

## Optional Arguments

* `-b | --branch`:  branch to perform the git checkout, default=develop
* `-c | --commit`:  commit to perform to git checkout, default=HEAD
* `-o | --output`:  output folder, if this not exists, it will be created

## Help

To show all the options available type the following command in terminal

```
python build.py -help
```
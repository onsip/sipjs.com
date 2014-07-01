---
title: Use Cordova with iOS and WebRTC | SIP.js
description: Setup Cordova to create a hybrid native WebRTC app on iOS.
---

# Configure Cordova

## Requirements

To create a hybrid native iOS WebRTC app you will need:

* [Mac OS X](http://www.apple.com/osx/)
* [Apple iOS Developer Account](https://developer.apple.com/programs/ios/)
* [Physical iOS device (this will not work on an emulator)](http://store.apple.com/us/iphone)
* [XCode](https://developer.apple.com/xcode/)
* [Cordova](http://cordova.apache.org/) - If you are running [Homebrew](http://brew.sh/), you can run `brew install cordova`

## Project Setup

Open terminal and navigate to the directory you want to create your project in. Run the following commands to create a Cordova iOS project. Replace `Cordova-SIPjs` with your own project name.

`cordova create Cordova-SIPjs`

`cd Cordova-SIPjs`

`cordova platform add ios`

## Add the WebRTC Library

Run the following command to add the PhoneRTC WebRTC library to your Cordova project.

`cordova plugin add https://github.com/alongubkin/phonertc.git`

## Set the compilation architecture

The architecture needs to be set to armv7. This is because the WebRTC libraries that are included are precompiled for this architecture. Trying to compile the libraries with other architectures will cause a linker error and your project will not compile.
Open the platforms folder then the ios folder. In the ios folder you will see an xcodeproj. Open the xcodeproj with XCode.
In XCode navigate to the build settings for `CordovaLib.xcodeproj`. 

Set `Build Active Architecture Only` to `No`

Set `Valid Architectures` to `armv7`

Navigate to the build settings for `HelloCordova.xcodeproj`. 

Set `Build Active Architecture Only` to `No`

Set `Valid Architectures` to `armv7`

* You should now be able to compile and run the sample Cordova project on your iOS device. If you are still having linker errors verify the settings above and clean the project before building `

## Adding SIP.js and Web Content

Go back to the project's root folder. There you should see a few folders which include `platforms`, `plugins`, `www`, among others. In the `www` folder you can place your web application and include the `SIP.js` library.

To stage your new web project for your iOS device in terminal run `cordova prepare`. 

Once the project is staged, go back to XCode and run the project on your iOS device. You should now see the new web content. 

* Every time you update the content in the `www` folder you will need to run `cordova prepare`.

## Configure SIP.js



## Troubleshooting

If you have difficulty, please reach out to us on our [mailing list](https://groups.google.com/forum/#!forum/sip_js).

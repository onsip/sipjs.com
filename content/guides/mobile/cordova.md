---
title: Use Cordova with iOS and WebRTC | SIP.js
description: Setup Cordova to create a hybrid native WebRTC app on iOS.
---

<section class="callout">
<h3>This guide is out of date.</h3>
<p>We are no longer supporting this mobile guide. It is still here strictly for informational purposes. We do not expect this guide to still work.</p>
</section>

# Using Cordova with iOS and WebRTC

## Requirements

To create a hybrid native iOS WebRTC app you will need:

* [Mac OS X](http://www.apple.com/osx/)
* [Apple iOS Developer Account](https://developer.apple.com/programs/ios/)
* [Physical iOS device](http://store.apple.com/us/iphone) (this will not work on an emulator)
* [Cordova](http://cordova.apache.org/) - If you are running [Node.js](http://nodejs.org/), you can run `npm install -g cordova`
* (Optional) [XCode](https://developer.apple.com/xcode/)
* (Optional) [ios-deploy](https://github.com/phonegap/ios-deploy) - If you are running [Node.js](http://nodejs.org/), you can run `npm install -g ios-deploy`

The Cordova plugin includes WebRTC libraries for iOS, SIP.js, a custom media handler to use the iOS WebRTC libraries, and a Cordova build script to build and run the project on devices.

## Project Setup

### Install Cordova

Open terminal and navigate to the directory you want to create your project in. Run the following commands to create a Cordova iOS project. Replace `Cordova-SIPjs` with your own project name.

`cordova create Cordova-SIPjs`

`cd Cordova-SIPjs`

`cordova platform add ios`

### Add the OnSIP Cordova Plugin

Run the following command to add the PhoneRTC WebRTC library to your Cordova project.

`cordova plugin add https://github.com/onsip/onsip-cordova.git`

## HTML and Javascript

The HTML and Javascript required to use the plugin is very similar to regular SIP.js applications that would run in the browser. The only difference is that you need to set the app to use the plugin installed SIP.js and MediaHandler.

~~~ javascript
// Use plugin version of SIP.js
var SIP = cordova.require("com.onsip.cordova.Sipjs");

// Use plugin version of MediaHandler
var PhoneRTCMediaHandler = cordova.require("com.onsip.cordova.SipjsMediaHandler")(SIP);

// Set my UA to use the MediaHandler
var ua = new SIP.UA({
  mediaHandlerFactory: PhoneRTCMediaHandler
});
~~~

## Running the project

### Running project from Command Line

* Note: If you are running the project from XCode you can skip this section.

Ensure your device is plugged into your computer and provisioned for development. Then run the following command.

`cordova run ios`

### Running project from XCode

The architecture needs to be set to armv7. This is because the WebRTC libraries that are included are precompiled for this architecture. Trying to compile the libraries with other architectures will cause a linker error and your project will not compile.
Open the platforms folder then the ios folder. In the ios folder you will see an xcodeproj. Open the xcodeproj with XCode.
In XCode navigate to the build settings for `CordovaLib.xcodeproj`.

Set `Build Active Architecture Only` to `No`

Set `Valid Architectures` to `armv7`

Navigate to the build settings for `HelloCordova.xcodeproj`.

Set `Build Active Architecture Only` to `No`

Set `Valid Architectures` to `armv7`

* You should now be able to compile and run the sample Cordova project on your iOS device. If you are still having linker errors verify the settings above and clean the project before building.

## Known limitations

These are currently the known limitations of the Cordova Plugin:

* One call at a time (audio or audio/video).
* No HTML/Javascript video manipulation.

## Troubleshooting

If you have difficulty, please reach out to us on our [mailing list](https://groups.google.com/forum/#!forum/sip_js) or open an issue on the project's [GitHub page](https://github.com/onsip/onsip-cordova).

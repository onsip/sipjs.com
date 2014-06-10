---
title: Android Native Apps | SIP.js
description: Easily write SIP.js apps for the Android platform.
---

# Android Native Apps

SIP.js web apps can be ported to Android using [Crosswalk](https://crosswalk-project.org/), which provides a WebRTC-capable WebView to display the web app without the convential browser interface surrounding it.

## System Setup

* Install Crosswalk on [Windows](https://crosswalk-project.org/#documentation/getting_started/Windows_host_setup/Installation-for-Crosswalk-Android), [Linux](https://crosswalk-project.org/#documentation/getting_started/Linux_host_setup/Installation-for-Crosswalk-Android), or [OSX](https://crosswalk-project.org/#documentation/getting_started/linux_host_setup/Install-the-Oracle-JDK).
* Ensure your Android device can connect to your computer: [Android Target Setup](https://crosswalk-project.org/#documentation/getting_started/android_target_setup)

## Project Configuration

* Add an `icon.png` and a `manifest.json` to the root directory of your project, as [described in the Crosswalk docs](https://crosswalk-project.org/#documentation/getting_started/build_an_application). For example, see the [SIP.js developer phone on github](https://github.com/onsip/sipjs-examples/commit/904104243b09fdb6d63e4f9731328434dd52f2bc).

## Native App Generation

Follow these [steps from the Crosswalk docs](https://crosswalk-project.org/#documentation/getting_started/run_on_android), substituting your project's paths/filenames in as needed:


* Go to the unpacked Crosswalk Android directory: `cd crosswalk-5.34.104.5`
* Run the make_apk.py script with Python as follows: `python make_apk.py --manifest=~/workspace/web/sipjs-examples/developer-phone/manifest.json`
* Install the application on the target device: `adb install -r DeveloperPhone_0.0.0.1_arm.apk`
* If the installation is successful, your application should now be on the Android target. Find its icon in the application list and open it.

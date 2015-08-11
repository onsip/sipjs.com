---
title: Android Native Apps | SIP.js
description: Easily write SIP.js apps for the Android platform.
---

<section class="callout">
<h3>This guide is out of date.</h3>
<p>As of L, Android now supports WebRTC in their standard WebView. We recommend building a hybrid HTML5 mobile app, rather than using Cordova or Crosswalk.</p>
</section>

# Android Native Apps

SIP.js web apps can be ported to Android using [Crosswalk](https://crosswalk-project.org/), which provides a WebRTC-capable WebView to display the web app without the conventional browser interface surrounding it. This guide will show you how to use Crosswalk to generate an Android app for the [SIP.js Demo Phone](/demo-phone/) on Mac OS X. Linux and Windows users should be able to follow along, as well.

## System Setup

* Create and go to a working directory: `mkdir /tmp/xwalk && cd /tmp/xwalk`
* Install Crosswalk (instructions for [OS X](https://crosswalk-project.org/#documentation/getting_started/linux_host_setup/Install-the-Oracle-JDK), [Linux](https://crosswalk-project.org/#documentation/getting_started/Linux_host_setup/Installation-for-Crosswalk-Android), [Windows](https://crosswalk-project.org/#documentation/getting_started/Windows_host_setup/Installation-for-Crosswalk-Android))
* Ensure your Android device can connect to your computer: [Android Target Setup](https://crosswalk-project.org/#documentation/getting_started/android_target_setup)

## Project Configuration

* Clone the [sipjs-examples repository](https://github.com/onsip/sipjs-examples): `git clone https://github.com/onsip/sipjs-examples`

* Add an [icon.png](https://raw.githubusercontent.com/onsip/sipjs-examples/crosswalk/demo-phone/icon.png) and a [manifest.json](https://raw.githubusercontent.com/onsip/sipjs-examples/crosswalk/demo-phone/manifest.json) to the demo-phone directory of the checked-out repository. This tells Crosswalk how the app should appear on the phone and which page to load when it opens. More detail can be found in [the Crosswalk docs](https://crosswalk-project.org/#documentation/manifest):

~~~ bash
cd sipjs-examples/demo-phone
curl -o icon.png https://raw.githubusercontent.com/onsip/sipjs-examples/crosswalk/demo-phone/icon.png
curl -o manifest.json https://raw.githubusercontent.com/onsip/sipjs-examples/crosswalk/demo-phone/manifest.json
# (or just `git checkout crosswalk`)
~~~


## Native App Generation

Follow [these steps from the Crosswalk docs](https://crosswalk-project.org/#documentation/getting_started/run_on_android), substituting the project's paths/filenames in as needed:


* Go to the unpacked Crosswalk Android directory: `cd /tmp/xwalk/crosswalk-5.34.104.5`
* Run the make_apk.py script with Python as follows: `python make_apk.py --manifest=../sipjs-examples/demo-phone/manifest.json`
* Install the application on the target device: `adb install -r DemoPhone_0.0.0.1_arm.apk`
* If the installation is successful, your application should now be on the Android target. Find its icon in the application list and open it.

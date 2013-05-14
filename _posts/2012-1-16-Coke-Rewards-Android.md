---
layout: base
title: Coke Rewards for Android
summary: Information about my Coke Rewards for Android app
tags: Java
---

## Coke Rewards for Android

### Purpose

To provide an easy way for people to submit codes from the caps of Coca-Cola Products to their MyCokeRewards accounts without having to navigate around the Coke Rewards website.

I have been using Coke Rewards for a while now, and I have always found it annoying to have to go to my computer and type in the code.  After their addition of a mobile website, it became a bit easier to submit codes, but I much prefer native apps over web apps.  So I figured I would try and figure out how their submission system worked, and then build an app that would allow users to submit codes.

In order to do this, I downloaded their freely available Yahoo! widget, logged in and submitted a code while watching the web requests that were performed using Fiddler. In Fiddler, I was able to see that all they were doing was sending a POST request to their '/xmlrequest' endpoint with some XML (including user credentials and a few other items) as the POST body. In response, they sent back whether you were logged in, as well as information about how many points the user had, and whether the code submission was successful or not.

Another experience I had while creating this app was including ads in it.  The AdMob jar file was very easy to use. All I needed to do was add an AdView to the layout, perform a simple initialization, and then it would serve up ads. In addition to ads, I have included the Google Analytics library in this project to see which buttons are being used the most, and how many exceptions occur in the login process and code submission process. It has been interesting seeing this aggregated data.

### Technologies Used

Throughout this project, I have learned how to use many new technologies.

* [Fiddler](http://www.fiddler2.com/fiddler2/)
* Google Analytics Android Library
* AdMob Android Library

**Source Code**: The source code for this app is available on [Github](https://github.com/breber/cokerewards)

This app was available on the [Google Play Store](https://play.google.com/store/apps/details?id=com.brianreber.cokerewards). Feel free to download it, +1 it, and give it a great rating!

To date, this app has been downloaded over 40,000 times, and has helped users submit over 750,000 codes!

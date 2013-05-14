---
layout: base
title: Card Games for Android
summary: Information about the Card Games for Android app
tags: Java Objective-C
---

## Card Games for Android

As a part of a Computer Science class (CS309) at Iowa State, my team chose to make an Android app that allowed multiple users to play card games together on multiple devices. The idea is that an Android tablet would act as the game board, and each user would have an Android phone or tablet that would act as their hand.

Each player would connect to the tablet, and the tablet would begin a card game by dealing cards out to the users. The player would be notified that it is their turn, and they would be able to choose a card to play and the tablet would recognize this play, and move on to the next player.

Our initial project plan was to create the game Crazy Eights, with Bluetooth as the connection between the devices. As we went we found Bluetooth to be rather slow to connect, so we decided to implement Wifi connections to see if that was any better. We learned that Wifi was significantly quicker which is what we ended up using for the default setting.

After the class ended, we decided to continue working on it so that it would be publishable. The app is now on the Play Store, with great ratings!

### Technologies Used

Throughout this project, I learned how to use many new technologies.

* Android SDK
* Network Programming
    * Bluetooth Sockets
    * TCP Sockets
    * Bonjour Zeroconf Networking
* Complex Android Layouts

This app is available in the [Google Play Store](https://play.google.com/store/apps/details?id=com.worthwhilegames.cardgames). Feel free to download it, +1 it, and give it a great rating!

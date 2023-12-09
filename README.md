This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.



<!--  implementation for push notification  -->

1. Creeate a firebase account and create a app for android.
2. Inabale Cloud Messaging API (Legacy) for clound inabale 
3. Implement firebase library 
 - @react-native-firebase/messaging
 - @react-native-firebase/app
4. add related files in android folder
   * Android Manifest File
 -  <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"/>
 -  <service
            android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationListenerService"
            android:exported="false" >
            <intent-filter>
                <action android:name="com.google.firebase.MESSAGING_EVENT" />
            </intent-filter>
   </service>
   * android/build.gradle
     - classpath('com.google.gms:google-services:4.3.3')
   * android/app/build.gradle 
     - implementation 'com.google.firebase:firebase-analytics:17.3.0'
     - apply plugin: 'com.google.gms.google-services'
   * android/settings.gradle
     - include ':react-native-push-notification'
       project(':react-native-push-notification').projectDir = file('../node_modules/react-native-push-notification/android')
     -  implementation project(':react-native-push-notification')

5. In react-native side code
   - First get fcs token using messaging library  
      - messaging().getToken()
   - fcm token used testing online site "fcm token testing"    

6. user send one application to another application notification
   - "https://fcm.googleapis.com/fcm/send" user send this api to messsage using another user fcm token.
   - used sercreat-key
   
7. When application off then background notification using  this function
   - messaging().setBackgroundMessageHandler

8. When application open then notification get using this library and use this function 
  - react-native-push-notification
  - messaging().onMessage(message => {
      PushNotification.localNotification({
        data: message?.data,
        title: message?.notification.title, // (optional)
        message: message?.notification.body,
        playSound: true, // (optional) default: true
        soundName: 'default',
        invokeApp: true,
      });
    });
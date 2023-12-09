import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import PushNotification from 'react-native-push-notification';

const SERVER_KEY =
  'AAAACa1NJyQ:APA91bFrrMeRp9myTcMC27ILC4EUnBX_C4OYoOGozdHtWbSKsfzHMczys-4aCktGSUABGnwBMZBqDbrkL9eP8iA55sFzD25WWlHIXkcu2yOWALwSbpcHK2di_jVXRZMgzkSBxmSsOmkL';

const App = () => {
  const [fcmToken, setFcmToken] = useState('');
  const getFirebaseToken = async () => {
    const token = await messaging().getToken();
    setFcmToken(token);
    console.log('token ::::', token);
  };
  useEffect(() => {
    getFirebaseToken();
    messaging().onMessage(message => {
      PushNotification.localNotification({
        data: message?.data,
        title: message?.notification.title, // (optional)
        message: message?.notification.body,
        playSound: true, // (optional) default: true
        soundName: 'default',

        invokeApp: true,
      });
    });
    messaging().setBackgroundMessageHandler(messgae => {
      console.log('messgae:::', messgae);
    });
  }, []);

  const sendMessage = async () => {
    await axios
      .post(
        'https://fcm.googleapis.com/fcm/send',
        {
          to: 'cuvrXjyhR42v6Ih2Am6PrE:APA91bHbPMAcmW4tLJKUlBGQIGYSz3jnkvREoJkYmMtgZCDG-1u17DR9gzrjnapuDak5F_skXHIPmwHa2TJ0r29yIUVIn7OjzY7IjUXWn_PraWU5FSH2b9t11XTUzMjrp9tXiXF3-iJi',
          notification: {
            title: 'Send By User',
            body: 'Hello',
            sound: 'default',
          },
          data: {
            customData: 'hello',
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `key=${SERVER_KEY}`,
          },
        },
      )
      .then(response => {
        console.log('respons :::', response);
      });
  };

  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <TouchableOpacity
        style={{backgroundColor: 'lightblue', padding: 10}}
        onPress={() => sendMessage()}>
        <Text>Send Message </Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

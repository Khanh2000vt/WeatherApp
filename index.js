/**
 * @format
 */
 import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider as PaperProvider } from 'react-native-paper';
import PushNotification from "react-native-push-notification";

PushNotification.configure({

  
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
    },
    requestPermissions: Platform.OS === 'ios'
});

export default function Main() {
    return (
        <PaperProvider>
            <App/>
        </PaperProvider>
    )
}
AppRegistry.registerComponent(appName, () => Main);

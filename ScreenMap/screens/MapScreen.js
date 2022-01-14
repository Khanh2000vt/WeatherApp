import React, {useEffect} from 'react';
import{View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import PushNotification from "react-native-push-notification";

export default function MapScreen() {
    useEffect(() => {
        createChannels();
    }, [])

    const createChannels = () => {
        PushNotification.createChannel(
            {
                channelId: "test-channel",
                channelName: "Test Channel"
            }
        )
    }
    const handleNotification = () => {
        PushNotification.localNotification({
            channelId: "test-channel",
            title: "Youclicked on ",
            message: "Click duoc thi ngon"
        });

        PushNotification.localNotificationSchedule({
            channelId:"test-channel",
            title: "Alarm",
            message: "Schedule alarm",
            date: new Date(Date.now() + 20 * 1000)
        })
    }
    return (
        <View>
            <TouchableOpacity onPress={() => handleNotification()}>
                <Text>Click to push notification</Text>
            </TouchableOpacity>
        </View>
    )
}
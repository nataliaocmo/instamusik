import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DataProvider } from '@/context/dataContext/DataContext';


export default function _layout() {
    return (
    <DataProvider>
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#6500ff",
                headerShown: false
            }}
        >
            <Tabs.Screen
                name='home'
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (<FontAwesome5 name="home" size={24} color={color} />)
                }}
            />
            <Tabs.Screen
                name='explore'
                options={{
                    title: "Explore",
                    tabBarIcon: ({ color }) => (<Fontisto name="world-o" size={24} color={color} />)
                }}
            />
            <Tabs.Screen
                name='newPost'
                options={{
                    title: "New Post",
                    tabBarIcon: ({ color }) => (<MaterialIcons name="add-photo-alternate" size={24} color={color} />)
                }}
            />
            <Tabs.Screen
                name='reels'
                options={{
                    title: "Reels",
                    tabBarIcon: ({ color }) => (<FontAwesome5 name="film" size={24} color={color} />)
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => (<MaterialIcons name="account-circle" size={24} color={color} />)
                }}
            />
        </Tabs>

        </DataProvider>
    )
}
import { View, Text, TouchableOpacity, ScrollView,StyleSheet, Alert, Button, Modal, ActivityIndicator } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import React, { useContext, useEffect, useState } from 'react'
import { TextInput } from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ModalCamera from '@/components/ModalCamera';
import { Image } from 'expo-image';
import * as Location from 'expo-location';
import { DataContext } from '@/context/dataContext/DataContext';
import { DefaultResponse } from '@/interfaces/postInterface';

export default function NewPost() {

    const { newPost } = useContext(DataContext);


    const [isVisible, setIsVisble] = useState(false);
    const [currentPhoto, setCurrentPhoto] = useState(undefined as any);
    const [locationText, setLocationText] = useState("");
    const [caption, setCaption] = useState("");

    const [location, setLocation] = useState(null as Location.LocationObject | null);
    const [errorMsg, setErrorMsg] = useState("");
    
    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log("Mi ubicacion: ", {
                location
            })
            setLocation(location);
        })();
    }, []);

    const getAddress = async () => {

        if (location == null) return;

        try {
            console.log(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.coords?.latitude}&lon=${location.coords?.longitude}`);
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.coords?.latitude}&lon=${location.coords?.longitude}`)

            const data = await response.json();
            console.log({
                data: data.display_name
            })
            setLocationText(data.display_name)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSavePost = async () => {
        // const [isLoading, setIsLoading] = useState(false); // Estado para controlar el popup
        // setIsLoading(true); // Mostrar el popup cuando comience la petición
        const response = await newPost({
            address: locationText,
            caption: caption,
            image: currentPhoto.uri,
            date: new Date()
        })
        if(response){
            Alert.alert("That post looks good on your feed! Post published correctly")
        }
        // setIsLoading(false); // Ocultar el popup cuando la petición termine
        setCaption("");
        setCurrentPhoto(null);
        setLocationText("");
    }

    return (
        <ScrollView
            style={{
                flex: 1,
                paddingHorizontal: 20,
                paddingVertical: 10,

            }}
            contentContainerStyle={{
                gap: 25
            }}

        >
            <TouchableOpacity
                onPress={() => setIsVisble(true)}
            >
                <View
                    style={{
                        backgroundColor: 'grey',
                        aspectRatio: 1 / 0.9,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {
                        currentPhoto && currentPhoto.uri ?
                            <Image
                                style={{
                                    width: '100%',
                                    height: "100%",
                                    borderRadius: 20,
                                }}
                                source={{ uri: currentPhoto.uri }}
                                contentFit="cover"
                                transition={1000}
                            /> :
                            <>
                                <FontAwesome5 name="plus" size={80} color="white" />
                                <Text
                                    style={{
                                        fontWeight: '800',
                                        fontSize: 18,
                                        color: 'white'
                                    }}
                                >Select a picture</Text>
                            </>
                    }
                </View>
            </TouchableOpacity>
            <TextInput
                mode="outlined"
                multiline
                numberOfLines={4}
                value= {caption}
                onChangeText={setCaption}
                label='Caption'
                placeholder='Write a caption for your post...'
                style={{
                    backgroundColor: 'white',
                    minHeight: 100
                }}
            />
            <TouchableOpacity
                onPress={getAddress}
            >
        
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                       

                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            gap: 10
                        }}
                    >
                        <MaterialIcons name="location-on" size={24} color="black" />
                        <Text>Add location</Text>
                   
                        <MaterialIcons name="chevron-right" size={24} color="black" />
                    </View>
                    </View>
                        <Text>
                            {locationText}
                        </Text>
                    <View>
                </View>
            </TouchableOpacity>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSavePost} 
                >
                    <Text>
                        Publish
                    </Text>
                 
                </TouchableOpacity>
            </View>
            <ModalCamera
                isVisible={isVisible}
                onSave={(photo) => {
                    setCurrentPhoto(photo);
                }}
                onClose={() => { setIsVisble(false) }}
            />
        </ScrollView >
    )

}
const styles = StyleSheet.create({
    button: {
      backgroundColor: '#f5eeff',
      justifyContent: 'center',  // Centers text vertically
      alignItems: 'center',      // Centers text horizontally
      paddingHorizontal: 20,
      margin: 10,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 10,
      width: 150,
      height: 30,
  
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
    },
    modalContent: {
        width: 200,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
  });
  
  


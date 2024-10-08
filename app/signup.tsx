import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native'
import React, { useContext, useState } from 'react'
import { Link } from 'expo-router'
import { AuthContext } from '@/context/authContext/AuthContext'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

export default function Signup() {

  const {signUp} = useContext(AuthContext);
  const [email,setEmail]= React.useState('')
  const [password,setPassword]= React.useState('')
  const [username,setUser]= React.useState('')
  const [birthdate,setbirth]= React.useState('')
  const [fullname,setname]= React.useState('')

    const [date, setDate] = useState<Date>(new Date());
    const [show, setShow] = useState(false);
  
    const onChange = (_: any, selectedDate?: Date) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
      
      // Formatear la fecha como 'dd/mm/yyyy'
      const formattedDate = formatDate(currentDate);
      setbirth(formattedDate);
    };
  
    // Función para formatear la fecha como 'dd/mm/yyyy'
    const formatDate = (date: Date) => {
      const day = date.getDate().toString().padStart(2, '0'); // Día en formato 'dd'
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mes en formato 'mm'
      const year = date.getFullYear(); // Año en formato 'yyyy'
      return `${day}/${month}/${year}`; // Devolver la fecha formateada
    };
  
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View
            style={styles.container}
        >
          <Text style={styles.title}>
            The World needs more people with good music taste...
          </Text>

            <TextInput
                placeholder='Email'
                style={styles.input}
                placeholderTextColor={'grey'}
                onChangeText={setEmail}
                value= {email}
            />
            <TextInput
                placeholder='Full Name'
                style={styles.input}
                placeholderTextColor={'grey'}
                onChangeText={setname}
                value= {fullname}
              
            />
            <Text>
              Select a unic Username
            </Text>
            <TextInput
                placeholder='Username'
                style={styles.input}
                placeholderTextColor={'grey'}
                onChangeText={setUser}
                value={username}
            />
            <Text>Select birthdate</Text>

                  {show && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="default"
                      onChange={onChange}
                    />
                  )}


            <TextInput
                placeholder='Password'
                style={styles.input}
                placeholderTextColor={'grey'}
                onChangeText={setPassword}
                value={password}
            />
            <Link href={'/(tabs)/home'} asChild>
              <TouchableOpacity
                style={styles.button}
                onPress={()=> signUp(email,password,username,fullname, date)}
                
                >
                <Text style={styles.buttonText}>
                  Sign Up
                </Text >
              </TouchableOpacity>
            </Link>
            <Link href="/signin" asChild>
              <Button
                color="#b37fff"
                title="I already have an account"
              />
            </Link>
            
        </View>
        </TouchableWithoutFeedback>
  )
}

const styles= StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'

  },
  title:{
    fontWeight: 'bold',
    fontSize: 30,
    paddingBottom: 50

  },
  input: {
    padding: 1,
    paddingHorizontal: 20,
    margin: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: 250
    
  },
  button: {
    backgroundColor: '#6704f5',
    justifyContent: 'center',  // Centers text vertically
    alignItems: 'center',      // Centers text horizontally
    paddingHorizontal: 20,
    margin: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    width: 150,
    height: 30,

  },
  buttonText: {
    color: '#ffffff', // Change this to your desired text color
    fontSize: 16,
    fontWeight: 'bold', // Optional, makes the text bold
  }
})
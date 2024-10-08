import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import ModalCamera from '@/components/ModalCamera';
import { Image } from 'expo-image';
import { getAuth, updateCurrentUser } from 'firebase/auth';
import { DataContext } from '@/context/dataContext/DataContext';
import { newDataProps } from '@/context/dataContext/DataReducer';

export default function EditProfile() {
  const [avatar, setAvatar] = useState(undefined as any);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [newUser, setNewUser] = useState("");
  const [bio, setBio] = useState("");
  const [isVisible, setIsVisble] = useState(false);

  const { updateUser } = useContext(DataContext);

  const handleUpdateProfile = async () => {
    try {
  
        // Create updated data object based on user inputs
        const updatedData: newDataProps = {
          name,
          lastname,
          username: newUser,  // Use "username" field for Firebase, not "newUser"
          bio,
          avatar: avatar?.uri || null, // Save avatar URI if selected
        };
  
        // Call the updateUser function from the context
        const response = await updateUser(updatedData);
  
        if (response.isSuccess) {
          Alert.alert("Perfil actualizado", "Los cambios se han guardado correctamente.");
        } else {
          Alert.alert("Error", "No se pudo actualizar el perfil: " + response.message);
        }
    } catch (error) {
      console.log("Error al actualizar el perfil:", error);
      Alert.alert("Error", "Hubo un error al actualizar el perfil.");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Imagen de perfil */}
      <View style={styles.photoSection}>
        <TouchableOpacity onPress={() => setIsVisble(true)}>
          
          <View>
          {
              avatar && avatar.uri ?
                  <Image
                      style={styles.profileImage}
                      source={avatar && avatar.uri ? { uri: avatar.uri } : require('@/assets/images/noProfilePic.jpg')}
                                contentFit="cover"
                                transition={1000}
                            /> :
                            <>
                            </>
            }
            <Text style={styles.changePhotoText}>Cambiar foto de perfil</Text>
          </View>
        </TouchableOpacity>

        
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Apellido</Text>
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={lastname}
          onChangeText={setLastname}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Usuario</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          value={newUser}
          onChangeText={setNewUser}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Biografía</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Escribe tu biografía"
          value={bio}
          onChangeText={setBio}
          multiline
        />
      </View>

      {/* Botón para guardar cambios */}
      <TouchableOpacity style={styles.saveButton} onPress={() => handleUpdateProfile()}>
        <Text style={styles.saveButtonText}>Guardar Cambios</Text>
      </TouchableOpacity>
      <ModalCamera
                isVisible={isVisible}
                onSave={(photo) => {
                    setAvatar(photo);
                    console.log("camaraa")
                }}
                onClose={() => { setIsVisble(false) }}
            />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  changePhotoText: {
    color: '#6704f5',
    fontSize: 16,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#6704f5',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  saveButton: {
    backgroundColor: '#6704f5',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }, 
});


import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { Link, router } from 'expo-router';
import { DataContext } from "@/context/dataContext/DataContext"; // Ajusta la ruta
import { PostProps } from '@/interfaces/postInterface';

export default function Profile() {

  const { state, getPosts } = useContext(DataContext); // Accedemos a los posts desde el contexto

  useEffect(() => {
    // Llamamos a getPosts para cargar los posts cuando el componente se monta
    getPosts();
  }, []);

  // Renderiza cada post
  const renderPost = ({ item }: { item: PostProps }) => (
    <View style={styles.postContainer}>
      <Image source={{ uri: item.image }} style={styles.postImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={require('@/assets/images/noProfilePic.jpg')} // Ensure the path is correct
          style={styles.profilePicture}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>Profile Name</Text>
          <Text style={styles.description}>Share what you love.</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statsBox}>
          <Text style={styles.statsNumber}>120</Text>
          <Text style={styles.statsLabel}>Posts</Text>
        </View>
        <View style={styles.statsBox}>
          <Text style={styles.statsNumber}>500</Text>
          <Text style={styles.statsLabel}>Followers</Text>
        </View>
        <View style={styles.statsBox}>
          <Text style={styles.statsNumber}>180</Text>
          <Text style={styles.statsLabel}>Following</Text>
        </View>
      </View>

      <View style={styles.buttonBox}>
        <View style={styles.profileHeader}>
        <Link href={'/(tabs)/profile/editProfile'} asChild>
          <TouchableOpacity
            style={styles.button}>
            <Text style={styles.buttonText}>
              Edit Profile
            </Text >
          </TouchableOpacity>
        </Link>
        </View>
        <View style={styles.profileHeader}>
        {/* <Link href={''} asChild> */}
          <TouchableOpacity
            style={styles.button}>
            <Text style={styles.buttonText}>
              Share Profile
            </Text >
          </TouchableOpacity>
        {/* </Link> */}
      </View>
      </View>
      {/* Aquí renderizamos los posts usando FlatList */}
      
      <FlatList
        data={state.posts} // Usa el estado para obtener los posts
        renderItem={renderPost} 
        numColumns={3} // Establece 3 columnas
        columnWrapperStyle={styles.row} // Estilo para las filas
        showsVerticalScrollIndicator={false} // Opcional: quita el indicador de scroll
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50, // Hace que la imagen del perfil sea circular
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#888',
    marginVertical: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statsBox: {
    alignItems: 'center',
  },
  statsNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statsLabel: {
    fontSize: 14,
    color: '#888',
  },
  button: {
    backgroundColor: '#f5eeff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    margin: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    width: 150,
    height: 30,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  postContainer: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  postImage: {
    width: '100%', // Ajusta el tamaño de la imagen
    aspectRatio: 1, // Mantiene la proporción cuadrada
    borderRadius: 10,
  },
  postText: {
    marginTop: 5,
    textAlign: 'center',
  },
});


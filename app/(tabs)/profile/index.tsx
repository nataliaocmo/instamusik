import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { DataContext } from "@/context/dataContext/DataContext"; // Ajusta la ruta
import { PostProps } from '@/interfaces/postInterface';
import { newDataProps } from '@/context/dataContext/DataReducer';
import { AuthContext } from '@/context/authContext/AuthContext';

export default function Profile() {

  const { state, getPosts } = useContext(DataContext); // Accedemos a los posts desde el contexto
  const { stateUser, getUserinfo } = useContext(DataContext); // Accedemos a los posts desde el contexto
  const { state: { user } } = useContext(AuthContext)

  
   // Comprobación condicional para asegurar que userState existe antes de acceder a sus propiedades
   


   const profileImage =  require('@/assets/images/noProfilePic.jpg'); // Ajuste dinámico de la imagen según el tema

   const [info, setInfo] = useState(undefined as newDataProps | undefined);
   const name = info?.name ? info?.name.toString() : "";
   const posts = info?.post ? info.post.toString() : "0";
   const followers = info?.folowers ? info.folowers.toString() : "0";
   const following = info?.folowing ? info.folowing.toString() : "0";

   useFocusEffect(
    useCallback(() => {
      getUserinfo();
      getPosts();
      
    }, []) // El array de dependencias vacío asegura que se llame cada vez que la pantalla se enfoca
  );


  // Renderiza cada post
  const renderPost = ({ item }: { item: PostProps }) => (
    <TouchableOpacity style={styles.postContainer} onPress={() => handlePostPress(item)}>
      <View style={styles.postContainer}>
      <Image source={{ uri: item.image }} style={styles.postImage} />
    </View>
    </TouchableOpacity>
    
  );

  const handlePostPress = (item: PostProps) => {
    console.log('Post press:');
    router.push({pathname:"/(tabs)/profile/details/[id]", params:{id:item.id!}})
    console.log("si entró")
    // Aquí puedes navegar a la pantalla de detalles del post o realizar otra acción
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{uri: info?.avatar}} // Ensure the path is correct
          style={styles.profilePicture}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{name}{info?.lastname}</Text>
          <Text style={styles.description}>{info?.bio}.</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statsBox}>
          <Text style={styles.statsNumber}>{posts}</Text>
          <Text style={styles.statsLabel}>Posts</Text>
        </View>
        <View style={styles.statsBox}>
          <Text style={styles.statsNumber}>{followers}</Text>
          <Text style={styles.statsLabel}>Followers</Text>
        </View>
        <View style={styles.statsBox}>
          <Text style={styles.statsNumber}>{following}</Text>
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
    margin: 1,
    alignItems: 'center',
  },
  postImage: {
    width: '100%', // Ajusta el tamaño de la imagen
    aspectRatio: 1, // Mantiene la proporción cuadrada
    
  },
  postText: {
    marginTop: 5,
    textAlign: 'center',
  },
});


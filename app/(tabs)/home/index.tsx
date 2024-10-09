import { View, Text, Button, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext } from 'react'
import { DataContext } from '@/context/dataContext/DataContext'
import { useFocusEffect } from 'expo-router';
import { PostProps } from '@/interfaces/postInterface';


export default function Home() {

  const {state2, getAllPosts}  = useContext(DataContext)

  useFocusEffect(
    useCallback(() => {
      getAllPosts()
      
    }, []) 
  );

  const renderPost = ({ item }: { item: PostProps }) => (
      <View style={styles.postContainer}>
        <Image source={{ uri: item.image }} style={styles.postImage} />
      </View>
    
  );

  console.log(state2.posts)
  return (
    <View>
      <FlatList
        data={state2.posts} // Usa el estado para obtener los posts
        renderItem={renderPost} 
        numColumns={3} // Establece 3 columnas
        showsVerticalScrollIndicator={false} // Opcional: quita el indicador de scroll
      />
    </View>
  )
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

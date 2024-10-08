import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DataContext } from "@/context/dataContext/DataContext"; // Ajusta la ruta
import { useContext, useEffect, useState } from 'react';
import { PostProps } from '@/interfaces/postInterface';


export default function DetailsScreen() {
  const { id } = useLocalSearchParams();

  const [post, setPost] = useState(undefined as PostProps | undefined);

  const { state } = useContext(DataContext); 


  useEffect(()=>{
   const post = state.posts.find((item:PostProps)=> item.id == id)
   console.log({
    post
   })
   setPost(post)
  },[])

  if(!post){
    console.log("no lo econtró")
    return (<View></View>)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{post.username}</Text>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Seguir</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: post.image }}
        style={styles.image}
      />

      <Text style={styles.caption}>caption: {post.caption}</Text>

      <View style={styles.footer}>
        
        <Text style={styles.likes}>{post.likes} likes</Text>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
    alignContent:'space-between',
    paddingLeft:50
  },
  username: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: 10, // Bordes redondeados para la imagen
    marginBottom: 10,
  },
  caption: {
    fontSize: 16,
    marginVertical: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  followButton: {
    backgroundColor: '#0095f6',
    borderRadius: 5,
    padding: 10,
    
  },
  followButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  likes: {
    fontWeight: 'bold',
  },
});

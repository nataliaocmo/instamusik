import React, { useContext, useCallback } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { PostProps } from '@/interfaces/postInterface';
import { DataContext } from '@/context/dataContext/DataContext';

export default function Home() {
  const { state2, getAllPosts } = useContext(DataContext);

  useFocusEffect(
    useCallback(() => {
      getAllPosts();
    }, [])
  );

  const renderPost = ({ item }: { item: PostProps }) => (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Text style={styles.username}>{item.username}</Text>
      </View>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <Text style={styles.caption}>{item.caption}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={state2.posts}
        renderItem={renderPost}
        numColumns={1} // Set to 1 column to display posts in a vertical list
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  postContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  postImage: {
    width: '100%',
    height: 400, // Adjust the height as needed
    resizeMode: 'cover',
  },
  caption: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 14,
  },
});

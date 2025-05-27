import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { Button, Image, StyleSheet, TextInput } from 'react-native';
import { ScrollView } from 'react-native-web';
import { db, storage } from '../lib/firebase';

export default function CreatePost() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadPost = async () => {
    if (!image || !caption) {
      alert('すべての項目を入力してください');
      return;
    }

    try {
      const response = await fetch(image);
      const blob = await response.blob();

      const filename = `${Date.now()}.jpg`;
      const storageRef = ref(storage, `posts/${filename}`);
      await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'posts'), {
        imageUrl: downloadURL,
        caption,
        createdAt: serverTimestamp(),
      });

      alert('投稿が完了しました');
      setImage(null);
      setCaption('');
    } catch (error) {
      console.error(error);
      alert('投稿に失敗しました');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Button title="画像を選択" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} resizeMode="contain"/>}
      <TextInput
        placeholder="説明を入力"
        placeholderTextColor={"#888"}
        value={caption}
        onChangeText={setCaption}
        style={styles.input}
      />
      <Button title="投稿する" onPress={uploadPost} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  image: {
    width: '100%',
    height: 500,
    marginVertical: 12,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginVertical: 12,
  },
});
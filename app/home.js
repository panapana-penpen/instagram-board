import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => router.push('/create-post')} style={styles.topLeftButton}>
      <Text style={styles.linkText}>挑戦を書き込む</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E1', // 肌色っぽい背景
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  
  linkText: {
    fontSize: 18,
    color: '#007AFF', // 青い文字
  },
  topLeftButton: {
    position: 'absolute',
    top: 10,      // 画面上からの距離（必要に応じて調整）
    left: 20,     // 画面左からの距離
  },
});

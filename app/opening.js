import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function OpeningScreen() {
  const fullText = '現状維持か、前に進むか';
  const characters = Array.from(fullText);
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const router = useRouter(); // ← 追加

  const speed = 150;

  // タイピングアニメーション
  useEffect(() => {
    if (index < characters.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + characters[index]);
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      // 全部表示された後に2秒待って遷移
      const redirectTimeout = setTimeout(() => {
        router.push('/signup'); // ← 遷移
      }, 1000);
      return () => clearTimeout(redirectTimeout);
    }
  }, [index]);

  // カーソル点滅
  useEffect(() => {
    const blink = setInterval(() => setShowCursor(prev => !prev), 500);
    return () => clearInterval(blink);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>{displayedText}</Text>
        {showCursor && <View style={styles.cursor} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    color: 'white',
    fontFamily: 'KazukiReiwaBold',
  },
  cursor: {
    width: 5,
    height: 50,
    backgroundColor: 'red',
    marginLeft: 2,
  },
});
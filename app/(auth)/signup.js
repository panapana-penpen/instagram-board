import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../lib/firebase'; // ← パスはプロジェクトに合わせて

export default function SignupScreen() {
  const router = useRouter(); // ← Expo Router のナビゲーション
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      // ユーザーのアカウント作成（メール・パスワード）
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Firestore に追加情報（名前・生年月日）を保存
      await setDoc(doc(db, 'users', user.uid), {
        name,
        birthdate,
        email: user.email,
        createdAt: serverTimestamp(),
      });
  
      // ホーム画面へ遷移
      router.replace('/home');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="名前  (例)；坂本龍馬"
        onChangeText={setName}
        value={name}
        style={styles.input}
      />
      <TextInput
        placeholder="生年月日 (YYYY/MM/DD)"
        onChangeText={setBirthdate}
        value={birthdate}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        style={styles.input}
        secureTextEntry
      />


      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      <Button title="登録" onPress={handleSignup} />

      {/* ← ログインページへの遷移 */}
    <TouchableOpacity onPress={() => router.push('/login')}>
      <Text style={{ color: 'blue', marginTop: 16 }}>
        既にアカウントをお持ちの方はこちら
      </Text>
    </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 100 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10 },
  error: { color: 'red', marginBottom: 10 },
});
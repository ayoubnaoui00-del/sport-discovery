import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { fetchSports } from '../services/api';

export default function HomeScreen() {
  useEffect(() => {
    fetchSports()
      .then(data => console.log('✅ Sports loaded:', data))
      .catch(err => console.log('❌ Error:', err));
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Sports App 🏆</Text>
    </View>
  );
}
import { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import useSportsStore from '../store/sportsStore';
import SportCard from '../components/SportCard';

export default function HomeScreen() {
  const { sports, loading, error, loadSports, favorites, addFavorite, removeFavorite } = useSportsStore();
  const router = useRouter();

  useEffect(() => {
    loadSports();
  }, [loadSports]);

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1A73E8" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={sports}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Sport Discovery</Text>
            <Text style={styles.headerSubtitle}>Découvrez les disciplines</Text>
            <Text style={styles.headerDesc}>Explorez les activités sportives pour booster votre performance</Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <SportCard
            item={item}
            index={index}
            isFavorite={favorites.includes(item.id)}
            onToggleFavorite={toggleFavorite}
            onPress={() => router.push(`/detail/${item.id}` as any)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#1A73E8', fontSize: 16 },
  errorText: { color: 'red', fontSize: 16 },
  header: {
    backgroundColor: '#1A1A2E',
    padding: 24,
    paddingTop: 48,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A73E8',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerDesc: {
    fontSize: 14,
    color: '#aaa',
  },
});
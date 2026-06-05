import { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import useSportsStore from '../store/sportsStore';
import SportCard from '../components/SportCard';
import { LinearGradient } from 'expo-linear-gradient';

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
        <ActivityIndicator size="large" color="#ff5e00" />
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
    <LinearGradient colors={['#090a09', '#ff7300' ]} style={styles.container}>
      <FlatList
        data={sports}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800' }}
          >
            <View style={styles.headerOverlay}>
              <Text style={styles.headerTitle}>Sport Discovery</Text>
              <Text style={styles.headerSubtitle}>Découvrez les disciplines</Text>
              <Text style={styles.headerDesc}>Explorez les activités sportives pour booster votre performance</Text>
            </View>
          </ImageBackground>
        }
        renderItem={({ item, index }) => (
          <SportCard
            item={item}
            index={index}
            isFavorite={favorites.includes(item.id)}
            onToggleFavorite={toggleFavorite}
            onPress={() => router.push(`/details/${item.id}` as any)}
          />
        )}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#1A73E8', fontSize: 16 },
  errorText: { color: 'red', fontSize: 16 },
  header: {
    width: '100%',
    height: 220,
  },
  headerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    padding: 24,
    paddingTop: 48,
    justifyContent: 'flex-end',
  },
  headerTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#1A73E8',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ff7504',
    marginBottom: 6,
  },
  headerDesc: {
    fontSize: 14,
    color: '#ddd',
  },
});
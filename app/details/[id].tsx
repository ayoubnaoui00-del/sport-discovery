import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import useSportsStore from '../../store/sportsStore';

export default function DetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { sports, loading, error, loadSports } = useSportsStore();

  useEffect(() => {
    if (!sports.length && !loading) {
      loadSports();
    }
  }, [sports.length, loading, loadSports]);

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

  if (!id) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>ID manquant</Text>
      </View>
    );
  }

  const sport = sports.find((s: any) => s.id === id);

  if (!sport) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Sport non trouvé</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: sport.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{sport.name}</Text>
        <Text style={styles.description}>{sport.description}</Text>
        <TouchableOpacity
          style={styles.galleryButton}
          onPress={() =>
            router.push({ pathname: '/gallery/[id]', params: { id: sport.id } })
          }
        >
          <Text style={styles.galleryButtonText}>Voir la galerie</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    backgroundColor: '#fff',
  },
  details: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
    color: '#1A1A2E',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4A4A4A',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    color: '#1A73E8',
    fontSize: 16,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 16,
    textAlign: 'center',
  },
  galleryButton: {
    marginTop: 20,
    backgroundColor: '#1A73E8',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  galleryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

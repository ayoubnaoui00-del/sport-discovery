import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import useSportsStore from '../../store/sportsStore';

export default function DetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { sports, favorites, addFavorite, removeFavorite } = useSportsStore();

  const sport = sports.find((s: any) => s.id === id);

  if (!sport) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Sport non trouvé</Text>
      </View>
    );
  }

  const isFavorite = favorites.includes(sport.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(sport.id);
    } else {
      addFavorite(sport.id);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>

      {/* Hero Image */}
      <Image
        source={{ uri: sport.image }}
        style={{ width: '100%', height: 300 }}
        resizeMode="cover"
      />

      {/* Back button */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ position: 'absolute', top: 40, left: 16, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 999, padding: 8 }}
      >
        <Text style={{ color: '#fff', fontSize: 18 }}>←</Text>
      </TouchableOpacity>

      {/* Heart button */}
      <TouchableOpacity
        onPress={toggleFavorite}
        style={{ position: 'absolute', top: 40, right: 16, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 999, padding: 8 }}
      >
        <Text style={{ fontSize: 20 }}>{isFavorite ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>

      {/* Sport name and category */}
      <View style={{ padding: 16 }}>
        <View style={{ alignSelf: 'flex-start', backgroundColor: '#E6F1FB', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, marginBottom: 8 }}>
          <Text style={{ color: '#1A73E8', fontSize: 12, fontWeight: '600' }}>{sport.category.toUpperCase()}</Text>
        </View>
        <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#1A1A2E' }}>{sport.name}</Text>
        <Text style={{ fontSize: 14, color: '#666', marginTop: 6 }}>{sport.description}</Text>
      </View>

      {/* 4 Info tiles */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16 }}>
        <View style={{ width: '50%', padding: 8 }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 12, alignItems: 'center' }}>
            <Text style={{ fontSize: 12, color: '#888' }}>Joueurs</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1A1A2E' }}>{sport.players}</Text>
          </View>
        </View>
        <View style={{ width: '50%', padding: 8 }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 12, alignItems: 'center' }}>
            <Text style={{ fontSize: 12, color: '#888' }}>Type</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1A1A2E' }}>{sport.type}</Text>
          </View>
        </View>
        <View style={{ width: '50%', padding: 8 }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 12, alignItems: 'center' }}>
            <Text style={{ fontSize: 12, color: '#888' }}>Durée</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1A1A2E' }}>{sport.duration}</Text>
          </View>
        </View>
        <View style={{ width: '50%', padding: 8 }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 12, alignItems: 'center' }}>
            <Text style={{ fontSize: 12, color: '#888' }}>Difficulté</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1A1A2E' }}>{sport.difficulty}</Text>
          </View>
        </View>
      </View>

      {/* Rules */}
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1A1A2E', marginBottom: 12 }}>Règles de base</Text>
        {sport.rules.map((rule: string, index: number) => (
          <View key={index} style={{ flexDirection: 'row', marginBottom: 8 }}>
            <Text style={{ color: '#1A73E8', fontWeight: 'bold', marginRight: 8 }}>{index + 1}.</Text>
            <Text style={{ flex: 1, color: '#444' }}>{rule}</Text>
          </View>
        ))}
      </View>

      {/* Equipment */}
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1A1A2E', marginBottom: 12 }}>Équipement</Text>
        {sport.equipment.map((item: string, index: number) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Text style={{ color: '#1A73E8', marginRight: 8 }}>✓</Text>
            <Text style={{ flex: 1, color: '#444' }}>{item}</Text>
          </View>
        ))}
      </View>

      {/* Gallery button */}
      <TouchableOpacity
        style={{ margin: 16, backgroundColor: '#1A73E8', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 40 }}
        onPress={() => router.push(`/gallery?id=${sport.id}` as any)}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>📷 Voir la Galerie Photos</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}
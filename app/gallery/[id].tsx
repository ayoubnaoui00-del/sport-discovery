import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import useSportsStore from "../../store/sportsStore";

export default function GalleryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width } = useWindowDimensions();
  const sport = useSportsStore((state) =>
    state.sports.find((item: any) => item.id === id)
  );
  const loading = useSportsStore((state) => state.loading);
  const error = useSportsStore((state) => state.error);
  const loadSports = useSportsStore((state) => state.loadSports);

  useEffect(() => {
    if (!sport && !loading) {
      loadSports();
    }
  }, [sport, loading, loadSports]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1A73E8" />
        <Text style={styles.statusText}>Chargement de la galerie...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.statusText}>{error}</Text>
      </View>
    );
  }

  if (!id || !sport) {
    return (
      <View style={styles.center}>
        <Text style={styles.statusText}>Sport non trouvé</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={sport.gallery}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={[styles.image, { width }]} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },

  statusText: {
    marginTop: 12,
    color: "#1A73E8",
    fontSize: 16,
    textAlign: "center",
  },

  image: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 15,
  },
});
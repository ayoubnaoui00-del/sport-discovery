import { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';

type Sport = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
};

type Props = {
  item: Sport;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onPress: () => void;
};

export default function SportCard({ item, index, isFavorite, onToggleFavorite, onPress }: Props) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  useEffect(() => {
    opacity.value = withDelay(index * 150, withTiming(1, { duration: 500 }));
    translateY.value = withDelay(index * 150, withTiming(0, { duration: 500 }));
  }, [index, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => onToggleFavorite(item.id)}
        >
          <Text style={{ fontSize: 20 }}>{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
        <View style={styles.cardContent}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.category.toUpperCase()}</Text>
          </View>
          <Text style={styles.sportName}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: { width: '100%', height: 200 },
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 999,
    padding: 8,
  },
  cardContent: { padding: 16 },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E6F1FB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 8,
  },
  badgeText: { color: '#1A73E8', fontSize: 11, fontWeight: '600' },
  sportName: { fontSize: 20, fontWeight: 'bold', color: '#1A1A2E' },
  description: { fontSize: 14, color: '#666', marginTop: 6 },
});
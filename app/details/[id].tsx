import { useRouter, useLocalSearchParams } from 'expo-router';
import {ScrollView ,View ,Text ,Image , TouchableOpacity ,StyleSheet } from 'react-native';
import useSportsStore  from '../../store/sportsStore';

export default function DetailScreen() {
    const router= useRouter();
    const {id} = useLocalSearchParams();
    const {sports}= useSportsStore();

    const sport = sports.find((s: any) => s.id === id);
    
    if (!sport) {
        return(
            <View>
                <Text>Sport non trouvé</Text>
            </View>
        );
    }
    return(
        <ScrollView>
            <Image
                source={{ uri: sport.image }}
                style={{ width: '100%', height: 300 }}
            />
            <Text>{sport.name}</Text>
             <Text>{sport.description}</Text>

        </ScrollView>
    )

}
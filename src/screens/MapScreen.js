import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from "@react-navigation/native";


const MapScreen = () => {
    const [chargers, setChargers] = useState([
        {
            id: 2,
            name: 'Eletroposto Sol Fort',
            latitude: -15.6008448,
            longitude: -47.6839936,
            description: 'Eletroposto Sol Fort Plug Charger',
        },
    ]);
    // -15.6008448, -47.6839936
    const navigation = useNavigation();


    const handleMarkerPress = (chargerInfo) => {
        navigation.navigate('CHARGER', { chargerInfo });
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: -15.6008448,
                    longitude: -47.6839936,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                {chargers.map((charger) => (
                    <Marker
                        key={charger.id}
                        coordinate={{ latitude: charger.latitude, longitude: charger.longitude }}
                        title={charger.name}
                        description={charger.description}
                        onPress={() => handleMarkerPress(charger)}
                    />
                ))}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export default MapScreen;

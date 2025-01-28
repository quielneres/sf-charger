import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { Button, Card, Modal, Spinner } from '@ui-kitten/components';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

const MapScreen = () => {
  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedCharger, setSelectedCharger] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  useEffect(() => {
    const loadMapData = async () => {
      setLoading(true);
      // Simula um carregamento de dados do mapa
      await new Promise(resolve => setTimeout(resolve, 500));
      setRegion({
        latitude: -15.60084489,
        longitude: -47.6839936,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
      setMarkers([
        {
          id: 1,
          name: 'Eletroposto Sol Fort',
          latitude: -15.6008448,
          longitude: -47.6839936,
          description: 'Eletroposto Sol Fort Plug Charger',
          opened: '9:00 - 23:00',
          phone: '61 9 91234567',
          address: 'Rua 204 Numero 30 Vila Brasilia',
          amenities: [
            { name: 'Wifi', icon: 'wifi-outline' },
          ],
          connectors: [
            { id: 1, name: '3 pin' },
            { id: 2, name: 'CCS2' },
            { id: 3, name: 'Type 2' },
          ],
        },
      ]);
      setLoading(false);
    };

    loadMapData();
  }, []);

  const handleMarkerPress = charger => {
    setSelectedCharger(charger);
    bottomSheetRef.current?.snapToIndex(1); // Abre o BottomSheet
  };

  const handleSheetChange = useCallback(index => {
    if (index === -1) {
      setSelectedCharger(null); // Reseta o carregador selecionado quando o BottomSheet fecha
    }
  }, []);

  if (loading) {
    return (
        <View style={styles.loading}>
          <Modal visible={loading} backdropStyle={styles.backdrop}>
            <Card disabled={true}>
              <Spinner />
            </Card>
          </Modal>
        </View>
    );
  }

  return (
      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={region}>
          {markers.map(charger => (
              <Marker
                  key={charger.id}
                  coordinate={{ latitude: charger.latitude, longitude: charger.longitude }}
                  onPress={() => handleMarkerPress(charger)}
              />
          ))}
        </MapView>

        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
        >
          <BottomSheetView style={styles.sheetContent}>
            {selectedCharger ? (
                <View>
                  <Text style={styles.chargerTitle}>{selectedCharger.name}</Text>
                  <Text style={styles.chargerDetails}>Status: Disponível</Text>
                  <Text style={styles.chargerDetails}>Distância: 1.2 km</Text>
                  <Button
                      style={styles.button}
                      appearance="outline"
                      onPress={() => alert('Abrir no Waze (a ser implementado)')}
                  >
                    Navegar no Waze
                  </Button>
                  <Button
                      style={styles.button}
                      onPress={() => {
                        bottomSheetRef.current?.close();
                        navigation.navigate('ChargerDetails', { chargerId: selectedCharger.id });
                      }}
                  >
                    Ver Detalhes
                  </Button>
                </View>
            ) : (
                <Text>Nenhum carregador selecionado.</Text>
            )}
          </BottomSheetView>
        </BottomSheet>
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetContent: {
    flex: 1,
    padding: 16,
  },
  chargerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  chargerDetails: {
    fontSize: 14,
    marginBottom: 8,
    color: '#6b6b6b',
  },
  button: {
    marginVertical: 8,
  },
});

export default MapScreen;

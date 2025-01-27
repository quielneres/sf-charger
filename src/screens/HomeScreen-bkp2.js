import React, { useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { Button } from '@ui-kitten/components';

const chargers = [
  { id: 'charger-01', latitude: -23.55052, longitude: -46.633308, title: 'Charger 01' },
  { id: 'charger-02', latitude: -23.55942, longitude: -46.641308, title: 'Charger 02' },
];

export const HomeScreen = ({ navigation }) => {
  const bottomSheetRef = useRef(null);
  const [selectedCharger, setSelectedCharger] = useState(null);

  const handleMarkerPress = (charger) => {
    setSelectedCharger(charger);
    bottomSheetRef.current?.snapToIndex(0); // Abre o Bottom Sheet
  };

  return (
      <View style={styles.container}>
        {/* Mapa */}
        <MapView
            style={styles.map}
            initialRegion={{
              latitude: -23.55052,
              longitude: -46.633308,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
        >
          {chargers.map((charger) => (
              <Marker
                  key={charger.id}
                  coordinate={{ latitude: charger.latitude, longitude: charger.longitude }}
                  title={charger.title}
                  onPress={() => handleMarkerPress(charger)}
              />
          ))}
        </MapView>

        {/* Bottom Sheet */}
        <BottomSheet
            ref={bottomSheetRef}
            index={-1} // Fechado por padrão
            snapPoints={['25%', '50%']} // Altura do Bottom Sheet
            enablePanDownToClose
        >
          <View style={styles.bottomSheetContent}>
            {selectedCharger ? (
                <>
                  <Text style={styles.chargerTitle}>{selectedCharger.title}</Text>
                  <Text style={styles.chargerDetails}>Status: Disponível</Text>
                  <Text style={styles.chargerDetails}>Distância: 1.2 km</Text>

                  {/* Botões */}
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
                        bottomSheetRef.current?.close(); // Fecha o Bottom Sheet
                        navigation.navigate('ChargerDetails', { chargerId: selectedCharger.id });
                      }}
                  >
                    Ver Detalhes
                  </Button>
                </>
            ) : (
                <Text>Nenhum carregador selecionado.</Text>
            )}
          </View>
        </BottomSheet>
      </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  bottomSheetContent: { flex: 1, padding: 16 },
  chargerTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  chargerDetails: { fontSize: 14, marginBottom: 8, color: '#6b6b6b' },
  button: { marginVertical: 8 },
});

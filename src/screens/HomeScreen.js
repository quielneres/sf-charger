import React, {useCallback, useMemo, useRef, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, View, Text} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {Button} from '@ui-kitten/components';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {id} from "@gorhom/bottom-sheet/lib/typescript/utilities/id";


const chargers = [
    {id: 'charger-01', latitude: -23.55052, longitude: -46.633308, title: 'Charger 01'},
    {id: 'charger-02', latitude: -23.55942, longitude: -46.641308, title: 'Charger 02'},
];

const HomeScreen = ({navigation}) => {
    const bottomSheetRef = useRef(null); // Referência para o Bottom Sheet
    const [selectedCharger, setSelectedCharger] = useState(null)


    // hooks
    const sheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

    // callbacks
    const handleSheetChange = useCallback((index) => {
        console.log("handleSheetChange", index);
    }, []);
    const handleSnapPress = useCallback((index) => {
        sheetRef.current?.snapToIndex(index);
    }, []);
    const handleClosePress = useCallback(() => {
        sheetRef.current?.close();
    }, []);

    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);


    const handleMarkerPress = (charger) => {
        console.log('handle')
        setSelectedCharger(charger); // Atualiza o estado com o carregador selecionado
        sheetRef.current?.snapToIndex(1);

        // bottomSheetRef.current?.snapToIndex(1); // Abre o Bottom Sheet
    };

    const closeBottomSheet = () => {
        bottomSheetRef.current?.close(); // Fecha o Bottom Sheet
    };

    return (
        <GestureHandlerRootView style={styles.container}>

            <View style={styles.container}>
                {/* Mapa */}
                {/*<MapView*/}
                {/*    style={styles.map}*/}
                {/*    initialRegion={{*/}
                {/*        latitude: -23.55052,*/}
                {/*        longitude: -46.633308,*/}
                {/*        latitudeDelta: 0.05,*/}
                {/*        longitudeDelta: 0.05,*/}
                {/*    }}*/}
                {/*>*/}
                {/*    {chargers.map((charger) => (*/}
                {/*        <Marker*/}
                {/*            key={charger.id}*/}
                {/*            coordinate={{ latitude: charger.latitude, longitude: charger.longitude }}*/}
                {/*            title={charger.title}*/}
                {/*            onPress={() => handleMarkerPress(charger)}*/}
                {/*        />*/}
                {/*    ))}*/}
                {/*</MapView>*/}


                <View style={styles.mapContainer}>
                    {chargers.map((charger, index) => (
                        <Button
                            key={charger.id || index}
                            title=""
                            onPress={() => handleMarkerPress(charger)}
                        >
                            Ir para o Carregador
                        </Button>
                    ))}


                    {/*<Button*/}
                    {/*    title=""*/}
                    {/*    onPress={navigation.navigate('PROFILE')}*/}
                    {/*>*/}
                    {/*   Perfil*/}
                    {/*</Button>*/}
                </View>


                {/*<Button title="Snap To 90%" onPress={() => handleSnapPress(2)} />*/}
                {/*<Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />*/}
                {/*<Button title="Snap To 25%" onPress={() => handleSnapPress(0)} />*/}
                {/*<Button title="Close" onPress={() => handleClosePress()} />*/}



                <BottomSheet
                    ref={sheetRef}
                    index={-1}
                    snapPoints={snapPoints}
                    enableDynamicSizing={false}
                    onChange={handleSheetChange}
                >
                    <BottomSheetView style={styles.contentContainer}>
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
                                            closeBottomSheet(); // Fecha o Bottom Sheet
                                            navigation.navigate('ChargerDetails', {chargerId: selectedCharger.id});
                                        }}
                                    >
                                        Ver Detalhes
                                    </Button>
                                </>
                            ) : (
                                <Text>Nenhum carregador selecionado.</Text>
                            )}
                        </View>
                    </BottomSheetView>
                </BottomSheet>

                {/* Bottom Sheet */}
                {/*<BottomSheet*/}
                {/*    ref={bottomSheetRef}*/}
                {/*    index={-1} // Fechado por padrão*/}
                {/*    snapPoints={['25%', '50%']} // Altura do Bottom Sheet*/}
                {/*    enablePanDownToClose*/}
                {/*>*/}
                {/*    <BottomSheetView style={styles.contentContainer}>*/}
                {/*        <View style={styles.bottomSheetContent}>*/}
                {/*            {selectedCharger ? (*/}
                {/*                <>*/}
                {/*                    <Text style={styles.chargerTitle}>{selectedCharger.title}</Text>*/}
                {/*                    <Text style={styles.chargerDetails}>Status: Disponível</Text>*/}
                {/*                    <Text style={styles.chargerDetails}>Distância: 1.2 km</Text>*/}

                {/*                    /!* Botões *!/*/}
                {/*                    <Button*/}
                {/*                        style={styles.button}*/}
                {/*                        appearance="outline"*/}
                {/*                        onPress={() => alert('Abrir no Waze (a ser implementado)')}*/}
                {/*                    >*/}
                {/*                        Navegar no Waze*/}
                {/*                    </Button>*/}
                {/*                    <Button*/}
                {/*                        style={styles.button}*/}
                {/*                        onPress={() => {*/}
                {/*                            closeBottomSheet(); // Fecha o Bottom Sheet*/}
                {/*                            navigation.navigate('ChargerDetails', { chargerId: selectedCharger.id });*/}
                {/*                        }}*/}
                {/*                    >*/}
                {/*                        Ver Detalhes*/}
                {/*                    </Button>*/}
                {/*                </>*/}
                {/*            ) : (*/}
                {/*                <Text>Nenhum carregador selecionado.</Text>*/}
                {/*            )}*/}
                {/*        </View>*/}
                {/*    </BottomSheetView>*/}

                {/*</BottomSheet>*/}

                {/*<BottomSheet*/}
                {/*    ref={bottomSheetRef}*/}
                {/*    onChange={handleSheetChanges}*/}
                {/*>*/}
                {/*    <BottomSheetView style={styles.contentContainer}>*/}
                {/*        <Text>Awesome 🎉</Text>*/}
                {/*    </BottomSheetView>*/}
                {/*</BottomSheet>*/}
            </View>
        </GestureHandlerRootView>

    );
};

const styles = StyleSheet.create({
    container: {flex: 1},
    map: {flex: 1},
    bottomSheetContent: {flex: 1, padding: 16},
    chargerTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 8},
    chargerDetails: {fontSize: 14, marginBottom: 8, color: '#6b6b6b'},
    button: {marginVertical: 8},
    contentContainer: {
        flex: 1,
        padding: 36,
        alignItems: 'center',
    },
});

export default HomeScreen
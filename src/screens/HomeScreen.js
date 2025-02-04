import React, {useCallback, useContext, useMemo, useRef, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, View, Text} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {Button, Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {id} from "@gorhom/bottom-sheet/lib/typescript/utilities/id";
import BottomMenu from "./layout/BottomMenu";
import {AuthContext} from "../context/AuthContext";
import MapScreen from "./MapScreen";


const chargers = [
    {id: 'charger-01', latitude: -23.55052, longitude: -46.633308, title: 'Charger 01'},
    {id: 'charger-02', latitude: -23.55942, longitude: -46.641308, title: 'Charger 02'},
];

const HomeScreen = ({navigation}) => {
    const bottomSheetRef = useRef(null); // Referência para o Bottom Sheet
    const [selectedCharger, setSelectedCharger] = useState(null)

    const { isLoggedIn } = useContext(AuthContext);

    const handleLogin = () => {
        isLoggedIn ? navigation.navigate('PROFILE') : navigation.navigate('LOGIN');
    };

    const [activeTab, setActiveTab] = useState('map');

    // hooks
    const sheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

    // callbacks
    const handleSheetChange = useCallback((index) => {
        console.log("handleSheetChange", index);
    }, []);


    const closeBottomSheet = () => {
        bottomSheetRef.current?.close(); // Fecha o Bottom Sheet
    };

    const ChargerIcon = (props) => <Icon {...props}
                                         name="list-outline" style={styles.icon}
                                         fill='#8F9BB3'/>;

    const renderEditAction = () => (
        <TopNavigationAction
            icon={ChargerIcon}
            onPress={() => navigation.navigate('ChargerList')}
        />
    );

    return (
        <GestureHandlerRootView style={styles.container}>

            <View style={styles.container}>

                <TopNavigation
                    title="Mapa"
                    alignment="center"
                    accessoryLeft={renderEditAction}

                />

                {/*<MapScreen />*/}

                <BottomMenu activeTab={activeTab} setActiveTab={setActiveTab} handleLogin={handleLogin} />

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
    icon: {
        width: 32,
        height: 32,
    },
});

export default HomeScreen
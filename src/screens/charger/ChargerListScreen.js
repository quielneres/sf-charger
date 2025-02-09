import {Card, Icon, Layout, Modal, Spinner, TopNavigation, TopNavigationAction} from "@ui-kitten/components";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, { useEffect, useState } from "react";
import { InfoCardCharger } from "../../components/InfoCardCharger";
import { useNavigation } from "@react-navigation/native";

import { getChargers } from "../../services/ChargerService";

const ChargerListScreen = () => {
    const navigation = useNavigation();
    const [chargers, setChargers] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchChargers = async () => {
            try {
                const chargersData = await getChargers();
                setChargers(chargersData);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar carregadores:", error);
            }
        };

        fetchChargers();
    }, []);

    const BackIcon = (props) => (
        <Icon {...props} name="arrow-back" />
    );

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
    );

    return (
        <Layout style={styles.container}>
            <TopNavigation accessoryLeft={BackAction} title="Lista de Carregadores" alignment="center" />

            <Layout style={styles.infoContainer}>
                {chargers.length > 0 ? (
                    chargers.map((chargerInfo) => (
                            <InfoCardCharger
                                key={chargerInfo._id}
                                title={chargerInfo.name}
                                status={chargerInfo.status}
                                location={chargerInfo.address}
                                onPress={() => navigation.navigate('ChargerDetails', {chargerInfo})}
                            />
                    ))
                ) : (

                    <Modal
                        visible={loading}
                        backdropStyle={styles.loading}
                    >
                        <Card disabled={true}>
                            <Spinner />
                        </Card>
                    </Modal>

                )}
            </Layout>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    button: { marginVertical: 16 },
    buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 16 },
    actionButton: { flex: 1, marginHorizontal: 4, borderRadius: 8 },
    infoContainer: { marginTop: 16 },
    icon: {
        width: 32,
        height: 32,
    },
    noChargersText: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
        color: "#666",
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ChargerListScreen;

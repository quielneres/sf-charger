import React from 'react';
import { Modal, View, Text, Button } from 'react-native';

const StartChargingModal = ({ visible, onConfirm, onCancel }) => {
    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
                <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}>
                    <Text>Deseja iniciar o carregamento?</Text>
                    <Button title="Confirmar" onPress={onConfirm} />
                    <Button title="Cancelar" onPress={onCancel} />
                </View>
            </View>
        </Modal>
    );
};

export default StartChargingModal;

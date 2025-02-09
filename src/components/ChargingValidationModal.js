import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Modal, Button } from '@ui-kitten/components';

const ChargingValidationModal = ({ visible, onClose, onAddFunds, onAddCard, onConfirm }) => {
    return (
        <Modal visible={visible} backdropStyle={styles.backdrop} onBackdropPress={onClose}>
            <View style={styles.container}>
                <Text style={styles.title}>Validação de Carregamento</Text>
                <Text style={styles.message}>Você precisa atender aos seguintes critérios:</Text>

                <View style={styles.option}>
                    <Text>✅ Estar próximo ao carregador</Text>
                </View>
                <View style={styles.option}>
                    <Text>✅ Ter pelo menos R$ 30 na carteira</Text>
                </View>

                <View style={styles.buttons}>
                    <Button style={styles.button} onPress={onAddFunds}>Adicionar Saldo</Button>
                    <Button style={styles.button} onPress={onAddCard}>Adicionar Cartão</Button>
                    <Button style={styles.button} status="success" onPress={onConfirm}>Confirmar</Button>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: 'white', borderRadius: 10, width: 300 },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    message: { fontSize: 14, marginBottom: 10 },
    option: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    buttons: { flexDirection: 'column', gap: 10, marginTop: 10 },
    button: { marginVertical: 5 },
    backdrop: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
});

export default ChargingValidationModal;

import React, { useState } from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
// import { Header, ProgressBar } from '../components';
import { StyleSheet } from 'react-native';
import {ProgressBar} from "../../components/ProgressBar";
import {Header} from "../../components/Header";

export const ChargingProgressScreen = ({ navigation }) => {
    const [progress, setProgress] = useState(50);

    return (
        <Layout style={styles.container}>
            <Header title="Charging Progress" onBackPress={() => navigation.goBack()} />
            <ProgressBar progress={progress} />
            <Text style={styles.description}>Progress: {progress}%</Text>
            <Button style={styles.button}>Stop Charging</Button>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    description: { marginVertical: 16, textAlign: 'center' },
    button: { alignSelf: 'center', width: '50%' },
});

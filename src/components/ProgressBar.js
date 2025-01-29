import React from 'react';
import { StyleSheet } from 'react-native';
import { ProgressBar as KittenProgressBar, Layout } from '@ui-kitten/components';

export const ProgressBar = ({ progress }) => {
    return (
        <Layout style={styles.container}>
            <KittenProgressBar progress={progress / 100} style={styles.progressBar} />
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: { width: '100%', marginBottom: 16 },
    progressBar: { height: 10 },
});

import {
    Button, Card,
    Divider,
    Icon,
    Input,
    Layout,
    Tab,
    TabView,
    TopNavigation,
    TopNavigationAction
} from "@ui-kitten/components";
import {StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import {useNavigation} from "@react-navigation/native";

const DepositScreen = () => {
    const navigation = useNavigation();
    const [depositValue, setDepositValue] = useState(0);

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const shouldLoadComponent = (index) => index === selectedIndex;


    const BackIcon = (props) => (
        <Icon {...props} name="arrow-back" />
    );

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
    );

    return (
        <Layout>
            <TopNavigation accessoryLeft={BackAction} title="Pagamento" alignment="center" />
            <Divider />
            <Layout style={styles.formContainer}>
                <Input
                    label="Valor"
                    placeholder="R$0,00"
                    value={depositValue}
                    onChangeText={setDepositValue}
                    style={styles.input}
                />
            </Layout>
            <Divider />


            <View style={styles.content}>

                <TabView
                    selectedIndex={selectedIndex}
                    shouldLoadComponent={shouldLoadComponent}
                    onSelect={index => setSelectedIndex(index)}
                >
                    <Tab title='Pix'>
                        <Layout style={styles.tabContainer}>


                            <Button
                                style={styles.pixButton}
                                disabled={depositValue ? false : true}
                                onPress={() => navigation.navigate('Deposit')}
                            >
                                GERAR PIX
                            </Button>


                        </Layout>
                    </Tab>
                    <Tab title='Cartões'>
                        <Layout style={styles.tabContainer}>
                            <Text category='h5'>
                                Cartões
                            </Text>
                        </Layout>
                    </Tab>

                </TabView>

            </View>




        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        backgroundColor: 'white',
        padding: 16,
        // backgroundColor: 'yellow'
    },
    formContainer: {
        paddingHorizontal: 16,
        marginTop: 16,
    },
    input: {
        marginBottom: 16,
        borderRadius: 8,
    },

    tabContainer: {
        height: '100%',
        paddingTop: 30,
        alignItems: 'center',
        // justifyContent: 'center',
    },
    pixButton:{
        width: '90%'
    }
});

export default DepositScreen;
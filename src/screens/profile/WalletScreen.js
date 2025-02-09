import {
    Button, Card,
    Divider,
    Icon,
    Layout,
    List,
    ListItem,
    Menu, MenuGroup, MenuItem, Tab, TabView,
    TopNavigation,
    TopNavigationAction
} from "@ui-kitten/components";
import {StyleSheet, Text, View} from "react-native";
import React, {useContext, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {AuthContext} from "../../context/AuthContext";
import BottomMenu from "../layout/BottomMenu";

const WalletScreen = () => {

    const navigation = useNavigation();
    const { isLoggedIn } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('wallet');


    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const shouldLoadComponent = (index) => index === selectedIndex;



    const [hasSavedCard, setHasSavedCard] = useState(false);
    const handleAddCard = () => {
        if (isLoggedIn) {
            navigation.navigate('AddCard' );
        } else {
            navigation.navigate('LOGIN');
        }
    };


    const Header = (props) => (
        <View {...props}>
            <Text category='h1'>
                Depósitos
            </Text>
        </View>
    );



    const BackIcon = (props) => (
        <Icon {...props} name="arrow-back" />
    );

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
    );

    return (
        <Layout style={styles.container}>

            <TopNavigation accessoryLeft={BackAction} title="Minha Carteira" alignment="center" />
            <Divider />

            <View style={styles.content}>

                <TabView
                    selectedIndex={selectedIndex}
                    shouldLoadComponent={shouldLoadComponent}
                    onSelect={index => setSelectedIndex(index)}
                >
                    <Tab title='Carteira'>
                        <Layout style={styles.tabContainer}>

                            <Text style={styles.balance}>Saldo: R$0,00 </Text>

                                <Button
                                    style={styles.depositButton}
                                    onPress={() => navigation.navigate('Deposit')}
                                >
                                    DEPOSITAR
                                </Button>


                            <Card
                                style={styles.card}
                                header={Header}
                            >
                                <Text>
                                    Você não possui depósitos
                                </Text>
                            </Card>


                        </Layout>
                    </Tab>
                    <Tab title='Cartões'>
                        <Layout style={styles.tabContainer}>
                            <Text category='h5'>
                                Cartões
                            </Text>
                        </Layout>
                    </Tab>
                    <Tab title='Transações'>
                        <Layout style={styles.tabContainer}>
                            <Text category='h5'>
                                Transações
                            </Text>
                        </Layout>
                    </Tab>
                </TabView>

            </View>


            {/* Menu Inferior */}
            <BottomMenu activeTab={activeTab} setActiveTab={setActiveTab} />

        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F9FC',
        justifyContent: 'space-between'
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
        // backgroundColor: 'yellow'
    },
    balance: {
        fontSize: 18,
        fontWeight: 'bold',
        width: '80%',
        marginBottom: 16,
    },
    depositButton: {
        width: '80%'
    },

    card: {
        marginTop: 16,
        width: '90%',
        // flex: 1,
        margin: 2,
    },
    tabContainer: {
        height: '100%',
        paddingTop: 30,
        alignItems: 'center',
        // justifyContent: 'center',
    },
    section: {
        marginVertical: 16,
        // backgroundColor: 'red',
        // marginTop: 0
    },
    sectionTitle: {
        marginHorizontal: 16,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    list: {
        marginHorizontal: 16,
    },
    listItem: {
        borderRadius: 8,
        marginBottom: 8,
    },
    homeButton: {
        marginHorizontal: 16,
        marginTop: 20,
        borderRadius: 8,
    },
});

export default WalletScreen;
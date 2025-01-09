// import React, {useContext, useEffect, useState} from 'react';
// import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { useNavigation } from "@react-navigation/native";
// import firestore from '@react-native-firebase/firestore';
// import { colors } from "../../utils/colors";
// import { fonts } from "../../utils/fonts";
// import {AuthContext} from '../../context/AuthContext';
//
// import { Avatar, Layout } from '@ui-kitten/components';
//
//
// const ProfileScreen = () => {
//     const navigation = useNavigation();
//     const [user, setUser] = useState(null);
//
//     const {isLoggedIn} = useContext(AuthContext);
//
//
//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const usersCollection = firestore().collection('users');
//                 const userSnapshot = await usersCollection.get();
//                 const users = userSnapshot.docs.map(doc => doc.data());
//                 setUser(users[0]);
//             } catch (error) {
//                 console.error('Erro ao buscar usuário:', error);
//             }
//         };
//         fetchUser();
//     }, []);
//
//
//     const handleLogout = async () => {
//         try {
//             await AsyncStorage.removeItem('users');
//             Alert.alert('Sucesso', 'Logout realizado com sucesso');
//             navigation.navigate("LOGIN");
//         } catch (error) {
//             console.error('Erro ao fazer logout:', error);
//             Alert.alert('Erro', 'Não foi possível fazer logout');
//         }
//     };
//
//     return (
//       <View style={styles.container}>
//           <TouchableOpacity style={styles.backButtonWrapper} onPress={() => navigation.goBack()}>
//               <Ionicons name={"arrow-back-outline"} color={colors.primary} size={25} />
//           </TouchableOpacity>
//           <View style={styles.textContainer}>
//               <Text style={styles.headingText}>Perfil</Text>
//           </View>
//
//           <Avatar
//             style={styles.avatar}
//             size='giant'
//             source={require('../../assets/man.png')}
//           />
//           {isLoggedIn ? (
//             <View style={styles.profileContainer}>
//                 <Text style={styles.label}>Nome:</Text>
//                 <Text style={styles.value}>{user?.name}</Text>
//                 <Text style={styles.label}>Email:</Text>
//                 <Text style={styles.value}>{user?.email}</Text>
//
//                 <TouchableOpacity
//                   onPress={() => navigation.navigate("EDIT_PROFILE", { email: user?.email })}
//                 >
//                     <Text style={styles.label}>Editar perfil</Text>
//                 </TouchableOpacity>
//
//                 <TouchableOpacity style={styles.logoutButtonWrapper} onPress={handleLogout}>
//                     <Text style={styles.logoutText}>Logout</Text>
//                 </TouchableOpacity>
//             </View>
//           ) : (
//             <Text>Carregando...</Text>
//           )}
//       </View>
//     );
// };
//
// export default ProfileScreen;
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: colors.white,
//         padding: 20,
//     },
//     backButtonWrapper: {
//         height: 40,
//         width: 40,
//         backgroundColor: colors.gray,
//         borderRadius: 20,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     textContainer: {
//         marginVertical: 20,
//     },
//     headingText: {
//         fontSize: 32,
//         color: colors.primary,
//         fontFamily: fonts.SemiBold,
//     },
//     profileContainer: {
//         marginTop: 20,
//     },
//     label: {
//         fontSize: 18,
//         fontFamily: fonts.SemiBold,
//         color: colors.primary,
//     },
//     value: {
//         fontSize: 16,
//         fontFamily: fonts.Regular,
//         color: colors.secondary,
//         marginBottom: 20,
//     },
//     logoutButtonWrapper: {
//         backgroundColor: colors.primary,
//         borderRadius: 7,
//         marginTop: 20,
//     },
//     logoutText: {
//         color: colors.white,
//         fontSize: 20,
//         fontFamily: fonts.SemiBold,
//         textAlign: "center",
//         padding: 10,
//     },
// });

// import React from 'react';
// import { StyleSheet, View, Image } from 'react-native';
// import { Layout, Text, List, ListItem, Divider, Icon } from '@ui-kitten/components';
//
// const data = [
//     { title: 'My Car', icon: 'car-outline' },
//     { title: 'My Bookings', icon: 'calendar-outline' },
//     { title: 'My Wallet', icon: 'credit-card-outline' },
//     { title: 'History', icon: 'clock-outline' },
//     { title: 'Notifications', icon: 'bell-outline' },
//     { title: 'Security', icon: 'lock-outline' },
//     { title: 'Reminders', icon: 'alert-circle-outline' },
//     { title: 'Customer Support', icon: 'headphones-outline' },
//     { title: 'Privacy Policy', icon: 'shield-outline' },
//     { title: 'About', icon: 'info-outline' },
// ];
//
// const ProfileScreen = () => {
//     const renderItem = ({ item, index }) => (
//       <ListItem
//         title={item.title}
//         accessoryLeft={(props) => <Icon {...props} name={item.icon} />}
//         accessoryRight={(props) => <Icon {...props} name="arrow-ios-forward-outline" />}
//       />
//     );
//
//     return (
//       <Layout style={styles.container}>
//           <View style={styles.headerContainer}>
//               <Image
//                 style={styles.avatar}
//                 source={{ uri: 'https://via.placeholder.com/100' }}
//               />
//               <Text category='h6'>Junaid Ahmad</Text>
//               <Text category='s1' appearance='hint'>United Kingdom</Text>
//           </View>
//
//           <Divider />
//
//           <List
//             data={data}
//             ItemSeparatorComponent={Divider}
//             renderItem={renderItem}
//           />
//       </Layout>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     headerContainer: {
//         alignItems: 'center',
//         padding: 20,
//     },
//     avatar: {
//         width: 80,
//         height: 80,
//         borderRadius: 40,
//         marginBottom: 10,
//     },
// });
//
// export default ProfileScreen;

import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, Modal, TouchableOpacity} from 'react-native';
import {
  Layout,
  Text,
  List,
  ListItem,
  Divider,
  Icon,
  Button,
  Card,
  TopNavigation,
} from '@ui-kitten/components';
import BottomMenu from '../layout/BottomMenu';
import firestore from '@react-native-firebase/firestore';

import {useNavigation} from '@react-navigation/native';

const data = [
  {title: 'Meu carro', icon: 'car-outline'},
  {title: 'My Bookings', icon: 'calendar-outline'},
  {title: 'Minha Carteira', icon: 'credit-card-outline'},
  {title: 'Histórico', icon: 'clock-outline'},
  {title: 'Notificações', icon: 'bell-outline'},
  {title: 'Segurança', icon: 'lock-outline'},
  {title: 'Reminders', icon: 'alert-circle-outline'},
  {title: 'Suporte Customizado', icon: 'headphones-outline'},
  {title: 'Política de Privacidade', icon: 'shield-outline'},
  {title: 'Sobre', icon: 'info-outline'},
];

const ProfileScreen = () => {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const [user, setUser] = useState(null);

  const navigation = useNavigation();

      useEffect(() => {
        const fetchUser = async () => {
            try {
                const usersCollection = firestore().collection('users');
                const userSnapshot = await usersCollection.get();
                const users = userSnapshot.docs.map(doc => doc.data());
                setUser(users[0]);
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
            }
        };
        fetchUser();
    }, []);

  const renderItem = ({item, index}) => (
    <ListItem
      style={styles.listItem}
      title={item.title}
      accessoryLeft={props => <Icon {...props} name={item.icon} />}
      accessoryRight={props => (
        <Icon {...props} name="arrow-ios-forward-outline" />
      )}
    />
  );

  return (
    <Layout style={styles.container}>
      <TopNavigation title="Meu Perfil" />

      <TouchableOpacity
        style={styles.backButtonWrapper}
        onPress={() => navigation.navigate("EDIT_PROFILE", { email: user?.email })}>
        <View style={styles.headerContainer}>
          <Image
            style={styles.avatar}
            source={{uri: 'https://via.placeholder.com/100'}}
          />
          <Text category="h6">Junaid Ahmad</Text>
          <Text category="s1" appearance="hint">
            United Kingdom
          </Text>
        </View>
      </TouchableOpacity>

      <Divider />

      <List
        data={data}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />

      <View style={styles.footerContainer}>
        <Button onPress={() => setVisible(true)}>Proceed To Pay</Button>
      </View>

      <BottomMenu activeTab={activeTab} setActiveTab={setActiveTab} />

      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <Card disabled>
            <Text category="h6">Billing Details</Text>
            <Text style={styles.paymentMethod}>Payment Method</Text>
            <View style={styles.paymentIconsContainer}>
              <Icon style={styles.icon} name="credit-card-outline" />
              <Icon style={styles.icon} name="credit-card-outline" />
              <Icon style={styles.icon} name="credit-card-outline" />
            </View>
            <View style={styles.detailsContainer}>
              <Text category="s1">Energy Cost</Text>
              <Text category="s1">$5.6</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text category="s1">Sub Total</Text>
              <Text category="s1">$5.6</Text>
            </View>
            <Button
              style={styles.confirmButton}
              onPress={() => setVisible(false)}>
              Confirm Payment
            </Button>
            <Button appearance="ghost" onPress={() => setVisible(false)}>
              Close
            </Button>
          </Card>
        </View>
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  headerContainer: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  footerContainer: {
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  paymentMethod: {
    marginVertical: 10,
  },
  paymentIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  icon: {
    // width: 32,
    // height: 32,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  confirmButton: {
    marginTop: 20,
  },
});

export default ProfileScreen;

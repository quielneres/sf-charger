import React, {useState, useEffect} from 'react';
import * as Progress from 'react-native-progress';
import {View, StyleSheet} from 'react-native';
import BackButton from '../../components/BackButton';
import {commonStyles} from '../../styles/commonStyles';
import {
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  CircularProgressBar,
  Text,
  Card,
  Button,
} from '@ui-kitten/components';

const ChargingScreen = ({navigation}) => {
  const [progress, setProgress] = useState(0);
  const [chargerInfo, setChargerInfo] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 1) {
          clearInterval(interval);
          navigation.navigate('PaymentOptions', { chargerInfo });
          return 1;
        }
        return prev + 0.1;
      });
    }, 1000);

    setChargerInfo({
      id: 'CHG-12345',
      location: 'Estação A - Setor 3',
      status: 'Carregando',
      amount: 20.5,
    });

    return () => clearInterval(interval);
  }, []);

  const BackIcon = props => (
    <Icon
      onPress={() => navigation.goBack()}
      {...props}
      name="arrow-ios-back-outline"
    />
  );
  const BackAction = () => <TopNavigationAction icon={BackIcon} />;


  const Header = (props) => (
    <View {...props}>
      <Text category='h6'>
        Carregador
      </Text>
      {/*<Text category='s1'>*/}
      {/*  Saida: 50-100 kW*/}
      {/*</Text>*/}
    </View>
  );

  const Footer = (props)=> (
    <View
      {...props}
      // eslint-disable-next-line react/prop-types
      // style={[props.style, styles.footerContainer]}
    >
      <Text>
        Portas | Fechada
      </Text>
      {/*<Button*/}
      {/*  style={styles.footerControl}*/}
      {/*  size='small'*/}
      {/*  status='basic'*/}
      {/*>*/}
      {/*  CANCEL*/}
      {/*</Button>*/}
      {/*<Button*/}
      {/*  style={styles.footerControl}*/}
      {/*  size='small'*/}
      {/*>*/}
      {/*  ACCEPT*/}
      {/*</Button>*/}
    </View>
  );


  return (
    <Layout style={styles.container}>
      <TopNavigation accessoryLeft={BackAction} title="Detalhes do pagamento" />

      <View style={styles.content}>
        <Card style={styles.cardTitle}>
          {/*<Icon width={32} height={32} name="arrow-ios-back-outline"/>*/}
          <Text style={styles.cardText}>Eletric Sport Station</Text>
        </Card>

        <CircularProgressBar
          style={{width: 200, height: 200, borderStyle: 'solid'}}
          progress={progress}
          size='giant'
        />

        {/*<Text>Status: {chargerInfo.status}</Text>*/}
        {/*<Text>Local: {chargerInfo.location}</Text>*/}


        <Layout
          style={styles.topContainer}
          level='1'
        >

          <Card
            style={styles.card}
            header={Header}
          >
            <Text>
              Saiu: 50-100 kW
            </Text>
          </Card>

          <Card
            style={styles.card}
            footer={Footer}
          >
            <Text>
              Range | 200 km
            </Text>
          </Card>

        </Layout>

        <Card style={[styles.cardTitle, {marginTop: 20}]}>
          {/*<Icon width={32} height={32} name="arrow-ios-back-outline"/>*/}
          <Text style={styles.cardText}>Tempo de carregamento: 00:25:45</Text>
        </Card>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardTitle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 50,
    padding: 10,
  },
  cardText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  topContainer: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 2,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
});

export default ChargingScreen;

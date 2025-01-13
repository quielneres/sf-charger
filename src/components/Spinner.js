

import React, {useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Modal, Text } from '@ui-kitten/components';

export const SpinnerComponent = ({ route }) => {

  const { isVisible } = route.params;

  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    isVisible ? setVisible(true) : setVisible(false);
  }, []);

  return (
    <View style={styles.container}>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true}>
          <Text>
            Welcome to UI Kitten 😻
          </Text>
          <Button onPress={() => setVisible(false)}>
            DISMISS
          </Button>
        </Card>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

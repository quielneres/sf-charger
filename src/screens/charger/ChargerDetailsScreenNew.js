import React from "react";
import {
  Layout,
  Text,
  Button,
  Input,
  Card,
  Icon,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { StyleSheet, ScrollView } from "react-native";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const ChargeIcon = (props) => <Icon {...props} name="flash-outline" />;
const StopIcon = (props) => <Icon {...props} name="stop-circle-outline" />;

const InfoCard = ({ title, description, iconName }) => {
  const IconComponent = (props) => <Icon {...props} name={iconName} />;

  return (
    <Card style={styles.card}>
      <IconComponent style={styles.icon} fill="#3366FF" />
      <Text category="h6" style={styles.title}>
        {title}
      </Text>
      <Text category="s1" style={styles.description}>
        {description}
      </Text>
    </Card>
  );
};

export const ChargerDetailsScreenNew = () => {
  const [time, setTime] = React.useState("");
  const [capacity, setCapacity] = React.useState("");
  const [status, setStatus] = React.useState("Idle");

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );

  const getStatusColor = () => {
    switch (status) {
      case "Charging":
        return "#34C759";
      case "Idle":
        return "#8E8E93";
      case "Error":
        return "#FF3B30";
      default:
        return "#8E8E93";
    }
  };

  return (
    <Layout style={styles.container}>
      {/* Header */}
      <TopNavigation
        title="Charger Details"
        alignment="center"
        accessoryLeft={renderBackAction}
      />

      {/* Conteúdo com Scroll */}
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Status do Carregador */}
        <Layout
          style={[
            styles.statusContainer,
            { borderColor: getStatusColor() },
          ]}
        >
          <Icon style={styles.statusIcon} fill={getStatusColor()} name="car-outline" />
          <Text category="h6" style={{ color: getStatusColor() }}>
            {status}
          </Text>
        </Layout>

        {/* Cards Informativos */}
        <InfoCard
          title="Fast Mode"
          description="50 kW charging speed"
          iconName="flash-outline"
        />
        <InfoCard
          title="Capacity"
          description="Battery at 70%"
          iconName="battery-outline"
        />
        <InfoCard
          title="Last Session"
          description="Charged for 2 hours"
          iconName="clock-outline"
        />

        {/* Formulário para Configuração */}
        <Layout style={styles.formContainer}>
          <Text category="h6" style={styles.label}>
            Reservation Time
          </Text>
          <Input
            style={styles.input}
            placeholder="Enter Time (e.g., 18:00)"
            value={time}
            onChangeText={setTime}
          />
          <Text category="h6" style={styles.label}>
            Capacity (kWh)
          </Text>
          <Input
            style={styles.input}
            placeholder="Enter Capacity (e.g., 50)"
            value={capacity}
            onChangeText={setCapacity}
          />
          <Button
            style={styles.button}
            onPress={() =>
              alert(`Reservation set for ${time} with ${capacity} kWh`)
            }
          >
            Save Reservation
          </Button>
        </Layout>

        {/* Botões de Ação */}
        <Layout style={styles.buttonContainer}>
          <Button
            style={[styles.actionButton, { backgroundColor: "#34C759" }]}
            accessoryLeft={ChargeIcon}
            onPress={() => setStatus("Charging")}
          >
            Start Charging
          </Button>
          <Button
            style={[styles.actionButton, { backgroundColor: "#FF3B30" }]}
            accessoryLeft={StopIcon}
            onPress={() => setStatus("Idle")}
          >
            Stop Charging
          </Button>
        </Layout>
      </ScrollView>

      {/* Footer */}
      <Layout style={styles.footer}>
        <Text category="label" style={styles.footerText}>
          Charger ID: 12345 | Location: Main Street, 101
        </Text>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 16,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  statusIcon: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
  },
  icon: {
    width: 32,
    height: 32,
    marginBottom: 8,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    color: "#8F9BB3",
  },
  formContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#F7F9FC",
  },
  label: {
    marginBottom: 8,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 8,
  },
  footer: {
    padding: 16,
    backgroundColor: "#F7F9FC",
    borderTopWidth: 1,
    borderTopColor: "#E4E9F2",
  },
  footerText: {
    textAlign: "center",
    color: "#8F9BB3",
  },
});

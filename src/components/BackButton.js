import {StyleSheet, TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {colors} from "../utils/colors";
import React from "react";
import {useNavigation} from "@react-navigation/native";


export default function BackButton() {

    const navigation = useNavigation();

    return (
        <View>
            <TouchableOpacity style={styles.backButtonWrapper}
                              onPress={() => navigation.goBack()}
            >
                <Ionicons
                    name={"arrow-back-outline"}
                    color={colors.primary}
                    size={25}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    backButtonWrapper: {
        height: 40,
        width: 40,
        backgroundColor: colors.gray,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
});

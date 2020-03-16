import React, { useState, useEffect, Fragment, useRef } from "react";
import { StyleSheet, View, Text, Button, Image, ScrollView } from "react-native";

export default function FavoritesScreen() {
    return (
        <View style={styles.container}>
            <Text>Favorites screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
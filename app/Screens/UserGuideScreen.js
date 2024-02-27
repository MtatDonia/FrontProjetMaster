import React, { useState } from 'react';
import { View, Text, CheckBox, Button, StyleSheet, Image, ScrollView, ImageBackground } from 'react-native';
import colors from '../config/colors';
import LoginButton from '../components/LoginButton';
const UserGuideScreen = ({ navigation }) => {
    const [acceptConditions, setAcceptConditions] = useState(false);
    const [errorAcceptCondition, setErrorAcceptCondition] = useState("");
    const handleContinue = () => {
        if (acceptConditions) {
            navigation.navigate('BottomTabNavigator');
        } else {
            setErrorAcceptCondition('Please accept the terms')
        }
    };
    const logo = require('../assets/nouveaulogo.png');

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={logo}
                />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Welcome to Pick your dog!</Text>
                <Text style={styles.description}>
                    Discover a unique experience dedicated to dog lovers. Pick your dog allows you to share and explore special moments with your four-legged companions. Post photos, interact with other dog owners, and create a passionate community around our canine friends.
                </Text>
                <Text style={styles.heading}>Key Features:</Text>
                <Text style={styles.listItem}><Text style={styles.bold}>• </Text> Share photos and special moments with your dog.</Text>
                <Text style={styles.listItem}><Text style={styles.bold}>• </Text> Social interactions: like, comment, and follow other dogs.</Text>
                <Text style={styles.listItem}><Text style={styles.bold}>• </Text> Organize dog walks and discover friendly places for our four-legged friends.</Text>
                <Text style={styles.listItem}><Text style={styles.bold}>• </Text> engage in a conversation with an AI to ask questions about dogs.</Text>

                <Text style={styles.heading}>Terms of Use/Privacy Policy:</Text>
                <Text style={styles.description}>
                    By using Pick your dog, you agree to our terms of use and privacy policy. Make sure to read them carefully.
                </Text>
                <View style={styles.checkboxContainer}>
                    <CheckBox value={acceptConditions} onValueChange={() => setAcceptConditions(!acceptConditions)} />
                    <Text style={styles.checkboxLabel}>I accept the terms of use and privacy policy of Pick your dog.</Text>
                </View>
                <Text style={styles.error}>{errorAcceptCondition}</Text>
                <View style={styles.buttonContainer}>
                <LoginButton text="Continue" color="info"onPress={handleContinue} />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    logo: { 
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    contentContainer: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'left',
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'left',
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        textAlign: 'left',
    },
    listItem: {
        fontSize: 16,
        marginLeft: 15,
        textAlign: 'left',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkboxLabel: {
        fontSize: 16,
        marginLeft: 10,
        textAlign: 'left',
        color: colors.info
    },
    error: {
        color: 'red',
        padding: 10,
        textAlign: 'left',
    },
    bold: {
        fontWeight: 'bold',
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 30, 
    },
});

export default UserGuideScreen;
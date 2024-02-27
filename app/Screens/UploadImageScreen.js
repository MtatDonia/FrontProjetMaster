import React, { useState } from 'react';
import { View, Text, CheckBox, Button, StyleSheet } from 'react-native';

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

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Welcome to Pick your dog!</Text>
        <Text style={styles.description}>
            Discover a unique experience dedicated to dog lovers. Pick your dog allows you to share and explore special moments with your four-legged companions. Post photos, interact with other dog owners, and create a passionate community around our canine friends.
        </Text>
        <Text style={styles.heading}>Key Features:</Text>
        <Text style={styles.listItem}>- Share photos and special moments with your dog.</Text>
        <Text style={styles.listItem}>- Social interactions: like, comment, and follow other dogs.</Text>
        <Text style={styles.listItem}>- Organize dog walks and discover friendly places for our four-legged friends.</Text>
        <Text style={styles.listItem}>- engage in a conversation with an AI to ask questions about dogs.</Text>

        <Text style={styles.heading}>Terms of Use/Privacy Policy:</Text>
        <Text style={styles.description}>
            By using Pick your dog, you agree to our terms of use and privacy policy. Make sure to read them carefully.
        </Text>
        <View style={styles.checkboxContainer}>
            <CheckBox value={acceptConditions} onValueChange={() => setAcceptConditions(!acceptConditions)} />
            <Text style={styles.checkboxLabel}>I accept the terms of use and privacy policy of Pick your dog.</Text>
        </View>
        <Text style={styles.error}>{errorAcceptCondition}</Text>
        <Button title="Continue" onPress={handleContinue} />
    </View>
    
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    listItem: {
        fontSize: 16,
        marginLeft: 15,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkboxLabel: {
        fontSize: 16,
        marginLeft: 10,
    },
    error: {
        color: 'red',
        alignSelf: 'center',
        padding: 10,
    },
});

export default UserGuideScreen;

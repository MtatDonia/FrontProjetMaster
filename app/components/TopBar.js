import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { collection, query, where, getDocs, onSnapshot} from "firebase/firestore";
import { FIREBASE_DB } from '../../FirebaseConfig';

const db = FIREBASE_DB;

const TopBar = () => {
    const [userPhoto, setUserPhoto] = useState("https://firebasestorage.googleapis.com/v0/b/pickyourdog.appspot.com/o/userImage%2Fimages.png?alt=media&token=c5786220-6bf4-40bd-8f9c-11804354002e");

    const email = FIREBASE_AUTH.currentUser.email;

    const navigation = useNavigation();

    useEffect(() => {
        const user = async () => {
            console.log(email)
            const q = query(collection(db, "users"), where("email", "==", email));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const user = doc.data();
                    setUserPhoto(user.photo)
                    console.log(user.photo)
                });
            });
            
        };
        user();
    }, []);

    const handleGoProfile = () => {
        navigation.navigate('ProfileScreen');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('ListingScreen')}>
                <Image source={require('../assets/dog.png')} style={styles.logo} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.profile} onPress={handleGoProfile}>
                <Image source={{uri: userPhoto}} style={styles.imageProfile}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'absolute',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.black,
        paddingHorizontal: 10,
    },
    logo: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        top: "10%",
    },
    imageProfile: {
        width: 50,
        height: 50,
        backgroundColor: colors.grey,
        borderRadius: 55,
    },
    profile: {
        alignSelf: 'flex-end',
        bottom: "75%",
    },
});

export default TopBar;

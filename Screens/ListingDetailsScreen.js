import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import colors from '../config/colors';
import ProductCard from '../components/ProductCard';
import TopBar from '../components/TopBar';
import BoneButton from '../components/BoneButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import Firebase
import { FIREBASE_DB } from '../../FirebaseConfig';
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";

const db = FIREBASE_DB;

const seller = require('../assets/benjamin.png');

function ListingDetailsScreen({route}) {

    const [userPhoto, setUserPhoto] = useState("https://firebasestorage.googleapis.com/v0/b/pickyourdog.appspot.com/o/userImage%2Fimages.png?alt=media&token=c5786220-6bf4-40bd-8f9c-11804354002e");
    const [userName, setName] = useState("");


    const { id, name, price, image, email, bone, date, dogImagePath } = route.params;
    console.log("Id",id)
    console.log("date",date)
    const [boneCounter, setBoneCounter] = useState(bone);

    useEffect(() => {
        const user = async () => {
            console.log(email)
            const q = query(collection(db, "users"), where("email", "==", email));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const user = doc.data();
                setUserPhoto(user.photo)
                setName(user.name)
                console.log(user.photo)
            });
        };
        user();
    }, []);

    const handleAddBone = async () => {
        try {
            const docRef = await setDoc(doc(db, "dogsPhoto", id), {
                dogName: name,
                status: price,
                image: dogImagePath,
                userEmail: email,
                date: date,
                bone: boneCounter + 1,
            });
            console.log("Document updates with ID: ", id);
        } catch (e) {
        console.error("Error adding document: ", e);
        }
        handleBone();
    };

    const handleBone = () => {
        setBoneCounter(boneCounter + 1);
    };

    return (
        <View style={styles.container}>
            <TopBar/>
            <ProductCard name={name} price={price} image={image} boneCount={boneCounter}/>
            <View style={styles.boneContainer}>
                <BoneButton text="Add a bone" color="pink" onPress={handleAddBone}/>
            </View>
            <View style={styles.sellerContainer}>
                <Image style={styles.imageUser} source={{uri: userPhoto}}></Image>
                <View style={styles.infoContainer}>
                    <Text style={styles.sellerName}>{userName}</Text>
                    <Text style={styles.sellerName}>{email}</Text>
                </View>
            </View>
        </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    sellerContainer: {
        flex: 1,
        backgroundColor: colors.white,
        flexDirection: 'row',
    },
    boneContainer: {
        flex: 1,
        backgroundColor: colors.white,
        flexDirection: 'row',
        justifyContent: 'center',
        top: 50,
    },
    infoContainer: {
        flex: 1,
        backgroundColor: colors.white,
        flexDirection: 'column',
    },
    imageUser: {
        width: 75,
        height: 75,
        borderRadius: 55,
        backgroundColor: colors.pink,
        marginLeft: 20,
    },
    sellerName: {
        fontSize: 15,
        left: 20,
        top: 10,
    },
});

export default ListingDetailsScreen;

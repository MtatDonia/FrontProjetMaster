import React, { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { View, ScrollView, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import ProductCard from '../components/ProductCard';
import colors from '/app/config/colors';
import TopBar from '../components/TopBar';
import { FIREBASE_DB } from '../../FirebaseConfig';
import Loading from '../components/Loading';

const db = FIREBASE_DB;

import { collection, onSnapshot } from "firebase/firestore"; 

const ListingScreen = ({ navigation }) => {
    const [dogsArray, setDogsArray] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const fetchedDogs = [];
                console.log("fetching data");
                const unsubscribe = onSnapshot(collection(db, "dogsPhoto"), (snapshot) => {
                    const fetchedDogs = [];
                
                    snapshot.forEach((doc) => {
                        const dog = doc.data();
                        const dogImage = { uri: dog.image };
                        fetchedDogs.push({
                            id: doc.id,
                            name: dog.dogName,
                            status: dog.status,
                            image: dogImage,
                            dogImagePath: dog.image,
                            userEmail: dog.userEmail,
                            bone: dog.bone,
                            date: dog.date,
                        });
                    });
                
                    console.log("Fetched dogs:", fetchedDogs);
                
                    setDogsArray(fetchedDogs);
                }, (error) => {
                    console.error("Error fetching data:", error);
                });
                setDogsArray(fetchedDogs);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); 

    return (
        <SafeAreaView  style={{ flex: 1, backgroundColor: colors.grey}}>
            <TopBar />

            {loading ? (
               <Loading/>
            ) : (
                <ScrollView>
                    {dogsArray.map((dog) => (
                        <TouchableOpacity
                            key={dog.id}
                            onPress={() => {
                                navigation.navigate('ListingDetailsScreen', {
                                    id: dog.id,
                                    name: dog.name,
                                    price: dog.status,
                                    image: dog.image,
                                    email: dog.userEmail,
                                    bone: dog.bone,
                                    date: dog.date,
                                    dogImagePath: dog.dogImagePath,
                                });
                            }}
                        >
                            <View style={styles.container}>
                                <ProductCard name={dog.name} price={dog.status} image={dog.image} boneCount={dog.bone}/>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
            <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('UploadImageScreen');}}>
                <Text><MaterialIcons name="add" size={35} color="black" /></Text>
            </TouchableOpacity>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'left',
        margin: 10,
    },
    button: {
        position: 'absolute',
        bottom: "10%",
        right: 20,
        backgroundColor: colors.purple,
        padding: 10,
        borderRadius: 30,
      },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingGif: {
        width: 100,
        height: 100,
    },
});

export default ListingScreen;
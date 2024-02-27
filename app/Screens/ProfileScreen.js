import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Linking, ImageBackground } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppText from '/app/components/AppText';
import LoginButton from '../components/LoginButton';
import colors from '/app/config/colors';
import TopBar from '../components/TopBar';
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import { FIREBASE_DB } from '../../FirebaseConfig';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import Loading from '../components/Loading';

import ImageViewer from '../components/ImageViewer';

const db = FIREBASE_DB;

function ProfileScreen({ navigation }) {

    const email = FIREBASE_AUTH.currentUser.email;
    const image = require('../assets/profileScreen.webp');;

    // Modal parts
    const [modalVisible, setModalVisible] = useState(false);

    // Veterinary parts
    const [veterinaryName, setVeterinaryName] = useState("");
    const [veterinaryPhone, setVeterinaryPhone] = useState("");
    const [veterinaryEmail, setVeterinaryEmail] = useState("");

    // Users parts
    const [userPhoto, setUserPhoto] = useState("https://firebasestorage.googleapis.com/v0/b/pickyourdog.appspot.com/o/userImage%2Fimages.png?alt=media&token=c5786220-6bf4-40bd-8f9c-11804354002e");
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [isAdmin, setIsAdmin] = useState(0);
    const [boneCount, setBoneCount] = useState(0);
    const [saveChangeButton, setSaveChangeButton] = useState("");

    const [selectedImage, setSelectedImage] = useState(null);

    const storage = getStorage();
    const [loading, setLoading] = useState(false)
    const generateRandomId = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const idLength = 10;

        let randomId = '';
        for (let i = 0; i < idLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomId += characters.charAt(randomIndex);
        }

        return randomId;
    };

    const pickImageAsync = async () => {
        console.log('pickImageAsync');
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            setUserPhoto(result.assets[0].uri);
            setSaveChangeButton("Save");
        } else {
            alert("You did not select any image.");
        }
    };

    const handleUploadVeterinary = async () => {
        setLoading(true)
        try {
            const docRef = await setDoc(doc(db, "users", id), {
                photo: userPhoto,
                email: email,
                name: name,
                lastConnection: new Date(),
                veterinaryName: veterinaryName || "",
                veterinaryPhone: veterinaryPhone || "",
                veterinaryEmail: veterinaryEmail || "",
                isAdmin: isAdmin || 0,
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        finally {
            setLoading(false)
        }
        setModalVisible(!modalVisible);
    };

    const handleUpload = async () => {
        if (selectedImage) {
            setLoading(true)
            const uuid = generateRandomId();
            console.log('uuid', uuid);
            const dogsRef = ref(storage, "userImage/" + uuid);
            const response = await fetch(selectedImage);
            const blob = await response.blob();
            console.log('blob', blob);

            await uploadBytes(dogsRef, blob);

            const url = await getDownloadURL(dogsRef);
            try {
                const docRef = await setDoc(doc(db, "users", id), {
                    photo: url,
                    email: email,
                    name: name,
                    lastConnection: new Date(),
                    veterinaryName: veterinaryName || "",
                    veterinaryPhone: veterinaryPhone || "",
                    veterinaryEmail: veterinaryEmail || "",
                    isAdmin: isAdmin || 0,
                });
            } catch (e) {
                console.error("Error adding document: ", e);
            }
            finally {
                setLoading(false)
            }
            navigation.navigate('ListingScreen');
        } else {
            console.log('Veuillez remplir tous les champs');

            alert('Veuillez remplir tous les champs');
            setLoading(false);
        }
    };

    useEffect(() => {
        const user = async () => {
            const q = query(collection(db, "users"), where("email", "==", email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const user = doc.data();
                console.log("name", user.name)
                setUserPhoto(user.photo)
                setName(user.name)
                setVeterinaryName(user.veterinaryName)
                setVeterinaryPhone(user.veterinaryPhone)
                setVeterinaryEmail(user.veterinaryEmail)
                setIsAdmin(user.isAdmin)
                setId(doc.id)
            });
        };
        user();
    }, []);

    useEffect(() => {
        const dog = async () => {
            const q = query(collection(db, "dogsPhoto"), where("userEmail", "==", email));
            var boneCounter = 0;
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const dog = doc.data();
                boneCounter += dog.bone;
            });
            setBoneCount(boneCounter);
        };
        dog();
    }, []);

    const handleLogout = () => navigation.navigate('WelcomeScreen')

    return (
        <View style={{ flex: 1 }}>
            <TopBar />
            {loading ? (
                <Loading />
            ) : (
                <>
                    <View style={{ padding: 10 }}>
                        <View style={styles.userInfoContainer}>
                            <View>
                                <TouchableOpacity style={styles.icon} onPress={pickImageAsync}>
                                    <ImageViewer placeholderImageSource={{ uri: userPhoto }} selectedImage={selectedImage} style={{ width: 80, height: 80, borderRadius: 40 }} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.savePhotoButton}
                                    onPress={handleUpload}
                                >
                                    <Text style={{ fontSize: 25, color: 'gray' }}>{saveChangeButton}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[{marginTop: -50}, { marginLeft: 20 }]}>
                                <Text style={{ fontSize: 24 }}>{name}</Text>
                                <Text style={{ fontSize: 16 }}>{email}</Text>
                                <Text style={{ fontSize: 25 }}>{boneCount}<MaterialCommunityIcons name="bone" size={45} color="pink" /></Text>
                            </View>
                        </View>

                    </View>
                    <View style={{ padding: 10 }}>
                        <View style={styles.veterinaryInfo}>
                            <Text style={{ fontSize: 20, marginLeft: 20, fontWeight: 'bold' }}>My veterinary</Text>
                            <View style={styles.listContainer}>
                                <MaterialCommunityIcons name="account-circle" size={24} color="black" />
                                <Text style={{ fontSize: 20, marginLeft: 20 }}>{veterinaryName}</Text>
                            </View>
                            <View style={styles.listContainer}>
                                <MaterialCommunityIcons name="phone" size={24} color="black" />
                                <Text onPress={() => Linking.openURL(`tel:${veterinaryPhone}`)} style={{ fontSize: 20, marginLeft: 20 }}>{veterinaryPhone}</Text>
                            </View>
                            <View style={styles.listContainer}>
                                <MaterialCommunityIcons name="email" size={24} color="black" />
                                <Text onPress={() => Linking.openURL(`mailto:${veterinaryEmail}`)} style={{ fontSize: 20, marginLeft: 20 }}>{veterinaryEmail}</Text>
                            </View>
                            <View style={{ alignContent: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
                                    <Text><MaterialCommunityIcons name="square-edit-outline" size={45} color="black" /></Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={handleLogout}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="logout" size={24} color="white" />
                            <Text style={{ color: 'white', marginLeft: 10 }}>Logout</Text>
                        </View>
                    </TouchableOpacity>

                </>
            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ marginBottom: 30, backgroundColor: colors.white, borderRadius: 15, padding: 5 }}>
                            <AppText>Change veterinary info:</AppText>
                        </View>

                        <TextInput
                            style={styles.inputResetPwd}
                            placeholder="Enter veterinary name"
                            value={veterinaryName}
                            onChangeText={setVeterinaryName}
                            keyboardType="text"
                        />
                        <TextInput
                            style={styles.inputResetPwd}
                            placeholder="Enter veterinary phone"
                            value={veterinaryPhone}
                            onChangeText={setVeterinaryPhone}
                            keyboardType="phone-pad"
                        />
                        <TextInput
                            style={styles.inputResetPwd}
                            placeholder="Enter veterinary email"
                            value={veterinaryEmail}
                            onChangeText={setVeterinaryEmail}
                            keyboardType="email-address"
                        />
                        <View style={styles.buttonChangeInfo}>
                            <LoginButton text="Save" color="info" onPress={handleUploadVeterinary} />
                            <LoginButton text="Close" color="purple" onPress={() => setModalVisible(!modalVisible)} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    icon:
    {
        borderRadius: 55,
        backgroundColor: colors.purple,
        padding: 5
    },
    listContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        width: '90%',
    },
    logoutButton: {
        backgroundColor: colors.purple,
        borderRadius: 10,
        paddingVertical: 10,
        marginTop: 'auto',
        alignItems: 'center',
        marginHorizontal: '35%',
        width: '30%',
        marginBottom: 20,
    },
    savePhotoButton: {
        borderRadius: 10,
        paddingVertical: 10,
        marginTop: 'auto',
        alignItems: 'center',
        marginHorizontal: '35%',
        width: '50%',
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: colors.success,
        borderRadius: 10,
        paddingVertical: 10,
        width: '30%',
    },
    editButton: {
        borderRadius: 10,
        paddingVertical: 10,
        width: '30%',
    },
    buttonChangeInfo: {
        top: 50,
        width: '100%',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 22,
    },
    inputResetPwd: {
        backgroundColor: "white",
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        bottom: 50,
        paddingHorizontal: 50,
    },
    veterinaryInfo: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 15,
        top: 15,
        alignContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 15,
        width: '100%',
        padding: 10,
        top: 15,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    shadow: {
        elevation: 5, 
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
})

export default ProfileScreen;

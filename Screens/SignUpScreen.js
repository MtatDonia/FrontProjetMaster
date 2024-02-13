import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Dimensions, Image, ActivityIndicator, Modal, Alert} from 'react-native';
import AppText from '../components/AppText';
import LoginButton from '../components/LoginButton';
import colors from '../config/colors';
import {BlurView} from 'expo-blur'

// Import Firebase
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { sendPasswordResetEmail } from 'firebase/auth';
import { FIREBASE_DB } from '../../FirebaseConfig';
const db = FIREBASE_DB;
import { collection, addDoc } from "firebase/firestore"; 


const LoginScreen = ({navigation}) => {
    // Import Images
    const image = { uri: "https://www.meatiful.co.uk/wp-content/uploads/2022/05/5-reasons-why-working-dogs-are-the-best-dogs.jpg" };
    const logo = require('../assets/dog.png');

    // Import auth
    const auth = FIREBASE_AUTH;

    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPwd, setErrorPwd] = useState("");
    const [errorResetEmail, setErrorResetEmail] = useState("");

    const handleResetPwd = async () => {
    
      if (email) {
        try {
          const response = await sendPasswordResetEmail(auth, email);
          alert('Mail send for reset your password');
          setModalVisible(!modalVisible);
        } catch (error) {
          console.log(error.message);
        } finally {
        }
      } else {
        setErrorResetEmail("Email not valid. Please try again.")
      }
    }

    const handleLogin = async () => {
        setLoading(true);
        setErrorEmail("")
        setErrorPwd("")
       

        if (email && password) {
          try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            if (response) {
              console.log('Connecté avec succès');
              navigation.navigate('BottomTabNavigator');
            }
          } catch (error) {
            console.log(error.message);
          } finally {
            setLoading(false);
          }
          setErrorPwd("email or password not valid. Please try again.")
        } else {
          alert('Veuillez remplir tous les champs');
        }
        if (!email) {
            setErrorEmail("Email not valid. Please try again.")
        }
        if (!password) {
            setErrorPwd("Password not valid. Please try again.")
        }
        setLoading(false);

    };

    const handleCreateAccount = () => {
        navigation.navigate('SignInScreen')
    };

    return (
       
        <ImageBackground source={image} resizeMode="cover" style={styles.imageContainer}>
            <View blurRadius={modalVisible ? 600 : 0}>

              
              <View style={styles.logoView}>
                  <Image
                      style={styles.logo}
                      source={logo}
                  />
                  <View style={styles.logoTextContainer}>
                      <AppText>Pick Your DOG!</AppText>
                  </View>
              </View>
              <View style={styles.inputContainer}>
                  <View style={{marginBottom: 30}}>
                      <AppText>Email:</AppText>
                      <TextInput
                          style={styles.inputText}
                          placeholder="Enter your email"
                          value={email}
                          onChangeText={setEmail}
                          keyboardType="email-address"
                      />
                      <Text style={styles.error}>{errorEmail}</Text>
                      <AppText>Password:</AppText>
                      <TextInput
                          style={styles.inputText}
                          placeholder="Enter your password"
                          value={password}
                          onChangeText={setPassword}
                          secureTextEntry={true}
                      />
                      <Text style={styles.error}>{errorPwd}</Text>
                  </View>
              </View>

              {loading ? (
                  <ActivityIndicator size="large" color={colors.primary} />
              ) : (
                <View style={styles.loginContainer}>
                  <LoginButton text="Login" color="purple" onPress={handleLogin}/>
                  <LoginButton text="Reset password" color="info" onPress={() => setModalVisible(true)}/>
                  <TouchableOpacity onPress={handleCreateAccount} style={{bottom:20}}>
                      <Text style={{color: colors.info, fontWeight: 'bold'}}>Create your account right now!</Text>
                  </TouchableOpacity>
                </View>
              )
              }
            </View>
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
                      <View style={{marginBottom: 30, backgroundColor: colors.light, borderRadius: 15, padding:5}}>
                        <AppText>Reset Password:</AppText>
                      </View>
                      
                    <Text style={styles.error}>{errorResetEmail}</Text>
                    <TextInput
                          style={styles.inputResetPwd}
                          placeholder="Enter your email"
                          value={email}
                          onChangeText={setEmail}
                          keyboardType="email-address"
                      />
                  <View style={styles.buttonResetPwd}>
                    <LoginButton text="Reset Password" color="info" onPress={handleResetPwd}/>
                    <LoginButton text="Close" color="danger" onPress={() => setModalVisible(!modalVisible)}/>
                  </View>
                </View>
              </View>
          </Modal>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
      imageContainer: {
        flex: 1,
        justifyContent: 'flex-top',
        position: 'absolute',
        width: '100%',
        height: '100%',
      },
      inputContainer: {
        alignItems: 'center',
        marginTop: '65%',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 50,
        marginVertical: 20,
        marginHorizontal: 30,
      },
      inputText: {
        backgroundColor: "white",
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        paddingHorizontal: 50,
      },
      loginContainer: {
        alignItems: 'center',
        marginTop: '50%',
        marginVertical: 20,
        bottom: '10%',
      },

       // logo part
      logo: {
        width: 100,
        height: 100,
        borderRadius: 25,
      },
      logoView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
      },
      logoText: {
        fontSize: 30,
        color: 'black',
        fontWeight: '300',
        textAlign: 'center',
        textAlignVertical: 'center',
      },
      logoTextContainer: {
        backgroundColor: 'rgba(128,0,128, 0.3)',
        borderRadius: 25,
        width: 250,
        top: 10,
      },
      error: {
        color: 'red',
        alignSelf: 'center'
      },

      // Modal
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
        bottom: 50,
        paddingHorizontal: 50,
      },
      buttonResetPwd: {
        top: 50,
        width: '100%',
        alignItems: 'center',
      },
});

export default LoginScreen;

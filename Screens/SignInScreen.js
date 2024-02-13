import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, ScrollView, Image, ActivityIndicator} from 'react-native';
import AppText from '../components/AppText';
import LoginButton from '../components/LoginButton';
import colors from '../config/colors';

// Import Firebase
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_DB } from '../../FirebaseConfig';
const db = FIREBASE_DB;
import { collection, addDoc } from "firebase/firestore"; 


const SignInScreen = ({navigation}) => {
    // Import Images
    const image = { uri: "https://www.meatiful.co.uk/wp-content/uploads/2022/05/5-reasons-why-working-dogs-are-the-best-dogs.jpg" };
    const logo = require('../assets/dog.png');

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // Import auth
    const auth = FIREBASE_AUTH;

    // Init useState for input errors
    const [errorProfile, setErrorProfile] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPwd, setErrorPwd] = useState("");
    const [errorPwdSame, setErrorPwdSame] = useState("");

    const handleLogin = async () => {
        setLoading(true);
        setErrorProfile("")
        setErrorEmail("")
        setErrorPwd("")
        setErrorPwdSame("")

        if (email && password && confirmPassword && name) {
            if (password == confirmPassword){
                try {
                    const response = await createUserWithEmailAndPassword(auth, email, password);
                    if (response) {
                      console.log('Connecté avec succès');
                      try {
                        const docRef = await addDoc(collection(db, "users"), {
                            name: name,
                            email: email,
                            lastConnection: new Date(),
                            photo: "https://firebasestorage.googleapis.com/v0/b/pickyourdog.appspot.com/o/userImage%2Fimages.png?alt=media&token=c5786220-6bf4-40bd-8f9c-11804354002e",
                        });
                        console.log("Document written with ID: ", docRef.id);
                        } catch (e) {
                        console.error("Error adding document: ", e);
                        }
                      navigation.navigate('UserGuideScreen');
                    }
                  } catch (error) {
                    console.log(error.message);
                  } finally {
                    setLoading(false);
                  }
                  setErrorPwd("email or password not valid. Please try again.")
            }else {
                console.log('Les mots de passe ne correspondent pas');
                setErrorPwdSame("Les mots de passe ne correspondent pas")
                alert('Les mots de passe ne correspondent pas');
            }
            setLoading(false);
        } else {
            console.log('Veuillez remplir tous les champs');
            if (!email) {
                setErrorEmail("Email not valid. Please try again.")
            }
            if (!password) {
                setErrorPwd("Password not valid. Please try again.")
            }
            if (!confirmPassword) {
                setErrorPwdSame("Password not valid. Please try again.")
            }
            if (!name) {
                setErrorProfile("Profile Name not valid. Please try again.")
            }
            alert('Veuillez remplir tous les champs');
            setLoading(false);
        }
    };

    const handleConnectAccount = () => {
        navigation.navigate('SignUpScreen')
    };

    return (
       
        <ImageBackground source={image} resizeMode="cover" style={styles.imageContainer}>
            <ScrollView>
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
                      <AppText>Profile Name:</AppText>
                      <TextInput
                          style={styles.inputText}
                          placeholder="Set your profile Name"
                          value={name}
                          onChangeText={setName}
                      />
                      <Text style={styles.error}>{errorProfile}</Text>
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
                      <AppText>Confirm Password:</AppText>
                      <TextInput
                          style={styles.inputText}
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChangeText={setConfirmPassword}
                          secureTextEntry={true}
                      />
                      <Text style={styles.error}>{errorPwdSame}</Text>
                  </View>
              </View>
              
              {loading ? (
                  <ActivityIndicator size="large" color={colors.primary} />
              ) : (
                  <View style={styles.loginContainer}>
                      <LoginButton text="Create account" color="purple" onPress={handleLogin}/>
                      <TouchableOpacity onPress={handleConnectAccount} style={{bottom:20}}>
                          <Text style={{color: colors.black, fontWeight: 'bold'}}>Connect yourself!</Text>
                      </TouchableOpacity>
                  </View>
              )
              }
            </ScrollView>
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
        marginTop: '15%',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 50,
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
        marginTop: '70%',
        bottom: '10%',
        marginVertical: 20,
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
});

export default SignInScreen;

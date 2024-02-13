import React from 'react';
import { Image, StyleSheet, View, ImageBackground, Dimensions, StatusBar } from 'react-native';
import AppText from '/app/components/AppText';
import LoginButton from '../components/LoginButton';


const windowWidth = Dimensions.get('window').width;

function WelcomeScreen({ navigation }) {
    const image = require('/app/assets/welcome-screen.jpg');

    const logo = require('/app/assets/dog.png');
    return (

        <ImageBackground source={image} style={styles.imageContainer}>
            <View style={styles.logoView}>
                <Image
                    style={styles.logo}
                    source={logo}
                />
            </View>
            <View style={styles.buttonContainer}>
                <LoginButton text="Login" color="info" onPress={() => navigation.navigate('SignUpScreen')}/>
                <LoginButton text="Sign Up" color="purple"  onPress={() => navigation.navigate('SignInScreen')}/>
            </View>
            
            <StatusBar style="auto" />
        </ImageBackground>


    );
}

const styles = StyleSheet.create({
    // Button Part  
      imageContainer: {
        flex: 1,
        resizeMode:"cover",
        justifyContent: 'flex-end',
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
        bottom: windowWidth * 1.5,
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

      button: {
        width: windowWidth * 0.2,
        marginHorizontal: 5,
      },
      buttonContainer: {
        alignItems: 'center',
      }
})
export default WelcomeScreen;
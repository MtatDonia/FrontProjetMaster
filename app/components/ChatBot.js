import {View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import axios from 'axios';
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { collection, query, where, getDocs} from "firebase/firestore";
import { FIREBASE_DB } from '../../FirebaseConfig';

const db = FIREBASE_DB;


const ChatBot = () => {

    const image = require('../assets/doggy-bot.png');;

    const [userPhoto, setUserPhoto] = useState("https://firebasestorage.googleapis.com/v0/b/pickyourdog.appspot.com/o/userImage%2Fimages.png?alt=media&token=c5786220-6bf4-40bd-8f9c-11804354002e");

    const email = FIREBASE_AUTH.currentUser.email;

    const navigation = useNavigation();

    useEffect(() => {
        const user = async () => {
            const q = query(collection(db, "users"), where("email", "==", email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const user = doc.data();
                console.log(user.photo);
                setUserPhoto(user.photo)
            });
        };
        user();
    }, []);

    // ChatGPT API
    const [messages, setMessages] = useState([])
    const chatGptApiKey = '';

    const handleSend = async (newMessage = []) => {
        try{
            const userMessage = newMessage[0];

            setMessages(previousMessages => GiftedChat.append(previousMessages, userMessage));
            const messageText = userMessage.text.toLowerCase();
            const keywords = ['dog', 'dogs', 'chien', 'chiens', 'doggo', 'doggos', 'puppy', 'puppies', 'pup', 'pups', 'eat', 'food', 'manger', 'nourriture', 'malade', 'sick', 'sickness', 'sicknesses', 'maladie', 'maladies', 'mal', 'ill', 'jouer', 'play'];
            if (!keywords.some(keyword => messageText.includes(keyword))) {
                const botMessage = {
                    _id: new Date().getTime() + 1,
                    text: "I only can answer questions about dogs. Sorry!",
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'Doggy Bot',
                        avatar: 'https://cdn.discordapp.com/attachments/763467509759475813/1185245997832618075/logo.png?ex=658ee95a&is=657c745a&hm=0fd9cfad820d82929d30812c7729db921bafa709a1a35e87a2278f89b120a978&',
                    }
                };
                setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
                return ;
            }

            const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
                prompt: `Hello, you are my assistant for my dog, and i have some questions about him: ${messageText}`,
                max_tokens: 150,
                temperature: 0.2,
                n: 1,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${chatGptApiKey}`,
                }
            });
            console.log(response.data);

            const dogsResponse = response.data.choices[0].text.trim();
            const botMessage = {
                _id: new Date().getTime() + 1,
                text: dogsResponse,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Doggy Bot',
                    avatar: 'https://cdn.discordapp.com/attachments/763467509759475813/1185245997832618075/logo.png?ex=658ee95a&is=657c745a&hm=0fd9cfad820d82929d30812c7729db921bafa709a1a35e87a2278f89b120a978&',
                }   
            };

            setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
        } catch (error) {
            console.log(error);
        }
    };

    

    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: colors.purple, padding: 10, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, marginBottom: 5}}>
                <Image source={{uri: image}} style={{width: 150, height: 150}} />
            </View>            
            <GiftedChat 
                messages={messages}
                onSend={newMessage => handleSend(newMessage)}
                user={{ 
                    _id: 1,
                    avatar: userPhoto
                }}
            />
        </View>
    )
}

export default ChatBot;
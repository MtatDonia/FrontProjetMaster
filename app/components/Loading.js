import react from 'react';
import { View, StyleSheet, Image } from 'react-native';

const Loading = () => {
    return (
        <View style={styles.loadingContainer}>
            <Image source={require('../assets/gif/Loading.gif')} style={styles.loadingGif} />
        </View>
    )
}
export default Loading;

const styles = StyleSheet.create({
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
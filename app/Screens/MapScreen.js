import React from 'react';
//import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import TopBar from '../components/TopBar';
import BottomBarNavigator from '../components/BottomBarNavigator';
import colors from '/app/config/colors';

export default function App() {
  return (
    
    <SafeAreaView  style={{ flex: 1, backgroundColor: colors.light }}>
        {/* <TopBar />
          {<MapView
            style={styles.map}
            initialRegion={{
            latitude: 50.628814697265625,
            longitude: 3.0593159198760986,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{ latitude: 50.66089630126953, longitude: 3.154252767562866 }}
              title="Bois de warwammes"
            />
            <Marker
              coordinate={{ latitude: 50.693727, longitude: 3.078187 }}
              title="Promenade de bondues"
            />
            <Marker
              coordinate={{ latitude: 50.638268, longitude: 3.050247 }}
              title="La citadelle"
            />
          </MapView> }
        <BottomBarNavigator/> */}
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

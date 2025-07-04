import { View, Text, Image } from 'react-native';
import styles from '../styles';

const NoInternetScreen = () => {
  return (
    <View style={{ 
      flex: 1,
      backgroundColor: '#1a1a2e',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20
    }}>
      <View style={{
        backgroundColor: '#16213e',
        padding: 25,
        borderRadius: 15,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#0f3460',
        width: '100%'
      }}>
        <Text style={{
          fontSize: 24,
          color: '#e94560',
          fontWeight: 'bold',
          marginBottom: 10,
          fontFamily: 'bike',
          textAlign: 'center'
        }}>
          No Internet Connection
        </Text>
        <Text style={{
          fontSize: 16,
          color: '#f0f0f0',
          textAlign: 'center',
          marginBottom: 5
        }}>
          Please check your internet connection and try again
        </Text>
        <Text style={{
          fontSize: 40,
          marginTop: 10
        }}>
          📡
        </Text>
      </View>
    </View>
  );
};

export default NoInternetScreen;
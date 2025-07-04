import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import styles from './styles';
import { useState } from 'react';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import NoInternetScreen from './screens/NoInternetScreen';
import ResultsScreen from './screens/ResultsScreen';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as Network from 'expo-network';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  const [screen, setScreen] = useState('welcome');
  const [questions, setQuestions] = useState(null);
  const [surveyResults, setSurveyResults] = useState(null);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      const networkState = await Network.getNetworkStateAsync();
      setIsConnected(networkState.isConnected);
    };
    checkConnection();
  }, []);

  useEffect(() => {
    if (!isConnected) {
      setScreen('noInternet');
    }
  }, [isConnected]);

  const handleStartSurvey = () => {
    setScreen('home');
  };
  const [fontsLoaded] = useFonts({
    'bike': require('./assets/bike.otf'),
  });

  const handleCompleteSurvey = (results) => {
    setSurveyResults(results);
    setScreen('results');
  };

  const handleRetakeSurvey = () => {
    setSurveyResults(null);
    setScreen('home');
  };

  const handleBackToWelcome = () => {
    setSurveyResults(null);
    setScreen('welcome');
  };

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null;
  }

  const renderScreen = () => {
    switch (screen) {
      case 'welcome':
        return <WelcomeScreen onStartSurvey={handleStartSurvey} />;
      case 'home':
        return <HomeScreen onCompleteSurvey={handleCompleteSurvey} setQuestions={setQuestions} />;
      case 'results':
        return <ResultsScreen questions={questions} results={surveyResults} onRetakeSurvey={handleRetakeSurvey} onBackToWelcome={handleBackToWelcome} />;
      default:
        return <NoInternetScreen />;
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {renderScreen()}
    </View>
  );
}
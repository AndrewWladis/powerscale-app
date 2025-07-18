import { StatusBar } from 'expo-status-bar';
import { Text, View, Alert } from 'react-native';
import styles from './styles';
import { useState, useEffect } from 'react';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import NoInternetScreen from './screens/NoInternetScreen';
import ResultsScreen from './screens/ResultsScreen';
import CharacterExploreScreen from './screens/CharacterExploreScreen';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Network from 'expo-network';

export default function App() {
  const [screen, setScreen] = useState('welcome');
  const [questions, setQuestions] = useState(null);
  const [surveyResults, setSurveyResults] = useState(null);
  const [hasPlayedToday, setHasPlayedToday] = useState(false);
  const [checkingPlay, setCheckingPlay] = useState(true);
  const [isConnected, setIsConnected] = useState(true);

  const [fontsLoaded] = useFonts({
    'bike': require('./assets/bike.otf'),
  });

  // Check internet connectivity
  useEffect(() => {
    const checkConnectivity = async () => {
      try {
        const networkState = await Network.getNetworkStateAsync();
        setIsConnected(networkState.isConnected);
      } catch (error) {
        setIsConnected(false);
      }
    };

    // Initial check
    checkConnectivity();

    // Set up interval to check connectivity every 5 seconds
    const interval = setInterval(checkConnectivity, 5000);

    return () => clearInterval(interval);
  }, []);

  // Check if user has played today
  useEffect(() => {
    const checkIfPlayedToday = async () => {
      try {
        const lastPlayed = await AsyncStorage.getItem('lastPlayedDate');
        const today = new Date().toISOString().slice(0, 10);
        if (lastPlayed === today) {
          setHasPlayedToday(true);
        } else {
          setHasPlayedToday(false);
        }
      } catch (e) {
        setHasPlayedToday(false);
      } finally {
        setCheckingPlay(false);
      }
    };
    checkIfPlayedToday();
  }, []);

  const handleStartSurvey = () => {
    if (hasPlayedToday) {
      Alert.alert(
        "Come back tomorrow!",
        "You can only do today's showdown once per day."
      );
      return;
    }
    setScreen('home');
  };

  const handleCompleteSurvey = async (results) => {
    setSurveyResults(results);
    setScreen('results');
    // Store today's date as last played
    try {
      const today = new Date().toISOString().slice(0, 10);
      await AsyncStorage.setItem('lastPlayedDate', today);
      setHasPlayedToday(true);
    } catch (e) {}
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

  if (!fontsLoaded || checkingPlay) {
    return null;
  }

  // Show NoInternetScreen if no internet connection
  if (!isConnected) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <NoInternetScreen />
      </View>
    );
  }

  const renderScreen = () => {
    switch (screen) {
      case 'welcome':
        return <WelcomeScreen setQuestions={setQuestions} questions={questions} onStartSurvey={handleStartSurvey} hasPlayedToday={hasPlayedToday} setScreen={setScreen} />;
      case 'home':
        return <HomeScreen questions={questions} onCompleteSurvey={handleCompleteSurvey} setQuestions={setQuestions} />;
      case 'results':
        return <ResultsScreen questions={questions} results={surveyResults} onBackToWelcome={handleBackToWelcome} />;
      case 'characterExplore':
        return <CharacterExploreScreen setScreen={setScreen} />;
      case 'noInternet':
        return <NoInternetScreen />;
      default:
        return <WelcomeScreen onStartSurvey={handleStartSurvey} hasPlayedToday={hasPlayedToday} setScreen={setScreen} />;
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {renderScreen()}
    </View>
  );
}
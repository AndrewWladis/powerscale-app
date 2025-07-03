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
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  const [screen, setScreen] = useState('welcome');
  const [surveyResults, setSurveyResults] = useState(null);

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
        return <HomeScreen onCompleteSurvey={handleCompleteSurvey} onBackToWelcome={handleBackToWelcome} />;
      case 'results':
        return <ResultsScreen results={surveyResults} onRetakeSurvey={handleRetakeSurvey} onBackToWelcome={handleBackToWelcome} />;
      case 'noInternet':
        return <NoInternetScreen />;
      default:
        return <WelcomeScreen onStartSurvey={handleStartSurvey} />;
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {renderScreen()}
    </View>
  );
}
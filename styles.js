import { StyleSheet } from 'react-native';  

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1a1a2e',
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
      backgroundColor: '#16213e',
      borderRadius: 12,
      padding: 20,
      marginVertical: 10,
      borderWidth: 2,
      borderColor: '#0f3460',
    },
    featureCard: {
      backgroundColor: '#16213e',
      padding: 20,
      borderRadius: 15,
      marginBottom: 15,
      borderWidth: 2,
      borderColor: '#0f3460',
    },
    featureDescription: {
      fontSize: 14,
      color: '#f0f0f0',
      textAlign: 'center',
    },
    featureTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#e94560',
      marginBottom: 10,
      textAlign: 'center',
    },
    featuresContainer: {
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#e94560',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginVertical: 5,
    },
    buttonText: {
      color: '#f0f0f0',
      fontSize: 16,
      fontWeight: 'bold',
    },
    startButton: {
      backgroundColor: '#ff4757',
      padding: 15,
      borderRadius: 15,
      alignItems: 'center',
      marginBottom: 20,
      shadowColor: '#ff4757',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.4,
      shadowRadius: 12,
      elevation: 8,
      borderWidth: 2,
      borderColor: '#ff6b7a',
    },
    startButtonText: {
      color: '#ffffff',
      fontSize: 30,
      fontWeight: '900',
      textAlign: 'center',
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
      letterSpacing: 1,
    },
    title: { 
      fontSize: 50, 
      fontWeight: 'bold', 
      color: '#e94560', 
      marginBottom: 15,
      fontFamily: 'bike',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: '#f0f0f0',
      textAlign: 'center',
      marginBottom: 20,
    },
    gameSubtitle: {
      fontSize: 16,
      color: '#f0f0f0',
      textAlign: 'center',
      marginBottom: 10,
    },
    questionNumber: {
      color: '#f0f0f0',
      fontSize: 25,
      fontWeight: 'bold',
    },
    progressPercentage: {
      color: '#e94560',
      fontSize: 25,
      fontWeight: '900',
    },
    optionsContainer: {
      borderRadius: 12,
      borderWidth: 2,
      borderColor: '#f0f0f0',
      overflow: 'hidden',
    },
    optionButton: {
      backgroundColor: '#16213e',
      height: 200,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    optionText: {
      fontSize: 30,
      color: '#f0f0f0',
      marginBottom: 3,
      fontFamily: 'bike',
    },
    universeText: {
      fontSize: 15,
      color: '#a8a8a8',
      fontStyle: 'italic',
    },
    resultText: {
      fontSize: 19,
      color: '#f0f0f0',
      marginBottom: 3,
    },
    resultPercentageText: {
      fontSize: 20,
      color: '#f0f0f0',
      fontWeight: 'bold',
    },
  });

  
export default styles;
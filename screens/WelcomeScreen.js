import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import styles from '../styles'
import React, { useEffect } from 'react'

const WelcomeScreen = ({ onStartSurvey, hasPlayedToday, setQuestions, setScreen }) => {
  useEffect(() => {
    fetch('https://gettodaymatches-7mlmcpjeua-uc.a.run.app')
    .then(response => response.json())
    .then(data => {
      setQuestions(data.data.pairs)
    })
    .catch(error => {
      console.error('Error fetching questions:', error)
    })
  }, [])

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#1a1a2e' }}>
      <View style={{ padding: 20, minHeight: '100%', marginTop: 20, justifyContent: 'center' }}>
        {/* Header */}
        <View style={{ alignItems: 'center', marginBottom: 30 }}>
          <Text style={styles.title}>
            POWER{'\n'}SCALER
          </Text>
          <Text style={{ fontSize: 18, color: '#f0f0f0', textAlign: 'center', marginBottom: 10 }}>
            Join the world's first and largest power scaling community!
          </Text>
        </View>

        {/* Start Button */}
        <TouchableOpacity
          style={[
            styles.startButton,
            hasPlayedToday && { backgroundColor: '#666', borderColor: '#888' }
          ]}
          onPress={hasPlayedToday ? () => {
            Alert.alert(
              "Come back tomorrow!",
              "You can only do today's showdown once per day."
            );
          } : onStartSurvey}
          activeOpacity={hasPlayedToday ? 1 : 0.7}
          disabled={false}
        >
          <Text style={[styles.startButtonText, { fontFamily: 'bike' }]}>
            {hasPlayedToday ? 'COME BACK\nTOMORROW' : 'TODAY\'S\nSHOWDOWN'}
          </Text>
        </TouchableOpacity>

        {/* Character Explorer Button */}
        <TouchableOpacity
          style={[styles.characterExploreButton, { marginBottom: 20 }]}
          onPress={() => setScreen('characterExplore')}
          activeOpacity={0.7}
        >
          <Text style={styles.characterExploreButtonText}>Explore Characters</Text>
        </TouchableOpacity> 
        {/* Features */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>
              🎯 5 Epic Showdowns
            </Text>
            <Text style={styles.featureDescription}>
              Pick your side in the most heated debates that have divided the power scaling community for years!
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>
              📊 Super Stats
            </Text>
            <Text style={styles.featureDescription}>
              See your favorite characters' power scaling stats and see how they compare to others!
            </Text>
          </View>
        </View>

        
        <View style={{ marginBottom: 30 }}>
          {/* Sample Questions Preview
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#f0f0f0', marginBottom: 15, textAlign: 'center' }}>
            The Battles That Started Wars:
          </Text>
          <View style={{
            backgroundColor: '#16213e',
            padding: 15,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#0f3460'
          }}>
            <Text style={{ fontSize: 14, color: '#a8a8a8', fontStyle: 'italic', textAlign: 'center' }}>
              "Who would win in a fight: Goku vs Superman?"
            </Text>
          </View>
          <View style={{
            backgroundColor: '#16213e',
            padding: 15,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#0f3460',
            marginTop: 10
          }}>
            <Text style={{ fontSize: 14, color: '#a8a8a8', fontStyle: 'italic', textAlign: 'center' }}>
              "Who is stronger: Saitama vs Thanos?"
            </Text>
          </View> */}

<Text style={{ fontSize: 14, color: '#a8a8a8', fontStyle: 'italic', textAlign: 'center', marginTop: 10 }}>
  All character names and trademarks are the property of their respective owners. This app is not affiliated with Marvel, DC, or any publisher.
  </Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default WelcomeScreen 
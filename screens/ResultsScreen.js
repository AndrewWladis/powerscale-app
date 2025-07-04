import { View, Text, TouchableOpacity, ScrollView, Share } from 'react-native'
import React from 'react'
import styles from '../styles'

const ResultsScreen = ({ results, onBackToWelcome, questions }) => {
  const surveyQuestions = questions;
  // Early return if no questions or results
  if (!surveyQuestions.length || !results) {
    console.log(surveyQuestions)
    return (
      <View style={{ flex: 1, backgroundColor: '#1a1a2e', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#f0f0f0', fontSize: 18 }}>Loading results...</Text>
      </View>
    );
  }

  const getAgreementScore = () => {
    let totalAgreement = 0
    Object.keys(results.answers).forEach(questionIndex => {
      const userAnswer = results.answers[questionIndex]
      const question = surveyQuestions[questionIndex]
      const totalVotes = question.votesA + question.votesB
      
      if (userAnswer === 'A') {
        totalAgreement += (question.votesA / totalVotes) * 100
      } else {
        totalAgreement += (question.votesB / totalVotes) * 100
      }
    })
    return totalAgreement
  }

  const averageAgreement = getAgreementScore()
  const overallPercentage = Math.round(averageAgreement / results.totalQuestions)

  const getScoreMessage = () => {
    if (overallPercentage >= 80) return "Community Consensus Master! 🏆"
    if (overallPercentage >= 60) return "Popular Opinion Leader! ⚡"
    if (overallPercentage >= 40) return "Controversial Thinker! 🔥"
    return "Rebel Scaler! 🌱"
  }

  const getScoreColor = () => {
    if (overallPercentage >= 80) return "#4CAF50"
    if (overallPercentage >= 60) return "#FF9800"
    if (overallPercentage >= 40) return "#FFC107"
    return "#F44336"
  }

  const getAgreementPercentage = (questionIndex, userAnswer) => {
    const question = surveyQuestions[questionIndex]
    const totalVotes = question.votesA + question.votesB
    
    if (userAnswer === 'A') {
      return Math.round((question.votesA / totalVotes) * 100)
    } else {
      return Math.round((question.votesB / totalVotes) * 100)
    }
  }

  const getAgreementColor = (percentage) => {
    if (percentage >= 80) return "#4CAF50"
    if (percentage >= 60) return "#FF9800"
    if (percentage >= 40) return "#FFC107"
    return "#F44336"
  }

  const handleShare = async () => {
    try {
      const shareMessage = `🎯 Powerscaler Results:\n ${overallPercentage}% community agreement!\n\n` +
        `My power scaling opinions:\n` +
        Object.keys(results.answers).map((questionIndex) => {
          const question = surveyQuestions[questionIndex]
          const userAnswer = results.answers[questionIndex]
          const agreementPercentage = getAgreementPercentage(questionIndex, userAnswer)
          return `• ${userAnswer === 'A' ? question.optionA : question.optionB} beats ${userAnswer === 'A' ? question.optionB : question.optionA} (${agreementPercentage}% agree)`
        }).join('\n') +
        `\n\nPowerscaler now available on iOS!`

      await Share.share({
        message: shareMessage,
        title: 'My Powerscaler Results'
      })
    } catch (error) {
      console.error('Error sharing:', error)
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#1a1a2e' }}>
      <View style={{ padding: 20, minHeight: '100%' }}>
        {/* Score Card */}
        <View style={{
          backgroundColor: '#16213e',
          padding: 25,
          borderRadius: 15,
          marginTop: 35,
          marginBottom: 10,
          alignItems: 'center',
          borderWidth: 2,
          borderColor: '#0f3460'
        }}>
          <Text style={{ fontSize: 48, fontWeight: 'bold', color: getScoreColor(), marginBottom: 10 }}>
            {overallPercentage}%
          </Text>
          <Text style={{ fontSize: 20, color: '#f0f0f0', marginBottom: 5 }}>
            Average community agreement
          </Text>
        </View>
        <Text style={{ fontSize: 16, color: '#f0f0f0', textAlign: 'center' }}>
          See how your opinions align with the power scaling community!
        </Text>

        {/* Detailed Results */}
        <View style={{ marginBottom: 20, marginTop: 10 }}>
          {Object.keys(results.answers).map((questionIndex) => {
            const question = surveyQuestions[questionIndex]
            const userAnswer = results.answers[questionIndex]
            const agreementPercentage = getAgreementPercentage(questionIndex, userAnswer)
            const agreementColor = getAgreementColor(agreementPercentage)
            
            return (
              <View key={questionIndex} style={{
                backgroundColor: '#16213e',
                padding: 15,
                borderRadius: 10,
                marginBottom: 10,
                borderLeftWidth: 4,
                borderLeftColor: agreementColor
              }}>
                <Text style={styles.resultText}>
                  <Text style={{ fontWeight: 'bold', fontFamily: 'bike' }}>{userAnswer === 'A' ? question.optionA : question.optionB}</Text> beats <Text style={{ fontWeight: 'bold', fontFamily: 'bike' }}>{userAnswer === 'A' ? question.optionB : question.optionA}</Text>
                </Text>
                <Text style={[styles.resultPercentageText, { color: agreementColor }]}>
                  {agreementPercentage}% of people agree with you
                </Text>
              </View>
            )
          })}
        </View>

        {/* Action Buttons */}
        <View style={{ gap: 15 }}>

          <TouchableOpacity
            style={{
              backgroundColor: '#0f3460',
              padding: 18,
              borderRadius: 10,
              alignItems: 'center'
            }}
            onPress={handleShare}
            activeOpacity={0.7}
          >
            <Text style={{ color: '#f0f0f0', fontSize: 18, fontWeight: 'bold' }}>
              Share Results
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: '#16213e',
              padding: 18,
              borderRadius: 10,
              alignItems: 'center',
              borderWidth: 2,
              borderColor: '#0f3460'
            }}
            onPress={onBackToWelcome}
            activeOpacity={0.7}
          >
            <Text style={{ color: '#f0f0f0', fontSize: 18, fontWeight: 'bold' }}>
              Back to Welcome
            </Text>
          </TouchableOpacity>
        </View>

        {/* Disclaimer */}
        <View style={{ marginTop: 30, padding: 15, backgroundColor: '#0f3460', borderRadius: 10 }}>
          <Text style={{ fontSize: 12, color: '#a8a8a8', textAlign: 'center', fontStyle: 'italic' }}>
            Note: Power scaling is highly subjective and varies across different interpretations, 
            storylines, and power systems. These results show community consensus, not objective truth!
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default ResultsScreen 
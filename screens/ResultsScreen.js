import { View, Text, TouchableOpacity, ScrollView, Share } from 'react-native'
import React, { useEffect } from 'react'
import styles from '../styles'

const ResultsScreen = ({ results, onBackToWelcome, questions }) => {
  // Early return if no questions or results
  if (!questions.length || !results) {
    console.log(questions)
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
      const question = questions[questionIndex]
      const totalVotes = question.character1Votes + question.character2Votes
      
      if (userAnswer === 'character1') {
        totalAgreement += (question.character1Votes / totalVotes) * 100
      } else {
          totalAgreement += (question.character2Votes / totalVotes) * 100
      }
    })
    return totalAgreement
  }

  const averageAgreement = getAgreementScore()
  const overallPercentage = Math.round(averageAgreement / results.totalQuestions)

  const getScoreColor = () => {
    if (overallPercentage >= 80) return "#4CAF50"
    if (overallPercentage >= 60) return "#FF9800"
    if (overallPercentage >= 40) return "#FFC107"
    return "#F44336"
  }

  const getAgreementPercentage = (questionIndex, userAnswer) => {
    const question = questions[questionIndex]
    const totalVotes = question.character1Votes + question.character2Votes
    
    if (userAnswer === 'character1') {
      return Math.round((question.character1Votes / totalVotes) * 100)
    } else {
      return Math.round((question.character2Votes / totalVotes) * 100)
    }
  }

  const getAgreementColor = (percentage) => {
    if (percentage >= 80) return "#4CAF50"
    if (percentage >= 60) return "#FF9800"
    if (percentage >= 40) return "#FFC107"
    return "#F44336"
  }

  useEffect(() => {
fetch("https://updatevotes-7mlmcpjeua-uc.a.run.app/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        votes: [
          { pairNumber: 1, winner: results.answers[0] },
          { pairNumber: 2, winner: results.answers[1] },
          { pairNumber: 3, winner: results.answers[2] },
          { pairNumber: 4, winner: results.answers[3] },
          { pairNumber: 5, winner: results.answers[4] }
        ]
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Votes successfully sent:", data);
      })
      .catch(error => {
        console.error("Error sending votes:", error);
      });
    
  }, [results])

  const handleShare = async () => {
    try {
      const shareMessage = `🎯 Powerscaler Results:\n ${overallPercentage}% community agreement!\n\n` +
        `My power scaling opinions:\n` +
        Object.keys(results.answers).map((questionIndex) => {
          const question = questions[questionIndex]
          const userAnswer = results.answers[questionIndex]
          const agreementPercentage = getAgreementPercentage(questionIndex, userAnswer)
          return `• ${userAnswer === 'character1' ? question.character1.name : question.character2.name} beats ${userAnswer === 'character1' ? question.character2.name : question.character1.name} (${agreementPercentage}% agree)`
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
      <View style={{ padding: 20, minHeight: '100%', marginTop: 40 }}>
        {/* Score Card */}
        <View style={{
          backgroundColor: '#16213e',
          padding: 25,
          borderRadius: 15,
          marginBottom: 10,
          alignItems: 'center',
          borderWidth: 2,
          borderColor: '#0f3460'
        }}>
          <Text style={{ fontSize: 48, fontWeight: '700', color: getScoreColor(), marginBottom: 10 }}>
            {100 - overallPercentage}%
          </Text>
          <Text style={{ fontSize: 20, color: getScoreColor(), marginBottom: 5, fontFamily: 'bike' }}>
            Hot Take Rating
          </Text>
        </View>
        <Text style={{ fontSize: 16, color: '#f0f0f0', textAlign: 'center' }}>
          See how your opinions align with the power scaling community!
        </Text>

        {/* Detailed Results */}
        <View style={{ marginBottom: 20, marginTop: 10 }}>
          {Object.keys(results.answers).map((questionIndex) => {
            const question = questions[questionIndex]
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
                  <Text style={{ fontWeight: 'bold', fontFamily: 'bike' }}>{userAnswer === 'character1' ? question.character1.name : question.character2.name}</Text> beats <Text style={{ fontWeight: 'bold', fontFamily: 'bike' }}>{userAnswer === 'character1' ? question.character2.name : question.character1.name}</Text>
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
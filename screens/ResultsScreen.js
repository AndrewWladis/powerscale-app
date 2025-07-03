import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'

const ResultsScreen = ({ results, onRetakeSurvey, onBackToWelcome }) => {
  const surveyQuestions = [
    {
      id: 1,
      question: "Who would win in a fight?",
      optionA: "Goku",
      optionB: "Superman",
      universeA: "Dragon Ball",
      universeB: "DC Comics",
      correctAnswer: "A" // This is debatable, but for demo purposes
    },
    {
      id: 2,
      question: "Who is stronger?",
      optionA: "Saitama",
      optionB: "Thanos",
      universeA: "One Punch Man",
      universeB: "Marvel Comics",
      correctAnswer: "A"
    },
    {
      id: 3,
      question: "Who would emerge victorious?",
      optionA: "Naruto",
      optionB: "Ichigo",
      universeA: "Naruto",
      universeB: "Bleach",
      correctAnswer: "A"
    },
    {
      id: 4,
      question: "Who is more powerful?",
      optionA: "All Might",
      optionB: "All For One",
      universeA: "My Hero Academia",
      universeB: "My Hero Academia",
      correctAnswer: "B"
    },
    {
      id: 5,
      question: "Who would win this battle?",
      optionA: "Luffy",
      optionB: "Zoro",
      universeA: "One Piece",
      universeB: "One Piece",
      correctAnswer: "A"
    }
  ]

  const getScore = () => {
    let correct = 0
    Object.keys(results.answers).forEach(questionIndex => {
      const userAnswer = results.answers[questionIndex]
      const correctAnswer = surveyQuestions[questionIndex].correctAnswer
      if (userAnswer === correctAnswer) {
        correct++
      }
    })
    return correct
  }

  const score = getScore()
  const percentage = Math.round((score / results.totalQuestions) * 100)

  const getScoreMessage = () => {
    if (percentage >= 80) return "Power Scaling Master! 🏆"
    if (percentage >= 60) return "Skilled Power Scaler! ⚡"
    if (percentage >= 40) return "Novice Power Scaler! 🔥"
    return "Power Scaling Rookie! 🌱"
  }

  const getScoreColor = () => {
    if (percentage >= 80) return "#4CAF50"
    if (percentage >= 60) return "#FF9800"
    if (percentage >= 40) return "#FFC107"
    return "#F44336"
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#1a1a2e' }}>
      <View style={{ padding: 20, minHeight: '100%' }}>
        {/* Header */}
        <View style={{ alignItems: 'center', marginBottom: 30 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#e94560', marginBottom: 10 }}>
            Survey Results
          </Text>
          <Text style={{ fontSize: 16, color: '#f0f0f0', textAlign: 'center' }}>
            Here's how you performed on the PowerScale Survey!
          </Text>
        </View>

        {/* Score Card */}
        <View style={{
          backgroundColor: '#16213e',
          padding: 25,
          borderRadius: 15,
          marginBottom: 30,
          alignItems: 'center',
          borderWidth: 2,
          borderColor: '#0f3460'
        }}>
          <Text style={{ fontSize: 48, fontWeight: 'bold', color: getScoreColor(), marginBottom: 10 }}>
            {percentage}%
          </Text>
          <Text style={{ fontSize: 20, color: '#f0f0f0', marginBottom: 5 }}>
            {score} out of {results.totalQuestions} correct
          </Text>
          <Text style={{ fontSize: 18, color: getScoreColor(), fontWeight: 'bold', textAlign: 'center' }}>
            {getScoreMessage()}
          </Text>
        </View>

        {/* Detailed Results */}
        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#f0f0f0', marginBottom: 20, textAlign: 'center' }}>
            Your Answers
          </Text>
          
          {Object.keys(results.answers).map((questionIndex) => {
            const question = surveyQuestions[questionIndex]
            const userAnswer = results.answers[questionIndex]
            const isCorrect = userAnswer === question.correctAnswer
            
            return (
              <View key={questionIndex} style={{
                backgroundColor: '#16213e',
                padding: 15,
                borderRadius: 10,
                marginBottom: 10,
                borderLeftWidth: 4,
                borderLeftColor: isCorrect ? '#4CAF50' : '#F44336'
              }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#f0f0f0', marginBottom: 8 }}>
                  Question {parseInt(questionIndex) + 1}
                </Text>
                <Text style={{ fontSize: 14, color: '#a8a8a8', marginBottom: 8 }}>
                  {question.question}
                </Text>
                <Text style={{ fontSize: 14, color: '#f0f0f0', marginBottom: 3 }}>
                  Your answer: {userAnswer === 'A' ? question.optionA : question.optionB}
                </Text>
                <Text style={{ fontSize: 12, color: '#a8a8a8', fontStyle: 'italic', marginBottom: 5 }}>
                  {userAnswer === 'A' ? question.universeA : question.universeB}
                </Text>
                <Text style={{ 
                  fontSize: 12, 
                  color: isCorrect ? '#4CAF50' : '#F44336',
                  fontWeight: 'bold'
                }}>
                  {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                </Text>
              </View>
            )
          })}
        </View>

        {/* Action Buttons */}
        <View style={{ gap: 15 }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#e94560',
              padding: 18,
              borderRadius: 10,
              alignItems: 'center'
            }}
            onPress={onRetakeSurvey}
            activeOpacity={0.7}
          >
            <Text style={{ color: '#f0f0f0', fontSize: 18, fontWeight: 'bold' }}>
              Take Survey Again
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: '#0f3460',
              padding: 18,
              borderRadius: 10,
              alignItems: 'center'
            }}
            onPress={() => {
              // Share results functionality could be added here
              alert('Share functionality coming soon!')
            }}
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
            storylines, and power systems. These results are for entertainment purposes only!
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default ResultsScreen 
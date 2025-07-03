import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'

const HomeScreen = ({ onCompleteSurvey, onBackToWelcome }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})

  const surveyQuestions = [
    {
      id: 1,
      question: "Who would win in a fight?",
      optionA: "Goku",
      optionB: "Superman",
      universeA: "Dragon Ball",
      universeB: "Superman (2025)"
    },
    {
      id: 2,
      question: "Who is stronger?",
      optionA: "Saitama",
      optionB: "Thanos",
      universeA: "One Punch Man",
      universeB: "Avengers: Infinity War"
    },
    {
      id: 3,
      question: "Who would emerge victorious?",
      optionA: "Naruto",
      optionB: "Ichigo",
      universeA: "Naruto",
      universeB: "Bleach"
    },
    {
      id: 4,
      question: "Who is more powerful?",
      optionA: "All Might",
      optionB: "All For One",
      universeA: "My Hero Academia",
      universeB: "My Hero Academia"
    },
    {
      id: 5,
      question: "Who would win this battle?",
      optionA: "Luffy",
      optionB: "Zoro",
      universeA: "One Piece",
      universeB: "One Piece"
    }
  ]

  const handleAnswer = (answer) => {
    const newAnswers = { ...answers, [currentQuestion]: answer }
    setAnswers(newAnswers)
    
    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Survey completed
      const results = {
        totalQuestions: surveyQuestions.length,
        answers: newAnswers,
        completedAt: new Date().toISOString()
      }
      onCompleteSurvey(results)
    }
  }

  const getProgressPercentage = () => {
    return ((currentQuestion + 1) / surveyQuestions.length) * 100
  }

  const currentQ = surveyQuestions[currentQuestion]

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#1a1a2e' }}>
      <View style={{ padding: 20, minHeight: '100%' }}>
        {/* Header */}
        <View style={{ alignItems: 'center', marginBottom: 30 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#e94560', marginBottom: 10 }}>
            PowerScale Survey
          </Text>
          <Text style={{ fontSize: 16, color: '#f0f0f0', textAlign: 'center' }}>
            Who is stronger? Test your knowledge of fictional character power levels!
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={{ marginBottom: 30 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <Text style={{ color: '#f0f0f0', fontSize: 16 }}>
              Question {currentQuestion + 1} of {surveyQuestions.length}
            </Text>
            <Text style={{ color: '#e94560', fontSize: 16, fontWeight: 'bold' }}>
              {Math.round(getProgressPercentage())}%
            </Text>
          </View>
          <View style={{ height: 8, backgroundColor: '#16213e', borderRadius: 4 }}>
            <View 
              style={{ 
                height: 8, 
                backgroundColor: '#e94560', 
                borderRadius: 4, 
                width: `${getProgressPercentage()}%` 
              }} 
            />
          </View>
        </View>

        {/* Question */}
        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#f0f0f0', textAlign: 'center' }}>
            {currentQ.question}
          </Text>
        </View>

        {/* Options */}
        <View style={{ gap: 15 }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#16213e',
              padding: 20,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: '#0f3460'
            }}
            onPress={() => handleAnswer('A')}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#e94560', marginBottom: 5 }}>
              Option A
            </Text>
            <Text style={{ fontSize: 16, color: '#f0f0f0', marginBottom: 3 }}>
              {currentQ.optionA}
            </Text>
            <Text style={{ fontSize: 12, color: '#a8a8a8', fontStyle: 'italic' }}>
              {currentQ.universeA}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: '#16213e',
              padding: 20,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: '#0f3460'
            }}
            onPress={() => handleAnswer('B')}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#e94560', marginBottom: 5 }}>
              Option B
            </Text>
            <Text style={{ fontSize: 16, color: '#f0f0f0', marginBottom: 3 }}>
              {currentQ.optionB}
            </Text>
            <Text style={{ fontSize: 12, color: '#a8a8a8', fontStyle: 'italic' }}>
              {currentQ.universeB}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Navigation */}
        <View style={{ gap: 10, marginTop: 30 }}>
          {currentQuestion > 0 && (
            <TouchableOpacity
              style={{
                backgroundColor: '#0f3460',
                padding: 15,
                borderRadius: 8,
                alignItems: 'center'
              }}
              onPress={() => setCurrentQuestion(currentQuestion - 1)}
            >
              <Text style={{ color: '#f0f0f0', fontSize: 16, fontWeight: 'bold' }}>
                Previous Question
              </Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            style={{
              backgroundColor: '#16213e',
              padding: 15,
              borderRadius: 8,
              alignItems: 'center',
              borderWidth: 2,
              borderColor: '#0f3460'
            }}
            onPress={onBackToWelcome}
          >
            <Text style={{ color: '#f0f0f0', fontSize: 16, fontWeight: 'bold' }}>
              Back to Welcome
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default HomeScreen
import { View, Text, TouchableOpacity, ScrollView, Alert, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from '../styles'

const HomeScreen = ({ onCompleteSurvey, setQuestions, questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})


  /*const surveyQuestions = [
    {
      id: 1,
      question: "Who would win in a fight?",
      optionA: "Goku",
      optionB: "Superman",
      universeA: "Dragon Ball",
      universeB: "Superman (2025)",
      votesA: 344,
      votesB: 234,
      imageA: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/11/goku-dragon-ball.jpg",
      imageB: "https://www.usatoday.com/gcdn/authoring/authoring-images/2025/01/07/USAT/77507566007-superman-exclusive.jpg"
    },
    {
      id: 2,
      question: "Who is stronger?",
      optionA: "Saitama",
      optionB: "Thanos",
      universeA: "One Punch Man",
      universeB: "Avengers: Infinity War",
      votesA: 101,
      votesB: 100,
      imageA: "https://christandpopculture.com/wp-content/uploads/2017/06/HorribleSubs-One-Punch-Man-05-1080p.mkv0079.jpg",
      imageB: "https://pyxis.nymag.com/v1/imgs/3d4/0aa/89125115b0e10b94e3378d484712450727-25-thanos.rsocial.w1200.jpg"
    },
    {
      id: 3,
      question: "Who would emerge victorious?",
      optionA: "Naruto",
      optionB: "Wally West",
      universeA: "Naruto",
      universeB: "DC Comics",
      votesA: 3422,
      votesB: 2321,
      imageA: "https://wallpapersok.com/images/hd/uzumaki-naruto-hd-p23c4c3xyjkcnp6r.jpg",
      imageB: "https://i.ytimg.com/vi/fk9MXzX7U4M/hq720.jpg"
    },
    {
      id: 4,
      question: "Who is more powerful?",
      optionA: "All Might",
      optionB: "All For One",
      universeA: "My Hero Academia",
      universeB: "My Hero Academia",
      votesA: 10,
      votesB: 123,
      imageA: "https://link-to-allmight-image.png",
      imageB: "https://link-to-allforone-image.png"
    },
    {
      id: 5,
      question: "Who would win this battle?",
      optionA: "Luffy",
      optionB: "Zoro",
      universeA: "One Piece",
      universeB: "One Piece",
      votesA: 123,
      votesB: 123,
      imageA: "https://link-to-luffy-image.png",
      imageB: "https://link-to-zoro-image.png"
    }
  ]*/

  const handleAnswer = (answer) => {
    const newAnswers = { ...answers, [currentQuestion]: answer }
    setAnswers(newAnswers)
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Survey completed
      const results = {
        totalQuestions: questions.length,
        answers: newAnswers,
        completedAt: new Date().toISOString()
      }
      onCompleteSurvey(results)
    }
  }

  const getProgressPercentage = () => {
    return ((currentQuestion + 1) / questions.length) * 100
  }

  const currentQ = questions[currentQuestion]

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#1a1a2e' }}>
      <View style={{ padding: 20, minHeight: '100%', marginTop: 35 }}>
        <Text style={styles.gameSubtitle}>
            Who is stronger? Test your knowledge of fictional character power levels!
        </Text>
        {/* Progress Bar */}
        <View style={{ marginVertical: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <Text style={styles.questionNumber}>
              Question {currentQuestion + 1} of {questions.length}
            </Text>
            <Text style={styles.progressPercentage}>
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
        <View style={styles.optionsContainer}>
          <ImageBackground
            //source={{ uri: currentQ.character1.image }}
            source={{ uri: "" }}
            style={[styles.optionButton, { borderTopStartRadius: 12, borderTopEndRadius: 12, borderBottomWidth: 3, borderBottomColor: '#f0f0f0', overflow: 'hidden'}]}
            imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
          >
            <TouchableOpacity
              style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
              onPress={() => handleAnswer("character1")}
              activeOpacity={0.7}
            >
              <Text style={styles.optionText}>{currentQ.character1.name}</Text>
              <Text style={styles.universeText}>{currentQ.character1.universe}</Text>
            </TouchableOpacity>
          </ImageBackground>

          <ImageBackground
            //source={{ uri: currentQ.character2.image }}
            source={{ uri: "" }}
            style={[styles.optionButton, { borderBottomStartRadius: 12, borderBottomEndRadius: 12, borderTopWidth: 0 }]}
            imageStyle={{ borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}
          >
            <TouchableOpacity
              style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 12, borderBottomRightRadius: 12, width: '100%', height: '99%' }}
              onPress={() => handleAnswer("character2")}
              activeOpacity={0.7}
            >
              <Text style={styles.optionText}>{currentQ.character2.name}</Text>
              <Text style={styles.universeText}>{currentQ.character2.universe}</Text>
            </TouchableOpacity>
          </ImageBackground>
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
        </View>
      </View>
    </ScrollView>
  )
}

export default HomeScreen
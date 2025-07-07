import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native'
import styles from '../styles'
import React, { useState, useEffect } from 'react'

const CharacterExploreScreen = ({ setScreen }) => {
  const [selectedUniverse, setSelectedUniverse] = useState(null)
  const [universes, setUniverses] = useState([])
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [charactersLoading, setCharactersLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch universes from endpoint
  useEffect(() => {
    fetch('https://getalluniverses-7mlmcpjeua-uc.a.run.app')
      .then(response => response.json())
      .then(data => {
        setUniverses(data.data.universes)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching universes:', error)
        setError('Failed to load universes')
        setLoading(false)
      })
  }, [])

  const getTierColor = (tier) => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return `#${randomColor}`;
  }

  const renderUniverseCard = (universeName) => {
    
    return (
      <TouchableOpacity
        key={universeName}
        style={[styles.universeCard, { borderColor: getTierColor() }]}
        onPress={() => {
          if (selectedUniverse === universeName) {
            setSelectedUniverse(null)
            setCharacters([])
          } else {
            setSelectedUniverse(universeName)
            setCharactersLoading(true)
            setCharacters([])
            
            // Fetch characters for the selected universe
            fetch(`https://getcharactersbyuniverse-7mlmcpjeua-uc.a.run.app?universe=${encodeURIComponent(universeName)}`)
              .then(response => response.json())
              .then(data => {
                if (data.success && data.data && data.data.characters) {
                  setCharacters(data.data.characters)
                } else {
                  setCharacters([])
                }
                setCharactersLoading(false)
              })
              .catch(error => {
                console.error('Error fetching characters:', error)
                setCharacters([])
                setCharactersLoading(false)
              })
          }
        }}
        activeOpacity={0.8}
      >
        <Text style={[styles.universeCardText, { color: getTierColor()}]}>
          {universeName}
        </Text>
      </TouchableOpacity>
    )
  }

  const renderCharacterCard = (character, index) => {
    const percentage = Math.round(character.rating / 10)
    
    return (
      <View key={index} style={[styles.featureCard, { marginBottom: 10 }]}>
        <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 8 }}>
          <Text style={styles.universeCardTitle}>
            {character.name || 'Unknown Character'}
          </Text>
        </View>
        <Text style={styles.universePowerRating}>
          Power Rating: {percentage}%
        </Text>
      </View>
    )
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#1a1a2e', paddingTop: 15 }}>
      <View style={{ padding: 20, minHeight: '100%', marginTop: 20 }}>
        {/* Header */}
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={styles.characterExploreTitle}>
            CHARACTER{'\n'}EXPLORER
          </Text>
          <Text style={{ fontSize: 18, color: '#f0f0f0', textAlign: 'center', marginTop: 10 }}>
            Discover legendary characters from across all universes!
          </Text>
        </View>

        {/* Back Button */}
        <TouchableOpacity
          style={[styles.button, { marginBottom: 20 }]}
          onPress={() => setScreen('welcome')}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>← Back to Welcome</Text>
        </TouchableOpacity>

        {/* Loading State */}
        {loading && (
          <View style={styles.featuresContainer}>
            <Text style={{ fontSize: 18, color: '#f0f0f0', textAlign: 'center' }}>
              Loading universes...
            </Text>
          </View>
        )}

        {/* Error State */}
        {error && (
          <View style={styles.featuresContainer}>
            <Text style={{ fontSize: 18, color: '#e94560', textAlign: 'center', marginBottom: 15 }}>
              {error}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setLoading(true)
                setError(null)
                fetch('https://getalluniverses-7mlmcpjeua-uc.a.run.app')
                  .then(response => response.json())
                  .then(data => {
                    setUniverses(data)
                    setLoading(false)
                  })
                  .catch(error => {
                    console.error('Error fetching universes:', error)
                    setError('Failed to load universes')
                    setLoading(false)
                  })
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Universes */}
        {!loading && !error && !selectedUniverse && (
          <View style={styles.featuresContainer}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#f0f0f0', marginBottom: 15, textAlign: 'center', fontFamily: 'bike' }}>
              SELECT A UNIVERSE:
            </Text>
            {universes.map(universeName => renderUniverseCard(universeName))}
          </View>
        )}

        {/* Characters */}
        {selectedUniverse && (
          <View>
            <TouchableOpacity
              style={[styles.button, { marginBottom: 20 }]}
              onPress={() => {
                setSelectedUniverse(null)
                setCharacters([])
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>← Back to Universes</Text>
            </TouchableOpacity>
            
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#f0f0f0', marginBottom: 15, textAlign: 'center' }}>
              {selectedUniverse} Characters:
            </Text>
            
            {/* Characters Loading State */}
            {charactersLoading && (
              <View style={styles.featuresContainer}>
                <Text style={{ fontSize: 18, color: '#f0f0f0', textAlign: 'center' }}>
                  Loading characters...
                </Text>
              </View>
            )}
            
            {/* Characters List */}
            {!charactersLoading && characters.length > 0 && (
              <View>
                {characters.map((character, index) => 
                  renderCharacterCard(character, index)
                )}
              </View>
            )}
            
            {/* No Characters State */}
            {!charactersLoading && characters.length === 0 && (
              <View style={styles.featuresContainer}>
                <Text style={{ fontSize: 18, color: '#a8a8a8', textAlign: 'center' }}>
                  No characters found for this universe.
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Footer */}
        <View style={{ marginTop: 30, marginBottom: 30 }}>
          <Text style={{ fontSize: 14, color: '#a8a8a8', fontStyle: 'italic', textAlign: 'center' }}>
            All character names and trademarks are the property of their respective owners. This app is not affiliated with Marvel, DC, or any publisher.
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default CharacterExploreScreen
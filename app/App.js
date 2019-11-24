import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions
} from 'react-native'
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'
import {Provider} from 'react-redux'
import {Provider as PaperProvider} from 'react-native-paper';
import ScaledImage from './scaled-image'
import store from './src/store.js'
import Index from './src/index.js'
import theme from './src/theme.js'

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <View style={{flex: 1, backgroundColor: '#282828', height: '100%'}}>
          <StatusBar barStyle="dark-content" />
          <Index />
        </View>
      </PaperProvider>
    </Provider>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
})

export default App

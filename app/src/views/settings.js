import React from 'react'
import {connect} from 'react-redux'
import RNFetchBlob from 'rn-fetch-blob'
import {ScrollView, View} from 'react-native'
import {Title, Text, Button, Subheading} from 'react-native-paper'
import {clientPaths} from '../lib/paths.js'
import packageJSON from '../../package.json'
import theme from '../theme.js'
import openUrl from '../lib/open-url.js'
import downloadAndInstall from '../lib/download-and-install.js'

const LinkButton = ({icon, children, url, mode = 'outlined', onPress, color = theme.colors.text}) => (
  <View style={{marginTop: 20}}>
    <Button icon={icon} mode={mode} color={color} onPress={() => onPress && onPress() || openUrl(url)}>
      {children}
    </Button>
  </View>
)

const restoreModelInfo = (props, client) => {
  RNFetchBlob
    .config({path: props[client + 'Path'] + 'files/asset/character/model_info.json'})
    .fetch('GET', `https://lokicoder.github.io/destiny-child-tools/data/model_info.${client.toLowerCase()}.json`)
    .then(() => alert('Successfully restored'))
    .catch(alert)
}

const Settings = props => {
  const {latestVersion} = props,
        hasLatestVersion = packageJSON.version == latestVersion
  return (
    <View padding={20}>
      <ScrollView>
        <Title>Settings</Title>
        <Text>Coming soon</Text>
        <Text></Text>
        <Subheading >Installed Clients:</Subheading  >
        <Text></Text>
        {Object.keys(clientPaths).map(client => 
          <View key={client}>
            <Text>
              {client}: {props[client + 'Path'] || 'not installed'} 
            </Text>
            <Button 
              mode="contained" 
              color="white"
              onPress={() => restoreModelInfo(props, client)}>
              Restore {client} model_info.json
            </Button>
            <Text></Text>
          </View>
        )}
        <Text></Text>
        <Text>App Version: v{packageJSON.version} {hasLatestVersion && '(latest)'}</Text>
        {!hasLatestVersion && 
          <LinkButton 
            icon="briefcase-download" 
            mode="contained" 
            onPress={() => downloadAndInstall(latestVersion)} 
            color={theme.colors.primary}>
            Install Latest (v{latestVersion})
          </LinkButton>
        }
        <LinkButton icon="bug" url={'https://github.com/LokiCoder/destiny-child-tools/issues'}>
          Open Issues
        </LinkButton>
        <LinkButton icon="note-text" url={'https://github.com/LokiCoder/destiny-child-tools/releases'}>
          Release Notes
        </LinkButton>
        <LinkButton icon="github-circle" url={'https://github.com/LokiCoder/destiny-child-tools'}>
          Source Code on GitHub
        </LinkButton>
        <View style={{marginTop: 40}}>
          <Subheading>Credits:</Subheading>
          <Text>Android App by LokiCoder</Text>
          <Text>Powered by https://lokicoder.github.io/destiny-child-tools/</Text>
          <Text>App icon from Eljoseto's Summoner Davi ahegao mod ❤️</Text>
          <Text>Mod creators are listed on each mod, though there is no guarantee that they did not borrow from or borrow on other people's work.</Text>
          <Text>This app and the site that powers it would not be possible without all the work and investigation of those that came before like the authors of the PCKTools package, the wonderful Discord modding communities, programmers like Arsylk, and many others.</Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default connect(
  state => {
    const props = {
      latestVersion: state.get('settings').get('latestVersion')
    }
    Object.keys(clientPaths).forEach(client => {
      props[client + 'Path'] = state.get('settings').get(client + 'Path')
    })
    return props
  }
)(Settings)


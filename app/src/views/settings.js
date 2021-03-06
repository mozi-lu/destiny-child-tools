import React from 'react'
import {connect} from 'react-redux'
import {ScrollView, View, Alert} from 'react-native'
import {Title, Text, Button, Subheading, Card, IconButton} from 'react-native-paper'
import packageJSON from '../../package.json'
import theme from '../theme.js'
import {installList} from '../actions/mod-lists'
import openUrl from '../lib/open-url.js'
import {restoreModelInfo} from '../actions/model-info'
import downloadAndInstall from '../lib/download-and-install.js'

const LinkButton = ({icon, children, url, mode = 'outlined', onPress, color = theme.colors.text,}) => (
  <View style={{marginTop: 20}}>
    <Button icon={icon} mode={mode} color={color} onPress={() => onPress && onPress() || openUrl(url)}>
      {children}
    </Button>
  </View>
)

const Settings = ({latestVersion, installPaths, installedClients, restoreModelInfo, modelInfoKr, modelInfoGlobal, installList}) => {
  const hasLatestVersion = packageJSON.version == latestVersion,
        getUncensorList = () => Object.keys(modelInfoGlobal).reduce((acc, id) => {
          if(modelInfoKr[id]) acc.push(id)
          return acc
        }, [])
  return (
    <View padding={20}>
      <ScrollView style={{marginBottom: 40}}>
        <Title>Settings</Title>
        <Text>Coming soon</Text>
        <Text></Text>
        <Subheading>Installed Clients:</Subheading>
        <Text></Text>
        {installedClients.map(client => {
          const installedPath = installPaths.get(client)
          return <Card key={client} style={{marginBottom: 20}}>
            <Card.Title title={`Destiny Child ${client}`} /> 
            <Card.Content>
              <Text style={{marginBottom: 20}}>{installedPath || 'not installed'}</Text>
              {installedPath &&
                <>
                  {client == 'Global' && <>
                    <Button 
                      mode="contained" 
                      // color="white"
                      onPress={() => Alert.alert(
                        'Apply uncensor patch?',
                        'This will overwrite all characters with the ones from the KR version of the game. Any mods currently installed will be over-written. \n\nNote that this may take a while depending on the speed of your internet connection.',
                        [
                          {text: 'Cancel', style: 'cancel'},
                          {text: 'Apply', onPress: () => installList(getUncensorList(), 'Uncensor Patch', true)}
                        ]
                      )}
                      style={{marginBottom: 20}}>
                      Apply Uncensor Patch
                    </Button>
                  </>}
                  <Title style={{marginBottom: 10}}>
                    model_info.json (positioning)
                  </Title>
                  <Button 
                    mode="contained" 
                    color="white"
                    onPress={() => restoreModelInfo(client)}
                    style={{marginBottom: 10}}>
                    Download from GitHub
                  </Button>
                  {/* <Button 
                    mode="contained" 
                    color="white"
                    onPress={() => createModelInfoBackup(props, client)}>
                    Create Local Backup
                  </Button> */}
                </>
              }
            </Card.Content>
          </Card>
        })}
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
        <View style={{marginTop: 40, marginBottom: 80}}>
          <Subheading>Credits:</Subheading>
          <Text>Android App by LokiCoder</Text>
          <Text>Powered by https://lokicoder.github.io/destiny-child-tools/</Text>
          <Text>App icon from Eljoseto's Summoner Davi ahegao mod ❤️</Text>
          <Text>Mod creators are listed on each mod, though there is no guarantee that they did not borrow from or build on other people's work.</Text>
          <Text>This app and the site that powers it would not be possible without all the work and investigation of those that came before like the authors of the PCKTools package, the wonderful Discord modding communities, security experts like Falzar, programmers like Arsylk, and many others.</Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default connect(
  state => {
    const installedClients = state.get('data').get('installedClients')
    return {
      latestVersion: state.get('settings').get('latestVersion'),
      installedClients,
      installPaths: state.get('data').get('installPaths'),
      modelInfoGlobal: state.get('data').get('model_info.global'),
      modelInfoKr: state.get('data').get('model_info.kr')
    }
  },
  {restoreModelInfo, installList}
)(Settings)


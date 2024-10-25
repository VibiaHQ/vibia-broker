import { XStack } from 'tamagui'
import { SelectList } from './SelectList';
import { useWorkspaces, useUserSettings } from '../lib/Session';
import { PanelMenu } from './PanelMenu';
import { MainPanel } from './MainPanel';
import { InteractiveIcon } from './InteractiveIcon'
import { Activity } from '@tamagui/lucide-icons'
import { atom, useAtom } from 'jotai';
import { useContext, useEffect, useState } from 'react'
import { atomWithStorage } from 'jotai/utils'
import { LogPanel } from './LogPanel'
import { API } from 'protobase'
import useSubscription from '../lib/mqtt/useSubscription'
import { AppConfContext, SiteConfigType } from "../providers/AppConf"
import { useWorkspace } from '../lib/useWorkspace';

const WorkspaceSelector = () => {
  const workspaces = useWorkspaces()
  const [settings, setSettings] = useUserSettings()

  return settings.workspace ? <SelectList
    triggerProps={{ o: 0.8, bc: "transparent", bw: 0 }}
    valueProps={{ o: 0.8 }}
    //@ts-ignore
    f={1}
    title={"workspaces"}
    value={settings.workspace}
    elements={workspaces}
    setValue={(v) => { setSettings({ ...settings, workspace: v }) }}
  /> : null
}

const initialLevels = ['info', 'warn', 'error', 'fatal']

export const AppState = atomWithStorage("adminPanelAppState", {
  logsPanelOpened: false,
  levels: initialLevels
})

export const RightPanelAtom = atom(20)



export const AdminPanel = ({ children }) => {
  const userSpaces = useWorkspaces()
  const [appState, setAppState] = useAtom(AppState)
  const SiteConfig = useContext<SiteConfigType>(AppConfContext);
  const { PanelLayout} = SiteConfig.layout

  const [rightPanelSize, setRightPanelSize] = useAtom(RightPanelAtom)

  const {message} = useSubscription('notifications/page/#')

  const [pages, setPages] = useState()

  const getPages = async () => {
    const pages = await API.get('/api/core/v1/pages')
    if(pages.isLoaded) {
      setPages(pages.data.items)
    }
  }

  useEffect(() => {
    getPages()
  }, [message])

  const getRightWidth = () => {
    const totalWidth = Math.max(400, window.innerWidth)
    let percentage = (400 / totalWidth) * 100;
    return percentage;
  }

  useEffect(() => {
    if (!rightPanelSize) {
      setRightPanelSize(getRightWidth())
    }
  }, [rightPanelSize])

  const workspaceData = useWorkspace({pages: pages})
  const settingsLogs = workspaceData?.logs
  const settingsLogsEnabled = settingsLogs === undefined ? true : settingsLogs

  // console.log('userSpaces: ', userSpaces, 'current Workspace: ', currentWorkspace)
  return rightPanelSize && <MainPanel 
  borderLess={true} 
  rightPanelSize={rightPanelSize} 
  setRightPanelSize={setRightPanelSize} 
  rightPanelStyle={{ marginRight: '20px', height: 'calc(100vh - 85px)', marginTop: '68px', backgroundColor: 'transparent' }} 
  rightPanelVisible={settingsLogsEnabled && appState.logsPanelOpened} 
  rightPanelResizable={true} 
  centerPanelContent={workspaceData && <PanelLayout
      topBar={
        <>
          <XStack ai="center">
            <XStack>{userSpaces.length > 1 && <WorkspaceSelector />}</XStack>
            {settingsLogsEnabled ? <InteractiveIcon onPress={() => setAppState({ ...appState, logsPanelOpened: !appState.logsPanelOpened })} IconColor="var(--color)" Icon={Activity}></InteractiveIcon> : null}
          </XStack>
        </>
      }
      menuContent={pages ? <PanelMenu workspace={workspaceData} />:<></>}
    >
      <XStack f={1} px={"$0"} flexWrap='wrap'>
        {children}
      </XStack>
    </PanelLayout>
  } rightPanelContent={settingsLogsEnabled ? <LogPanel AppState={AppState} /> : null} />
}
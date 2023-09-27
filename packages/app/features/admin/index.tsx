import { XStack } from 'tamagui'
import { PanelLayout } from '../../layout/PanelLayout'
import { PanelMenu } from './components/PanelMenu'
import { useRouter } from 'next/router';
import DBAdmin from './db';
import {getPendingResult, PendingAtomResult} from 'protolib';
import {atom, useSetAtom} from 'jotai'
import { useEffect } from 'react';

const menuData = {}
export const workspaceAtom = atom<PendingAtomResult>(getPendingResult("pending"))

export default function Admin({ workspace, children}) {
    const setCurrentWorkspace = useSetAtom(workspaceAtom)
    useEffect(() => setCurrentWorkspace(workspace), [workspace])

    return (<PanelLayout menuContent={<PanelMenu />}>
        <XStack f={1} px={"$4"} flexWrap='wrap'>
            {children}
        </XStack>
    </PanelLayout>)
}
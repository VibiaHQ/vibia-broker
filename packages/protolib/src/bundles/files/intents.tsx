import { Spinner, XStack, YStack, useTheme, Button, Text, Input, TextArea } from 'tamagui'
import React, { useEffect, useRef, useCallback, useState, useContext } from 'react';
import { useSearchParams, usePathname } from 'solito/navigation';
import { DataCard } from '../../components/DataCard'
import AsyncView from '../../components/AsyncView'
import { useFileFromAPI } from '../../lib/useFileFromAPI'
import { IconContainer } from '../../components/IconContainer'
import { Save, Workflow, Code, Ban, Check, X } from '@tamagui/lucide-icons';
import { useThemeSetting } from '@tamagui/next-theme'
// import GLTFViewer from '../../adminpanel/features/components/ModelViewer'
import { Monaco } from '../../components/Monaco'
import { IntentType } from '../../lib/Intent'
import Center from '../../components/Center'
import dynamic from 'next/dynamic'
import { API } from 'protobase';
import { usePrompt, promptCmd } from '../../context/PromptAtom';
import { useInterval, useUpdateEffect } from 'usehooks-ts';
import Flows from '../../adminpanel/features/components/Flows';
import { getDefinition, toSourceFile } from 'protonode/dist/lib/code'
import { ArrowFunction } from 'ts-morph';
import parserTypeScript from "prettier/parser-typescript.js";
import prettier from "prettier/standalone.js";
import { useEventEffect } from '../../bundles/events/hooks'
import { useTint } from '../../lib/Tints'
import { AppConfContext, SiteConfigType } from '../../providers/AppConf';
import { Tinted } from '../../components/Tinted';
import { useToastController } from '@my/ui';
import { getFlowsCustomSnippets } from "app/bundles/snippets"
import { getFlowsMenuConfig } from "app/bundles/flows"
import { getFlowMasks, getFlowsCustomComponents } from "app/bundles/masks"

const GLTFViewer = dynamic(() => import('../../adminpanel/features/components/ModelViewer'), {
  loading: () => <Center>
    <Spinner size={'large'} scale={3} top={-50} />
    Loading
  </Center>,
  ssr: false
})

const onGenerateSnippset = async (name, code, cb, onError) => {
  if (!code || !name) {
    onError("")
    return
  };
  const res = await API.post("/api/core/v1/flow/snippet", { name, code });
  if (res?.error) {
    onError(res?.error?.error)
    return
  }
  cb()
}

const JSONViewer = ({ extraIcons, name, path }) => {
  const [fileContent, setFileContent] = useFileFromAPI(path)
  console.log('file content: ', fileContent)
  const data = fileContent.isLoaded ? JSON.parse(fileContent.data) : ''
  return <AsyncView waitForLoading={1000} key={path} atom={fileContent}>
    <XStack f={1} width={'100%'}>
      <DataCard
        extraIcons={extraIcons}
        hideDeleteIcon={true}
        itemCardProps={{ topBarProps: { top: -10, backgroundColor: 'transparent' } }}
        minimal={true}
        f={1}
        backgroundColor={'transprent'}
        onDelete={() => { }}
        onSave={(content) => { }}
        json={data}
        name={name}
      />
    </XStack>
  </AsyncView>
}

type SaveButtonStates = "available" | "unavailable" | "loading" | "error"

const SaveButton = ({ checkStatus = () => true, defaultState = 'available', path, getContent, positionStyle, onSave = () => { } }) => {
  const [state, setState] = useState(defaultState)

  const onEvent = (event) => {
    setState(defaultState)
    onSave()
  }

  const onEventCrash = () => {
    setState("error")
  }

  useEventEffect(onEvent, { path: 'services/api-dev/start' })
  useEventEffect(onEventCrash, { path: 'services/api-dev/crash' })

  useInterval(() => {
    if (checkStatus() && state == 'unavailable') setState('available')
  }, 250)

  const _onSave = async () => {
    setState("loading")
    const content = getContent();
    await API.post('/api/core/v1/files/' + path.replace(/\/+/g, '/'), { content });
    if (!path.startsWith('/packages/app/bundles/custom/apis/')) {
      setState(defaultState)
      onSave()
    }
  };

  return (
    <XStack position="absolute" {...positionStyle}>
      {<IconContainer disabled={state == 'unavailable'} onPress={_onSave}>
        {state != 'error' && state !== 'loading' && <Save color="var(--color)" size={"$1"} />}
        {state == 'error' && <Ban color="var(--red10)" size={"$1"} />}
        {/*@ts-ignore*/}
        {state == "loading" && <Spinner color={"$color"} opacity={0.5} size={17} />}
      </IconContainer>}
    </XStack>
  );
};

const FlowsViewer = ({ extraIcons, path, isModified, setIsModified }) => {
  const [fileContent, setFileContent] = useFileFromAPI(path)
  const [newFileContent, setNewFileContent] = useState('')
  const [loaded, setLoaded] = useState(false)
  const isPartial = useRef(false)
  const sourceCode = useRef('')
  const originalSourceCode = useRef('')
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());
  const pathname = usePathname();
  const theme = useTheme()
  const tint = useTint().tint
  const toast = useToastController();

  const [promptResponse, setPromptResponse] = usePrompt(
    (prompt, total, image) => {
      const isGenerate = prompt.startsWith('/code')
      const prefix = `The user is viewing a sourceCode file named: ${path}. The content of the sourceFile is: ${sourceCode.current}`
      const suffix = isGenerate ? `
The user has generated a request to change the sourceCode content. You need to fulfill the request. Reply only with source code with prefix: [code] and nothing else. Your response will be used directly to replace the content of the sourceFile, but adaptaed to what the user requested.
For example, if the final code you decide to generate is "console.log('test');" then your anser should be [code]console.log('test');
Keep the original sourcecode comments when generating new code;
If you are unable to generate the source code (too ambiguous/unespecific/whaterver reason), explain why in natural language, but do not include [code] at the beginning.
Remember to generate a response for the request that is only sourceCode and prefixed with [code]. Your response will be used to feed another program, that expects just [code] and sourceCode.
If you include anything else in your message (like reasonings or natural language) it will be considered that you are rejecting the request, and the reasons will be shown to the user.
            `: ''
      return suffix + prefix
    },

    () => promptCmd({ cmd: '/code', format: "sourceCode", action: "generates a source code solution in source code format of the current file." }),
  )

  useUpdateEffect(() => {
    console.log('Response prompt: ', promptResponse)
    if (promptResponse.startsWith("[code]")) {
      console.log('Replacing code with updated code')
      const response = promptResponse.substring("[code]".length)
      setNewFileContent(response)
      sourceCode.current = response;
    }
  }, [promptResponse])

  useEffect(() => {
    if (fileContent.isLoaded) {
      const sourceFile = toSourceFile(fileContent.data)
      const definition = getDefinition(sourceFile, '"code"')
      if (definition && ArrowFunction.isArrowFunction(definition)) {
        sourceCode.current = definition.getBodyText()
        isPartial.current = true
      } else {
        isPartial.current = false
        sourceCode.current = fileContent.data
      }
      originalSourceCode.current = sourceCode.current
      setLoaded(true)
    }
  }, [fileContent]);

  const { resolvedTheme } = useThemeSetting()
  const [mode, setMode] = useState('flow')

  return <AsyncView atom={fileContent}>
    <XStack mt={30} f={1} width={"100%"}>
      {/* <Theme name={tint as any}> */}
      <XStack position="absolute" right={20} top={-32}>
        {mode == 'code' ? <IconContainer onPress={() => setMode('flow')}>
          {/* <SizableText mr={"$2"}>Save</SizableText> */}
          <Workflow color="var(--color)" size={"$1"} />
        </IconContainer> :
          <IconContainer onPress={() => setMode('code')}>
            {/* <SizableText mr={"$2"}>Save</SizableText> */}
            <Code color="var(--color)" size={"$1"} />
          </IconContainer>}
        <SaveButton
          onSave={() => originalSourceCode.current = sourceCode.current}
          checkStatus={() => sourceCode.current != originalSourceCode.current}
          defaultState={"unavailable"}
          path={path}
          getContent={() => {
            if (isPartial.current) {
              const sourceFile = toSourceFile(fileContent.data)
              const definition = getDefinition(sourceFile, '"code"').getBody()
              definition.replaceWithText("{\n" + sourceCode.current + "\n}");
              const code = prettier.format(sourceFile.getFullText(), {
                quoteProps: "consistent",
                plugins: [parserTypeScript],
                parser: "typescript"
              })
              if (code) {
                return code
              }
            }
            return sourceCode.current
          }}
          positionStyle={{ position: "relative" }}
        />
        {extraIcons}
      </XStack>
      {mode == 'code' ? <Monaco path={path} darkMode={resolvedTheme == 'dark'} sourceCode={newFileContent ? newFileContent : sourceCode.current} onChange={(code) => { sourceCode.current = code }} />
        : <Flows
          nodeMenu={({ nodeId, dumpFragment, closeMenu, updateFragment }) => {
            const [snippetName, setSnippetName] = useState();
            const [fragmentText, setFragmentText] = useState(dumpFragment());
            return (
              <YStack w={350} bg="$backgroundStrong" br="$6" p="$4" gap="$4" style={{ boxShadow: '0px 0px 33px 0px rgba(0, 0, 0, 0.1)' }} onPress={(e) => e.stopPropagation()}>
                <XStack f={1} jc="space-between" ai="center">
                  <Tinted>
                    <Text color={"$color7"} fontWeight={"500"}>Edit from code</Text>
                  </Tinted>
                  <XStack gap="$2">
                    <Button
                      backgroundColor={"transparent"}
                      hoverStyle={{
                        backgroundColor: "$color2",
                        borderColor: "$color8"
                      }}
                      color="$color8"
                      borderColor="$color8"
                      size="$3"
                      onPress={() => closeMenu()}
                    >
                      <X size={16} />
                    </Button>
                    <Tinted>
                      <Button disabled={!fragmentText} size="$3" onPress={() => { updateFragment(fragmentText); closeMenu() }}>
                        <Check size={16} fillOpacity={0} />
                      </Button>
                    </Tinted>
                  </XStack>
                </XStack>
                <YStack height={300}>
                  <Monaco
                    path={path}
                    darkMode={resolvedTheme == 'dark'}
                    sourceCode={fragmentText}
                    options={{
                      folding: false,
                      lineDecorationsWidth: 0,
                      lineNumbersMinChars: 0,
                      lineNumbers: false,
                      minimap: { enabled: false }
                    }}
                    onChange={(code) => { setFragmentText(code); }}
                  />
                </YStack>
                <XStack gap="$2">
                  <Input f={1} value={snippetName} size="$3" placeholder='Snippet name required to export...' onChange={(e) => {
                    // Only accepts alphabetical characters
                    const regex = /^[a-zA-Z]+$/;
                    // @ts-ignore 
                    const value = e.target?.value
                    if (regex.test(value) || value == '') {
                      setSnippetName(value);
                    }
                  }} />
                  <Tinted>
                    <Button
                      disabled={!snippetName}
                      size="$3"
                      color={!snippetName ? "$gray8" : "$color7"}
                      backgroundColor={"transparent"}
                      disabledStyle={{
                        borderColor: "$gray8",
                      }}
                      hoverStyle={{
                        backgroundColor: "$color2",
                        borderColor: "$color7"
                      }}
                      borderColor="$color7"
                      onPress={() => {
                        onGenerateSnippset(snippetName, fragmentText, closeMenu, (err = "") => {
                          toast.show("Error generating snippet", { message: err, duration: 3000 })
                        });
                      }}
                    >
                      Export
                    </Button>
                  </Tinted>
                </XStack>
              </YStack>
            )
          }}
          config={{ menu: getFlowsMenuConfig(pathname, query) }}
          isModified={isModified}
          rawCodeFromMenu={true}
          customComponents={getFlowsCustomComponents(pathname, query)}
          customSnippets={getFlowsCustomSnippets(pathname, query)}
          onEdit={(code) => { sourceCode.current = code }}
          setIsModified={setIsModified}
          setSourceCode={(sourceCode) => {
            sourceCode.current = sourceCode
          }} sourceCode={newFileContent ? newFileContent : sourceCode.current} path={path} themeMode={resolvedTheme} primaryColor={resolvedTheme == 'dark' ? theme[tint + '8'].val : theme[tint + '7'].val} />}
      <XStack opacity={0} top={-200000} position={"absolute"}>
        <Flows preload={true} primary={"#f00"} />
      </XStack>
      {/* </Theme> */}
    </XStack>
  </AsyncView>
}

const MonacoViewer = ({ path }) => {
  const [fileContent] = useFileFromAPI(path);
  const sourceCode = useRef('');
  const { resolvedTheme } = useThemeSetting();

  useEffect(() => {
    if (fileContent.isLoaded) {
      sourceCode.current = fileContent.data;
    }
  }, [fileContent]);

  const handleChange = useCallback((code) => {
    sourceCode.current = code;
  }, []);

  return (
    <AsyncView waitForLoading={1000} key={path} atom={fileContent}>
      <XStack mt={30} f={1} width={"100%"}>
        <SaveButton
          path={path}
          getContent={() => sourceCode.current}
          positionStyle={{ right: 55, top: -33 }}
        />
        <Monaco
          path={path}
          darkMode={resolvedTheme === 'dark'}
          sourceCode={fileContent.data}
          onChange={handleChange}
        />
      </XStack>
    </AsyncView>
  );
};
export const processFilesIntent = ({ action, domain, data }: IntentType) => {
  const { mime } = data
  const type = mime ? mime.split('/')[0] : 'text'
  const url = ('/api/core/v1/files/' + data.path).replace(/\/+/g, '/')
  if (mime == 'application/json') {
    return { component: <JSONViewer {...data} />, supportIcons: true }
  } else if (mime == 'application/javascript' || mime == 'video/mp2t') {
    return { component: <FlowsViewer {...data} />, supportIcons: true }
  } else if ((data.path).endsWith(".tsx")) {
    return { component: <FlowsViewer {...data} />, supportIcons: true }
  } else if (mime == 'model/gltf-binary') {
    return {
      component: <GLTFViewer path={url} />,
      widget: 'text'
    }
  } else if (type == 'text' || type == 'application') {
    return {
      component: <MonacoViewer path={data.path} />,
      widget: 'text'
    }
  } else if (type == 'image') {
    return { component: <img src={url} />, widget: 'image' }
  } else if (type == 'video') {
    return { component: <video src={url} controls />, widget: 'video' }
  } else if (type == 'audio') {
    return { component: <audio src={url} controls />, widget: 'audio' }
  }
}
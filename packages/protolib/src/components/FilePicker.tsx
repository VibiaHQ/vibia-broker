import { useState } from "react"
import { Button, Input, XStack, Spinner, Dialog, Text, InputProps } from "tamagui"
import { Folder } from '@tamagui/lucide-icons'
import { Tinted, } from './Tinted'
import { Center } from './Center'
import dynamic from 'next/dynamic'
import { useRouter, useSearchParams, usePathname } from 'solito/navigation';

const FileBrowser = dynamic<any>(() =>
    import('../adminpanel/next/components/FileBrowser').then(module => module.FileBrowser),
    { ssr: false, loading: () => <Tinted><Center><Spinner size='small' color="$color7" scale={4} /></Center></Tinted> }
);

type FilePickerProps = {
    onFileChange?: Function,
    file?: string,
    placeholder?: string
    initialPath?: string
    fileFilter?: Function,
    disabled?: boolean
}


export function FilePicker({ onFileChange, file, placeholder, initialPath = "", fileFilter, disabled }: FilePickerProps) {
    const router = useRouter()
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const query = Object.fromEntries(searchParams.entries());

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(file ?? initialPath)

    const [tmpFile, setTmpFile] = useState(file ?? initialPath)

    const fileIsUrl = file?.startsWith('http')

    const onChange = (val) => {
        if (onFileChange) {
            onFileChange(val)
        } else {
            setValue(val)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <XStack>
                <Input
                    placeholder={placeholder ?? "Path or URL"}
                    value={file ?? value}
                    onChangeText={(e) => onChange(e)}
                    f={1}
                    paddingRight={"50px"}
                    disabled={disabled}
                >
                </Input>
                <Dialog.Trigger >
                    <Button
                        position="absolute"
                        borderColor={"$color6"}
                        borderTopLeftRadius={"$0"}
                        borderBottomLeftRadius={"$0"}
                        disabled={disabled}
                        right={"$0"}
                        onPress={() => {
                            if (!fileIsUrl) {
                                const dirPath = file ? file.split('/').slice(0, -1).join('/') : initialPath
                                const newQuery = { ...query, path: dirPath };
                                const newSearchParams = new URLSearchParams(newQuery).toString();
                                router.replace(pathname + '?' + newSearchParams);
                            }
                            setOpen(!open)
                        }}
                        icon={<Folder fillOpacity={0} color="gray" size={15} />}>
                    </Button>
                </Dialog.Trigger>
            </XStack>
            <Dialog.Portal>
                <Dialog.Content height={"80vh"} width={"80vw"} padding="$6" >
                    <Tinted>
                        <Text fontWeight="bold" fontSize={30} color={"$color8"}>File Browser</Text>
                        <Text marginBottom="$4"> Selected file: <Text color={"$color7"} fontStyle="italic">{tmpFile}</Text></Text>
                    </Tinted>
                    <FileBrowser
                        onOpenFile={(file) => {
                            setOpen(false)
                            onChange(file.path)
                        }}
                        onChangeSelection={(f) => {
                            const pathFile = f[0]?.path
                            if (pathFile) {
                                setTmpFile(pathFile)
                            }
                        }}
                        fileFilter={fileFilter}
                        selection={tmpFile}
                    />
                    <XStack gap="$4" justifyContent="center" alignSelf="center" width={"100%"} maxWidth={"500px"}>
                        <Tinted>
                            <Button
                                f={1}
                                onPress={() => setOpen(false)}
                                backgroundColor={"transparent"}
                                borderWidth={2}
                                borderColor="$color6"
                                hoverStyle={{
                                    backgroundColor: "$color2",
                                    borderColor: "$color6",
                                    borderWidth: 2
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                f={1}
                                onPress={() => {
                                    setOpen(false)
                                    onChange(tmpFile)
                                }}>
                                Accept
                            </Button>
                        </Tinted>
                    </XStack>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    )
}
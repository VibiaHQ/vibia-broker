import { DeviceDefinitionModel } from ".";
import { AutoAPI } from 'protonode'
import { API } from 'protobase'
import { DevicesModel } from "../devices";

const initialData = {}

const onAfterCreate = async (data, session?, req?) => {
    if (data.device && session) {
        const objectDevice = DevicesModel.load({
            name: data.name + "1",
            currentSdk: data.sdk,
            deviceDefinition: data.name,
            environment: data.environment,
        })
        await API.post("/api/core/v1/devices?token=" + session.token, objectDevice.create().getData())
    }
}


export const DeviceDefinitionsAPI = AutoAPI({
    modelName: 'devicedefinitions',
    modelType: DeviceDefinitionModel,
    initialData,
    onAfterCreate: onAfterCreate,
    skipDatabaseIndexes: true,
    prefix: '/api/core/v1/',
    transformers: {
        getConfig: async (field, e, data) => {
            //get config from deviceBoard
            const deviceBoard = await API.get("/api/core/v1/deviceboards/" +encodeURI(data.board.name))
            data.config.sdkConfig = deviceBoard.data.config[data.sdk]
            return data
        }
    },
    useDatabaseEnvironment: false,
    useEventEnvironment: false
})
import { DeviceSdkModel } from ".";
import { AutoAPI } from 'protonode'

const initialData = {
    "1": {   
        "id": "1",
        "name": "esphome-arduino",
        "config":{
            "esphome":{}
        }
    },
    "2": {   
        "id": "2",
        "name": "esphome-idf",
        "config":{
            "esphome":{}
        }
    }
}

export const DeviceSdksAPI = AutoAPI({
    modelName: 'devicesdks',
    modelType: DeviceSdkModel,
    initialData,
    skipDatabaseIndexes: true,
    prefix: '/api/core/v1/',
    useDatabaseEnvironment: false,
    useEventEnvironment: false
})
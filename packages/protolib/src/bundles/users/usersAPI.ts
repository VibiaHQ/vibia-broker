import { UserModel } from "./";
import { AutoAPI, hash} from 'protonode'

export const UsersAPI = AutoAPI({
    modelName: 'accounts',
    modelType: UserModel,
    prefix: '/api/core/v1/',
    dbName: 'auth',
    transformers: {
        cypher: async (field, e, data) => {
            return {
                ...data,
                [field]: await hash(data[field])
            }
        },
    
        clearPassword: async(field, e, data) => {
            const {password, ...rest} = data
            return rest
        },
        
        update: async(field, e, data, prevData) => {
            if(!data.password) {
                data.password = prevData.password
            } else {
                data.password = await hash(data.password)
            }
            
            return data
        }
    },
    requiresAdmin: ['*'],
    useDatabaseEnvironment: false,
    useEventEnvironment: false
})
import { API } from "protobase";
import { getLogger } from "protobase";

const logger = getLogger()

export const getKey = async ({ key = '', done = (key) => {}, error = (err) => {}, token = '' }) => {
    if(!key) {
        error("No key provided")
        return
    }

    var urlEnch = '/adminapi/v1/keys/' + key

    if (token) {
        urlEnch = urlEnch + "?token=" + token
    }

    const result = await API.get(urlEnch)

    if (result.isError) {
        if (error) error(result.error?.error ?? result.error)
        return
    }

    if (done) done(result.data?.value)

    return result.data?.value
}

export default {
    getKey
}
import { getServiceToken } from "protonode";
import { API } from "protobase";

export const deviceAction = async (device, subsystem, action, value?, cb?, errorCb?) => {
    const url = `/api/core/v1/devices/${device}/subsystems/${subsystem}/actions/${action}/${value}?token=${getServiceToken()}`
    let result = await API.get(url)
    if (result.isError) {
        errorCb && errorCb()
        throw result.error
    }
    if (cb) cb(result.data)
    return result.data
}
export const forceUpdate = (payload) => {
    return {
        type: "UPDATE",
        payload: payload
    }
}
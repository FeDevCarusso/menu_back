export default function responses(bool, message, data) {
    const response = {}

    if (typeof bool === "boolean") response.bool = bool

    if (message) response.message = message

    if (data) response.data = data

    return response
};
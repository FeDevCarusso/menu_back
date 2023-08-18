import responses from "./responses.js"

export default function is_login(req, res) {
    const isAuthenticated = req.isAuthenticated()
    return res.status(!isAuthenticated ? 401 : 200).json(responses(isAuthenticated))
}

export async function validate_auth(req, res, next) {
    const isAuthenticated = req.isAuthenticated()
    if (!isAuthenticated) {
        return res.status(401).json(responses(isAuthenticated))
    }
    return next()
}
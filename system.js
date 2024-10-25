const isProduction = process.env.NODE_ENV === 'production';
const disableProdApi = false

const systemConfig = {
    compiledPort: 8080
}

const config = {
    "services": [
        {
            "name": "core",
            "description": "Core services for protofy",
            "route": (req, mode) => {
                const url = req.url.split('?')[0]
                const queryString = req.url.split('?')[1]
                const query = queryString ? queryString.split('&').reduce((acc, val) => {
                    const [key, value] = val.split('=')
                    acc[key] = value
                    return acc
                }, {}) : {}

                if (url.startsWith('/api/core/') || url == '/api/core') {
                    return process.env.ADMIN_API_URL ?? 'http://localhost:3002'
                } else if (url == '/websocket') {
                    if (query.env && (query.env == 'dev' || query.env == 'prod')) {
                        mode = query.env == 'dev' ? 'development' : 'production'
                    }
                    return process.env.WEBSOCKET_URL ?? 'http://localhost:' + (mode == 'production' && !disableProdApi ? 4003 : 3003)
                }
            }
        },
        {
            "name": "api",
            "description": "API services for protofy",
            "route": (req, mode) => {
                if (req.url.startsWith('/api/v1/') || req.url == '/api/v1') {
                    return process.env.API_URL ?? 'http://localhost:' + (mode == 'production' && !disableProdApi ? 4001 : 3001)
                }

                if (req.url.startsWith('/_dev/api/v1/') || req.url == '/_dev/api/v1') {
                    var target = process.env.API_URL ?? 'http://localhost:3001'
                    return target
                }
            }
        },
        {
            "name": "nextra",
            "disabled": true,
            "description": "Development mode of the documentation service, providing the documentation based on nextra",
            "route": (req, mode) => {
                if (req.url.startsWith('/documentation/') || req.url == '/documentation') {
                    return process.env.DOCS_SITE_URL ?? 'http://localhost:'+ (mode == 'production' ? 7700 : 7600)
                }
            }
        },
        {
            "name": "jupyter",
            "description": "Jupyter notebook for interactive computing",
            "disabled": true,
            "route": () => false
        },
        {
            "name": "python",
            "description": "Python integration services",
            "disabled": true,
            "route": (req, mode) => {
                if (req.url.startsWith('/pyapi/') || req.url == '/pyapi') {
                    return process.env.API_URL ?? 'http://localhost:5000'
                }
            }
        },
        {
            "name": "expo",
            "description": "Expo services, providing the mobile user interface based on expo",
            "disabled": true,
            "route": () => false
        },
        {
            "name": "next",
            "description": "Frontend services, providing the web user interface based on nextjs",
            "route": (req, mode) => process.env.SITE_URL ?? 'http://localhost:' + (mode == 'production' ? 8080 : 8000)
        }
    ],

    "alwaysCompiledPaths": [
        "/workspace/prod",
        "/workspace/dev/users",
        "/workspace/dev/groups",
        "/workspace/dev/keys",
        "/workspace/dev/events",
        "/workspace/dev/messages",
        "/workspace/dev/services",
        "/workspace/dev/databases",
        "/workspace/dev/objects",
        "/workspace/dev/pages",
        "/workspace/dev/apis",
        "/workspace/dev/stateMachines",
        "/workspace/dev/stateMachineDefinitions",
        "/workspace/dev/files",
        "/workspace/dev/resources",
        "/workspace/dev/databases",
        "/workspace/dev/devices",
        "/workspace/dev/deviceDefinitions",
    ],
    "redirectToCompiled": (req, res) => {
        const host = req.headers.host.split(':')[0]
        const port = systemConfig.compiledPort
        const url = req.url
        const redirectUrl = `http://${host}:${port}${url}`
        res.writeHead(302, {
            Location: redirectUrl
        })
        res.end()
    }
}

module.exports = config
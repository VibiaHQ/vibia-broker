import { Router, Inbox, Library, ToyBrick, Key, Cog, Database, DatabaseBackup, Bot } from '@tamagui/lucide-icons'

export default (pages) => {
    return {
        "default": "/workspace/pages",
        "label": "Workspace",
        "assistant": true,
        "logs": false,
        "menu": {
            "System": [
                { "name": "Users", "icon": "users", "type": "users", "path": "/" },
                { "name": "Groups", "icon": "groups", "type": "groups", "path": "/" },
                { "name": "Keys", "icon": Key, "type": "keys", "path": "/" },
                { "name": "Events", "icon": "activity", "type": "events", "path": "/" },
                { "name": "Messages", "icon": Inbox, "type": "messages", "path": "/" },
                { "name": "Services", "icon": Cog, "type": "services", "path": "/" },
                { "name": "Databases", "icon": Database, "type": "databases", "path": "/system" },
            ],
            "Content": [
                { "name": "Files", "icon": "folder", "type": "files", "path": "?path=/" },
                { "name": "Resources", "icon": Library, "type": "resources", "path": "/" },
                { "name": "Public", "icon": "doorOpen", "type": "files", "path": "?path=/apps/next/public" },
                { "name": "Databases", "icon": DatabaseBackup, "type": "databases", "path": "/" },
            ],
            "Fleets": [
                { "name": "Agents", "icon": Bot, "type": "agents", "path": "/" },
                { "name": "Devices", "icon": Router, "type": "devices", "path": "/" },
                { "name": "Definitions", "icon": "bookOpen", "type": "deviceDefinitions", "path": "/" }
            ]
        }
    }
}

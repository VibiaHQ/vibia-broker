import devicePages from './devices/adminPages'
import agentsPages from './agents/adminPages'
import filesPages from './files/adminPages'
import usersPages from './users/adminPages'
import groupsPages from './groups/adminPages'
import eventsPages from './events/adminPages'
import objectsPages from './objects/adminPages'
import messagesPages from './messages/adminPages'
import pagesPages from './pages/adminPages'
import apisPages from './apis/adminPages'
import databasesPages from './databases/adminPages'
import resourcesPages from './resources/adminPages'
import keysPages from './keys/adminPages'
import servicesPages from './services/adminPages'
import stateMachinePages from './stateMachines/adminPages'
import dashboardPages from './dashboard/adminPages'

export const AdminPagesBundles = {
    ...devicePages,
    ...agentsPages, 
    ...filesPages,
    ...usersPages,
    ...groupsPages,
    ...eventsPages,
    ...databasesPages,
    ...objectsPages,
    ...pagesPages,
    ...apisPages,
    ...messagesPages,
    ...resourcesPages,
    ...keysPages,
    ...servicesPages,
    ...stateMachinePages,
    ...dashboardPages
}

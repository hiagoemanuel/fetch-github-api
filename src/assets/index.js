import { getUser } from "./services/user.js"
import { getRepositories } from "./services/repositories.js"
import { getEvents } from "./services/events.js"

import { user } from "./objects/user.js"
import { screen } from "./objects/screen.js"

document.getElementById('btn-search').addEventListener('click', validateInput)
document.getElementById('input-search').addEventListener('keyup', e => e.key === 'Enter' ? validateInput() : e)

function validateInput() {
    const userSearch = document.getElementById('input-search').value
    userSearch.length === 0 ? alert('Preencha o campo com o nome do usuário do GitHub!') : getUserData(userSearch)
}

async function getUserData(userName) {
    try {
        const userResponse = await getUser(userName)
        const respositoriesResponse = await getRepositories(userName)
        const eventsResponse = await getEvents(userName)

        user.setInfo(userResponse)
        user.setRepositories(respositoriesResponse)
        user.setEvents(eventsResponse)

        console.log(user);
        
        screen.renderUser(user)
    } catch {
        screen.renderNotFound()
    }
}
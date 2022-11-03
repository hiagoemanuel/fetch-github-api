const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUserData(user) {
        // User

        this.userProfile.innerHTML =
            `<div class="info">
            <img src="${user.avatarURL}" alt="avatar user"/>
            <div class="data">
                <h1>${user.name ?? 'Não possui nome cadastrado :('}</h1>
                <p>${user.bio ?? 'Não possui bio cadastrada :('}</p>
                <h5>${user.followers} seguidores • ${user.following} seguindo</h5>
            </div>
        </div>`

        // Repositories

        let repositoriesItens = ''

        user.repositories.forEach(repo => repositoriesItens +=
            `<li>
                <a href="${repo.html_url}" target="_blank">
                    <p>${repo.name}</p>
                    <ul class="repo-info">
                        <li>🍴 ${repo.forks}</li>
                        <li>⭐ ${repo.stargazers_count}</li>
                        <li>👀 ${repo.watchers}</li>
                        <li>👨‍💻 ${repo.language ?? 'N/A'}</li>
                    </ul>
                </a>
            </li>`)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML +=
            `<div class="repositories section">
                <h2>Reposítórios</h2>
                <ul>${repositoriesItens}</ul>
            </div>`
        }

        // Events

        let eventsItens = ''

        user.events.forEach((event) =>{
            const pushEvent = event.payload.commits
            const createEvent = event.payload.description

            if (pushEvent) {
                eventsItens += `<li><h3>Push: ${event.repo.name}</h3><span>${event.payload.commits[0].message ?? '...'}</span></li>`
            } else if (createEvent) {
                eventsItens += `<li><h3>Create: ${event.repo.name}</h3><span>${event.payload.description ?? '...'}</span></li>`
            }
        })

        if (user.events.length > 0) {
            this.userProfile.innerHTML +=
            `<div class="events">
                <h2>Eventos</h2>
                <ul>${eventsItens}</ul>
            </div>`
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = '<h3>Usuário não encontrado</h3>'
    }
}

export { screen }
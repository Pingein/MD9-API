import { Data, Info, Character, Location, Origin, Episode, EpisodeData } from './assets/libs/interfaces'
import { createElement, removeChildNodes } from './assets/libs/helper'

const card_container = document.getElementById('card-container')

fetch('https://rickandmortyapi.com/api/character?page=1')
                .then((response) => response.json())
                .then((data) => processData(data))

                
const processData = (data:Data) => {
    let info:Info = data.info
    let characters:Character[] = data.results
    console.log(data)

    document.querySelector<HTMLDivElement>('.next') && document.querySelector<HTMLDivElement>('.next').remove()
    document.querySelector<HTMLDivElement>('.previous') && document.querySelector<HTMLDivElement>('.previous').remove()

    if (info.next) {
        let next_page_btn = createElement('div', 'page-btn next', '>')
        
        next_page_btn.addEventListener('click', () => {
            removeChildNodes(document.getElementById('card-container'))

            fetch(info.next).then((response) => response.json())
                            .then((data) => processData(data))
        })
        document.body.appendChild(next_page_btn)
    }

    if (info.prev) {
        let prev_page_btn = createElement('div', 'page-btn previous', '<')
        
        prev_page_btn.addEventListener('click', () => {
            removeChildNodes(document.getElementById('card-container'))

            fetch(info.prev).then((response) => response.json())
                            .then((data) => processData(data))
        })
        document.body.appendChild(prev_page_btn)
    }

    for (let character_id in characters) {
        createCharacterCard(characters[character_id])
    }
}


const createCharacterCard = (character:Character) => {
    fetch(character.episode[0]).then((result) => result.json())
                                .then((data) => {
                                    let episode_container = createElement('div', 'character__episode-container')
                                    episode_container.appendChild(createElement('span', 'information', 'First seen in:'))
                                    episode_container.appendChild(createElement('p', 'character__first-seen-in', data.name))
                                    character_card.appendChild(episode_container)
                                })
    let status_color
    if (character.status === 'Dead') {
        status_color = 'red'
    } else if (character.status === 'Alive') {
        status_color = 'green'
    } else {
        status_color = 'white'
    }

    let character_card = createElement('div', 'character card')

    let name_container = createElement('div', 'character__name-container')
    name_container.appendChild(createElement('h2', 'character__name', character.name))
    
    let status_container = createElement('div', 'character__status-container')
    status_container.appendChild(createElement('span', `indicator ${status_color}`, '•'))
    status_container.appendChild(createElement('p', 'character__status status', character.status))
    status_container.appendChild(createElement('span', 'status', '-'))
    status_container.appendChild(createElement('p', 'character__species status', character.species))

    let location_container = createElement('div', 'character__location-container')
    location_container.appendChild(createElement('span', 'information', 'Originated from:'))
    location_container.appendChild(createElement('p', 'character__location', character.origin.name))

    character_card.appendChild(name_container)
    character_card.appendChild(createElement('img', 'character__image') as HTMLImageElement).src=character.image
    character_card.appendChild(status_container)
    character_card.appendChild(location_container)

    card_container.appendChild(character_card)
}
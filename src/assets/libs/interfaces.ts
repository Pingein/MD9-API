interface Data {
    info: Info
    results: Character[]
}

interface Info {
    count: number
    next: string
    pages: number
    prev: string
}

interface Character {
    created: string | Date
    episode: string[]
    gender: 'Male' | 'Female'
    id: number
    image: string
    location: Location
    name: string
    origin: Origin
    species: string
    status: 'Alive' | 'Dead' | 'unknown'
    type: string
    url: string
}

interface Location {
    name: string
    url: string
}

interface Origin {
    name: string
    url: string
}

interface EpisodeData {
    id: number
    name: string
    air_date: string | Date
    episode: string
    characters: string[]
}

interface Episode {
    link: string
    ep_name: string
}


export { Data, Info, Character, Location, Origin, EpisodeData, Episode }
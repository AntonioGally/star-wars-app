import axios from "axios";

export const swapiInstance = axios.create({
    baseURL: 'https://swapi.dev/api/',
    timeout: 10000,
})

export const databankInstance = axios.create({
    baseURL: 'https://starwars-databank-server.vercel.app/api/v1/',
    timeout: 10000,
})
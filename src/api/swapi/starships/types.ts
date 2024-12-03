export interface Starship {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    hyperdrive_rating: string;
    MGLT: string;
    starship_class: string;
    pilots: string[]; // URLs to people
    films: string[]; // URLs to films
    created: string; // ISO date string
    edited: string; // ISO date string
    url: string; // URL to this resource
}
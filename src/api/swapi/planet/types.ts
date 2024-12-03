export interface Planet {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    residents: string[]; // Array of URLs to residents
    films: string[]; // Array of URLs to films
    created: string; // ISO date string
    edited: string; // ISO date string
    url: string; // URL to the planet's resource
}
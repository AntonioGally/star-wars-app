export interface Species {
    name: string;
    classification: string;
    designation: string;
    average_height: string;
    skin_colors: string;
    hair_colors: string;
    eye_colors: string;
    average_lifespan: string;
    homeworld: string; // URL to planet
    language: string;
    people: string[]; // URLs to people
    films: string[]; // URLs to films
    created: string; // ISO date string
    edited: string; // ISO date string
    url: string; // URL to this resource
}

export function formatDescription(description: string) {
    if (description.length > 100) {
        return description.substring(0, 100) + '...';
    }
    return description;
}
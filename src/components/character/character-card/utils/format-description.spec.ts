import { formatDescription } from './format-description';

describe('formatDescription', () => {
    it('should return the original description if it is 100 characters or less', () => {
        const description = 'A short description';
        expect(formatDescription(description)).toBe(description);
    });

    it('should truncate the description to 100 characters and add ellipsis if it is longer than 100 characters', () => {
        const longDescription = 'A'.repeat(101);
        expect(formatDescription(longDescription)).toBe('A'.repeat(100) + '...');
    });

    it('should handle exactly 100 characters without truncation', () => {
        const description = 'A'.repeat(100);
        expect(formatDescription(description)).toBe(description);
    });

    it('should handle an empty description', () => {
        const description = '';
        expect(formatDescription(description)).toBe(description);
    });
});
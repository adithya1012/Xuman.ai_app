/** Creator categories; the backend will own this list eventually. */
export const CATEGORIES = ['Design', 'Business', 'Health', 'Music', 'Tech', 'Cooking'] as const;

export type Category = (typeof CATEGORIES)[number];

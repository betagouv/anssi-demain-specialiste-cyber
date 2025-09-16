export const sequences = ['heure', 'demi-journee', 'journee'] as const;
export type Sequence = typeof sequences[number]

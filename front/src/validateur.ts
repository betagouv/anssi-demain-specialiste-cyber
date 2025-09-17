export interface Validateur<T> {
  estValide(t: T): boolean;
  valide(t: T): Partial<Record<keyof T, string>>;
}

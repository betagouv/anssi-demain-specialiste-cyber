export class EntrepotMemoire<T> {
  entites: T[] = [];

  async ajoute(entite: T): Promise<void> {
    return new Promise((resolve) =>
      setTimeout(() => {
        this.entites.push(entite);
        resolve(undefined);
      }, 10),
    );
  }

  async tous() {
    return [...this.entites];
  }

  taille = async () => this.entites.length;
}

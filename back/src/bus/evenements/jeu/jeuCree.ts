export class JeuCree {
  constructor(
    public readonly emailAuteur: string,
    public readonly nom: string,
    public readonly sequence: string,
    public readonly nomEtablissement: string,
    public readonly classe: string,
    public readonly discipline: string,
    public readonly nombreEleves: number,
  ) {}
}

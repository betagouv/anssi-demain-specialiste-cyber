declare namespace Express {
  export interface Request {
    utilisateur: Utilisateur | undefined;
  }
}

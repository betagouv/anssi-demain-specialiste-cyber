export type RetourEvaluation = {
  nomJeu: string;
  precisions: string;
};

export interface MessagerieInstantanee {
  notifieUnRetourEvaluation(retourExperience: RetourEvaluation): Promise<void>;
}

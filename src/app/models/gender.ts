export enum Gender {
  Fille = 0,
  Garçon = 1,
  Autre = 2,
}

export function toNames(genders: number[] | undefined): string[] {
  if (!genders) return [];
  return genders.map((g) => Gender[g]);
}

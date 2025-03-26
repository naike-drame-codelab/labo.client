export enum Category {
    Junior = 0,
    Senior = 1,
    Veteran = 2
  }

  export function toNames(categories: number[] | undefined): string[] {
    if (!categories) return [];
    return categories.map((c) => Category[c]); 
  }
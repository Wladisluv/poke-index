export const pokemonRegions: string[] = [
    "Kanto",
    "Johto",
    "Hoenn",
    "Sinnoh",
    "Unova",
    "Kalos",
    "Alola",
    "Galar",
  ];

  export const regionLimits: Record<string, { limit: number; offset: number } | undefined> = {
    Kanto: { limit: 151, offset: 0 },
    Johto: { limit: 100, offset: 151 },
    Hoenn: { limit: 135, offset: 251 },
    Sinnoh: { limit: 107, offset: 386 },
    Unova: { limit: 156, offset: 493 },
    Kalos: { limit: 72, offset: 649 },
    Alola: { limit: 88, offset: 721 },
    Galar: { limit: 89, offset: 809 },
  };
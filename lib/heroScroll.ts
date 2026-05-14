// Shared mutable ref so Hero.tsx and HeroScene can communicate scroll progress
// without React context crossing the R3F Canvas boundary.
export const heroScrollProgress = { current: 0 };

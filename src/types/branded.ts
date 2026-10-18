// Branded nominal types for domain IDs
type Brand<K, B extends string> = K & { readonly __brand: B };

export type ProyectoId = Brand<number, 'ProyectoId'>;
export type SkillId = Brand<number, 'SkillId'>;
export type FormacionId = Brand<number, 'FormacionId'>;

export function asProyectoId(n: number): ProyectoId {
  return n as ProyectoId;
}

export function asSkillId(n: number): SkillId {
  return n as SkillId;
}

export function asFormacionId(n: number): FormacionId {
  return n as FormacionId;
}
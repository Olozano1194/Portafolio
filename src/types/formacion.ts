import type { FormacionId } from './branded';

export interface FormacionAcademica {
  readonly id: FormacionId;
  readonly imagen: string;
  readonly date: string;
}
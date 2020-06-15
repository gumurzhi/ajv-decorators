import { AjvProperty } from '@/schemaBuilder/types/AjvProperty';

export class RegularType {
  type: string | string[];

  format?: string;

  items?: AjvProperty;
}

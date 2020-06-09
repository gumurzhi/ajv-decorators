import { PropertyItem } from '@/schemaBuilder/types/PropertyItem';

export class AjvSchema {
  '$id': string;

  'type': 'object';

  'properties': PropertyItem;

  'required'?: string[];
}

import { RegularType } from './propertyTypes/RegularType';
import { EnumType } from './propertyTypes/EnumType';
import { ReferenceType } from './propertyTypes/ReferenceType';

export class AjvSchema {
  '$id': string;

  'type': 'object';

  'properties': {
    [propertyName: string]: RegularType | EnumType | ReferenceType;
  };

  'required'?: string[];
}

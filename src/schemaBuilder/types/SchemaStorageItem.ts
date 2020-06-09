import { RegularType } from './propertyTypes/RegularType';
import { EnumType } from './propertyTypes/EnumType';
import { ReferenceType } from './propertyTypes/ReferenceType';

export class SchemaStorageItem {
  propertyName: string;

  property: RegularType | EnumType | ReferenceType;
}

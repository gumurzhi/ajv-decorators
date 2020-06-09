import { RegularType } from './propertyTypes/RegularType';
import { EnumType } from './propertyTypes/EnumType';
import { ReferenceType } from './propertyTypes/ReferenceType';

export class PropertyStorageItem {
  [className: string]: RegularType | EnumType | ReferenceType;
}

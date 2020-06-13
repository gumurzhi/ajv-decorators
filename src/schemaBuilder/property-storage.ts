import { ConstType } from '@/schemaBuilder/types/property-types/const-type';
import { RegularType } from './types/property-types/regular-type';
import { EnumType } from './types/property-types/enum-type';
import { ReferenceType } from './types/property-types/reference-type';
import { SchemaStorageItem } from './types/schema-storage-item';

export const propertyStorage: {
  [className: string]: SchemaStorageItem[];
} = {};

export const addProperty = (
  className: string,
  keyName: string,
  ajvProperty: RegularType | EnumType | ReferenceType | ConstType,
): void => {
  if (!propertyStorage[className]) {
    propertyStorage[className] = [
      { propertyName: keyName, property: ajvProperty },
    ];
    return;
  }
  propertyStorage[className].push({
    propertyName: keyName,
    property: ajvProperty,
  });
};

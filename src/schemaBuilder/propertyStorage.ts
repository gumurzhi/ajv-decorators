import { RegularType } from './types/propertyTypes/RegularType';
import { EnumType } from './types/propertyTypes/EnumType';
import { ReferenceType } from './types/propertyTypes/ReferenceType';
import { SchemaStorageItem } from './types/SchemaStorageItem';

export const propertyStorage: {
  [className: string]: SchemaStorageItem[];
} = {};

export const addProperty = (
  className: string,
  keyName: string,
  ajvProperty: RegularType | EnumType | ReferenceType,
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

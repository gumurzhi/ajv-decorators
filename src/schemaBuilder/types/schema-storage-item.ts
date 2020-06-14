import { PropertyType } from '@/schemaBuilder/types/property-type';

export class SchemaStorageItem {
  [propertyName: string]: [{ property: PropertyType }];
}

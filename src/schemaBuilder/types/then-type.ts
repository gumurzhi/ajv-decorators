import { PropertyType } from '@/schemaBuilder/types/property-type';

export type ThenType = { properties: { [propertyName: string]: PropertyType }; required?: string[] };

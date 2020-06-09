import { RegularType } from '@/schemaBuilder/types/propertyTypes/RegularType';
import { EnumType } from '@/schemaBuilder/types/propertyTypes/EnumType';
import { ReferenceType } from '@/schemaBuilder/types/propertyTypes/ReferenceType';
import { ConstType } from '@/schemaBuilder/types/propertyTypes/ConstType';

export type PropertyType = RegularType | EnumType | ReferenceType | ConstType;

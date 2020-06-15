import { RegularType } from '@/schemaBuilder/types/property-types/regular-type';
import { EnumType } from '@/schemaBuilder/types/property-types/enum-type';
import { ReferenceType } from '@/schemaBuilder/types/property-types/reference-type';
import { ConstType } from '@/schemaBuilder/types/property-types/const-type';

export type AjvProperty = RegularType | EnumType | ReferenceType | ConstType;

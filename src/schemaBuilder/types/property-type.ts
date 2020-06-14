import { RegularType } from '@/schemaBuilder/types/property-types/regular-type';
import { EnumType } from '@/schemaBuilder/types/property-types/enum-type';
import { ReferenceType } from '@/schemaBuilder/types/property-types/reference-type';
import { ConstType } from '@/schemaBuilder/types/property-types/const-type';
import { PropLimitation } from '@/schemaBuilder/types/property-types/prop-limitation';

export type PropertyType = RegularType | PropLimitation | EnumType | ReferenceType | ConstType;

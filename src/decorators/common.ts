import { schemaBuilder } from '@/schemaBuilder/schema-builder';
import { IfType } from '@/schemaBuilder/types/if-type';
import { ThenType } from '@/schemaBuilder/types/then-type';
import { PropertyItem } from '@/schemaBuilder/types/property-item';
import { PropertyType } from '@/schemaBuilder/types/property-type';

export function Equals(constValue: string | number) {
  return function(target: any, key: string) {
    schemaBuilder.pushProperty(target.constructor.name, key, { const: constValue });
  };
}
export function IsOptional() {
  return function(target: any, key: string) {
    schemaBuilder.addOptional(target.constructor.name, key);
  };
}

export function ValidateIf(condition: { [keyName: string]: PropertyType }) {
  return function(target: any, key: string) {
    schemaBuilder.addIf(target.constructor.name, key, { properties: condition });
  };
}

import { addProperty } from '@/schemaBuilder/property-storage';
import { addOptional } from '@/schemaBuilder/optional-storage';

export function Equals(constValue: string | number) {
  return function(target: any, key: string) {
    addProperty(target.constructor.name, key, { const: constValue });
  };
}
export function IsOptional() {
  return function(target: any, key: string) {
    addOptional(target.constructor.name, key);
  };
}

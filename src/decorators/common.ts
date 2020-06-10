import { addProperty } from '@/schemaBuilder/propertyStorage';
import { addOptional } from '@/schemaBuilder/optionalStorage';

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

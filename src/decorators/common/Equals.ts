import { addProperty } from '../../schemaBuilder/propertyStorage';

export function Equals(constValue: string | number) {
  return function(target: any, key: string) {
    addProperty(target.constructor.name, key, { const: constValue });
  };
}

import { addProperty } from '@/schemaBuilder/propertyStorage';

export function IsNumber() {
  return function(target: any, key: string) {
    addProperty(target.constructor.name, key, { type: 'number' });
  };
}

import { addProperty } from '../../schemaBuilder/propertyStorage';

export function IsString() {
  return function(target: any, key: string) {
    addProperty(target.constructor.name, key, { type: 'string' });
  };
}

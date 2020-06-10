import { addProperty } from '@/schemaBuilder/propertyStorage';

export function IsString() {
  return function(target: any, key: string) {
    addProperty(target.constructor.name, key, { type: 'string' });
  };
}

export function isEmail() {
  return function(target: any, key: string) {
    addProperty(target.constructor.name, key, {
      type: 'string',
      format: 'email',
    });
  };
}

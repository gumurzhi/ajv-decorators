import { addProperty } from '@/schemaBuilder/propertyStorage';

export function isEmail() {
  return function(target: any, key: string) {
    addProperty(target.constructor.name, key, {
      type: 'string',
      format: 'email',
    });
  };
}

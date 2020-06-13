import { addProperty } from '@/schemaBuilder/property-storage';

export function IsNumber() {
  return function(target: any, key: string) {
    addProperty(target.constructor.name, key, { type: 'number' });
  };
}

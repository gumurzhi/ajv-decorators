import { schemaBuilder } from '@/schemaBuilder/schema-builder';

export function IsNumber() {
  return function(target: any, key: string) {
    schemaBuilder.pushProperty(target.constructor.name, key, {
      type: 'number',
    });
  };
}

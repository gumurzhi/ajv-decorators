import { schemaBuilder } from '@/schemaBuilder/schema-builder';

export function IsBoolean() {
  return function(target: any, key: string) {
    schemaBuilder.pushProperty(target.constructor.name, key, {
      type: 'boolean',
    });
  };
}

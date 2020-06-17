import { schemaBuilder } from '@/schemaBuilder/schema-builder';

export function IsString() {
  return function(target: any, key: string) {
    schemaBuilder.pushProperty(target.constructor.name, key, { type: 'string' });
  };
}

export function IsEmail() {
  return function(target: any, key: string) {
    schemaBuilder.pushProperty(target.constructor.name, key, {
      type: 'string',
      format: 'email',
    });
  };
}

export function IsUUID() {
  return function(target: any, key: string) {
    schemaBuilder.pushProperty(target.constructor.name, key, {
      type: 'string',
      format: 'uuid',
    });
  };
}

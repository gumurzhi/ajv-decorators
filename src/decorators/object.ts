import { Newable } from '@/schemaBuilder/types/common';
import { schemaBuilder } from '@/schemaBuilder/schema-builder';

export function Type(fnOrClass: () => Newable | Newable): (arget: any, key: string) => void {
  const className = fnOrClass.name || fnOrClass().name;
  return function(target: any, key: string): void {
    schemaBuilder.pushProperty(target.constructor.name, key, {
      $ref: className,
    });
  };
}

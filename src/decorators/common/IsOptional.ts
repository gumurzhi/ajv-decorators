import { addOptional } from '../../schemaBuilder/optionalStorage';

export function IsOptional() {
  return function(target: any, key: string) {
    addOptional(target.constructor.name, key);
  };
}

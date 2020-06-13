import { AjvSchema } from './types/ajv-schema';
import { propertyStorage } from './property-storage';
import { optionalPropertyStorage } from './optional-storage';

const testSchema = {
  $id: `#/definitions/Test`,
  type: 'object',
  properties: {
    a: { type: 'string' },
    field: { oneOf: [{ type: 'number' }, { type: 'string', format: 'email' }] },
  },
  if: { properties: { a: { enum: ['hey'] } } },
  then: { properties: { b: { type: 'number' } }, required: ['b'] },
};

export const buildSchemas = (): { [className: string]: AjvSchema } => {
  const builtSchemas = Object.keys(propertyStorage).reduce(
    (result, className) => {
      const cResult = result;
      const schema: AjvSchema = {
        $id: `#/definitions/${className}`,
        type: 'object',
        properties: propertyStorage[className].reduce((propResult, current) => {
          // eslint-disable-next-line no-param-reassign
          propResult[current.propertyName] = current.property;
          return propResult;
        }, {}),
      };
      if (optionalPropertyStorage[className]) {
        schema.required = Object.keys(schema.properties).filter(
          p => !optionalPropertyStorage[className].includes(p),
        );
      } else {
        schema.required = Object.keys(schema.properties);
      }
      cResult[className] = schema;
      return cResult;
    },
    {},
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  builtSchemas.Test = testSchema;
  return builtSchemas;
};

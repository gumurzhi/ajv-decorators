import { AjvSchema } from './types/AjvSchema';
import { propertyStorage } from './propertyStorage';
import { optionalPropertyStorage } from './optionalStorage';

export const buildSchemas = (): { [className: string]: AjvSchema } => {
  return Object.keys(propertyStorage).reduce((result, className) => {
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
  }, {});
};

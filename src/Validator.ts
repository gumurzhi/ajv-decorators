import Ajv, { Options } from 'ajv';
import { buildSchemas } from './schemaBuilder/builder';

export class Validator extends Ajv {
  constructor(ajvOptions?: Options) {
    super(ajvOptions);
    this.buildSchemas();
  }

  private buildSchemas() {
    const schemaObj = buildSchemas();
    Object.keys(schemaObj).forEach(schema =>
      this.addSchema(schemaObj[schema], schema),
    );
  }
}

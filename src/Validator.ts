import Ajv, { Options } from 'ajv';
import { schemaBuilder } from '@/schemaBuilder/schema-builder';

export class Validator extends Ajv {
  private built: boolean;

  constructor(ajvOptions?: Options) {
    super(ajvOptions);
    this.built = false;
  }

  private buildSchemas(): void {
    const schemaObj = schemaBuilder.buildSchemas();
    this.built = true;
    Object.keys(schemaObj).forEach(schema => this.addSchema(schemaObj[schema], schema));
  }

  public validate(schemaKeyRef: object | string | boolean, data: any): boolean {
    if (!this.built) {
      this.buildSchemas();
    }
    const schemaOrName = typeof schemaKeyRef === 'function' && schemaKeyRef.prototype.constructor ? schemaKeyRef.name : schemaKeyRef;
    const valid = super.validate(schemaOrName, data);
    if (!valid) {
      throw new Error(this.errorsText());
    }
    return true;
  }
}

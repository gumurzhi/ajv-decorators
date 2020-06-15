import { PropertyType } from '@/schemaBuilder/types/property-type';
import { RegularType } from '@/schemaBuilder/types/property-types/regular-type';
import { EnumType } from '@/schemaBuilder/types/property-types/enum-type';
import { ReferenceType } from '@/schemaBuilder/types/property-types/reference-type';
import { ConstType } from '@/schemaBuilder/types/property-types/const-type';
import { SchemaStorageItem } from '@/schemaBuilder/types/schema-storage-item';
import { PropertyTypeItem } from '@/schemaBuilder/types/property-type.item';
import { IfType } from '@/schemaBuilder/types/if-type';
import { ThenType } from '@/schemaBuilder/types/then-type';
import { assertEx } from '@/helpers/commonHelper';
import { AjvSchema } from './types/ajv-schema';
import { AjvProperty } from '@/schemaBuilder/types/AjvProperty';

const testSchema = {
  $id: `#/definitions/Test`,
  type: 'object',
  properties: {
    a: { type: 'string' },
    field: { oneOf: [{ type: 'number' }, { type: 'string', format: 'email' }] },
  },
  allOf: [{ if: { properties: { a: { enum: ['hey'] } } }, then: { properties: { b: { type: 'number' } }, required: ['b'] } }],
};

class SchemaBuilder {
  propertyStorage: { [className: string]: SchemaStorageItem } = {};

  optionalPropertyStorage: { [className: string]: string[] } = {};

  conditionStorage: { [className: string]: { [propertyName: string]: IfType } } = {};

  public buildSchemas(): { [className: string]: AjvSchema } {
    let builtSchemas = Object.keys(this.propertyStorage).reduce((result: { [className: string]: AjvSchema }, className: string) => {
      let schema: AjvSchema = {
        $id: `#/definitions/${className}`,
        type: 'object',
        properties: {},
        required: [],
      };
      Object.keys(this.propertyStorage[className]).forEach((propertyName: string) => {
        schema = this.setAjvSchema(schema, propertyName, this.propertyStorage[className][propertyName]);
      });
      // eslint-disable-next-line no-param-reassign
      result[className] = schema;
      return result;
    }, {});
    builtSchemas = this.setConditionalPart(builtSchemas);
    builtSchemas = this.setRequired(builtSchemas);
    return builtSchemas;
  }

  private setRequired(schemaObj: { [className: string]: AjvSchema }): { [className: string]: AjvSchema } {
    return Object.keys(schemaObj).reduce((result: { [className: string]: AjvSchema }, schemaName: string) => {
      result[schemaName] = schemaObj[schemaName];
      result[schemaName].required = this.optionalPropertyStorage[schemaName]
        ? Object.keys(schemaObj[schemaName].properties).filter(propName => !this.optionalPropertyStorage[schemaName].includes(propName))
        : Object.keys(schemaObj[schemaName].properties);
      return result;
    }, {});
  }

  private mergeTypeRecords(propertyArr: PropertyTypeItem[]): PropertyType[] {
    return propertyArr
      .reduce((result: { property: PropertyType }[], current: { property: PropertyType }) => {
        const existingRecord = result.find(t => t.property === current.property);
        if (!existingRecord) {
          result.push(current);
        } else {
          Object.assign(existingRecord, current);
        }
        return result;
      }, [])
      .map(pt => pt.property);
  }

  private setAjvSchema(ajvSchema: AjvSchema, propertyName: string, propertyTypeArr: PropertyTypeItem[]): AjvSchema {
    const ajvSch = ajvSchema;
    let ajvProperty;
    const mergedTypeArr: PropertyType[] = this.mergeTypeRecords(propertyTypeArr);
    if (mergedTypeArr.length === 1) {
      // eslint-disable-next-line prefer-destructuring
      ajvProperty = mergedTypeArr[0];
    } else {
      ajvProperty = { anyOf: mergedTypeArr };
    }
    ajvSch.properties[propertyName] = ajvProperty;
    return ajvSch;
  }

  public pushProperty(className: string, keyName: string, ajvProperty: AjvProperty): void {
    if (!this.propertyStorage[className]) {
      this.propertyStorage[className] = {
        [keyName]: [{ property: ajvProperty }],
      };
    } else if (!this.propertyStorage[className][keyName]) {
      this.propertyStorage[className][keyName] = [{ property: ajvProperty }];
    } else {
      this.propertyStorage[className][keyName].push({ property: ajvProperty });
    }
  }

  public addOptional(className: string, optionalPropertyName: string): void {
    if (!this.optionalPropertyStorage[className]) {
      this.optionalPropertyStorage[className] = [optionalPropertyName];
      return;
    }
    this.optionalPropertyStorage[className].push(optionalPropertyName);
  }

  private setConditionalPart(schemaObj: { [className: string]: AjvSchema }): { [className: string]: AjvSchema } {
    return Object.keys(schemaObj).reduce((result: { [className: string]: AjvSchema }, schemaName: string) => {
      result[schemaName] = schemaObj[schemaName];
      if (this.conditionStorage[schemaName]) {
        result[schemaName].allOf = Object.keys(this.conditionStorage[schemaName]).map(propertyName => {
          assertEx(result[schemaName].properties[propertyName], `no type has been set to ${schemaName}.${propertyName}`);
          const then: ThenType = {
            properties: {
              [propertyName]: result[schemaName].properties[propertyName],
            },
            required:
              this.optionalPropertyStorage[schemaName] && this.optionalPropertyStorage[schemaName].includes(propertyName) ? [] : [propertyName],
          };
          delete result[schemaName].properties[propertyName];
          return { if: this.conditionStorage[schemaName][propertyName], then };
        });
      }
      return result;
    }, {});
  }

  public addIf(className: string, propertyName: string, ifObject: IfType): void {
    if (!this.conditionStorage[className]) {
      this.conditionStorage[className] = { [propertyName]: ifObject };
    }
    this.conditionStorage[className][propertyName] = ifObject;
  }
}

export const schemaBuilder = new SchemaBuilder();

/* eslint max-classes-per-file: ["error", 10] */
import { Validator } from '@/Validator';
import { IsNumber } from '@/decorators/number';
import { IsArray } from '@/decorators/array';
import { IsNull } from '@/decorators/object';
import { IsOptional, IsString, ValidateIf } from '../decorators';

type Tt = string[];
describe('place to validate real cases', () => {
  let validator: Validator;
  beforeEach(() => {
    validator = new Validator();
  });
  describe(' ValidateIf test cases', () => {
    class VTheFirst {
      @IsString()
      name: string;

      @IsNumber()
      age: number;

      @ValidateIf({ age: { minimum: 18 } })
      @IsString()
      passport?: string;
    }
    it('should test single ValidateIf structure - condition not triggers', () => {
      const testData = {
        name: 'SomeGreatName',
        age: 16,
      };
      const valid = validator.validate(VTheFirst, testData);
      expect(valid).toBe(true);
    });
    it('should test single ValidateIf structure - condition should trigger check', () => {
      const testData = {
        name: 'SomeGreatName',
        age: 19,
        passport: false,
      };
      let valid;
      try {
        valid = validator.validate(VTheFirst, testData);
      } catch (e) {
        expect(e);
      }
      expect(valid).toBeUndefined();
    });
  });
  describe('IsArray test cases', () => {
    class TestArr {
      @IsString()
      @IsNumber()
      name: string;

      @IsArray(String, Number)
      shops: string;
    }
    it('h', () => {
      const z = {
        name: 'name',
        shops: false,
      };
      const valid = validator.validate(TestArr, z);
      expect(valid).toBe(true);
    });
  });
});

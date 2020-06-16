/* eslint max-classes-per-file: ["error", 10] */
import { Validator } from '@/Validator';
import { IsNumber } from '@/decorators/number';
import { IsArray } from '@/decorators/array';
import { IsString, ValidateIf } from '../decorators';

describe('IsArray test cases', () => {
  let validator: Validator;
  beforeEach(() => {
    validator = new Validator();
  });
  describe('test array of single', () => {
    class TestArr {
      @IsString()
      @IsNumber()
      name: string;

      @IsArray(String)
      shops: string;
    }

    it('check array of strings', () => {
      const good = {
        name: 'name',
        shops: ['a'],
      };
      const valid = validator.validate(TestArr, good);
      expect(valid).toBe(true);
    });
    it('check array of numbers - should get error', () => {
      const good = {
        name: 'name',
        shops: [1],
      };
      try {
        const valid = validator.validate(TestArr, good);
        expect(valid).not.toBeDefined();
      } catch (e) {
        expect(e).toBeDefined();
      }
    });
    it('check not array - should get error', () => {
      const good = {
        name: 'name',
        shops: 'test',
      };
      try {
        const valid = validator.validate(TestArr, good);
        expect(valid).not.toBeDefined();
      } catch (e) {
        expect(e).toBeDefined();
      }
    });
  });
  describe('test array of arrays', () => {
    class TestArr2 {
      @IsString()
      @IsNumber()
      name: string;

      @IsArray([String])
      shops: string[][];
    }
    it('should pass validation', () => {
      const testData = {
        name: 'name',
        shops: [['test']],
      };
      const validate = validator.validate(TestArr2, testData);
      expect(validate).toBe(true);
    });
    it('should fail validation', () => {
      const testData = {
        name: 'name',
        shops: [[2]],
      };
      try {
        const validate = validator.validate(TestArr2, testData);
        expect(validate).toBeDefined();
      } catch (e) {
        expect(e).toBeDefined();
      }
    });
  });
  describe('tests for references', () => {
    class Shop {
      @IsString()
      name: string;

      @IsString()
      address: string;
    }
    class TestArr3 {
      @IsString()
      name: string;

      @IsArray(Shop, String)
      shop: (string | Shop)[];
    }
    it('should pass validation - shop is string', () => {
      const good = {
        name: 'eueueu',
        shop: ['sthstnh'],
      };
      let valid = validator.validate(TestArr3, good);
      expect(valid).toBe(true);
      const shop = [
        {
          name: 'string',
          address: 'address',
        },
      ];
      Object.assign(good, { shop });
      valid = validator.validate(TestArr3, good);
      expect(valid).toBe(true);
    });
    it('should fail validation - array of numbers', () => {
      const bad = {
        name: 'eueueu',
        shop: [2],
      };
      try {
        const valid = validator.validate(TestArr3, bad);
        expect(valid).not.toBeDefined();
      } catch (e) {
        expect(e).toBeDefined();
      }
    });
    it('should fail validation - shop is not array', () => {
      const bad = {
        name: 'eueueu',
        shop: 'some string',
      };
      try {
        const valid = validator.validate(TestArr3, bad);
        expect(valid).not.toBeDefined();
      } catch (e) {
        expect(e).toBeDefined();
      }
    });
  });
  describe('validateIf test cases', () => {
    class ArrValidIf {
      @IsString()
      name: string;

      @IsArray(String)
      @ValidateIf({ name: { const: 'constName' } })
      shop: string[];
    }
    it('should pass validation without shop field', () => {
      const good = {
        name: 'someName',
      };
      const valid = validator.validate(ArrValidIf, good);
      expect(valid).toBe(true);
    });
    it('should fail validation', () => {
      const bad = {
        name: 'constName',
      };
      try {
        const valid = validator.validate(ArrValidIf, bad);
        expect(valid).toBeUndefined();
      } catch (e) {
        expect(e).toBeDefined();
      }
    });
  });
  describe('validate mixed type array', () => {
    class TestMixClass {
      @IsArray(String, Number)
      name: (string | number)[];
    }
    it('should pass validation', () => {
      const data = {
        name: ['str', 33],
      };
      const valid = validator.validate(TestMixClass, data);
      expect(valid).toBe(true);
    });
  });
});

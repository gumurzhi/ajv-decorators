import { Validator } from '@/Validator';
import { IsEnum } from '@/decorators';

enum Cities {
  'Kyiv' = 'Kyiv',
}

describe('tests for decorators of common', () => {
  let validator: Validator;
  beforeEach(() => {
    validator = new Validator();
  });
  describe('IsEnum tests', () => {
    class ClassWithEnum {
      @IsEnum(Cities)
      city: Cities;
    }

    it('should check IsEnum - validate', () => {
      const good = {
        city: Cities.Kyiv,
      };
      const valid = validator.validate(ClassWithEnum, good);
      expect(valid).toBe(true);
    });
    it('should fail validation - city not from enum', () => {
      const bad = {
        city: 'Faraway',
      };
      try {
        const valid = validator.validate(ClassWithEnum, bad);
        expect(valid).toBeUndefined();
      } catch (e) {
        expect(e).toBeDefined();
      }
    });
    it('should fail validation - no city', () => {
      const bad = {
        country: 'Ukraine',
      };
      try {
        const valid = validator.validate(ClassWithEnum, bad);
        expect(valid).toBeUndefined();
      } catch (e) {
        expect(e).toBeDefined();
      }
    });
  });
});

import { Validator } from '@/Validator';
import { IsNumber } from '@/decorators/number';
import { IsOptional, IsString, ValidateIf } from '../decorators';

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
});
// describe('most primitive cases should be tested here', () => {
//   it('isString test', () => {
//     class A {
//       @IsString()
//       @IsOptional()
//       name: string;
//
//       @Type(() => A)
//       @IsString()
//       @ValidateIf(({ id }) => id !== null)
//       sraka: Validator;
//     }
//     const n = {
//       field: 'eue@eueueu.com',
//     };
//
//     const valid = validator.validate('A', n);
//     if (!valid) {
//       console.log(validator.errorsText());
//       throw new Error(validator.errorsText());
//     }
//     console.log(`it's good`);
//   });
//   it('conditional', () => {
//     const z = {
//       field: 2,
//       a: 'hey',
//     };
//     const valid = validator.validate('Test', z);
//     expect(valid).toBe(true);
//   });
// });

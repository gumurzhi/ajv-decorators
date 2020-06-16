import { Validator } from '@/Validator';
import { IsString, ValidateIf } from '@/decorators';
import { IsNumber } from '@/decorators/number';

describe(' ValidateIf test cases', () => {
  let validator: Validator;
  beforeEach(() => {
    validator = new Validator();
  });
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

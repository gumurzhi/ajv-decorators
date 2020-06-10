import { Validator } from '@/Validator';
import { IsOptional, IsString } from '../decorators';

const validator = new Validator();
describe('most primitive cases should be tested here', () => {
  it('isString test', () => {
    class A {
      @IsString()
      @IsOptional()
      name: string;
    }
    const n = {
      field: 'eue@eueueu.com',
    };

    const valid = validator.validate('Test', n);
    if (!valid) {
      console.log(validator.errorsText());
      throw new Error(validator.errorsText());
    }
    console.log(`it's good`);
  });
  it('conditional', () => {
    const z = {
      field: 2,
      a: 'hey',
    };
    const valid = validator.validate('Test', z);
    expect(valid).toBe(true);
  });
});

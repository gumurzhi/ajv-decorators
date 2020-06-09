import { IsOptional } from '../decorators/common';
import { IsString } from '../decorators/string/IsString';
import { Validator } from '../Validator';

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
    const z = new Validator();
    const valid = z.validate('Test', n);
    if (!valid) {
      console.log(z.errorsText());
      throw new Error(z.errorsText());
    }
    console.log(`it's good`);
  });
});

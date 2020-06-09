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
    const z = new Validator();
    console.log(`euee`);
  });
});

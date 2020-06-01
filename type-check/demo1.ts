import { omit } from '../';

const obj = {
  name: 'lxj',
  age: 18,
  sex: 1,
}

const a = omit<typeof obj, 'age' | 'sex'>(obj, 'age,sex')

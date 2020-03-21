import { omit } from '../';

const obj = {
  name: 'lxj',
  age: 18,
};

const obj2 = omit<typeof obj, 'age'>(obj, 'name');

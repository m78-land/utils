import React from 'react';
import { heightLightMatchString } from './index';

console.log(heightLightMatchString('你好吗，我很好。', '好'));
console.log(heightLightMatchString('你好吗，我很好。', /好/));

const Test = () => {
  return (
    <div>
      Test
    </div>
  );
};

export default Test;

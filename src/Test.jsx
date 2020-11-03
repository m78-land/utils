import React from 'react';
import { compose } from './index';

import './test.css'


function a(num) {
  console.log(1);
  return `${num + 1}`;
}

function b(sNum) {
  console.log(2);
  return sNum;
}

function log(str) {
  console.log(3);
 console.log(str)
}

compose(log, b, a)(10)

const Test = () => {

  return (
    <div>
      21321321
    </div>
  );
};

export default Test;

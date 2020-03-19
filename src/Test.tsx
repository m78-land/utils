import React from 'react'

import { omit } from './index';

const object = {
  name: 'lxj',
  age: 17,
}

const object2 = omit<'name' | 'age'>(object, 'name');


function Test() {
  const el = React.useRef();
  
  return (
    <div ref={el} style={{padding: '40px 0'}}>
      test
    </div>
  )
}

export default Test

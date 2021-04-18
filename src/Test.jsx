import React, { useRef } from 'react';

import './test.css'
import { isWeakNumber } from './is';
import { subtract } from './number';
import { getScrollParent, getStyle, hasScroll, swap } from './index';
import { getScrollBarWidth } from './index';


const Test = () => {
  const ref = useRef();

  React.useEffect(() => {
    console.log(getScrollBarWidth());
  }, [])

  return (
    <div className="m78-scrollbar" style={{ padding: 16 }} ref={ref}>
      <div  id="el3"style={{ padding: 16, height: 300, overflow: 'auto' }}>
        <div id="el2" style={{ padding: 16, height: 900 }}>
          <button id="el">az</button>
        </div>
      </div>
      <div style={{ height: 2000 }}></div>
    </div>
  );
};

export default Test;

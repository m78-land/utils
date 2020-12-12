import React from 'react';

import './test.css'
import { isWeakNumber } from './is';
import { subtract } from './number';
import { getScrollParent, getStyle, hasScroll, swap } from './index';


const Test = () => {

  React.useEffect(() => {
    console.log(getScrollParent(document.getElementById('el'), true));
  }, [])

  return (
    <div style={{ padding: 16 }}>
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

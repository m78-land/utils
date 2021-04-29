import React, { useRef } from 'react';

import './test.css'
import { isWeakNumber } from './is';
import { subtract } from './number';
import { getScrollParent, getStyle, hasScroll, swap } from './index';
import { checkElementVisible } from './index';
import debounce from 'lodash/debounce';

const Test = () => {
  const ref = useRef();
  const ref2 = useRef();

  React.useEffect(() => {
    const dS = debounce(e => {
      console.log(checkElementVisible(ref2.current, {
        wrapEl: ref.current,
        // offset: 40,
        // fullVisible: true,
      }));
    }, 100);

    ref.current.addEventListener('scroll', dS)
    window.onscroll = dS;
  }, [])

  return (
    <div>
      <div style={{ height: 1000 }}></div>

      <div ref={ref} className="box">
        <div className="innerBox">
          <div ref={ref2} className="blueBox" />
        </div>
      </div>

      <div style={{ height: 1000 }}></div>

    </div>
  );
};

export default Test;

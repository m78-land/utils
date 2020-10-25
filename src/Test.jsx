import React, { useRef, useEffect } from 'react';
import { checkElementVisible } from './index';

import './test.css'

const Test = () => {

  const ref = useRef();
  const ref2 = useRef();

  useEffect(() => {
    const handle = () => {
      console.log(checkElementVisible(ref2.current, {
        wrapEl: ref.current,
        fullVisible: true,
      }));
    }

    ref.current.addEventListener('scroll', handle)
    window.addEventListener('scroll', handle)
  }, []);

  return (
    <div className="box" ref={ref}>
      <div className="innerBox">
        <div ref={ref2} className="testBox" style={ { top: 200, left: 500 } }/>
      </div>
    </div>
  );
};

export default Test;

import React from 'react'

import { getDateCountDown } from './index';

function Test() {
  const el = React.useRef();
  React.useEffect(() => {
    setInterval(() => {
      el.current.innerHTML = JSON.stringify(getDateCountDown('2019-9-5 12:00:00'));
    }, 1000);
  }, []);

  return (
    <div ref={el} style={{padding: '40px 0'}}>
      test
    </div>
  )
}

export default Test

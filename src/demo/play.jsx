import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

import { checkElementVisible } from '@lxjx/utils';
import debounce from 'lodash/debounce';

const Play = () => {
  const ref = useRef();
  const ref2 = useRef();

  React.useEffect(() => {
    const dS = debounce(e => {
      console.log(
        checkElementVisible(ref2.current, {
          wrapEl: ref.current,
          // offset: 40,
          fullVisible: true,
        }),
      );
    }, 100);

    ref.current.addEventListener('scroll', dS);
    window.onscroll = dS;
  }, []);

  return (
    <div>
      <div style={{ height: 1000 }} />

      <div ref={ref} className="box">
        <div className="innerBox">
          <div ref={ref2} className="blueBox" />
        </div>
      </div>

      <div style={{ height: 1000 }} />
    </div>
  );
};

ReactDOM.render(<Play />, document.getElementById('root'));

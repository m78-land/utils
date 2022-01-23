import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { formatString } from '../format';

console.log(
  formatString('1234567890', '3', {
    repeat: true,
  }),
);
console.log(
  formatString('1234567890', '3', {
    repeat: true,
    reverse: true,
  }),
);

const Play = () => {
  const ref = useRef();
  const ref2 = useRef();

  React.useEffect(() => {}, []);

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

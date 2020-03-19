import React from 'react'

function Test() {
  const el = React.useRef();

  return (
    <div ref={el} style={{padding: '40px 0'}}>
      test
    </div>
  )
}

export default Test

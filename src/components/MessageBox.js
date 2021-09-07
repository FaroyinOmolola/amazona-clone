import React from 'react';

function MessageBox (props) {
  return (
    <div className="p-2 border  border-dark rounded rounded-2
    bg-light text-danger">
    	{props.children}
    </div>
  )
}

export default MessageBox;
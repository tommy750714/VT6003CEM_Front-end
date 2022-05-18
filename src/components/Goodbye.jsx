import React, {useState} from 'react';

function Goodbye(props){
  const [txtColor, setTxtColor] = useState('blue')

  function changeColor() {setTxtColor ('red');}
  function revertColor() {setTxtColor ('blue');}
  
  return(
    <>
      <h2 style={{color: txtColor}} onMouseEnter={changeColor} onMouseLeave={revertColor}>Goodbye {props.name} </h2>
    </>
  );
}

export default Goodbye;
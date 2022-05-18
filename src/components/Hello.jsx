import React from 'react';


function Hello(props){
  const greeting = 'Hello' + props.name;
  return <h1>{greeting}</h1>;
}

export default Hello;
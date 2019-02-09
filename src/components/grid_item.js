import React from 'react';
import '../App.css';

const GridItem = props => {
  return (       
    <div className="grid-item" onClick={ props.handlePlayerMove }>
      <div className={ `${props.figure}` }></div>
    </div>    
  );
}
 
export default GridItem;
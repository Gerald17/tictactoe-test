import React from 'react';
import '../App.css';

const GridItem = props => {
  return (       
    <div className="grid-item" onClick={ (e) => props.handlePlayerMove(e, props.coordx,  props.coordy) }>
      <div className={ `${props.figure}` } ></div>
    </div>    
  );
}
 
export default GridItem;
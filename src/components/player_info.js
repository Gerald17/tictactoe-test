import React from 'react';
import GridItem from '../components/grid_item';

const PlayerInfo = (props) => {
    return (             
      <div className="player-info">
        <div className="player-shape">
          <GridItem figure={props.figure}/>
        </div>
        <h3 className="player-name">{ props.name }</h3>
      </div>
    );
}
 
export default PlayerInfo;
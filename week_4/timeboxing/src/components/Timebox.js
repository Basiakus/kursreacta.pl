import React from 'react';
import uuid from 'uuid';
import TimeboxEditer from './TimeboxEditer';
import '../styles/components/Timebox.scss';

class Timebox extends React.Component {
   state = {
      isEditActive: false
   }
   handleIsEditActive = () => {
      this.setState({ isEditActive: !this.state.isEditActive });
   }
   render() {
      const { onDelete, title, totalTimeInMinutes } = this.props;
      return (
         <div className='Timebox'>
            <TimeboxEditer
               key={uuid.v4()}
               title={this.props.title}
               totalTimeInMinutes={this.props.totalTimeInMinutes}
               index={this.props.index}
               onEdit={this.props.onEdit}
               isEdit={this.state.isEditActive}
               handleIsEdit={this.handleIsEditActive}
            />
            <h3>
               Zadanie: {title} - {totalTimeInMinutes}min.
                  </h3>
            <button onClick={onDelete}>Delete</button>
            <button onClick={this.handleIsEditActive}>Edit</button>
         </div>
      )
   }
}

export default Timebox;
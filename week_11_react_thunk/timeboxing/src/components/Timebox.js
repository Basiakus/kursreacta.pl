import React from 'react';
import uuid from 'uuid';
import classNames from 'classnames';
import TimeboxEditer from './TimeboxEditer';
import '../styles/components/Timebox.scss';
import PropTypes from 'prop-types';

class Timebox extends React.Component {

   state = {
      isEditActive: false
   }
   handleIsEditActive = () => {
      this.setState({ isEditActive: !this.state.isEditActive });
   }
   render() {
      const { onDelete, title, totalTimeInMinutes, flag, onEdit, onMakeCurrent } = this.props;
      /* if (totalTimeInMinutes <= 0) {
         throw new Error('totalTimeInMinutes musi być większy od 0');
      } */
      let timeboxClasses = classNames(
         "Timebox",
         {
            "Timebox--red": flag === 'red',
            "Timebox--yellow": flag === 'yellow',
            "Timebox--blue": flag === 'blue'
         }
      )
      return (
         <div className={timeboxClasses}>
            <TimeboxEditer
               id={this.props.id}
               key={uuid.v4()}
               title={this.props.title}
               totalTimeInMinutes={this.props.totalTimeInMinutes}
               index={this.props.index}
               flag={this.props.flag}
               onEdit={this.props.onEdit}
               isEdit={this.state.isEditActive}
               handleIsEdit={this.handleIsEditActive}
            />
            <h3>
               Zadanie: {title} - {totalTimeInMinutes}min.
            </h3>
            <button onClick={onDelete}>Delete</button>
            <button onClick={onEdit}>Edit</button>
            <button onClick={onMakeCurrent}>Zacznij</button>
         </div>
      )
   }
}
Timebox.propTypes = {
   id: PropTypes.number.isRequired,
   title: PropTypes.string.isRequired,
   flag: PropTypes.string.isRequired,
   totalTimeInMinutes: PropTypes.number.isRequired,
   onEdit: PropTypes.func.isRequired,
   handleIsEdit: PropTypes.func.isRequired
}
Timebox.defaultProps = {
   id: uuid.v4(),
   title: 'test',
   flag: 'blue',
   totalTimeInMinutes: 0,
   onEdit: () => {},
   handleIsEdit: () => {}
}; 
export default Timebox;
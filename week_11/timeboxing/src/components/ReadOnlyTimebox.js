import React from 'react';
import uuid from 'uuid';
import classNames from 'classnames';
import TimeboxEditer from './TimeboxEditer';
import '../styles/components/Timebox.scss';
import PropTypes from 'prop-types';

class Timebox extends React.Component {

     render() {
          const { title, totalTimeInMinutes, flag } = this.props;
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
                    />
                    <h3>
                         Zadanie: {title} - {totalTimeInMinutes}min.
                    </h3>
               </div>
          )
     }
}
Timebox.propTypes = {
     id: PropTypes.number.isRequired,
     title: PropTypes.string.isRequired,
     flag: PropTypes.string.isRequired,
     totalTimeInMinutes: PropTypes.number.isRequired
}
Timebox.defaultProps = {
     id: uuid.v4(),
     title: 'test',
     flag: 'blue',
     totalTimeInMinutes: 0
};
export default Timebox;
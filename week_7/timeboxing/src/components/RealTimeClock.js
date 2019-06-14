import React from 'react';
import '../styles/components/Clock.scss';


class RealTimeClock extends React.Component {
   state = {
      globalH: 0, 
      globalMin: 0, 
      glogalSec: 0
   }
   
   componentDidMount() {
      //console.log('RealTimeClock component is mounted');
      this.startGlobalTime();
   };
   componentWillUnmount() {
      window.clearInterval(this.startGlobalTime);
      //console.log('RealTimeClock component is unmounted');
   }
   startGlobalTime = () => {
      this.intervalTime = window.setInterval(() => {
         //console.log('Start interval in RealTimeClock component');
         const today = new Date();
         const hour = (today.getHours() > 10) ? today.getHours() : `0${today.getHours()}`;
         const minutes = (today.getMinutes() > 10) ? today.getMinutes() : `0${today.getMinutes()}`;
         const seconds = (today.getSeconds() > 10) ? today.getSeconds() : `0${today.getSeconds()}`;
         this.setState(prevState => ({
            globalH: prevState.globalH = hour,
            globalMin: prevState.globalMin = minutes,
            glogalSec: prevState.glogalSec = seconds 
         }));
      }, 1000);
   }

   render() {
      const { globalH, globalMin, glogalSec } = this.state;
      return (
         <>
            <h2>Aktualna godzina: 
               <span>{globalH}</span>:
               <span>{globalMin}</span>:
               <span>{glogalSec}</span>
            </h2>
         </>
      )
   }
   
}
export default RealTimeClock;
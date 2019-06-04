import React from 'react';
import Clock from '../../components/Clock.js';
import ReactDOM from 'react-dom';
var root = null;
describe('<Clock />', () => {
     beforeEach(() => {
          root = document.createElement('div');
          ReactDOM.render(
               <Clock
                    hours={1}
                    minutes={20}
                    seconds={13}
                    miliseconds={100}
                    className=''
                    hoursColor="red"
                    minutesColor="red"
                    secondsColor="red"
                    milisecondsColor="red"
                    separatorColor="black"
               />, root
          )
     }) 
     it('Check if child is a H2 element', () => {
          expect(root.childNodes[0].nodeName).toEqual("H2");
     });
     it('Check if className is equal to "Clock"', () => {
          expect(root.childNodes[0].className).toMatch("Clock");
     });
});
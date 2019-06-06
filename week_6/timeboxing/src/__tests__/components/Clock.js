import React from 'react';
import Clock from '../../components/Clock.js';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
var root = null;
let clockRenderer = null;
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

describe('<Clock /> on clockRenderer', () => {
     beforeEach(() => {
          clockRenderer = renderer.create(
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
     });        
     it('Use snaphot on component JSON file', () => {
          console.log(clockRenderer.toJSON());
          expect(clockRenderer.toJSON()).toMatchSnapshot();
     });
     it('check main type of element', () => {
          console.log(clockRenderer.toJSON());
          console.log(clockRenderer.toTree());
          expect(clockRenderer.toJSON().type).toEqual('h2');
     });
     it('Check if className is equal to "Clock"', () => {
          expect(clockRenderer.toJSON().props).toMatchObject({ className: expect.stringMatching(/Clock/)});
     });
});
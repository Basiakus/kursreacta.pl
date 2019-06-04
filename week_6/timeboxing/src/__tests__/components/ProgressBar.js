import React from 'react';
import ProgressBar from '../../components/ProgressBar.js';
import ReactDOM from 'react-dom';
var root = null;
describe('TEST <ProgressBar /> Component', () => {
     beforeEach(() => {
          root = document.createElement('div');
          ReactDOM.render(
               <ProgressBar barColor="blue" percent={20} trackRemaining={false}/>, root
          )
     })
     it('test for corrent className', () => {
          expect(root.childNodes[0].className).toEqual('ProgressBar');
     });
     it('check if conponent bar is modify', () => {
          expect(root.childNodes[0].trackRemaining).toEqual();
     });
});
import React from 'react';
import ProgressBar from '../../components/ProgressBar.js';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'
var root = null;
let progressBarRenerer = null;
describe('TEST <ProgressBar /> Component', () => {
     beforeEach(() => {
          root = document.createElement('div');
          ReactDOM.render(
               <ProgressBar barColor="blue" percent={20} trackRemaining={false}/>, root
          )
     })
     xit('test for corrent className', () => {
          expect(root.childNodes[0].className).toEqual('ProgressBar');
     });
});

describe('Use renderer on <ProgressBar />', () => {
     beforeEach(() => {
          progressBarRenerer = renderer.create(
               <ProgressBar barColor="blue" percent={11} trackRemaining={false} />
          )
     })
     it('Create snapshot file represent a component JSON file', () => {
          console.log(progressBarRenerer.toJSON())
          expect(progressBarRenerer.toJSON()).toMatchSnapshot();
     })
     it('check value of percent if is between 0-100', () => {
          expect(progressBarRenerer.toJSON().props.style.background).toMatch(/[0-100]/)
     })
});
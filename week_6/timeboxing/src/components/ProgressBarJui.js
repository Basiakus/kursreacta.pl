import React, { Component } from 'react'

class ProgressBarJui extends Component {
     constructor(props) {
          super(props);
          this.progressBasjui = React.createRef();
          this.state = {

          }
     }
     componentDidMount() {
          window.$(this.progressBasjui.current).progressbar({
               value: this.props.percent
          })
     }
     componentDidUpdate() {

          window.$(this.progressBasjui.current).progressbar('option', 'value', this.props.percent);
     }
     componentWillUnmount() {
          window.$(this.progressBasjui.current).progressbar('destroy');
     }
     render() {
          return (
               <>
                    <p>ProgressBar from JQuery</p>
                    <div ref={this.progressBasjui} />
               </>
          )
     }
}

export default ProgressBarJui;

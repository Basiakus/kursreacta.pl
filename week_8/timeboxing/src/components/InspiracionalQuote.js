import React from 'react';
import '../styles/components/InspiracionalQuote.scss';

class InspiracionalQuote extends React.Component  {
     state = {
          quote: null
     }

     componentDidMount() {
          import('inspirational-quotes').then((quote) => {
               //console.log(quote.getQuote());
               this.setState({
                    quote: quote.getQuote()
               })
          }).catch((error) => console.log(`sorry but from some reason can't get quote. Error ${error}`));
     }
     componentWillUnmount() {
          this.setState({
               quote: null
          })
     }
     
     render() {
          return (
               <>
                    { this.state.quote !== null ?
                         <figure className='InspiracionalQuote'>
                              <blockquote>{this.state.quote.text}</blockquote>
                              <figcaption className="InspiracionalQuote__author"><cite>{this.state.quote.author}</cite></figcaption>
                         </figure> :
                         '. . . l o a d i n g'
                    }
               </>
          )
     }
}

export default InspiracionalQuote;
import React from 'react';
import Quote, { getQuote } from 'inspirational-quotes';
import '../styles/components/InspiracionalQuote.scss';

class InspiracionalQuote extends React.Component  {
     state = {
          quote: null
     }

     componentDidMount() {
          import('inspirational-quotes').
          then((quote) => {
               console.log(quote.getQuote());
               this.setState({
                    quote: quote.getQuote()
               })
          });
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
import React from 'react';
import '../styles/components/InspiracionalQuote.scss';

function InspiracionalQuote({ quote }) {
     return (
          <>
               <figure className='InspiracionalQuote'>
                    <blockquote>{quote.text}</blockquote>
                    <figcaption className="InspiracionalQuote__author"><cite>{quote.author}</cite></figcaption>
               </figure>
               
          </>
     );
}

export default InspiracionalQuote;
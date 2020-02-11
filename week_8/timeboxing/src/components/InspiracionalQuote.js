import React, {useState, useEffect} from 'react';
import '../styles/components/InspiracionalQuote.scss';

function InspiracionalQuote()  {

     const [quote, setQuote] =  useState(null);

     useEffect(() => {
          import('inspirational-quotes').then((quote) => {
               setQuote(quote.getQuote());
          }).catch((error) => console.log(`sorry but from some reason can't get quote. Error ${error}`));
     }) 
          
     
     return (
          <>
               { quote !== null ?
                    <figure className='InspiracionalQuote'>
                         <blockquote>{quote.text}</blockquote>
                         <figcaption className="InspiracionalQuote__author"><cite>{quote.author}</cite></figcaption>
                    </figure> :
                    '. . . l o a d i n g'
               }
          </>
     )
}

export default InspiracionalQuote;
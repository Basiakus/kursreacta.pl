import React, {useState, useEffect} from 'react';
import InspiracionalQuote from '../presentation/InspiracionalQuote';

export default function InspiracionalQuoteContainer()  {

     const [quote, setQuote] =  useState(null);

     useEffect(() => {
          import('inspirational-quotes').then((quote) => {
               setQuote(quote.getQuote());
          }).catch((error) => console.log(`sorry but from some reason can't get quote. Error ${error}`));
     }) 
     return (
          quote !== null ? <InspiracionalQuote quote={quote} /> : '. . . l o a d i n g'
     );
}


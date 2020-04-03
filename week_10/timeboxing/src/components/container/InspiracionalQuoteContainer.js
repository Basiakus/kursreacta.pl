import React, {useState, useEffect} from 'react';
import InspiracionalQuote from '../presentation/InspiracionalQuote';

export default function InspiracionalQuoteContainer()  {

     const [quote, setQuote] =  useState(null);

     useEffect(() => {
          import('inspirational-quotes').then((quote) => {
               setQuote(quote.getQuote());
          }).catch((error) => console.log(`sorry but from some reason can't get quote. Error ${error}`));
     }) 

     const InspiracionalQuoteText = (text) => {
          return <blockquote>{text}</blockquote>
     }
     const InspiracionalQuoteAuthor = (author) => {
          return <figcaption className="InspiracionalQuote__author">
               <cite>
                    {author}
               </cite>
          </figcaption>
     }

     return (
          quote !== null ? 
          <InspiracionalQuote 
               text={quote.text} 
               author={quote.author}
               quoteText={InspiracionalQuoteText} 
               quoteAuthor={InspiracionalQuoteAuthor}
          /> : 
          '. . . l o a d i n g'
     );
}


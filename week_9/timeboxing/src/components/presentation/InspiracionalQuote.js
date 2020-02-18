import React from 'react';
import '../../styles/components/InspiracionalQuote.scss';

function InspiracionalQuote({ text, author, quoteText, quoteAuthor }) {
     return (
          <>
               <figure className='InspiracionalQuote'>
                    {quoteText(text)}
                    <figcaption className="InspiracionalQuote__author">
                         <cite>
                              {quoteAuthor(author)}
                         </cite>
                    </figcaption>
               </figure>
          </>
     );
}

export default InspiracionalQuote;
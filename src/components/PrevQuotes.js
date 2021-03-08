import React from 'react';
// import package unique ids for keys
import { uuid } from 'uuidv4';

// Question: How to destructure an Array?
const PreviousQuotes = ( {quoteList} ) => {
    console.log(quoteList)
    
    return (
        <>
            <h1 className="listTitle">Previous 10 Quotes</h1>
            {quoteList.map((item, index) => {
                if(index > 0) {
                    return (
                        <div key={uuid()} className="divList">
                            <div className="numList">{index}. </div>
                            <div className="quoteList">«{item}»</div>
                        </div>
                        )
                    }
                })
            }
        </>     
    )
}

export default PreviousQuotes;
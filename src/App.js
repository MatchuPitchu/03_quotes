import React, { useState, useEffect } from "react";
import "./styles.css";
import Quotes from "./components/Quotes";
import PreviousQuotes from "./components/PrevQuotes";
import Spinner from "./components/Spinner";
import img from './assets/kaenguru.jpg';

function App() {
    const [quotes, setQuotes] = useState("");
    const [listOfQuotes, setListOfQuotes] = useState([]);
    // Counter for Loading Spinner useEffect
    const [counter, setCounter] = useState(5);

    useEffect(() => {
        // Version 1: async and await
        const fetchQuotes = async () => {
            // error management
            try {
                // I await until the promise will catched
                const response = await fetch("https://ron-swanson-quotes.herokuapp.com/v2/quotes");
                // won't be executed until the promise is fulfilled
                const json = await response.json();
                setQuotes(json);
            } catch (error) {
                console.log("There was a problem loading a quote, please try again later", error);
            }
        };
        /* Version 2: fetch().then().then().catch() 
        const fetchQuotes = () => {fetch("https://ron-swanson-quotes.herokuapp.com/v2/quotes")
          .then(response => response.json())
          .then(quotes => setQuotes(quotes))
          .catch(error => console.error("There was a problem loading a quote, please try again later", error));
          }; 
        */
        
        fetchQuotes();
        const intervalID = setInterval(() => fetchQuotes(), 30000);
        return () => clearInterval(intervalID);
    }, []);
  
    useEffect(() => {
        if(quotes) {
           /* Version 1
            const myList = listOfQuotes.concat(quotes);
            console.log(myList); */
            /* Version 2
            return setListOfQuotes(listOfQuotes => [...listOfQuotes, quotes]); */
            // Version 3: Mache Kopie des listOfQuotes Array mit slice()-Method - von Index 0-9
            const lastTenQuotes = listOfQuotes.slice(0, 10);
            return setListOfQuotes(() => [quotes, ...lastTenQuotes]);
        };
    }, [quotes])
  
    // useEffect for Spinner
    useEffect(() => {
        if(counter > 0) {
        const intervalID = setInterval(() => setCounter ((prev) => prev -1), 1000)
        return () => clearInterval(intervalID);
        }
    }, [counter])


    if(counter > 0) {
        return (    
            <div className="App">
                {/* Version 1
                      Loading ...
                */}
                <Spinner counter={counter} />
            </div>
        )} else {
        return (
            <div className="App">
                <h3>
                    <a href="/instructions.html"> instructions </a>
                </h3>
                <img
                src={img}
                width="400"
                alt="Känguru"
                />
                <Quotes quote={quotes} />
                <PreviousQuotes quoteList={listOfQuotes} />            
            </div>
        )}
}

export default App;
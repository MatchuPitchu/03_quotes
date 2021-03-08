import React, { useState } from 'react';
// import spinner
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClockLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 200px auto 50px;
`;

const Spinner = ( {counter} ) => {
    let [loading] = useState(true);
    let [color] = useState("#6a302d");
  
    return (
      <div className="sweet-loading">
        <ClipLoader color={color} loading={loading} css={override} size={100} />
        <p>Loading again {counter} seconds</p>
      </div>
    );
  }
  
  export default Spinner;
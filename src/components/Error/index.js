import React from 'react';
import { hot } from 'react-hot-loader/root';

const CustomError = (props) => {
    return (
        <div className="box box--error">Error! Invalid input</div>
    )
}

export default hot(CustomError);
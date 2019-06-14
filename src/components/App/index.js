import { hot } from 'react-hot-loader/root';
import React,{useState} from 'react';
import Denominator from '../Denominator';
import './app.scss';



const App = () => {
	return (
		<div className="app">
			<Denominator />
		</div>
	);
}

export default hot(App);
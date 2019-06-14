import { hot } from 'react-hot-loader/root';
import React from 'react';
import './banknote.scss';

const Banknote = props => {
	const nominal = props.bankNoteKey !== 'remainder' ? `Rp. ${props.bankNoteKey} x ${props.value}` : `Left Rp. ${props.value}`;
	return (
		<div className="banknote">
			<div className="banknote__name">{nominal}</div>
			{/* <div className="banknote__val">{}</div> */}
		</div>
	);
};



export default hot(Banknote);
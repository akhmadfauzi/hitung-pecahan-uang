import { hot } from 'react-hot-loader/root';
import React from 'react';
import './banknote.scss';

const Banknote = props => {
	const nominal = props.bankNoteKey !== 'remainder' ? `Rp. ${props.bankNoteKey} x ${props.value}` : `Left Rp. ${props.value}`;
	const content = props.isEmpty ? 'No banknotes' : nominal;
	const bankNoteClass = props.isEmpty ? 'banknote banknote--empty' : 'banknote';
	return (
		<div className={bankNoteClass}>
			<div className="banknote__name">{content}</div>
			{/* <div className="banknote__val">{}</div> */}
		</div>
	);
};



export default hot(Banknote);
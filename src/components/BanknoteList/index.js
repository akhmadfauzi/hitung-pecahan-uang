import {hot} from 'react-hot-loader/root';
import React,{ Component } from 'react';
import Banknote from '../Banknote';
const BanknoteList = props =>{
    const generateBanknotes = (banknotes) => {
		let results = [];
		if (banknotes) {
			for (const key in banknotes) {
				results = [...results, <Banknote key={key} bankNoteKey={key} value={banknotes[key]} />]
			}
		}
		return results;
    }
	
	

    return (
        <div className="banknote-list">
			{generateBanknotes(props.banknotes)}
        </div>
    );
}

export default hot(BanknoteList);
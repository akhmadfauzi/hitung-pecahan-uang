import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import Banknote from '../Banknote';
import BanknoteList from '../BanknoteList';
import './denominator.scss';

class Denominator extends Component {
	constructor(props) {
		super(props);
		this.inputCashHandler = this.inputCashHandler.bind(this);
		this.onBlurHandler = this.onBlurHandler.bind(this);
		this.onFocusHandler = this.onFocusHandler.bind(this);
		this.state = { bankNotes: null, isValid: false, isFocus: false };
	}

	/**
	 * 
	 * @param {string} cash 
	 * Calculate the input to determine the currency fractions.
	 * 
	 * @returns Object
	 */
	denominationCalculator(cash) {
		let result = {};
		const bankNotes = [100000, 50000, 20000, 10000, 5000, 1000, 500, 100, 50];

		for (let i = 0; i < bankNotes.length; i++) {
			let bankNoteCount = Math.floor(cash / bankNotes[i]);

			if (bankNoteCount > 0) {
				cash = cash - (bankNoteCount * bankNotes[i]);
				result[bankNotes[i]] = bankNoteCount;
			}
		}

		if (cash) {
			let remainder = Math.fround(cash);
			result['Remainder'] = Number.isInteger(remainder) ? remainder : remainder.toFixed(2).replace('.', ',');
		}
		return result;
	}

	/**
	 * 
	 * @param {string} value 
	 * Sanitize user input
	 */
	isClean(value) {
		const regex = /^[^<>;:/\\\^\`\'\"*]+$/gi;
		return regex.test(value);
	}
	/**
	 * 
	 * @param {string} value 
	 * Validate user input against the given rules.
	 * @returns boolean
	 * @default false
	 */
	isValid(value) {
		const basePattern = pattern => new RegExp(`^(Rp\\s?)?${pattern}(\\,)?([\\d]{1,2}|\\-)?$`,'g');
		const pattern1 = basePattern('(\\d{1,3}\\.)(\\.?\\d{3})+');
		const pattern2 = basePattern('(\\d+)(?!\\.?\\d{3})+');
		
		const isValidFormat = (pattern1.test(value) || pattern2.test(value));

		return this.isClean(value) ? isValidFormat : false;
		// return isValidFormat;
	}

	/**
	 * 
	 * @param {string} value 
	 * Parse user input into proper string.
	 * @returns string
	 * @default undefined
	 */
	inputParser(value) {
		const regex = /(\d|,)+/gi;

		return value ? value.match(regex).join('').replace(',', '.') : undefined;
	}

	/**
	 * 
	 * @param {event} e 
	 * Process the user input
	 */
	inputCashHandler(e) {
		const target = e.target;
		const key = e.charCode ? e.charCode : e.keyCode;
		const isValid = this.isValid(target.value);
		
		this.setState({ 
			isValid: isValid,
			bankNotes: !isValid ? null : this.state.bankNotes
		});

		if (key === 13 && isValid) {
			const value = this.inputParser(target.value);
			if (value) {
				
				this.setState({ bankNotes: this.denominationCalculator(value) });
			} else {
				this.setState({ bankNotes: null });
			}
		}
	}

	onBlurHandler() {
		this.setState({ isFocus: false });
	}

	onFocusHandler(e) {
		const target = e.target;
		const isInputValid = this.isValid(target.value);
		this.setState({ isFocus: true, isValid: isInputValid });
	}

	generateBanknotes(banknotes) {
		let results = [];
		if (banknotes) {
			for (const key in banknotes) {
				results = [...results, <Banknote key={key} bankNoteKey={key} value={banknotes[key]} />]
			}
		}
		return results;
	}


	render() {
		const store = this.state;
		const bankNotes = store.bankNotes !== null ? <BanknoteList banknotes={store.bankNotes}/> : <Banknote isEmpty={true} />;
		const inputClass = !store.isValid && store.isFocus ? 'input-invalid' : '';
		return (
			<div className="denomination">
				<div className="denomination__header">
					<div className="input-group">
						<input
							type="text"
							className={inputClass}
							onKeyUp={this.inputCashHandler}
							onBlur={this.onBlurHandler}
							onFocus={this.onFocusHandler}
							placeholder="Enter value e.g 10000, Rp. 1000 and press Enter"
						/>
					</div>
				</div>
				<div className="denomination__body">
					<div className="input-group">
						{bankNotes}
					</div>
				</div>
				<h1>{this.state.isValid}</h1>
			</div>
		);
	}
}

export default hot(Denominator);
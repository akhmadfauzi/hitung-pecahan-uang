import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import Banknote from '../Banknote';
import './denominator.scss';

class Denominator extends Component {
	constructor(props) {
		super(props);
		this.inputCashHandler = this.inputCashHandler.bind(this);
		this.onBlurHandler = this.onBlurHandler.bind(this);
		this.state = { bankNotes: null, isInvalid: false }
	}
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

		if (cash) { result['remainder'] = Math.fround(cash); }

		return result;
	}

	validator(input) {
		const regex = /^(rp\s?)?(\d+\.?)(\.?\d{3})*(\,[\d]{2})?$/gi;
		// console.log(regex.test(input));
		return regex.test(input);
	}

	inputParser(input) {
		const regex = /(\d|,)+/gi;
		return input.match(regex).join('').replace(',', '.');
	}

	inputCashHandler(e) {
		const target = e.target;
		const key = e.charCode ? e.charCode : e.keyCode;
		const isInputValid = this.validator(target.value);
		console.log(key, isInputValid);
		if (key === 13 && isInputValid) {
			const value = this.inputParser(target.value);
			console.log(value);
			if (value) {
				this.setState({ bankNotes: this.denominationCalculator(value) });
			} else {
				this.setState({ bankNotes: null });
			}
		} else {
			this.setState({
				isInvalid: !isInputValid ? true : false,
				bankNotes: !isInputValid ? null : this.state.bankNotes
			});
		}


	}

	onBlurHandler(){
		this.setState({isInvalid: false});
	}

	setBanknotes(banknotes) {
		let results = [];
		if (banknotes) {
			for (const key in banknotes) {
				results = [...results, <Banknote key={key} bankNoteKey={key} value={banknotes[key]} />]
			}
		}
		return results;
	}


	render() {
		const bankNotes = this.state.bankNotes !== null ? this.setBanknotes(this.state.bankNotes) : <Banknote isEmpty={true} />;
		const isInvalid = this.state.isInvalid ? 'input-invalid' : '';
		return (
			<div className="denomination">
				<div className="denomination__header">
					<div className="input-group">
						<input
							type="text"
							className={`${isInvalid}`}
							onKeyPress={this.inputCashHandler}
							onBlur={this.onBlurHandler}
							placeholder="Enter value e.g 10000, Rp. 1000 and press Enter"
						/>
					</div>
				</div>
				<div className="denomination__body">
					{bankNotes}
				</div>
			</div>
		);
	}
}

export default hot(Denominator);
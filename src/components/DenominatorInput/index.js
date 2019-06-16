import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import './denominator-input.scss';

class Denominator extends Component {
	constructor(props) {
		super(props);
		this.onKeyUpHandler = this.onKeyUpHandler.bind(this);
		this.onBlurHandler = this.onBlurHandler.bind(this);
		this.onFocusHandler = this.onFocusHandler.bind(this);
	}
	onKeyUpHandler(e) {
		this.props.onKeyUp(e);
	}

	onBlurHandler() {
		this.props.onBlur();
	}

	onFocusHandler(e) {
		this.props.onFocus(e);
	}

	render() {
		const store = this.props.store;
		const inputClass = !store.isValid && store.isFocus ? 'input input--invalid' : 'input'; //
		return (
			<React.Fragment>
				<input
					type="text"
					className={inputClass}
					onKeyUp={this.onKeyUpHandler}
					onBlur={this.onBlurHandler}
					onFocus={this.onFocusHandler}
					placeholder="Enter value e.g 10000, Rp. 1000 and press Enter"
				/>
			</React.Fragment>
		);
	}
}

export default hot(Denominator);
import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';

const STATUS = {
	HOVERED: 'hovered',
	NORMAL: 'normal',
}

const Link = (props) => {
	const [status, setStatus] = useState(
		{ class: STATUS.NORMAL }
	);

	const _onMouseEnter = () => {
		setStatus({ class: STATUS.HOVERED });
	}

	const _onMouseLeave = () => {
		setStatus({ class: STATUS.NORMAL });
	}

	return (
		<a
			className={status}
			href={props.page || '#'}
			onMouseEnter={_onMouseEnter}
			onMouseLeave={_onMouseLeave}
		>
			{props.children}
		</a>
	);
}

export default hot(Link);
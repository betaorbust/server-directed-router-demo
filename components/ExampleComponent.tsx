'use client';
import React, { useContext, useState } from 'react';
import RouterContext from './router/RouterContext';

type ExampleProps = {
	title: string;
	someId: number;
	someActionName: string;
};

const ExampleElement: React.FunctionComponent<ExampleProps> = ({
	title,
	someId: index,
	someActionName: demoActionName,
}) => {
	const { data, takeAction } = useContext(RouterContext);
	const [inFlight, setInFlight] = useState(false);
	return (
		<div>
			<h2>
				USING EXAMPLE COMPONENT {index}: {title}
			</h2>
			<pre>{JSON.stringify(data, null, 2)}</pre>
			<button
				disabled={inFlight}
				onClick={() => {
					setInFlight(true);
					takeAction({
						type: 'action',
						name: demoActionName,
						data: {},
					}).then(() => setInFlight(() => false));
				}}
			>
				{inFlight ? 'In Flight...' : 'Send Action'}
			</button>
		</div>
	);
};

export default ExampleElement;

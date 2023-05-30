/**
 * Some mocked Dynecom functions. These are implemented as Server Functions
 * because that's way easy to work with, but these could be graphql queries
 * or other network requests if we're not using Next.
 */
import { Action } from '@/components/router/RouterContext';

function isIn<T extends object>(key: PropertyKey, obj: T): key is keyof T {
	return key in obj;
}

// always succeeds at the moment.
export const viewFromDynecom = async (
	flow: string,
	mode: string
): Promise<{ flow: string; mode: string; fields: Record<string, any> }> => {
	'server function';
	const responseData = {
		flow,
		mode,
		fields: {
			...(await getRandomData(flow + mode)),
		},
	};
	return responseData;
};

// A mocked action request to Dynecom that returns a random
// flow/model from the pathToFlowMode object.
export const sendActionToDynecom = async (
	actionPayload: Action
): Promise<{ data: Record<string, any> }> => {
	'server function';
	// my "state machine"
	const actions = {
		action1: {
			flow: 'flow1',
			mode: 'mode2',
		},
		action2: {
			flow: 'flow2',
			mode: 'mode1',
		},
		action3: {
			flow: 'flow2',
			mode: 'mode2',
		},
	};

	const { name } = actionPayload;
	if (!isIn(name, actions)) {
		throw new Error('Action not found: ' + name);
	}
	const { flow, mode } = actions[name];
	console.log('sending action results from dynecom: ', flow, mode);
	const responseData = {
		flow,
		mode,
		fields: {
			...(await getRandomData(flow + mode)),
		},
	};
	return { data: responseData };
};

// Turning a string in to a number so I can have a stable
// random number on arbitrary paths.
function hashToNumber(s: string, max: number) {
	return (
		Math.abs(
			s.split('').reduce(function (a, b) {
				a = (a << 5) - a + b.charCodeAt(0);
				return a & a;
			}, 0)
		) % max
	);
}

// Just grabbing some random data.
async function getRandomData(stableId: string) {
	return (
		await fetch(
			'https://jsonplaceholder.typicode.com/posts/' +
				hashToNumber(stableId, 100)
		)
	).json();
}

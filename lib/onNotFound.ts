'use server';
/**
 * The handler for how to deal with a missed route. I've made this a Server Function
 * but in our implementation it's likely a network call to some resolver or ship
 * all the known routes/paths over the wire to do a one-time lookup.
 */

// import { redirect } from 'next/navigation';

const fakeOtherFlowModeLookup: Record<string, Record<string, string>> = {
	flow2: {
		mode2: 'http://example.com',
	},
};

/**
 * A mock of an unfound route handler.
 */
export const onNotFound = async ({
	flow,
	mode,
	fields,
}: {
	flow: string;
	mode: string;
	fields: Record<string, any>;
}) => {
	console.log('missed route detected!', flow, mode);
	const otherFlowMode = fakeOtherFlowModeLookup?.[flow]?.[mode];
	console.log('otherFlowMode: ', otherFlowMode);
	throw new Error(
		`Server side redirects on at the base page level have a known bug and instead of rearchitecting this at the moment, just know that this was supposed to be a redirect to ${otherFlowMode} `
	);
};

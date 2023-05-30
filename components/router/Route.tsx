/**
 * Each route is defined by one of these wrapping components, which
 * are responsible for rendering their children if the path matches.
 */
'use client';
import React, { useContext } from 'react';
import RouterContext from './RouterContext';

type RouteProps = {
	path: string;
	children: React.ReactElement;
};

// I have this implemented as the components limiting themselves, but that was
// for brevity of the demo and seeing if I could get server components to work
// so we weren't shipping every view over the wire initially.
// A more full component would likely take the context-driven approach of react
// router or moneyball router.
const Route: React.FunctionComponent<RouteProps> = ({ path, children }) => {
	const { path: currentPath } = useContext(RouterContext);
	if (path === currentPath) {
		return children;
	}
	return null;
};

export default Route;

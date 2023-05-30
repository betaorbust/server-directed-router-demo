/**
 * The top level component of our routing system. Here we store the
 * general configuration as well as setting up the context and
 * orchestrating the routes.
 */

'use client';
import React, { useState } from 'react';
import { RouterContextProvider, TakeAction } from './RouterContext';
import { sendActionToDynecom } from '@/lib/fetchFromDynecom';

type RouterProps = {
    // Where to boot the router initially
    initialPath: string;
    // Payload to booth the router with
    initialData: Record<string, any>;
    // Map of paths to flow and mode. In the future, to dynecom "views"
    pathToSupportedViewIds: Record<string, { flow: string; mode: string }>;
    // The Route components to render in this router
    children: React.ReactNode;
    // A function to call when the router isn't able to find a route match
    onNotFound?: (data: {
        flow: string;
        mode: string;
        fields: Record<string, any>;
    }) => Promise<void>;
};

/**
 * The Router component is the top-level component that manages the state of the
 * router. It is responsible for booting the router with an initial path and
 * payload, and setting the context that allows other routes to render
 */
const Router: React.FunctionComponent<RouterProps> = ({
    initialPath,
    initialData,
    pathToSupportedViewIds,
    onNotFound,
    children,
}) => {
    const [path, setPath] = useState(initialPath);
    const [data, setData] = useState<Record<string, any>>(initialData);
    if (!pathToSupportedViewIds[path])
        throw new Error(
            `Invalid path: "${path}". Valid paths: ${Object.keys(
                pathToSupportedViewIds
            ).join(', ')}`
        );
    const { flow, mode } = pathToSupportedViewIds[path];

    const takeAction: TakeAction = async (actionPayload) => {
        console.log('takeAction', actionPayload);
        const { data: incomingData } = await sendActionToDynecom(actionPayload);
        const incomingPath = Object.entries(pathToSupportedViewIds).find(
            ([_, { flow, mode }]) => {
                return flow === incomingData.flow && mode === incomingData.mode;
            }
        )?.[0];
        if (!incomingPath)
            if (onNotFound) {
                return onNotFound({
                    mode: incomingData.mode,
                    flow: incomingData.flow,
                    fields: incomingData.data,
                });
            } else {
                throw new Error(
                    `No path found for flow: "${incomingData.flow}" and mode: "${incomingData.mode}"`
                );
            }

        setPath(incomingPath);
        setData(incomingData);
        history.pushState({}, '', incomingPath);
    };
    return (
        <RouterContextProvider value={{ path, takeAction, flow, mode, data }}>
            {children}
        </RouterContextProvider>
    );
};

export default Router;

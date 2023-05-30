'use client';
/**
 * This provides all the context values to the router's children so
 * they can figure out what data is being passed in and if they should show.
 * Without this, the router would have to pass down the data to every child
 * which is a DX pain.
 *
 * Instead, the routes that need it, can use a useContext and pull off
 * whatever they need. They also pull off the takeAction function which
 * lets us send actions to Dynecom.
 */
import { createContext } from 'react';

export type Action<T = Record<string, any>> = {
    type: string;
    name: string;
    data?: T;
};

export type TakeAction = (action: Action) => Promise<void>;

type RouterContextType = {
    path: string;
    flow: string;
    mode: string;
    data: Record<string, any>;
    takeAction: TakeAction;
};

const RouterContext = createContext(
    new Proxy(
        {},
        {
            get() {
                throw new Error('RouterContext not found');
            },
        }
    ) as RouterContextType
);

export default RouterContext;
export const RouterContextProvider = RouterContext.Provider;

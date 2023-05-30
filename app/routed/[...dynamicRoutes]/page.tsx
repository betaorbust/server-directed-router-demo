/**
 * Here's an implementation of what working with a path-based dynecom router
 * would look like from a DX standpoint. The goal is to have as close to a
 * standard looking routing solution as possible, while still being able to
 * interact with and be driven by Dynecom.
 */
import ExampleComponent from '@/components/ExampleComponent';
import Route from '@/components/router/Route';
import Router from '@/components/router/Router';
import { viewFromDynecom } from '@/lib/fetchFromDynecom';
import { onNotFound } from '@/lib/onNotFound';

/**
 * The mapping of paths to flow and mode. In the future, a Record<string, string>
 * to hellfire "views"
 */
const pathToFlowMode: Record<string, { mode: string; flow: string }> = {
    '/routed/flow1/mode1': {
        flow: 'flow1',
        mode: 'mode1',
    },
    '/routed/flow1/mode2': {
        flow: 'flow1',
        mode: 'mode2',
    },
    '/routed/flow2/mode1': {
        flow: 'flow2',
        mode: 'mode1',
    },
};

/**
 * The page component for dynamic Dynecom routes.
 */
export default async function Page({
    params,
}: {
    params: { dynamicRoutes: string[] };
}) {
    const initialPath = ['/routed', ...params.dynamicRoutes].join('/');
    console.log('initialPath', initialPath);
    const { flow, mode } = pathToFlowMode[initialPath];
    const data = await viewFromDynecom(flow, mode);

    return (
        <div>
            <h1>Dynamic Routes</h1>
            {/* Semantics are familiar to those using React Router, 
            but we decorate the top level router with some extra Dynecom-specific
            information. */}
            <Router
                initialData={data}
                initialPath={initialPath}
                pathToSupportedViewIds={pathToFlowMode}
                onNotFound={onNotFound}
            >
                {/* Routes are only defined by path  */}
                <Route path="/routed/flow1/mode1">
                    {/* Each route has its contents, but no flow/mode/view data associated with it
                    If a route DOES need that, it can pull it off of the router context provided by
                    the Router component. */}
                    <ExampleComponent
                        title={`The first route`}
                        someId={1}
                        someActionName="action1"
                    />
                </Route>
                <Route path="/routed/flow1/mode2">
                    <ExampleComponent
                        title={`The second route`}
                        someId={2}
                        someActionName="action2"
                    />
                </Route>
                <Route path="/routed/flow2/mode1">
                    <ExampleComponent
                        title={`The third route`}
                        someId={3}
                        someActionName="action3"
                    />
                </Route>
            </Router>
        </div>
    );
}

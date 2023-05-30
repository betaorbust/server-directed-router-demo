# Sever-Directed Routing with Path-Based Configuration

This is a hack-n-slash demo to show off the DX of working with a more
traditional path-based router and how keeping as close to the API surface of
existing routing solutions can make onboarding, expanding, and even maintaining,
significantly easier.

- The DX main show is in [app/routed/[...dynamicRoutes]/page.tsx](https://github.com/betaorbust/server-directed-router-demo/blob/main/app/routed/%5B...dynamicRoutes%5D/page.tsx)
- The Router is in [/components/router/\*](https://github.com/betaorbust/server-directed-router-demo/blob/main/components/router)
- The Dynecom mock out is in [/lib/fetchFromDynecom.ts](https://github.com/betaorbust/server-directed-router-demo/blob/main/lib/fetchFromDynecom.ts)
- [/lib/onNotFound.ts](https://github.com/betaorbust/server-directed-router-demo/blob/main/lib/onNotFound.ts) functionality is currently not working due to a Next.js bug (but hey, I wanted to play with the alpha stuff, so I guess that comes with the territory.) but the general idea should flow from its usage and contents. I believe that we'd likely have one main "do the rerouting correctly" function that people could use directly, or compose with other functionality as needed -- so we don't end up with a "this function does everything to everyone" sort of situation

**TO PEOPLE WHO ARE NOT KEVIN**: This is not a great example of doing anything
right. Please don't copy this for your work. Please use a standard,
community-backed solution, and do not take my hacky demo code as being stable,
performant, or generally anything other than a demo.

## Getting Started

### Deployed

https://server-directed-router-demo.vercel.app/

### Explore Code Online

https://github.dev/betaorbust/server-directed-router-demo

### Run Code Locally

Clone the repo, npm install, and run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the demo.

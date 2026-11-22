/**
 * The Express app React Router runs in, and the realtime server next to it.
 *
 * `server.ts` loads this module through Vite in development and from the
 * server build in production, so everything that should reload with the
 * app's code is imported from here, not from `server.ts`.
 */
import { createRequestHandler } from '@react-router/express';
import express from 'express';
import { createRealtimeServer } from '@/lib/realtime.server';
import { realtime as realtimeDefinition } from '@/realtime/handler.server';

export const app = express();

app.disable('x-powered-by');
app.use((_request, response, next) => {
	response.setHeader('X-Content-Type-Options', 'nosniff');
	response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
	next();
});
app.use(
	createRequestHandler({
		build: () => import('virtual:react-router/server-build'),
		mode: process.env.NODE_ENV,
	}),
);

export const realtime = createRealtimeServer({ definition: realtimeDefinition });

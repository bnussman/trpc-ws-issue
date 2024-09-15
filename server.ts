import { initTRPC } from '@trpc/server';
import { observable } from '@trpc/server/observable';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import ws from 'ws';

const t = initTRPC.create();
 
export const router = t.router;
export const publicProcedure = t.procedure;

const appRouter = router({
  onAdd: t.procedure.subscription(() => {
    return observable<number>((emit) => {
      let i = 0;
      const interval = setInterval(() => {
        emit.next(i);
        i++;
      }, 1_000);
      return () => {
        clearInterval(interval);
      };
    });
  }),
});
 
export type AppRouter = typeof appRouter;

const wss = new ws.Server({
  port: 3001,
});

const handler = applyWSSHandler({
  wss,
  router: appRouter,
});

wss.on('connection', (ws) => {
  console.log(`➕➕ Connection (${wss.clients.size})`);
  ws.once('close', () => {
    console.log(`➖➖ Connection (${wss.clients.size})`);
  });
});
console.log('✅ WebSocket Server listening on ws://localhost:3001');

process.on('SIGTERM', () => {
  console.log('SIGTERM');
  handler.broadcastReconnectNotification();
  wss.close();
});

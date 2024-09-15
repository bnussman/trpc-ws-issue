import { createTRPCClient, createWSClient, wsLink } from '@trpc/client';
import type { AppRouter } from '../server';
import { QueryClient } from '@tanstack/react-query';
import { createTRPCReact } from '@trpc/react-query';
import { ip } from './ip';

export const trpc = createTRPCReact<AppRouter>();

export const queryClient = new QueryClient();

const wsClient = createWSClient({
  url: `ws://${ip}:3001`,
  retryDelayMs: () => 1_000,
  // If you enable lazy, the WebSocket won't even reconect to the server
  // lazy: {
  //   enabled: true,
  //   closeMs: 0,
  // },
  onError(error) {
    alert("WS Error: " + JSON.stringify(error))

    // You will see:
    // "The operation couldn't be completed. Socket is not connected"
    // when you wake up your iOS device. Subscription won't resume
  }
});

export const trpcClient = trpc.createClient({
  links: [
    wsLink({
      client: wsClient,
    }),
  ],
});

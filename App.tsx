import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { trpcClient, queryClient, trpc } from './utils/trpc';
import { QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function App() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

function Home() {
  const [data, setData] = useState(0);

  trpc.onAdd.useSubscription(undefined, {
    onData(data) {
      setData(data)
    }
  });

  return (
    <View style={styles.container}>
      <Text>{data}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

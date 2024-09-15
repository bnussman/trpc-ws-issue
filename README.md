## How to reproduce

1. Downlaod [Expo Go](https://apps.apple.com/us/app/expo-go/id982107779) on your iOS device

2.  Clone this repo
3.  Install dependencies with
    ```
    bun install
    ```
4.  Start the dev servers with 
    ```
    bun start
    ```
5. On your iOS device, open Expo Go and open this project
6. Observce the counter is counting up
7. Lock your iOS device's screen and wait for the server to register that the device disconnected
8. Unlock your iOS device and observe that the tRPC subscription does not resume (I believe it also won't even reconnect if you enable lazy mode)

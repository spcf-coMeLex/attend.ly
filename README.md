# How to run?

1. npm install
1. dfx start --clean
2. dfx deploy
3. dfx generate
4. Open .env file and copy the canister ids to **EXPO_PUBLIC_CANISTER_ID_ATTENDLY**, **EXPO_PUBLIC_CANISTER_ID_INTERNET_IDENTITY**, and **EXPO_PUBLIC_CANISTER_ID_II_INTEGRATION**
5. npx expo start --clear

> This project has not been setup to work with physical devices. However, it will work fine when deployed on the ic. You can do some workarounds through the use of [Localtunnel](https://localtunnel.me/) and following how I did it on my [other project](https://github.com/spcf-coMeLex/wander.ly).

# Environment Variables

- EXPO_PUBLIC_CANISTER_ID_ATTENDLY
- EXPO_PUBLIC_CANISTER_ID_INTERNET_IDENTITY
- EXPO_PUBLIC_CANISTER_ID_II_INTEGRATION
- EXPO_PUBLIC_GEOCODING_API_KEY (Get api key at [geocode.maps.co](https://geocode.maps.co/))

# Prerequisites

- [Installing DFX](https://internetcomputer.org/docs/current/developer-docs/getting-started/install/)
- [Installing Mops for Motoko](https://mops.one/docs/install)
- [Installing Expo](https://docs.expo.dev/get-started/installation/)

> Don't forget to visit the [landing page](https://mphur-2iaaa-aaaal-qdkbq-cai.icp0.io/)

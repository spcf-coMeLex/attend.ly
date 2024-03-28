# How to run?

1. dfx start --clean
2. dfx deploy
3. dfx generate (copy canister ids to env)
4. ngrok http 4943 (copy link to env)
5. npx expo start --clear

# Environment Variables

- EXPO_PUBLIC_CANISTER_ID_ATTENDLY
- EXPO_PUBLIC_CANISTER_ID_INTERNET_IDENTITY
- EXPO_PUBLIC_CANISTER_ID_II_INTEGRATION
- EXPO_PUBLIC_GEOCODING_API_KEY
- EXPO_PUBLIC_NGROK_URL

# Prerequisites

- [Installing DFX](https://internetcomputer.org/docs/current/developer-docs/getting-started/install/)
- [Installing Expo](https://docs.expo.dev/get-started/installation/)
- [Installing Mops for Motoko](https://mops.one/docs/install)

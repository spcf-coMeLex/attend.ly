### 🏆 IRCITE 2024: 2nd Runner Up

✅ [Check it out!](https://medium.com/@ICPHubPH/ircite-2024-celebrating-innovation-and-creativity-at-ithink-hackathon-award-ceremony-58734293686f)

🎥 [Video Presentation](https://drive.google.com/file/d/1PHRe09-dPGpJSBdcTh9moOt1ynkTuv-z/view?usp=drive_link)

💼 [Pitch Deck](https://drive.google.com/file/d/1ahqI-v3lakgpjhwY9DWNDmYr9hr6S3V5/view?usp=drive_link)


# Landing Page

```
https://mphur-2iaaa-aaaal-qdkbq-cai.icp0.io/
```
**Repository:** https://github.com/spcf-coMeLex/attend.ly-landing

# How to run?

1. `npm install`
2. `cd src/ii_integration && npm install && cd ../..`
3. `dfx start --clean`
4. `dfx deploy`
5. `dfx generate`
6. Open .env file and copy the canister ids to `EXPO_PUBLIC_CANISTER_ID_ATTENDLY`, `EXPO_PUBLIC_CANISTER_ID_INTERNET_IDENTITY`, and `EXPO_PUBLIC_CANISTER_ID_II_INTEGRATION`.
7. `npx expo start --clear`

> This project has not been setup to work with physical devices locally. However, it will work fine when deployed on the ic. If you want to make it work locally, you can do some workarounds through the use of [Localtunnel](https://localtunnel.me/) and following how I did it on my [other project](https://github.com/melmatx/wander.ly).

# Environment Variables

- EXPO_PUBLIC_CANISTER_ID_ATTENDLY
- EXPO_PUBLIC_CANISTER_ID_INTERNET_IDENTITY
- EXPO_PUBLIC_CANISTER_ID_II_INTEGRATION
- EXPO_PUBLIC_GEOCODING_API_KEY (Get api key at [geocode.maps.co](https://geocode.maps.co/))

# Prerequisites

- [Installing DFX](https://internetcomputer.org/docs/current/developer-docs/getting-started/install/)
- [Installing Mops for Motoko](https://mops.one/docs/install)
- [Installing Expo](https://docs.expo.dev/get-started/installation/)

# Programmers

- Mel Mathew C. Palaña (Full-stack developer)
- Alexander John Cammado (Backend developer)

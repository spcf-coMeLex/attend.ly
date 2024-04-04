import { create } from "zustand";

import useICPFetching from "./useICPFetching";
import getBackendActor from "../src/actor";

const useProfileStore = create((set) => ({
  role: "",
  profile: {},
  setRole: (role) => {
    set({ role });
  },
  fetchRoleAndProfile: async (identity) => {
    useICPFetching.getState().setIsFetching(true);

    const actor = getBackendActor(identity);

    let result;
    try {
      result = await actor.getRoleAndProfile();
    } finally {
      useICPFetching.getState().setIsFetching(false);
    }

    const { err, ok } = result;

    if (err) {
      console.log(err);
      return false;
    }

    if (ok) {
      const profile = Object.entries(ok.profile).reduce((acc, [key, value]) => {
        if (Array.isArray(value)) {
          acc[key] = "";
        } else {
          acc[key] = value;
        }
        return acc;
      }, {});

      set({ role: ok.role, profile });
      console.log({ role: ok.role, profile: ok.profile });
      return true;
    }
  },
  clearProfile: async () => {
    set({ role: "", profile: {} });
  },
}));

export default useProfileStore;

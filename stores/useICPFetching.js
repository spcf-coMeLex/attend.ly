import { create } from "zustand";

const useICPFetching = create((set) => ({
  isFetching: false,
  setIsFetching: (value) => set({ isFetching: value }),
}));

export default useICPFetching;

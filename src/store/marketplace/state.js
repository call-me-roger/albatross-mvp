import { createState, useState } from '@hookstate/core'

const marketplaceState = createState({
  listings: [],
  isLoading: false,
  neverLoaded: true,
})

export function useMarketplaceState() {
  const state = useState(marketplaceState)

  return {
    get listings() {
      return state.listings.get()
    },
    get isLoading() {
      return state.isLoading.get()
    },
    get neverLoaded() {
      return state.neverLoaded.get()
    },
    setListings(newListings) {
      return state.listings.set(newListings)
    },
    startLoading() {
      state.isLoading.set(true)
      if (state.neverLoaded.get()) state.neverLoaded.set(false)
    },
    stopLoading() {
      state.isLoading.set(false)
    },
  }
}

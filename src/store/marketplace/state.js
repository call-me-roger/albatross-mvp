import { createState, useState } from '@hookstate/core'

const marketplaceState = createState({
  listings: [],
  isLoading: false,
  neverLoaded: true,
  balance: 0,
  currentPage: 1,
  pageLimit: 20,
  totalPages: 1,
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
    get balance() {
      return state.balance.get()
    },
    get currentPage() {
      return state.currentPage.get()
    },
    get pageLimit() {
      return state.pageLimit.get()
    },
    get totalPages() {
      return state.totalPages.get()
    },
    setListings(newListings) {
      return state.listings.set(newListings)
    },
    setCurrentPage(newPage) {
      return state.currentPage.set(newPage)
    },
    setPageLimit(newLimit) {
      return state.pageLimit.set(newLimit)
    },
    setTotalPages(newTotal) {
      return state.totalPages.set(newTotal)
    },
    startLoading() {
      state.isLoading.set(true)
    },
    stopLoading() {
      state.isLoading.set(false)
      if (state.neverLoaded.get()) state.neverLoaded.set(false)
    },
    setBalance(newBalance) {
      return state.balance.set(newBalance)
    },
  }
}

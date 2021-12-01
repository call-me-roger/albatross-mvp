import { getRounds } from 'contracts/Gameplay'
import { useEffect, useRef, useState } from 'react'
import { useTournamentState } from 'store/tournaments/state'

const useTournaments = props => {
  const { initialFetch } = props || {}

  const sliderRef = useRef(null)
  const [currentRound, setCurrentRound] = useState(null)
  const [displayRound, setDisplayRound] = useState(null)
  const {
    rounds,
    isLoading,
    startLoading,
    stopLoading,
    neverLoaded,
    setRounds,
    currentRoundIndex,
    setCurrentRoundIndex,
  } = useTournamentState()

  function goToSlide(newIndex) {
    const sliderApi = sliderRef?.current
    if (sliderApi?.slickGoTo) sliderApi.slickGoTo(newIndex)
  }

  function updateCurrentRound(newIndex) {
    setCurrentRoundIndex(newIndex)
    goToSlide(newIndex)
    setCurrentRound(newIndex)
    setDisplayRound(newIndex)
  }

  async function refreshRounds() {
    if (!isLoading) {
      startLoading()
      const { rounds: newRounds, currentRoundIndex: newRoundIndex } =
        await getRounds()
      setRounds(
        newRounds.map(({ id, hole, bonusPerkType, victory }) => {
          return { id, hole, bonusPerkType, victory }
        }),
      )
      updateCurrentRound(newRoundIndex)
    }

    stopLoading()
  }

  useEffect(() => {
    if (initialFetch) {
      refreshRounds()
      goToSlide(currentRoundIndex)
    }
    // eslint-disable-next-line
  }, [])

  return {
    rounds,
    currentRound,
    displayRound,
    setCurrentRound,
    setDisplayRound,
    refreshRounds,
    isLoading,
    startLoading,
    stopLoading,
    neverLoaded,
    sliderRef,
  }
}

export default useTournaments

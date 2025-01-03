import type { RconStats } from '@lazy/rcon'
import { createStore } from '@xstate/store'
import { useSelector } from '@xstate/store/react'

export type Overview = {
  isConnected: boolean
  playersOnline: number | undefined
  playersLimit: number | undefined
  latency: number | undefined
  players: readonly string[] | undefined
  whitelist: readonly string[] | undefined
}

const initContext: Overview = {
  isConnected: false,
  playersOnline: undefined,
  playersLimit: undefined,
  latency: undefined,
  players: undefined,
  whitelist: undefined,
}

const overview = createStore({
  context: initContext,
  on: {
    stats: (context, event: RconStats) => {
      if (!event.isConnected) {
        return initContext
      }

      return {
        isConnected: event.isConnected,
        latency: event.lastResponseLatencyInMs,
      }
    },
    list: (context, event: { count: number; max: number; players: readonly string[] }) => ({
      playersOnline: event.count,
      playersLimit: event.max,
      players: event.players,
    }),
    whitelist: (connect, event: { players: readonly string[] }) => ({
      whitelist: event.players,
    }),
  },
})

export const useOverview = () => useSelector(overview, (state) => state.context)
export const useOverviewIsConnected = () =>
  useSelector(overview, (state) => state.context.isConnected)
export const useOverviewWhitelist = () => useSelector(overview, (state) => state.context.whitelist)

export const handleOverviewStats = (stats: RconStats) => {
  overview.send({ type: 'stats', ...stats })
}
export const handleOverviewList = (payload: {
  count: number
  max: number
  players: readonly string[]
}) => {
  overview.send({ type: 'list', ...payload })
}
export const handleOverviewWhitelist = (payload: { players: readonly string[] }) => {
  overview.send({ type: 'whitelist', ...payload })
}

import React, { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from 'react'

const BURNER_WALLET = 'BURNER_WALLET'
const LAST_SAVED = 'LAST_SAVED'

const ACCOUNT_KEY = 'ACCOUNT_KEY'
const TRANSACTIONS_KEY = 'TRANSACTIONS_KEY'

const UPDATABLE_KEYS = [
  ACCOUNT_KEY,
  TRANSACTIONS_KEY
]

const UPDATE_KEY = 'UPDATE_KEY'

const LocalStorageContext = createContext(undefined as any)

function useLocalStorageContext() {
  return useContext(LocalStorageContext)
}

function init() {
  const defaultLocalStorage = {
    [ACCOUNT_KEY]: undefined,
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(BURNER_WALLET) as any)
    return { ...defaultLocalStorage, ...parsed }
  } catch {
    return defaultLocalStorage
  }
}

function reducer(state: any, { type, payload }: any) {
  switch (type) {
    case UPDATE_KEY: {
      const { key, value } = payload
      if (!UPDATABLE_KEYS.some(k => k === key)) {
        throw Error(`Unexpected key in LocalStorageContext reducer: '${key}'.`)
      } else {
        return {
        ...state,
        [key]: value
        }
      }
    }
    default: {
      throw Error(`Unexpected action type in LocalStorageContext reducer: '${type}'.`)
    }
  }
}

export function Updater() {
  const [state] = useLocalStorageContext() as any

  useEffect(() => {
    window.localStorage.setItem(BURNER_WALLET, JSON.stringify({ ...(state as any), [LAST_SAVED]: Math.floor(Date.now() / 1000) }))
  })

  return null
}

export default function Provider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, undefined, init)

  const updateKey = useCallback((key, value) => {
    dispatch({ type: UPDATE_KEY, payload: { key, value } })
  }, [])

  return (
    <LocalStorageContext.Provider value={useMemo(() => [state, { updateKey }], [state, updateKey])}>
      {children}
    </LocalStorageContext.Provider>
  )
}

export function useMnemonic() {
  const [state, { updateKey }] = useLocalStorageContext()

  let accountKey = state[ACCOUNT_KEY]

  const setMnemonic = useCallback(
    value => {
      updateKey(ACCOUNT_KEY, value)
    },
    [updateKey, accountKey]
  )

  return [state[ACCOUNT_KEY], setMnemonic]
}

export function useTransactionsQueue() {
  const [state, { updateKey }] = useLocalStorageContext()

  let transactionsKey = state[TRANSACTIONS_KEY]

  const addTransaction = useCallback(
    value => {
      updateKey(TRANSACTIONS_KEY, [...transactionsKey, value])
    },
    [updateKey, transactionsKey]
  )

  const removeTransaction = useCallback(
    value => {
      updateKey(TRANSACTIONS_KEY, [...transactionsKey, value])
    },
    [updateKey, transactionsKey]
  )

  return [state[TRANSACTIONS_KEY], addTransaction]
}

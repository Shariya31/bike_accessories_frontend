'use client'
import { persistor, store } from '@/store/store'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'


const GlobalProvider = ({children}) => {
  return (
    <Provider store={store}>
        <PersistGate persistor={persistor} loading={<h2>Loading</h2>}>
            {children}
        </PersistGate>
    </Provider>
  )
}

export default GlobalProvider

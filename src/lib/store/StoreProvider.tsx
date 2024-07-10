'use client'
import { Provider } from 'react-redux'
import craveMartStore from './store'

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode
}) {

    return <Provider store={craveMartStore}>{children}</Provider>
}
'use client'

import { createContext, useContext, ReactNode } from 'react'
import { User } from '@/types'

const UserContext = createContext<User | null>(null)

export function UserProvider({ children, user }: { children: ReactNode; user: User }) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used within a UserProvider')
  return context
}

export default UserProvider
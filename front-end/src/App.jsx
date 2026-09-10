import { useState } from 'react'
import Header from './components/Header.jsx'
import Dashboard from './components/Dashboard.jsx'
import Simulador from './components/Simulador.jsx'
import { Login } from './components/Login.jsx'
import { useAuth } from './hooks/AuthContext.jsx'
import styles from './App.module.css'

export default function App() {
  const [tab, setTab] = useState('dashboard')
  const { user, loading, logout } = useAuth()

  if (loading) {
    return <div className={styles.app}>Carregando...</div>
  }

  if (!user) {
    return (
      <div className={styles.app}>
        <Login />
      </div>
    )
  }

  return (
    <div className={styles.app}>
      <Header tab={tab} setTab={setTab} user={user} onLogout={logout} />
      <main className={styles.main}>
        {tab === 'dashboard' ? <Dashboard /> : <Simulador />}
      </main>
    </div>
  )
}
import { useState, useRef, useEffect } from 'react'
import styles from './Header.module.css'

export default function Header({ tab, setTab, user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  // Fecha o dropdown se clicar fora dele
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const displayName = user?.name || user?.email || 'Usuário'
  const initial = displayName.charAt(0).toUpperCase()

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.dot} />
        <span className={styles.name}>FinFreela</span>
      </div>
      <nav className={styles.nav}>
        <button
          className={`${styles.btn} ${tab === 'dashboard' ? styles.active : ''}`}
          onClick={() => setTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`${styles.btn} ${tab === 'simulador' ? styles.active : ''}`}
          onClick={() => setTab('simulador')}
        >
          Simulador
        </button>

        {user && (
          <div className={styles.userMenu} ref={menuRef}>
            <button
              className={styles.userBtn}
              onClick={() => setMenuOpen(prev => !prev)}
            >
              <span className={styles.avatar}>{initial}</span>
              <span className={styles.userName}>{displayName}</span>
              <span className={styles.chevron}>{menuOpen ? '▲' : '▼'}</span>
            </button>

            {menuOpen && (
              <div className={styles.dropdown}>
                <div className={styles.dropdownEmail}>{user.email}</div>
                <button
                  className={styles.dropdownItem}
                  onClick={() => {
                    setMenuOpen(false)
                    onLogout()
                  }}
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}
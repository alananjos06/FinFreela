import { useState } from 'react'
import { useAuth } from '../hooks/AuthContext.jsx'
import styles from './Login.module.css'

export function Login() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const { login, register } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      if (isRegistering) {
        await register(name, email, password)
      } else {
        await login(email, password)
      }
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <span className={styles.tag}>// FINFREELA</span>
        <h2 className={styles.title}>
          {isRegistering ? 'Criar conta' : 'Entrar'}
        </h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          {isRegistering && (
            <input
              className={styles.input}
              type="text"
              placeholder="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            className={styles.input}
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className={styles.submit} type="submit">
            {isRegistering ? 'Cadastrar' : 'Entrar'}
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        <button
          className={styles.toggle}
          onClick={() => {
            setIsRegistering(!isRegistering)
            setError('')
          }}
        >
          {isRegistering ? 'Já tenho conta' : 'Criar nova conta'}
        </button>
      </div>
    </div>
  )
}
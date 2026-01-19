import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { setToken } from "../utils/auth"
import "./Login.css"


const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // ✅ MOCK LOGIN LOGIC
    setTimeout(() => {
      if (email === "eve.holt@reqres.in" && password === "cityslicka") {
        setToken("mock-token-123")
        navigate("/dashboard")
      } else {
        setError("Invalid credentials. Try again.")
      }
      setLoading(false)
    }, 1000)
  }

return (
  <div className="login-container">
    <div className="login-box">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        Use:<br />
        Email: <b>eve.holt@reqres.in</b><br />
        Password: <b>cityslicka</b>
      </p>
    </div>
  </div>
)

}

export default Login

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { clearToken } from "../utils/auth"

const Dashboard = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const fetchUsers = async () => {
    setLoading(true)
    setError("")

    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users")
      setUsers(response.data)
    } catch (err) {
      setError("Failed to load users.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const logout = () => {
    clearToken()
    navigate("/login")
  }

  if (loading) return <p>Loading...</p>

  if (error)
    return (
      <div>
        <p>{error}</p>
        <button onClick={fetchUsers}>Retry</button>
      </div>
    )

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} — {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dashboard

import { useEffect, useState } from 'react'
import { fetchCollection } from '../services/api'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('users')
      .then((data) => {
        if (isMounted) {
          setUsers(data)
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message)
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="container py-4">
      <h2 className="mb-4">Users</h2>
      {loading && <p>Loading…</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="row g-3">
          {users.map((user) => (
            <div className="col-md-6" key={user.id || user._id || user.email}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text mb-1">{user.email}</p>
                  <span className="badge bg-primary">{user.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Users

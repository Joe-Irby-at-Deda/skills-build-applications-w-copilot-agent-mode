import { useEffect, useState } from 'react'
import { fetchCollection } from '../services/api'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('leaderboard')
      .then((data) => {
        if (isMounted) {
          setEntries(data)
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
      <h2 className="mb-4">Leaderboard</h2>
      {loading && <p>Loading…</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="list-group">
          {entries.map((entry, index) => (
            <div className="list-group-item d-flex justify-content-between align-items-center" key={entry.id || entry._id || entry.name}>
              <span>
                <strong>#{index + 1}</strong> {entry.name}
              </span>
              <span className="badge bg-success">{entry.points} pts</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Leaderboard

import { useEffect, useState } from 'react'
import { fetchCollection } from '../services/api'

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('activities')
      .then((data) => {
        if (isMounted) {
          setActivities(data)
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
      <h2 className="mb-4">Activities</h2>
      {loading && <p>Loading…</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="row g-3">
          {activities.map((activity) => (
            <div className="col-md-6" key={activity.id || activity._id || activity.type}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-capitalize">{activity.type}</h5>
                  <p className="card-text mb-1">{activity.duration} min</p>
                  <p className="card-text">{activity.distance} km</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Activities

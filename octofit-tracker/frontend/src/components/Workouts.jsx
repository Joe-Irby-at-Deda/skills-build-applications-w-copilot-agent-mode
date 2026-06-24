import { useEffect, useState } from 'react'
import { fetchCollection } from '../services/api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('workouts')
      .then((data) => {
        if (isMounted) {
          setWorkouts(data)
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
      <h2 className="mb-4">Workouts</h2>
      {loading && <p>Loading…</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="row g-3">
          {workouts.map((workout) => (
            <div className="col-md-6" key={workout.id || workout._id || workout.title}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{workout.title}</h5>
                  <p className="card-text text-capitalize">{workout.difficulty}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Workouts

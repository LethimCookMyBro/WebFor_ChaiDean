import { useState } from 'react'
import HomePage from './pages/HomePage'
import StatusBanner from './components/StatusBanner'

function App() {
  const [riskData, setRiskData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  return (
    <div className="min-h-screen">
      {/* Disclaimer Banner */}
      <StatusBanner 
        type="disclaimer"
        message="⚠️ Approximate risk model. Follow official civil defence guidance."
        gpsWarning={riskData?.gps_warning}
      />
      
      {/* Main Content */}
      <HomePage 
        riskData={riskData}
        setRiskData={setRiskData}
        loading={loading}
        setLoading={setLoading}
        error={error}
        setError={setError}
      />
    </div>
  )
}

export default App

import React, { useState } from 'react'
import SequenceInput from './components/SequenceInput'
import SampleTypeSelector from './components/SampleTypeSelector'
import ResultsDisplay from './components/ResultsDisplay'
import VisualizationPanel from './components/VisualizationPanel'

function App() {
  const [sequence, setSequence] = useState('')
  const [sampleType, setSampleType] = useState('dna')
  const [results, setResults] = useState(null)

  const handleSequenceSubmit = (seq) => {
    setSequence(seq)
    // Simulate results
    setResults({
      primers: [
        { name: 'F3', sequence: 'ATGCTAGCTAGCT' },
        { name: 'B3', sequence: 'GCTAGCTAGCTA' },
        { name: 'FIP', sequence: 'CTAGCTAGCTAGCTAGCTAGCT' },
        { name: 'BIP', sequence: 'AGCTAGCTAGCTAGCTAGCTA' },
        { name: 'LF', sequence: 'GCTAGCTAGC' },
        { name: 'LB', sequence: 'CTAGCTAGCT' }
      ]
    })
  }

  return (
    <div className="app">
      <header>
        <h1>LAMPGenie</h1>
        <p>LAMP Primer Design Assistant for Rapid Molecular Diagnostics</p>
      </header>
      
      <main>
        <div className="results-section">
          <div className="input-section">
            <SampleTypeSelector 
              sampleType={sampleType} 
              onSampleTypeChange={setSampleType} 
            />
            <SequenceInput 
              onSubmit={handleSequenceSubmit}
            />
          </div>
          <div className="results-display">
            {results && <ResultsDisplay results={results} />}
          </div>
        </div>
        
        {results && sequence && (
          <div className="visualization-panel">
            <VisualizationPanel 
              sequence={sequence}
              primers={results.primers}
            />
          </div>
        )}
      </main>
    </div>
  )
}

export default App

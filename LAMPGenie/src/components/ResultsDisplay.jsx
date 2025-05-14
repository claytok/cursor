import React from 'react';

function ResultsDisplay({ results }) {
  const { primers, reactionConditions } = results;
  
  return (
    <div className="results-display">
      <h2>Your Optimized LAMP Reaction</h2>
      
      <div className="results-section">
        <h3>LAMP Primers</h3>
        <div className="primers-table">
          <table>
            <thead>
              <tr>
                <th>Primer</th>
                <th>Sequence (5' → 3')</th>
                <th>Tm (°C)</th>
                <th>GC%</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>F3</td>
                <td>{primers.F3.sequence}</td>
                <td>{primers.F3.tm.toFixed(1)}</td>
                <td>{primers.F3.gcContent.toFixed(1)}</td>
              </tr>
              <tr>
                <td>B3</td>
                <td>{primers.B3.sequence}</td>
                <td>{primers.B3.tm.toFixed(1)}</td>
                <td>{primers.B3.gcContent.toFixed(1)}</td>
              </tr>
              <tr>
                <td>FIP (F1c+F2)</td>
                <td>{primers.FIP.sequence}</td>
                <td>{primers.FIP.tm.toFixed(1)}</td>
                <td>{primers.FIP.gcContent.toFixed(1)}</td>
              </tr>
              <tr>
                <td>BIP (B1c+B2)</td>
                <td>{primers.BIP.sequence}</td>
                <td>{primers.BIP.tm.toFixed(1)}</td>
                <td>{primers.BIP.gcContent.toFixed(1)}</td>
              </tr>
              <tr>
                <td>LF</td>
                <td>{primers.LF.sequence}</td>
                <td>{primers.LF.tm.toFixed(1)}</td>
                <td>{primers.LF.gcContent.toFixed(1)}</td>
              </tr>
              <tr>
                <td>LB</td>
                <td>{primers.LB.sequence}</td>
                <td>{primers.LB.tm.toFixed(1)}</td>
                <td>{primers.LB.gcContent.toFixed(1)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="results-section">
        <h3>Reaction Conditions</h3>
        
        <div className="reaction-details">
          <div className="detail-item">
            <h4>Enzyme</h4>
            <p>{reactionConditions.enzyme.name}</p>
            <p>{reactionConditions.enzyme.concentration}</p>
            <p className="note">{reactionConditions.enzyme.notes}</p>
          </div>
          
          <div className="detail-item">
            <h4>Buffer</h4>
            <p>{reactionConditions.buffer.name}</p>
            <p className="detail">{reactionConditions.buffer.composition}</p>
          </div>
          
          <div className="detail-item">
            <h4>Magnesium</h4>
            <p>{reactionConditions.magnesium.compound}</p>
            <p className="detail">{reactionConditions.magnesium.concentration}</p>
          </div>
          
          <div className="detail-item">
            <h4>Betaine</h4>
            <p>{reactionConditions.betaine.concentration}</p>
          </div>
          
          <div className="detail-item">
            <h4>dNTPs</h4>
            <p>{reactionConditions.dNTPs.concentration}</p>
          </div>
          
          <div className="detail-item">
            <h4>Temperature</h4>
            <p>{reactionConditions.incubationTemperature}</p>
          </div>
          
          <div className="detail-item">
            <h4>Incubation Time</h4>
            <p>{reactionConditions.incubationTime}</p>
          </div>
          
          {reactionConditions.additionalComponents.length > 0 && (
            <div className="detail-item">
              <h4>Additional Components</h4>
              {reactionConditions.additionalComponents.map((component, i) => (
                <div key={i}>
                  <p>{component.name} ({component.concentration})</p>
                  <p className="note">{component.purpose}</p>
                </div>
              ))}
            </div>
          )}
          
          {reactionConditions.pretreatment !== 'None' && (
            <div className="detail-item">
              <h4>Sample Pretreatment</h4>
              <p>{reactionConditions.pretreatment}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResultsDisplay;

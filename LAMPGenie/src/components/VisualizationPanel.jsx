// VisualizationPanel.jsx
import { useEffect, useRef } from 'react';

function VisualizationPanel({ results }) {
  const primerDiagramRef = useRef(null);
  const ampCurveRef = useRef(null);
  
  useEffect(() => {
    if (!results) return;
    
    // Draw primer diagram
    drawPrimerDiagram();
    
    // Draw amplification curve
    drawAmplificationCurve();
  }, [results]);
  
  const drawPrimerDiagram = () => {
    const canvas = primerDiagramRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set up scale - 400bp target region
    const bpLength = 400;
    const scale = width / bpLength;
    
    // Draw target DNA
    ctx.beginPath();
    ctx.moveTo(0, height/2);
    ctx.lineTo(width, height/2);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#1A1E3F'; // SciCanvas Midnight Blue
    ctx.stroke();
    
    // Draw tick marks every 50bp
    for (let i = 0; i <= bpLength; i += 50) {
      const x = i * scale;
      ctx.beginPath();
      ctx.moveTo(x, height/2 - 5);
      ctx.lineTo(x, height/2 + 5);
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#6E7C7C'; // SciCanvas Slate Gray
      ctx.stroke();
      
      // Label
      ctx.fillStyle = '#6E7C7C';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(i.toString(), x, height/2 + 20);
    }
    
    // Draw primers
    const { primers } = results;
    
    // Draw F3
    drawPrimer(ctx, primers.F3.position * scale, height/2 - 30, primers.F3.sequence.length * scale, 'F3', '#00F5FF'); // Cyan
    
    // Draw B3
    const b3Position = (400 - primers.B3.position - primers.B3.sequence.length) * scale;
    drawPrimer(ctx, b3Position, height/2 + 30, primers.B3.sequence.length * scale, 'B3', '#00F5FF', true);
    
    // Draw FIP (F1c+F2)
    const f2Start = (primers.F3.position + primers.F3.sequence.length) * scale;
    const f2Length = primers.FIP.components.F2.length * scale;
    const f1Start = (f2Start / scale + primers.FIP.components.F2.length) * scale;
    const f1Length = primers.FIP.components.F1c.length * scale;
    
    drawPrimer(ctx, f2Start, height/2 - 60, f2Length, 'F2', '#EF476F'); // Crimson
    drawPrimer(ctx, f1Start, height/2 - 90, f1Length, 'F1c', '#EF476F', true);
    
    // Draw connector between F1c and F2
    ctx.beginPath();
    ctx.moveTo(f2Start + f2Length, height/2 - 60);
    ctx.lineTo(f1Start + f1Length, height/2 - 90);
    ctx.strokeStyle = '#EF476F';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 2]);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw BIP (B1c+B2) - similar to FIP but on bottom
    // (Simplified - in a real app you'd calculate actual positions)
    const b2End = b3Position;
    const b2Length = primers.BIP.components.B2.length * scale;
    const b2Start = b2End - b2Length;
    const b1End = b2Start;
    const b1Length = primers.BIP.components.B1c.length * scale;
    const b1Start = b1End - b1Length;
    
    drawPrimer(ctx, b2Start, height/2 + 60, b2Length, 'B2', '#FFD166', true); // Goldenrod
    drawPrimer(ctx, b1Start, height/2 + 90, b1Length, 'B1c', '#FFD166');
    
    // Draw connector between B1c and B2
    ctx.beginPath();
    ctx.moveTo(b2Start, height/2 + 60);
    ctx.lineTo(b1Start, height/2 + 90);
    ctx.strokeStyle = '#FFD166';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 2]);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw LF & LB
    const lfPosition = (primers.LF.position) * scale;
    drawPrimer(ctx, lfPosition, height/2 - 120, primers.LF.sequence.length * scale, 'LF', '#00F5FF');
    
    const lbPosition = (400 - primers.LB.position - primers.LB.sequence.length) * scale;
    drawPrimer(ctx, lbPosition, height/2 + 120, primers.LB.sequence.length * scale, 'LB', '#00F5FF', true);
  };
  
  const drawPrimer = (ctx, x, y, length, label, color, reversed = false) => {
    // Draw line
    ctx.beginPath();
    ctx.moveTo(reversed ? x + length : x, y);
    ctx.lineTo(reversed ? x : x + length, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Draw arrow
    const arrowSize = 5;
    ctx.beginPath();
    if (reversed) {
      ctx.moveTo(x, y);
      ctx.lineTo(x + arrowSize, y - arrowSize);
      ctx.lineTo(x + arrowSize, y + arrowSize);
    } else {
      ctx.moveTo(x + length, y);
      ctx.lineTo(x + length - arrowSize, y - arrowSize);
      ctx.lineTo(x + length - arrowSize, y + arrowSize);
    }
    ctx.fillStyle = color;
    ctx.fill();
    
    // Add label
    ctx.font = '12px Arial';
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.fillText(label, x + (reversed ? length/2 : length/2), y - 10);
  };
  
  const drawAmplificationCurve = () => {
    const canvas = ampCurveRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw axes
    ctx.beginPath();
    ctx.moveTo(40, 20);
    ctx.lineTo(40, height - 40);
    ctx.lineTo(width - 20, height - 40);
    ctx.strokeStyle = '#1A1E3F';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Y-axis label
    ctx.save();
    ctx.translate(15, height/2);
    ctx.rotate(-Math.PI/2);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#1A1E3F';
    ctx.font = '12px Arial';
    ctx.fillText('Fluorescence', 0, 0);
    ctx.restore();
    
    // X-axis label
    ctx.fillStyle = '#1A1E3F';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Time (minutes)', width/2, height - 10);
    
    // Draw tick marks
    for (let i = 0; i <= 60; i += 10) {
      const x = 40 + (i/60) * (width - 60);
      ctx.beginPath();
      ctx.moveTo(x, height - 40);
      ctx.lineTo(x, height - 35);
      ctx.strokeStyle = '#6E7C7C';
      ctx.stroke();
      
      // Label
      ctx.fillStyle = '#6E7C7C';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(i.toString(), x, height - 25);
    }
    
    // Draw simulated LAMP amplification curves
    // No inhibition curve
    drawCurve(ctx, width, height, '#00F5FF', 15); // Fast amplification (cyan)
    
    // Draw amplification curve with selected sample type
    switch (results.reactionConditions.sampleType) {
      case 'blood':
        drawCurve(ctx, width, height, '#EF476F', 25, 0.8); // Slower, lower (crimson)
        break;
      case 'spit':
        drawCurve(ctx, width, height, '#FFD166', 20, 0.9); // Moderate (goldenrod)
        break;
      case 'environmental_water':
        drawCurve(ctx, width, height, '#6E7C7C', 22, 0.85); // Moderately inhibited (slate)
        break;
      case 'swabs':
        drawCurve(ctx, width, height, '#1A1E3F', 18, 0.95); // Slight inhibition (midnight)
        break;
      default:
        drawCurve(ctx, width, height, '#6E7C7C', 17, 0.98); // Almost ideal (slate)
    }
    
    // Add legend
    ctx.font = '12px Arial';
    ctx.fillStyle = '#00F5FF';
    ctx.fillText('Ideal (no inhibition)', 120, 30);
    
    let sampleName = 'Sample';
    const sampleTypes = {
      'blood': 'Blood',
      'spit': 'Saliva',
      'environmental_water': 'Environmental water',
      'swabs': 'Swab',
      'culture': 'Pure culture',
      'extraction': 'Purified DNA'
    };
    
    if (sampleTypes[results.reactionConditions.sampleType]) {
      sampleName = sampleTypes[results.reactionConditions.sampleType];
    }
    
    ctx.fillStyle = getColorForSample(results.reactionConditions.sampleType);
    ctx.fillText(sampleName, 120, 50);
  };
  
  const drawCurve = (ctx, width, height, color, takeoffPoint, maxHeight = 1.0) => {
    ctx.beginPath();
    
    // Sigmoid function parameters
    const maxY = (height - 60) * maxHeight;
    const k = 0.3; // Steepness
    
    for (let x = 0; x <= 60; x += 0.5) {
      const xPos = 40 + (x/60) * (width - 60);
      
      // Sigmoid function: L / (1 + e^(-k*(x-x0)))
      // Where L is max height, k is steepness, x0 is takeoff point
      const y = maxY / (1 + Math.exp(-k * (x - takeoffPoint)));
      const yPos = (height - 40) - y;
      
      if (x === 0) {
        ctx.moveTo(xPos, yPos);
      } else {
        ctx.lineTo(xPos, yPos);
      }
    }
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  };
  
  const getColorForSample = (sampleType) => {
    switch (sampleType) {
      case 'blood': return '#EF476F'; // Crimson
      case 'spit': return '#FFD166'; // Goldenrod
      case 'environmental_water': return '#6E7C7C'; // Slate
      case 'swabs': return '#1A1E3F'; // Midnight
      default: return '#6E7C7C'; // Slate
    }
  };
  
  return (
    <div className="visualization-panel">
      <h2>Visual Analysis</h2>
      
      <div className="visualization-card">
        <h3>LAMP Primer Diagram</h3>
        <canvas 
          ref={primerDiagramRef} 
          width={800} 
          height={300}
          className="primer-diagram"
        />
        <p className="viz-description">
          Diagram showing relative positions of all LAMP primers on target sequence
        </p>
      </div>
      
      <div className="visualization-card">
        <h3>Predicted Amplification Curve</h3>
        <canvas 
          ref={ampCurveRef} 
          width={800} 
          height={300}
          className="amp-curve"
        />
        <p className="viz-description">
          Predicted amplification curves comparing ideal conditions vs. selected sample type
        </p>
      </div>
      
      <div className="protocol-summary">
        <h3>Protocol Summary</h3>
        <div className="protocol-steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Prepare Master Mix</h4>
              <p>Combine buffer, MgSO4, betaine, and dNTPs according to reaction conditions</p>
            </div>
          </div>
          
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Add Primers</h4>
              <p>Add all primers at the specified concentrations</p>
            </div>
          </div>
          
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Add Enzyme</h4>
              <p>Add {results.reactionConditions.enzyme.name} ({results.reactionConditions.enzyme.concentration})</p>
            </div>
          </div>
          
          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Add Sample</h4>
              {results.reactionConditions.pretreatment !== 'None' ? (
                <p>Pretreat sample: {results.reactionConditions.pretreatment}</p>
              ) : (
                <p>Add sample directly to reaction</p>
              )}
            </div>
          </div>
          
          <div className="step">
            <div className="step-number">5</div>
            <div className="step-content">
              <h4>Incubate</h4>
              <p>Incubate at {results.reactionConditions.incubationTemperature} for {results.reactionConditions.incubationTime}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisualizationPanel;

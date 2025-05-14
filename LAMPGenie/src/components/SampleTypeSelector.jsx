import React from 'react';

// SampleTypeSelector.jsx

function SampleTypeSelector({ value, onChange }) {
  const sampleTypes = [
    {
      id: 'environmental_water',
      name: 'Environmental Water',
      description: 'Water samples from natural sources like rivers, lakes, or oceans',
      considerations: 'May contain PCR inhibitors and low target concentration'
    },
    {
      id: 'swabs',
      name: 'Swabs',
      description: 'Surface swabs, nasal swabs, throat swabs, etc.',
      considerations: 'Variable quality, may contain collection media'
    },
    {
      id: 'spit',
      name: 'Saliva/Spit',
      description: 'Human saliva samples',
      considerations: 'Contains enzymes and other inhibitors'
    },
    {
      id: 'blood',
      name: 'Blood',
      description: 'Whole blood, plasma, or serum',
      considerations: 'Contains hemoglobin and other strong inhibitors'
    },
    {
      id: 'culture',
      name: 'Pure Culture',
      description: 'Lab-grown bacterial/viral cultures',
      considerations: 'Clean samples with high target concentration'
    },
    {
      id: 'extraction',
      name: 'Purified DNA',
      description: 'DNA extracted using commercial kits',
      considerations: 'High purity, standard reaction conditions'
    }
  ];

  return (
    <div className="sample-type-selector">
      <h2>Select Sample Type</h2>
      
      <div className="sample-grid">
        {sampleTypes.map(type => (
          <div 
            key={type.id}
            className={`sample-card ${value === type.id ? 'selected' : ''}`}
            onClick={() => onChange(type.id)}
          >
            <h3>{type.name}</h3>
            <p>{type.description}</p>
            <div className="considerations">
              <small>Considerations: {type.considerations}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SampleTypeSelector;

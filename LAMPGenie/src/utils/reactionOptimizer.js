// reactionOptimizer.js

/**
 * Enzyme options for LAMP reactions
 */
const ENZYMES = {
  'bst_2.0': {
    name: 'Bst 2.0 WarmStart DNA Polymerase',
    manufacturer: 'New England Biolabs',
    optimalTemp: '60-65°C',
    features: ['Strand displacement activity', 'Inhibitor tolerance', 'Thermostability'],
    applications: ['Standard LAMP', 'Field applications']
  },
  'bst_3.0': {
    name: 'Bst 3.0 DNA Polymerase',
    manufacturer: 'New England Biolabs',
    optimalTemp: '65-70°C',
    features: ['Enhanced strand displacement', 'Superior inhibitor tolerance', 'Improved thermostability', 'Faster amplification'],
    applications: ['Complex sample types', 'Rapid LAMP', 'High GC content']
  },
  'gsp_ssd': {
    name: 'GspSSD DNA Polymerase 2.0',
    manufacturer: 'OptiGene',
    optimalTemp: '65°C',
    features: ['High specificity', 'Minimal non-specific amplification', 'Fast amplification'],
    applications: ['High-specificity assays', 'Multiplexing']
  },
  'tte_uma': {
    name: 'Tte UltraⅡ DNA Polymerase',
    manufacturer: 'Various',
    optimalTemp: '65-68°C',
    features: ['Extreme thermostability', 'Activity at higher temperatures'],
    applications: ['High GC content', 'Complex secondary structures']
  }
};

/**
 * Sample types and their properties
 */
const SAMPLE_TYPES = {
  'environmental_water': {
    inhibitors: ['Humic acids', 'Polyphenols', 'Metal ions'],
    inhibitorLevel: 'Moderate',
    recommendedEnzyme: 'bst_2.0',
    additionalAdditions: ['BSA (0.4 mg/mL)'],
    magnesiumAdjustment: 0, // No change from base
    betaineAdjustment: 0.1, // Add 0.1M more betaine
    incubationModifier: 1.0 // No change to incubation time
  },
  'swabs': {
    inhibitors: ['Collection media', 'Mucus proteins'],
    inhibitorLevel: 'Low',
    recommendedEnzyme: 'bst_2.0',
    additionalAdditions: [],
    magnesiumAdjustment: 0, // No change from base
    betaineAdjustment: 0, // No change from base
    incubationModifier: 1.0 // No change to incubation time
  },
  'spit': {
    inhibitors: ['Salivary enzymes', 'Mucins', 'Immunoglobulins'],
    inhibitorLevel: 'Moderate-High',
    recommendedEnzyme: 'bst_3.0',
    additionalAdditions: ['DTT (1 mM)', 'Proteinase K (0.2 mg/mL, pretreatment)'],
    magnesiumAdjustment: 1, // Add 1mM more Mg
    betaineAdjustment: 0.2, // Add 0.2M more betaine
    incubationModifier: 1.2 // 20% longer incubation time
  },
  'blood': {
    inhibitors: ['Hemoglobin', 'IgG', 'Lactoferrin', 'Heparin'],
    inhibitorLevel: 'High',
    recommendedEnzyme: 'bst_3.0',
    additionalAdditions: ['DTT (1 mM)', 'BSA (0.4 mg/mL)'],
    magnesiumAdjustment: 2, // Add 2mM more Mg
    betaineAdjustment: 0.3, // Add 0.3M more betaine
    incubationModifier: 1.5 // 50% longer incubation time
  },
  'culture': {
    inhibitors: ['Growth media components'],
    inhibitorLevel: 'Very Low',
    recommendedEnzyme: 'bst_2.0',
    additionalAdditions: [],
    magnesiumAdjustment: -1, // Reduce Mg by 1mM
    betaineAdjustment: -0.2, // Reduce betaine
    incubationModifier: 0.8 // 20% shorter incubation time
  },
  'extraction': {
    inhibitors: ['Extraction reagent carryover'],
    inhibitorLevel: 'Minimal',
    recommendedEnzyme: 'bst_2.0',
    additionalAdditions: [],
    magnesiumAdjustment: -1, // Reduce Mg by 1mM
    betaineAdjustment: -0.2, // Reduce betaine
    incubationModifier: 0.8 // 20% shorter incubation time
  }
};

/**
 * Base reaction conditions that work for most LAMP assays
 */
const BASE_CONDITIONS = {
  enzyme: {
    name: 'Bst 2.0 WarmStart DNA Polymerase',
    concentration: '8 units/reaction'
  },
  buffer: {
    name: 'Isothermal Amplification Buffer',
    composition: '20 mM Tris-HCl, 10 mM (NH4)2SO4, 50 mM KCl, 2 mM MgSO4, 0.1% Tween-20, pH 8.8',
    concentration: '1X'
  },
  magnesium: {
    compound: 'MgSO4',
    baseConcentration: 6, // mM
    note: 'Total includes 2mM from buffer'
  },
  betaine: {
    baseConcentration: 0.8, // M
  },
  dNTPs: {
    concentration: '1.4 mM (0.35 mM each)'
  },
  primerConcentrations: {
    F3: 0.2, // μM
    B3: 0.2, // μM
    FIP: 1.6, // μM
    BIP: 1.6, // μM
    LF: 0.8, // μM
    LB: 0.8  // μM
  },
  incubationTemp: 65, // °C
  incubationTime: 60, // minutes
  waterVolume: 'To 25 μL final volume'
};

/**
 * Optimize reaction based on primers and sample type
 * @param {Object} primers - Designed LAMP primers
 * @param {String} sampleType - Type of sample
 * @returns {Object} - Optimized reaction conditions
 */
export function optimizeReaction(primers, sampleType) {
  // Get sample properties
  const sample = SAMPLE_TYPES[sampleType] || SAMPLE_TYPES.extraction;
  
  // Select optimal enzyme based on sample type
  const enzyme = ENZYMES[sample.recommendedEnzyme] || ENZYMES.bst_2.0;
  
  // Adjust magnesium concentration
  const mgConcentration = BASE_CONDITIONS.magnesium.baseConcentration + sample.magnesiumAdjustment;
  
  // Adjust betaine concentration
  const betaineConcentration = BASE_CONDITIONS.betaine.baseConcentration + sample.betaineAdjustment;
  
  // Calculate incubation time
  const incubationTime = Math.round(BASE_CONDITIONS.incubationTime * sample.incubationModifier);
  
  // Generate pretreatment recommendation
  let pretreatment = 'None recommended';
  if (sampleType === 'blood') {
    pretreatment = 'Heat sample at 95°C for 5 minutes to lyse cells and denature proteins';
  } else if (sampleType === 'spit') {
    pretreatment = 'Mix with equal volume of 1% Triton X-100, heat at 95°C for 5 minutes';
  } else if (sampleType === 'environmental_water') {
    pretreatment = 'Filter sample, concentrate if necessary, heat at 95°C for 3 minutes';
  } else if (sampleType === 'swabs') {
    pretreatment = 'Place swab in lysis buffer, heat at 95°C for 5 minutes, use supernatant';
  }
  
  // Adjust incubation temperature based on primer properties
  let incubationTemp = BASE_CONDITIONS.incubationTemp;
  
  // If primers have unusually low Tm, adjust temperature 
  const averageOuterTm = (primers.F3.tm + primers.B3.tm) / 2;
  if (averageOuterTm < 55) {
    incubationTemp = 63; // Lower temperature for lower Tm primers
  } else if (averageOuterTm > 65) {
    incubationTemp = 67; // Higher temperature for higher Tm primers
  }
  
  // Calculate reaction performance prediction
  const performance = predictPerformance(primers, sampleType);
  
  // Generate final optimized reaction conditions
  return {
    sampleType,
    enzyme: {
      name: enzyme.name,
      concentration: `${sampleType === 'blood' || sampleType === 'spit' ? '12' : '8'} units/reaction`,
      notes: enzyme.features.join(', ')
    },
    buffer: BASE_CONDITIONS.buffer,
    magnesium: {
      compound: 'MgSO4',
      concentration: `${mgConcentration} mM final concentration`,
      notes: `Includes 2 mM from buffer, add ${mgConcentration - 2} mM additional`
    },
    betaine: {
      concentration: `${betaineConcentration.toFixed(1)} M`
    },
    dNTPs: BASE_CONDITIONS.dNTPs,
    primerConcentrations: {
      F3: `${BASE_CONDITIONS.primerConcentrations.F3} μM`,
      B3: `${BASE_CONDITIONS.primerConcentrations.B3} μM`,
      FIP: `${BASE_CONDITIONS.primerConcentrations.FIP} μM`,
      BIP: `${BASE_CONDITIONS.primerConcentrations.BIP} μM`,
      LF: `${BASE_CONDITIONS.primerConcentrations.LF} μM`,
      LB: `${BASE_CONDITIONS.primerConcentrations.LB} μM`
    },
    additionalComponents: sample.additionalAdditions.map(addition => {
      const [name, concentration] = addition.split(' (');
      return {
        name,
        concentration: concentration ? concentration.replace(')', '') : '',
        purpose: getComponentPurpose(name)
      };
    }),
    incubationTemperature: `${incubationTemp}°C`,
    incubationTime: `${incubationTime} minutes`,
    waterVolume: BASE_CONDITIONS.waterVolume,
    pretreatment,
    performance
  };
}

/**
 * Get purpose description for additional components
 */
function getComponentPurpose(componentName) {
  const purposes = {
    'BSA': 'Binds to inhibitors, reducing their impact on the reaction',
    'DTT': 'Reduces disulfide bonds in proteins, neutralizing protein inhibitors',
    'Proteinase K': 'Digests proteins that may inhibit the reaction',
    'DMSO': 'Helps denature GC-rich regions and reduces secondary structures',
    'PEG': 'Molecular crowding agent that increases reaction efficiency',
    'Trehalose': 'Stabilizes enzyme activity at higher temperatures'
  };
  
  return purposes[componentName] || 'Enhances reaction performance';
}

/**
 * Predict LAMP reaction performance based on primers and sample
 */
function predictPerformance(primers, sampleType) {
  const sample = SAMPLE_TYPES[sampleType] || SAMPLE_TYPES.extraction;
  
  // Base detection time in minutes based on primer quality
  // This is a simplified model - real prediction would be more complex
  let baseDetectionTime = 15; // Default for good primers
  
  // Adjust for inhibitor level
  let detectionTimeMultiplier = 1.0;
  
  switch(sample.inhibitorLevel) {
    case 'High':
      detectionTimeMultiplier = 1.8;
      break;
    case 'Moderate-High':
      detectionTimeMultiplier = 1.5;
      break;
    case 'Moderate':
      detectionTimeMultiplier = 1.3;
      break;
    case 'Low':
      detectionTimeMultiplier = 1.1;
      break;
    case 'Very Low':
    case 'Minimal':
      detectionTimeMultiplier = 1.0;
      break;
  }
  
  // Calculate expected detection time
  const expectedDetectionTime = Math.round(baseDetectionTime * detectionTimeMultiplier);
  
  // Calculate success probability
  let successProbability = 0.95; // Base success rate for ideal conditions
  
  if (sample.inhibitorLevel === 'High') {
    successProbability = 0.8;
  } else if (sample.inhibitorLevel === 'Moderate-High') {
    successProbability = 0.85;
  } else if (sample.inhibitorLevel === 'Moderate') {
    successProbability = 0.9;
  }
  
  // Inhibitors present and their impact
  const inhibitors = sample.inhibitors.map(inhibitor => {
    return {
      name: inhibitor,
      mitigation: getMitigationStrategy(inhibitor, sample)
    };
  });
  
  return {
    expectedDetectionTime,
    successProbability: successProbability.toFixed(2),
    inhibitors,
    notes: generatePerformanceNotes(sampleType, expectedDetectionTime, successProbability)
  };
}

/**
 * Get mitigation strategy for specific inhibitors
 */
function getMitigationStrategy(inhibitor, sample) {
  // Common mitigations for various inhibitors
  const mitigations = {
    'Hemoglobin': 'Increased enzyme concentration, addition of DTT',
    'IgG': 'Higher betaine concentration, proteinase K pretreatment',
    'Lactoferrin': 'BSA addition, increased MgSO4',
    'Heparin': 'Heparinase pretreatment (if available)',
    'Humic acids': 'BSA addition, increased betaine',
    'Polyphenols': 'BSA or PVP addition',
    'Metal ions': 'EDTA in pretreatment (not in reaction)',
    'Salivary enzymes': 'Pretreatment with heat, proteinase K',
    'Mucins': 'Pretreatment with detergent, increased betaine',
    'Collection media': 'Sample dilution if necessary'
  };
  
  return mitigations[inhibitor] || 'Optimized reaction conditions';
}

/**
 * Generate notes about expected performance
 */
function generatePerformanceNotes(sampleType, detectionTime, successRate) {
  const notes = [];
  
  if (sampleType === 'blood') {
    notes.push('Blood is a challenging sample type with multiple inhibitors');
    notes.push('Consider sample dilution if reaction fails');
  } else if (sampleType === 'environmental_water') {
    notes.push('Environmental samples vary greatly in quality and inhibitor content');
    notes.push('Filtration and concentration may be necessary for low-abundance targets');
  }
  
  if (successRate < 0.9) {
    notes.push('This sample type may require additional optimization');
    notes.push('Consider a preliminary purification step if consistent results are needed');
  }
  
  if (detectionTime > 20) {
    notes.push(`Expect longer amplification time (approximately ${detectionTime} minutes) due to sample inhibitors`);
  } else {
    notes.push(`Rapid amplification expected (approximately ${detectionTime} minutes to positive result)`);
  }
  
  return notes;
}

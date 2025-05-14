// primerDesigner.js

/**
 * Design LAMP primers for a target sequence
 * 
 * Note: This is a simplified implementation. A real LAMP primer design
 * algorithm would be much more complex, checking for dimers, hairpins,
 * and other problematic structures.
 * 
 * @param {string} sequence - Target DNA sequence
 * @returns {object} - Designed primers
 */
export function designPrimers(sequence) {
  // Clean sequence (remove non-DNA characters)
  const cleanSequence = sequence.toUpperCase().replace(/[^ATGC]/g, '');
  
  // Validate sequence length
  if (cleanSequence.length < 200) {
    throw new Error('Sequence must be at least 200 base pairs long');
  }
  
  // Analyze sequence properties
  const props = analyzeSequence(cleanSequence);
  
  // Find a suitable region in the middle of the sequence
  const targetLength = Math.min(cleanSequence.length, 400);
  const start = Math.floor((cleanSequence.length - targetLength) / 2);
  const targetRegion = cleanSequence.substring(start, start + targetLength);
  
  // Design F3 and B3 (outer primers)
  const f3Start = 0;
  const f3Length = randomBetween(17, 21);
  const f3Sequence = targetRegion.substring(f3Start, f3Start + f3Length);
  
  const b3End = targetRegion.length;
  const b3Length = randomBetween(17, 21);
  const b3Start = b3End - b3Length;
  const b3SequenceRC = targetRegion.substring(b3Start, b3End);
  const b3Sequence = reverseComplement(b3SequenceRC);
  
  // Calculate amplicon size
  const ampliconSize = b3Start + b3Length - f3Start;
  
  // Design FIP (F1c+F2)
  const f2Start = f3Start + f3Length + randomBetween(5, 15);
  const f2Length = randomBetween(18, 22);
  const f2Sequence = targetRegion.substring(f2Start, f2Start + f2Length);
  
  const f1Start = f2Start + f2Length + randomBetween(5, 15);
  const f1Length = randomBetween(18, 22);
  const f1Sequence = targetRegion.substring(f1Start, f1Start + f1Length);
  const f1cSequence = reverseComplement(f1Sequence);
  
  const fipSequence = f1cSequence + f2Sequence;
  
  // Design BIP (B1c+B2)
  const b2End = b3Start - randomBetween(5, 15);
  const b2Length = randomBetween(18, 22);
  const b2Start = b2End - b2Length;
  const b2SequenceRC = targetRegion.substring(b2Start, b2End);
  const b2Sequence = reverseComplement(b2SequenceRC);
  
  const b1End = b2Start - randomBetween(5, 15);
  const b1Length = randomBetween(18, 22);
  const b1Start = b1End - b1Length;
  const b1SequenceRC = targetRegion.substring(b1Start, b1End);
  const b1Sequence = reverseComplement(b1SequenceRC);
  
  const bipSequence = b1cSequence + b2Sequence;
  
  // Design Loop Primers (LF and LB)
  const lfStart = f1Start + Math.floor(f1Length / 2) - 10;
  const lfLength = randomBetween(18, 22);
  const lfSequence = targetRegion.substring(lfStart, lfStart + lfLength);
  
  const lbEnd = b1Start + Math.floor(b1Length / 2) + 10;
  const lbLength = randomBetween(18, 22);
  const lbStart = lbEnd - lbLength;
  const lbSequenceRC = targetRegion.substring(lbStart, lbEnd);
  const lbSequence = reverseComplement(lbSequenceRC);
  
  // Return designed primers with properties
  return {
    F3: {
      sequence: f3Sequence,
      position: f3Start,
      tm: calculateTm(f3Sequence),
      gcContent: calculateGC(f3Sequence)
    },
    B3: {
      sequence: b3Sequence,
      position: b3Start,
      tm: calculateTm(b3Sequence),
      gcContent: calculateGC(b3Sequence)
    },
    FIP: {
      sequence: fipSequence,
      components: {
        F1c: f1cSequence,
        F2: f2Sequence
      },
      tm: calculateTm(fipSequence),
      gcContent: calculateGC(fipSequence)
    },
    BIP: {
      sequence: bipSequence,
      components: {
        B1c: b1cSequence,
        B2: b2Sequence
      },
      tm: calculateTm(bipSequence),
      gcContent: calculateGC(bipSequence)
    },
    LF: {
      sequence: lfSequence,
      position: lfStart,
      tm: calculateTm(lfSequence),
      gcContent: calculateGC(lfSequence)
    },
    LB: {
      sequence: lbSequence,
      position: lbStart,
      tm: calculateTm(lbSequence),
      gcContent: calculateGC(lbSequence)
    },
    targetRegion: {
      sequence: targetRegion,
      start,
      length: targetRegion.length
    },
    ampliconSize
  };
}

/**
 * Analyze sequence properties
 */
function analyzeSequence(sequence) {
  const length = sequence.length;
  const aCount = (sequence.match(/A/g) || []).length;
  const tCount = (sequence.match(/T/g) || []).length;
  const gCount = (sequence.match(/G/g) || []).length;
  const cCount = (sequence.match(/C/g) || []).length;
  
  const gcContent = ((gCount + cCount) / length) * 100;
  
  return {
    length,
    gcContent,
    baseComposition: {
      A: aCount,
      T: tCount,
      G: gCount,
      C: cCount
    }
  };
}

/**
 * Calculate GC content percentage
 */
function calculateGC(sequence) {
  const gcCount = (sequence.match(/[GC]/g) || []).length;
  return Math.round((gcCount / sequence.length) * 100);
}

/**
 * Calculate approximate melting temperature
 * This is a simplified calculation - actual Tm would use nearest-neighbor method
 */
function calculateTm(sequence) {
  const gcCount = (sequence.match(/[GC]/g) || []).length;
  const atCount = sequence.length - gcCount;
  
  // Simple formula: Tm = 2°C × (A+T) + 4°C × (G+C)
  let tm = 2 * atCount + 4 * gcCount;
  
  // Adjust for primer length
  if (sequence.length > 20) {
    tm += 3;
  } else if (sequence.length < 18) {
    tm -= 2;
  }
  
  return Math.round(tm * 10) / 10; // Round to 1 decimal place
}

/**
 * Create reverse complement of a DNA sequence
 */
function reverseComplement(sequence) {
  const complement = {
    'A': 'T', 'T': 'A', 'G': 'C', 'C': 'G'
  };
  
  return sequence
    .split('')
    .reverse()
    .map(base => complement[base] || base)
    .join('');
}

/**
 * Get random integer between min and max (inclusive)
 */
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

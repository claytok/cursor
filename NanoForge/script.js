// NanoForge - Nanoparticle Designer
// Main JavaScript file

// Global variables
let scene, camera, renderer, nanoparticle;
let currentDesign = {
    core: {
        material: 'gold',
        size: 50,
        shape: 'sphere'
    },
    layers: [],
    environment: {
        medium: 'water',
        ph: 7.4,
        temperature: 25
    }
};
let controls; // For orbit controls

// Material properties database
const materialProperties = {
    core: {
        gold: {
            color: 0xFFD700,
            density: 19.3,
            zeta: -30,
            name: 'Gold (AuNP)'
        },
        silver: {
            color: 0xC0C0C0,
            density: 10.49,
            zeta: -20,
            name: 'Silver (AgNP)'
        },
        'iron-oxide': {
            color: 0x331800,
            density: 5.17,
            zeta: -15,
            name: 'Iron Oxide (Fe₃O₄)'
        },
        silica: {
            color: 0xFFFFFF,
            density: 2.65,
            zeta: -25,
            name: 'Silica (SiO₂)'
        },
        'quantum-dot': {
            color: 0xFF6B00,
            density: 5.82,
            zeta: -10,
            name: 'Quantum Dot (CdSe)'
        }
    },
    layer: {
        polymer: {
            options: {
                'peg': { 
                    name: 'Polyethylene Glycol (PEG)', 
                    color: 0x90E0EF,
                    zeta: -5,
                    hydrophobicity: 'hydrophilic'
                },
                'plga': { 
                    name: 'Poly(lactic-co-glycolic acid) (PLGA)', 
                    color: 0x94D2BD,
                    zeta: -35,
                    hydrophobicity: 'amphiphilic'
                },
                'pei': { 
                    name: 'Polyethylenimine (PEI)', 
                    color: 0x277DA1,
                    zeta: 45,
                    hydrophobicity: 'hydrophilic'
                },
                'chitosan': { 
                    name: 'Chitosan', 
                    color: 0xF9C74F,
                    zeta: 30,
                    hydrophobicity: 'hydrophilic'
                },
                'paa': { 
                    name: 'Polyacrylic Acid (PAA)', 
                    color: 0x43AA8B,
                    zeta: -40,
                    hydrophobicity: 'hydrophilic'
                }
            }
        },
        lipid: {
            options: {
                'pc': { 
                    name: 'Phosphatidylcholine (PC)', 
                    color: 0xF8961E,
                    zeta: 0,
                    hydrophobicity: 'amphiphilic'
                },
                'dotap': { 
                    name: 'DOTAP', 
                    color: 0xF3722C,
                    zeta: 45,
                    hydrophobicity: 'amphiphilic'
                },
                'dope': { 
                    name: 'DOPE', 
                    color: 0xF94144,
                    zeta: -5,
                    hydrophobicity: 'amphiphilic'
                },
                'cholesterol': { 
                    name: 'Cholesterol', 
                    color: 0x577590,
                    zeta: 0,
                    hydrophobicity: 'hydrophobic'
                }
            }
        },
        protein: {
            options: {
                'bsa': { 
                    name: 'Bovine Serum Albumin (BSA)', 
                    color: 0xA8DADC,
                    zeta: -10,
                    hydrophobicity: 'amphiphilic'
                },
                'transferrin': { 
                    name: 'Transferrin', 
                    color: 0x457B9D,
                    zeta: -5,
                    hydrophobicity: 'amphiphilic'
                },
                'antibody': { 
                    name: 'Antibody', 
                    color: 0x1D3557,
                    zeta: 0,
                    hydrophobicity: 'amphiphilic'
                }
            }
        },
        'small-molecule': {
            options: {
                'folate': { 
                    name: 'Folic Acid', 
                    color: 0x90BE6D,
                    zeta: -10,
                    hydrophobicity: 'amphiphilic'
                },
                'biotin': { 
                    name: 'Biotin', 
                    color: 0x43AA8B,
                    zeta: 0,
                    hydrophobicity: 'amphiphilic'
                },
                'dbco': { 
                    name: 'DBCO', 
                    color: 0x4D908E,
                    zeta: 0,
                    hydrophobicity: 'hydrophobic'
                },
                'rgd': { 
                    name: 'RGD Peptide', 
                    color: 0x277DA1,
                    zeta: 0,
                    hydrophobicity: 'amphiphilic'
                }
            }
        },
        carbohydrate: {
            options: {
                'dextran': { 
                    name: 'Dextran', 
                    color: 0xF9C74F,
                    zeta: 0,
                    hydrophobicity: 'hydrophilic'
                },
                'hyaluronic': { 
                    name: 'Hyaluronic Acid', 
                    color: 0xF9844A,
                    zeta: -20,
                    hydrophobicity: 'hydrophilic'
                },
                'mannitol': { 
                    name: 'Mannitol', 
                    color: 0xF8961E,
                    zeta: 0,
                    hydrophobicity: 'hydrophilic'
                }
            }
        },
        'dna-rna': {
            options: {
                'sirna': { 
                    name: 'siRNA', 
                    color: 0xF94144,
                    zeta: -40,
                    hydrophobicity: 'hydrophilic'
                },
                'dna-aptamer': { 
                    name: 'DNA Aptamer', 
                    color: 0xF3722C,
                    zeta: -35,
                    hydrophobicity: 'hydrophilic'
                },
                'mrna': { 
                    name: 'mRNA', 
                    color: 0xF8961E,
                    zeta: -40,
                    hydrophobicity: 'hydrophilic'
                }
            }
        }
    },
    environment: {
        water: {
            ionic_strength: 0,
            protein_content: 'none',
            stability_factor: 1
        },
        pbs: {
            ionic_strength: 'high',
            protein_content: 'none',
            stability_factor: 0.7
        },
        'culture-medium': {
            ionic_strength: 'medium',
            protein_content: 'medium',
            stability_factor: 0.5
        },
        'blood-serum': {
            ionic_strength: 'high',
            protein_content: 'high',
            stability_factor: 0.3
        },
        saline: {
            ionic_strength: 'high',
            protein_content: 'none',
            stability_factor: 0.6
        }
    }
};

// Compatibility rules
const compatibilityRules = {
    size: {
        min: 5,
        max: 1000,
        rule: (design) => {
            // Larger particles with many hydrophobic layers can aggregate
            if (design.core.size > 100) {
                const hydrophobicCount = design.layers.filter(
                    layer => getLayerPropertyByType(layer.type, layer.material, 'hydrophobicity') === 'hydrophobic'
                ).length;
                
                if (hydrophobicCount >= 2) {
                    return {
                        status: 'unstable',
                        message: 'Multiple hydrophobic layers on large particles can cause aggregation'
                    };
                }
            }
            return { status: 'stable', message: 'Size is within acceptable range' };
        }
    },
    
    zetaPotential: {
        min: -50,
        max: 50,
        rule: (design) => {
            // Calculate approx zeta potential
            const zeta = calculateZetaPotential(design);
            
            // Close to neutral can lead to aggregation
            if (Math.abs(zeta) < 10) {
                return {
                    status: 'warning',
                    message: 'Zeta potential near neutral (±10 mV) may lead to aggregation'
                };
            } 
            // Very stable
            else if (Math.abs(zeta) > 30) {
                return {
                    status: 'stable',
                    message: 'High absolute zeta potential indicates good colloidal stability'
                };
            }
            // Moderate stability
            else {
                return {
                    status: 'warning',
                    message: 'Moderate zeta potential, stability may be compromised in high ionic environments'
                };
            }
        }
    },
    
    layerInteractions: {
        rule: (design) => {
            if (design.layers.length < 2) return { status: 'stable', message: 'No layer interactions to evaluate' };
            
            // Check for opposing charges in adjacent layers
            for (let i = 0; i < design.layers.length - 1; i++) {
                const currentLayerZeta = getLayerPropertyByType(
                    design.layers[i].type, 
                    design.layers[i].material, 
                    'zeta'
                );
                
                const nextLayerZeta = getLayerPropertyByType(
                    design.layers[i + 1].type, 
                    design.layers[i + 1].material, 
                    'zeta'
                );
                
                // If layers have strongly opposing charges, they're likely stable together
                if (currentLayerZeta * nextLayerZeta < 0 && Math.abs(currentLayerZeta) > 20 && Math.abs(nextLayerZeta) > 20) {
                    // This is actually good for layer-by-layer assembly
                    continue;
                }
                
                // Check for hydrophobic incompatibilities
                const currentHydrophobicity = getLayerPropertyByType(
                    design.layers[i].type, 
                    design.layers[i].material, 
                    'hydrophobicity'
                );
                
                const nextHydrophobicity = getLayerPropertyByType(
                    design.layers[i + 1].type, 
                    design.layers[i + 1].material, 
                    'hydrophobicity'
                );
                
                if (currentHydrophobicity === 'hydrophobic' && nextHydrophobicity === 'hydrophilic') {
                    return {
                        status: 'warning',
                        message: 'Hydrophobic layer followed by hydrophilic layer may have poor coverage'
                    };
                }
            }
            
            return { status: 'stable', message: 'Layer interactions appear compatible' };
        }
    },
    
    environmentCompatibility: {
        rule: (design) => {
            const environment = materialProperties.environment[design.environment.medium];
            
            // Check high ionic strength with low zeta potential
            if (environment.ionic_strength === 'high') {
                const zeta = calculateZetaPotential(design);
                
                if (Math.abs(zeta) < 20) {
                    return {
                        status: 'unstable',
                        message: `Low zeta potential (${zeta.toFixed(1)} mV) can cause aggregation in ${design.environment.medium}`
                    };
                }
            }
            
            // Check protein interactions
            if (environment.protein_content === 'high' || environment.protein_content === 'medium') {
                // Highly charged particles can adsorb proteins rapidly
                const zeta = calculateZetaPotential(design);
                if (Math.abs(zeta) > 35) {
                    return {
                        status: 'warning',
                        message: 'High surface charge may lead to rapid protein corona formation'
                    };
                }
                
                // Check for exposed hydrophobic layers
                const outerLayer = design.layers.length > 0 ? design.layers[design.layers.length - 1] : null;
                if (outerLayer) {
                    const hydrophobicity = getLayerPropertyByType(
                        outerLayer.type,
                        outerLayer.material,
                        'hydrophobicity'
                    );
                    
                    if (hydrophobicity === 'hydrophobic') {
                        return {
                            status: 'warning',
                            message: 'Hydrophobic outer layer will rapidly adsorb proteins'
                        };
                    }
                }
            }
            
            // pH effects
            if (design.environment.ph < 5 || design.environment.ph > 9) {
                return {
                    status: 'warning',
                    message: `Extreme pH (${design.environment.ph}) may affect stability and surface charge`
                };
            }
            
            return { 
                status: 'stable', 
                message: `Nanoparticle appears stable in ${design.environment.medium}` 
            };
        }
    }
};

// Helper functions
function getLayerPropertyByType(layerType, material, property) {
    if (!materialProperties.layer[layerType]) return null;
    if (!materialProperties.layer[layerType].options[material]) return null;
    return materialProperties.layer[layerType].options[material][property];
}

function calculateZetaPotential(design) {
    // Start with core zeta potential
    let zeta = materialProperties.core[design.core.material].zeta;
    
    // Layer contributions (simplified model - in reality, outer layers have greater influence)
    if (design.layers.length > 0) {
        // Outer layers have more influence
        const weightPerLayer = design.layers.map((_, index, arr) => {
            return (index + 1) / arr.length;
        });
        
        const totalWeight = weightPerLayer.reduce((sum, weight) => sum + weight, 0);
        
        // Calculate weighted zeta
        let layerZetaContribution = 0;
        
        design.layers.forEach((layer, index) => {
            const layerZeta = getLayerPropertyByType(layer.type, layer.material, 'zeta');
            layerZetaContribution += (layerZeta * weightPerLayer[index]) / totalWeight;
        });
        
        // Outer layers have more influence but core still matters
        zeta = zeta * 0.3 + layerZetaContribution * 0.7;
    }
    
    // Environment effects
    const environment = materialProperties.environment[design.environment.medium];
    zeta *= environment.stability_factor;
    
    // pH effects (simplified) - further from neutral can enhance charge
    const phEffect = 1 + 0.05 * Math.abs(design.environment.ph - 7);
    zeta *= phEffect;
    
    return zeta;
}

function calculateHydrodynamicDiameter(design) {
    // Start with core size
    let diameter = design.core.size;
    
    // Add layer thicknesses
    design.layers.forEach(layer => {
        diameter += layer.thickness * 2; // Multiply by 2 because we add thickness on both sides
    });
    
    return diameter;
}

function calculateAggregationPotential(design) {
    // Check all compatibility rules and determine overall status
    const results = [
        compatibilityRules.size.rule(design),
        compatibilityRules.zetaPotential.rule(design),
        compatibilityRules.layerInteractions.rule(design),
        compatibilityRules.environmentCompatibility.rule(design)
    ];
    
    // Count statuses
    const unstableCount = results.filter(r => r.status === 'unstable').length;
    const warningCount = results.filter(r => r.status === 'warning').length;
    
    if (unstableCount > 0) {
        return { status: 'unstable', description: 'High' };
    } else if (warningCount > 1) {
        return { status: 'warning', description: 'Medium' };
    } else if (warningCount === 1) {
        return { status: 'warning', description: 'Low-Medium' };
    } else {
        return { status: 'stable', description: 'Low' };
    }
}

function evaluateCompatibility(design) {
    // Run all rules
    const sizeResult = compatibilityRules.size.rule(design);
    const zetaResult = compatibilityRules.zetaPotential.rule(design);
    const layerResult = compatibilityRules.layerInteractions.rule(design);
    const environmentResult = compatibilityRules.environmentCompatibility.rule(design);
    
    // Find the worst status
    const results = [sizeResult, zetaResult, layerResult, environmentResult];
    
    if (results.some(r => r.status === 'unstable')) {
        // Return the first unstable message
        const unstableResult = results.find(r => r.status === 'unstable');
        return {
            status: 'unstable',
            title: 'Unstable Configuration',
            message: unstableResult.message
        };
    } else if (results.some(r => r.status === 'warning')) {
        // Return the first warning message
        const warningResult = results.find(r => r.status === 'warning');
        return {
            status: 'warning',
            title: 'Potentially Unstable',
            message: warningResult.message
        };
    } else {
        return {
            status: 'stable',
            title: 'Stable Configuration',
            message: 'This nanoparticle design is predicted to be stable in the selected medium.'
        };
    }
}

// UI Control
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    initThreeJS();
    updateLayersList();
    updatePhysicalProperties();
    updateCompatibilityIndicator();
}

function setupEventListeners() {
    // Core controls
    document.getElementById('coreMaterial').addEventListener('change', updateCoreProperties);
    document.getElementById('coreSize').addEventListener('input', updateSizeDisplay);
    document.getElementById('coreSize').addEventListener('change', function() {
        const value = this.value;
        if (value >= 5 && value <= 1000) {
            document.getElementById('coreSize').value = value;
            updateSizeDisplay();
            updateCoreProperties();
        }
    });
    document.getElementById('coreShape').addEventListener('change', updateCoreProperties);
    
    // Input box for size
    document.getElementById('coreSizeInput').addEventListener('input', function() {
        const value = this.value;
        if (value >= 5 && value <= 1000) {
            document.getElementById('coreSize').value = value;
            updateSizeDisplay();
        }
    });
    
    document.getElementById('coreSizeInput').addEventListener('change', function() {
        const value = this.value;
        if (value >= 5 && value <= 1000) {
            document.getElementById('coreSize').value = value;
            updateSizeDisplay();
            updateCoreProperties();
        }
    });
    
    // Environment controls
    document.getElementById('medium').addEventListener('change', updateEnvironmentProperties);
    document.getElementById('ph').addEventListener('input', updatePhDisplay);
    document.getElementById('ph').addEventListener('change', function() {
        const value = this.value;
        if (value >= 3 && value <= 10) {
            document.getElementById('ph').value = value;
            updatePhDisplay();
            updateEnvironmentProperties();
        }
    });
    document.getElementById('temperature').addEventListener('input', updateTemperatureDisplay);
    document.getElementById('temperature').addEventListener('change', function() {
        const value = this.value;
        if (value >= 0 && value <= 100) {
            document.getElementById('temperature').value = value;
            updateTemperatureDisplay();
            updateEnvironmentProperties();
        }
    });
    
    // Input box for pH
    document.getElementById('phInput').addEventListener('input', function() {
        const value = this.value;
        if (value >= 3 && value <= 10) {
            document.getElementById('ph').value = value;
            updatePhDisplay();
        }
    });
    
    document.getElementById('phInput').addEventListener('change', function() {
        const value = this.value;
        if (value >= 3 && value <= 10) {
            document.getElementById('ph').value = value;
            updatePhDisplay();
            updateEnvironmentProperties();
        }
    });
    
    // Input box for temperature
    document.getElementById('temperatureInput').addEventListener('input', function() {
        const value = this.value;
        if (value >= 0 && value <= 100) {
            document.getElementById('temperature').value = value;
            updateTemperatureDisplay();
        }
    });
    
    document.getElementById('temperatureInput').addEventListener('change', function() {
        const value = this.value;
        if (value >= 0 && value <= 100) {
            document.getElementById('temperature').value = value;
            updateTemperatureDisplay();
            updateEnvironmentProperties();
        }
    });
    
    // Layer handling
    document.getElementById('addLayerBtn').addEventListener('click', openAddLayerModal);
    document.getElementById('cancelLayerBtn').addEventListener('click', closeAddLayerModal);
    document.getElementById('addLayerSubmitBtn').addEventListener('click', addNewLayer);
    
    // Navigation buttons
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.textContent.toLowerCase();
            
            if (target === 'designer') {
                // We're already here, no action needed
            } else if (target === 'library') {
                window.location.href = 'library.html';
            } else if (target === 'documentation') {
                window.location.href = 'documentation.html';
            } else if (target === 'about') {
                window.location.href = 'about.html';
            }
        });
    });
    
    // Home/landing page button
    const logoElement = document.querySelector('.logo');
    logoElement.addEventListener('click', function() {
        window.location.href = 'https://scicanvas.ai';
    });
    
    // Action buttons
    document.querySelector('.action-buttons .btn-secondary').addEventListener('click', saveDesign);
    document.querySelector('.action-buttons .btn-primary').addEventListener('click', exportData);
    
    // Tab switching
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all tab content
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show the corresponding tab content
            const targetId = this.getAttribute('data-tab');
            document.getElementById(targetId).classList.add('active');
            
            // Special handling for different views
            if (targetId === 'view-layers') {
                renderLayerDiagram();
            } else if (targetId === 'view-prediction') {
                renderPredictionView();
            }
        });
    });
    
    // Modal close button
    document.querySelector('.close').addEventListener('click', closeAddLayerModal);
    
    // Layer type selection in modal
    document.getElementById('layerType').addEventListener('change', updateLayerMaterialOptions);
    
    // Layer thickness and coverage sliders in modal
    document.getElementById('layerThickness').addEventListener('input', function() {
        document.getElementById('layerThicknessValue').textContent = `${this.value} nm`;
        document.getElementById('layerThicknessInput').value = this.value;
    });
    
    document.getElementById('layerCoverage').addEventListener('input', function() {
        document.getElementById('layerCoverageValue').textContent = `${this.value}%`;
        document.getElementById('layerCoverageInput').value = this.value;
    });
    
    // Layer thickness and coverage input fields in modal
    document.getElementById('layerThicknessInput').addEventListener('input', function() {
        const value = parseFloat(this.value);
        if (value >= 0.5 && value <= 20) {
            document.getElementById('layerThickness').value = value;
            document.getElementById('layerThicknessValue').textContent = `${value} nm`;
        }
    });
    
    document.getElementById('layerCoverageInput').addEventListener('input', function() {
        const value = parseInt(this.value);
        if (value >= 10 && value <= 100) {
            document.getElementById('layerCoverage').value = value;
            document.getElementById('layerCoverageValue').textContent = `${value}%`;
        }
    });
}

function updateSizeDisplay() {
    const sizeValue = document.getElementById('coreSize').value;
    document.getElementById('coreSizeValue').textContent = `${sizeValue} nm`;
    document.getElementById('coreSizeInput').value = sizeValue;
}

function updatePhDisplay() {
    const phValue = document.getElementById('ph').value;
    document.getElementById('phValue').textContent = phValue;
    document.getElementById('phInput').value = phValue;
}

function updateTemperatureDisplay() {
    const tempValue = document.getElementById('temperature').value;
    document.getElementById('temperatureValue').textContent = `${tempValue}°C`;
    document.getElementById('temperatureInput').value = tempValue;
}

function updateCoreProperties() {
    currentDesign.core.material = document.getElementById('coreMaterial').value;
    currentDesign.core.size = parseInt(document.getElementById('coreSize').value) || 50; // Default to 50 if parsing fails
    currentDesign.core.shape = document.getElementById('coreShape').value;
    
    updateNanoparticleModel();
    updatePhysicalProperties();
    updateCompatibilityIndicator();
}

function updateEnvironmentProperties() {
    currentDesign.environment.medium = document.getElementById('medium').value;
    currentDesign.environment.ph = parseFloat(document.getElementById('ph').value) || 7.4; // Default to 7.4 if parsing fails
    currentDesign.environment.temperature = parseInt(document.getElementById('temperature').value) || 25; // Default to 25 if parsing fails
    
    updatePhysicalProperties();
    updateCompatibilityIndicator();
}

function openAddLayerModal() {
    const modal = document.getElementById('addLayerModal');
    modal.classList.add('open');
    
    // Add coverage style radio buttons if they don't exist yet
    const coverageStyleContainer = modal.querySelector('.coverage-style-container');
    
    if (!coverageStyleContainer) {
        // Create container for coverage style options
        const styleContainer = document.createElement('div');
        styleContainer.className = 'coverage-style-container';
        styleContainer.innerHTML = `
            <label>Coverage Style:</label>
            <div class="radio-group">
                <label>
                    <input type="radio" name="coverageStyle" value="capped" checked>
                    Capped (localized coverage)
                </label>
                <label>
                    <input type="radio" name="coverageStyle" value="sparse">
                    Sparse (distributed coverage)
                </label>
            </div>
        `;
        
        // Find where to insert the coverage style options
        const sliderContainer = modal.querySelector('.slider-container');
        sliderContainer.appendChild(styleContainer);
    }
    
    // Initialize layer material dropdown based on first option
    updateLayerMaterialOptions();
}

function closeAddLayerModal() {
    const modal = document.getElementById('addLayerModal');
    modal.classList.remove('open');
}

function updateLayerMaterialOptions() {
    const layerType = document.getElementById('layerType').value;
    const materialSelect = document.getElementById('layerMaterial');
    
    // Clear existing options
    materialSelect.innerHTML = '';
    
    // Add new options based on layer type
    if (materialProperties.layer[layerType]) {
        const options = materialProperties.layer[layerType].options;
        
        for (const [value, data] of Object.entries(options)) {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = data.name;
            materialSelect.appendChild(option);
        }
    }
}

function addNewLayer() {
    const type = document.getElementById('layerType').value;
    const material = document.getElementById('layerMaterial').value;
    
    // Get values from sliders or input fields, whichever was changed last
    const thicknessSlider = document.getElementById('layerThickness');
    const thicknessInput = document.getElementById('layerThicknessInput');
    const thickness = parseFloat(thicknessInput.value) || parseFloat(thicknessSlider.value) || 2;
    
    const coverageSlider = document.getElementById('layerCoverage');
    const coverageInput = document.getElementById('layerCoverageInput');
    const coverage = parseInt(coverageInput.value) || parseInt(coverageSlider.value) || 90;
    
    // Get coverage style - add radio button selection
    const coverageStyle = document.querySelector('input[name="coverageStyle"]:checked').value;
    
    // Get material name for display
    const materialName = materialProperties.layer[type].options[material].name;
    
    const newLayer = {
        type,
        material,
        materialName,
        thickness,
        coverage,
        coverageStyle
    };
    
    // Add to design
    currentDesign.layers.push(newLayer);
    
    // Update UI
    updateLayersList();
    updateNanoparticleModel();
    updatePhysicalProperties();
    updateCompatibilityIndicator();
    
    // Close modal
    closeAddLayerModal();
}

function removeLayer(index) {
    // Remove layer at index
    currentDesign.layers.splice(index, 1);
    
    // Update UI
    updateLayersList();
    updateNanoparticleModel();
    updatePhysicalProperties();
    updateCompatibilityIndicator();
}

function updateLayersList() {
    const layerList = document.getElementById('layerList');
    layerList.innerHTML = '';
    
    if (currentDesign.layers.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'layer-item';
        emptyMessage.innerHTML = '<span class="layer-type">No surface modifications added</span>';
        layerList.appendChild(emptyMessage);
        return;
    }
    
    // Add each layer to the list
    currentDesign.layers.forEach((layer, index) => {
        const layerItem = document.createElement('div');
        layerItem.className = 'layer-item';
        
        // Create layer info
        const layerInfo = document.createElement('div');
        layerInfo.className = 'layer-info';
        
        const layerName = document.createElement('span');
        layerName.className = 'layer-name';
        layerName.textContent = layer.materialName;
        
        const layerType = document.createElement('span');
        layerType.className = 'layer-type';
        layerType.textContent = `${layer.thickness} nm | ${layer.coverage}% coverage`;
        
        layerInfo.appendChild(layerName);
        layerInfo.appendChild(layerType);
        
        // Create layer actions
        const layerActions = document.createElement('div');
        layerActions.className = 'layer-actions';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.addEventListener('click', () => removeLayer(index));
        
        layerActions.appendChild(deleteBtn);
        
        // Assemble layer item
        layerItem.appendChild(layerInfo);
        layerItem.appendChild(layerActions);
        
        layerList.appendChild(layerItem);
    });
}

function updatePhysicalProperties() {
    // Calculate and update hydrodynamic diameter
    const hydroDiameter = calculateHydrodynamicDiameter(currentDesign);
    document.getElementById('hydroDiameter').textContent = `${hydroDiameter.toFixed(1)} nm`;
    
    // Calculate and update zeta potential
    const zetaPotential = calculateZetaPotential(currentDesign);
    document.getElementById('zetaPotential').textContent = `${zetaPotential.toFixed(1)} mV`;
    
    // Calculate and update aggregation status
    const aggregation = calculateAggregationPotential(currentDesign);
    const aggregationStatus = document.getElementById('aggregationStatus');
    
    aggregationStatus.innerHTML = `<span class="status-badge status-${aggregation.status}">${aggregation.description}</span>`;
    
    // Calculate and update surface coverage
    // This is a simplified calculation based on the outermost layer
    let surfaceCoverage = 100;
    if (currentDesign.layers.length > 0) {
        surfaceCoverage = currentDesign.layers[currentDesign.layers.length - 1].coverage;
    }
    document.getElementById('surfaceCoverage').textContent = `${surfaceCoverage}%`;
}

function updateCompatibilityIndicator() {
    const compatibility = evaluateCompatibility(currentDesign);
    const indicator = document.getElementById('compatibilityIndicator');
    
    // Update class
    indicator.className = `compatibility-indicator compatibility-${compatibility.status}`;
    
    // Update icon
    let icon = '';
    if (compatibility.status === 'stable') {
        icon = '<i class="fas fa-check-circle"></i>';
    } else if (compatibility.status === 'warning') {
        icon = '<i class="fas fa-exclamation-triangle"></i>';
    } else {
        icon = '<i class="fas fa-times-circle"></i>';
    }
    
    // Update message
    indicator.innerHTML = `
        ${icon}
        <div class="compatibility-message">
            <div class="compatibility-title">${compatibility.title}</div>
            <div class="compatibility-desc">${compatibility.message}</div>
        </div>
    `;
}

// Three.js Functions
function initThreeJS() {
    // Initialize scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    
    // Initialize camera
    camera = new THREE.PerspectiveCamera(
        75, 
        document.getElementById('nanoparticleCanvas').clientWidth / document.getElementById('nanoparticleCanvas').clientHeight, 
        0.1, 
        1000
    );
    camera.position.z = 200;
    
    // Initialize renderer
    renderer = new THREE.WebGLRenderer({ 
        canvas: document.getElementById('nanoparticleCanvas'),
        antialias: true 
    });
    renderer.setSize(
        document.getElementById('nanoparticleCanvas').clientWidth, 
        document.getElementById('nanoparticleCanvas').clientHeight
    );
    
    // Add orbit controls
    try {
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        controls.maxDistance = 500;
        controls.minDistance = 50;
    } catch (error) {
        console.error("Error initializing OrbitControls:", error);
    }
    
    // Add zoom buttons
    addZoomControls();
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create initial nanoparticle
    createNanoparticle();
    
    // Add animation
    animate();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

function addZoomControls() {
    // Create zoom controls container
    const zoomControls = document.createElement('div');
    zoomControls.className = 'zoom-controls';
    
    // Zoom in button
    const zoomInBtn = document.createElement('button');
    zoomInBtn.className = 'zoom-btn zoom-in';
    zoomInBtn.innerHTML = '<i class="fas fa-plus"></i>';
    zoomInBtn.addEventListener('click', () => {
        camera.position.z *= 0.8;
    });
    
    // Zoom out button
    const zoomOutBtn = document.createElement('button');
    zoomOutBtn.className = 'zoom-btn zoom-out';
    zoomOutBtn.innerHTML = '<i class="fas fa-minus"></i>';
    zoomOutBtn.addEventListener('click', () => {
        camera.position.z *= 1.2;
    });
    
    // Reset view button
    const resetViewBtn = document.createElement('button');
    resetViewBtn.className = 'zoom-btn reset-view';
    resetViewBtn.innerHTML = '<i class="fas fa-sync-alt"></i>';
    resetViewBtn.addEventListener('click', () => {
        camera.position.set(0, 0, 200);
        controls.reset();
    });
    
    // Add buttons to container
    zoomControls.appendChild(zoomInBtn);
    zoomControls.appendChild(zoomOutBtn);
    zoomControls.appendChild(resetViewBtn);
    
    // Add container to canvas container
    const canvasContainer = document.querySelector('.canvas-container');
    canvasContainer.appendChild(zoomControls);
}

function createNanoparticle() {
    try {
        // Clear previous model if exists
        if (nanoparticle) {
            scene.remove(nanoparticle);
        }
        
        // Create a new group for the nanoparticle
        nanoparticle = new THREE.Group();
        
        // Create core
        const coreGeometry = createGeometryByShape(
            currentDesign.core.shape, 
            currentDesign.core.size
        );
        
        const coreMaterial = new THREE.MeshPhongMaterial({
            color: materialProperties.core[currentDesign.core.material].color,
            shininess: 60,
            transparent: true,
            opacity: 0.9
        });
        
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        nanoparticle.add(core);
        
        // Add layers
        let currentDiameter = currentDesign.core.size;
        
        if (currentDesign.layers && currentDesign.layers.length > 0) {
            currentDesign.layers.forEach((layer, index) => {
                try {
                    const layerThickness = layer.thickness;
                    const newDiameter = currentDiameter + (layerThickness * 2);
                    const coverage = layer.coverage / 100; // Convert percentage to decimal
                    
                    if (coverage >= 0.95) {
                        // If coverage is near complete, show as a full layer
                        const layerGeometry = createGeometryByShape(
                            currentDesign.core.shape,
                            newDiameter
                        );
                        
                        const layerColor = getLayerPropertyByType(layer.type, layer.material, 'color');
                        
                        const layerMaterial = new THREE.MeshPhongMaterial({
                            color: layerColor,
                            transparent: true,
                            opacity: 0.7,
                            shininess: 30,
                            wireframe: false
                        });
                        
                        const layerMesh = new THREE.Mesh(layerGeometry, layerMaterial);
                        nanoparticle.add(layerMesh);
                    } else {
                        // Safer approach for partial coverage visualization
                        createSafePartialCoverage(
                            currentDesign.core.shape,
                            currentDiameter,
                            newDiameter,
                            getLayerPropertyByType(layer.type, layer.material, 'color'),
                            layer.coverage,
                            layer.coverageStyle || 'capped' // Default to capped if not specified
                        );
                    }
                    
                    currentDiameter = newDiameter;
                } catch (layerError) {
                    console.error("Error adding layer:", layerError);
                    // Continue with the next layer even if this one fails
                }
            });
        }
        
        // Add nanoparticle to scene
        scene.add(nanoparticle);
        
        // Center the camera view on the nanoparticle
        autoScaleView();
    } catch (error) {
        console.error("Error creating nanoparticle:", error);
        // Create a simple sphere as fallback to ensure something is visible
        createFallbackParticle();
    }
}

// Simplified safe version of partial coverage that won't break the model
function createSafePartialCoverage(shape, innerDiameter, outerDiameter, color, coverage, coverageStyle) {
    try {
        const innerRadius = innerDiameter / 2;
        const outerRadius = outerDiameter / 2;
        const thickness = outerRadius - innerRadius;
        
        // Simple material
        const layerMaterial = new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            opacity: 0.7,
            shininess: 30,
            side: THREE.DoubleSide
        });
        
        if (coverageStyle === 'sparse' || !coverageStyle) {
            // Simplified sparse coverage with fewer particles
            const numberOfPatches = Math.max(5, Math.min(30, Math.floor(coverage / 3)));
            const patchSize = thickness * 1.5;
            
            for (let i = 0; i < numberOfPatches; i++) {
                // Use simple math to distribute points on sphere
                const phi = Math.acos(-1 + (2 * i) / numberOfPatches);
                const theta = Math.sqrt(numberOfPatches * Math.PI) * phi;
                
                // Convert to cartesian coordinates
                const x = Math.sin(phi) * Math.cos(theta) * outerRadius;
                const y = Math.sin(phi) * Math.sin(theta) * outerRadius;
                const z = Math.cos(phi) * outerRadius;
                
                // Create a patch
                const patch = new THREE.Mesh(
                    new THREE.SphereGeometry(patchSize, 8, 8),
                    layerMaterial
                );
                patch.position.set(x, y, z);
                nanoparticle.add(patch);
            }
        } else {
            // Simplified capped coverage
            const coverageRadians = Math.PI * (coverage / 100);
            
            // Just use a simple partial sphere
            const capGeometry = new THREE.SphereGeometry(
                outerRadius, 
                32, 32, 
                0, Math.PI * 2, 
                0, coverageRadians
            );
            
            const cap = new THREE.Mesh(capGeometry, layerMaterial);
            nanoparticle.add(cap);
            
            // If coverage is high, add a cap at the bottom too
            if (coverage > 50) {
                const bottomCap = new THREE.Mesh(capGeometry.clone(), layerMaterial.clone());
                bottomCap.rotation.x = Math.PI;
                nanoparticle.add(bottomCap);
            }
        }
    } catch (error) {
        console.error("Error in createSafePartialCoverage:", error);
        // If this fails, just add a simple shell around the particle
        try {
            const shellGeometry = createGeometryByShape(shape, outerDiameter);
            const simpleMaterial = new THREE.MeshPhongMaterial({
                color: color,
                transparent: true,
                opacity: 0.4,
                wireframe: true
            });
            const shell = new THREE.Mesh(shellGeometry, simpleMaterial);
            nanoparticle.add(shell);
        } catch (fallbackError) {
            console.error("Even fallback failed:", fallbackError);
        }
    }
}

// Fallback function to ensure something is visible
function createFallbackParticle() {
    const fallbackGeometry = new THREE.SphereGeometry(50, 16, 16);
    const fallbackMaterial = new THREE.MeshBasicMaterial({
        color: 0xFF0000,
        wireframe: true
    });
    
    const fallbackMesh = new THREE.Mesh(fallbackGeometry, fallbackMaterial);
    
    nanoparticle = new THREE.Group();
    nanoparticle.add(fallbackMesh);
    scene.add(nanoparticle);
    
    console.log("Created fallback particle due to error");
}

function createGeometryByShape(shape, size) {
    const scaleFactor = size / 2; // Size is diameter, radius is half of that
    
    switch(shape) {
        case 'sphere':
            return new THREE.SphereGeometry(scaleFactor, 32, 32);
        case 'rod':
            // Create a rod shape (cylinder with rounded ends)
            const cylinder = new THREE.CylinderGeometry(scaleFactor / 2, scaleFactor / 2, scaleFactor * 2, 32);
            cylinder.rotateX(Math.PI / 2); // Rotate to look more like a rod
            return cylinder;
        case 'cube':
            return new THREE.BoxGeometry(scaleFactor, scaleFactor, scaleFactor);
        case 'triangle':
            // Create triangular prism
            const triangle = new THREE.ConeGeometry(scaleFactor, scaleFactor, 3);
            triangle.rotateX(Math.PI / 2);
            return triangle;
        case 'star':
            // Create a star like shape using icosahedron
            const star = new THREE.IcosahedronGeometry(scaleFactor, 0);
            return star;
        default:
            return new THREE.SphereGeometry(scaleFactor, 32, 32);
    }
}

function updateNanoparticleModel() {
    createNanoparticle();
}

function autoScaleView() {
    // Calculate bounding box of the nanoparticle
    const boundingBox = new THREE.Box3().setFromObject(nanoparticle);
    const center = boundingBox.getCenter(new THREE.Vector3());
    const size = boundingBox.getSize(new THREE.Vector3());
    
    // Get the maximum dimension of the particle
    const maxDim = Math.max(size.x, size.y, size.z);
    
    // Base distance that ensures the smallest particle (5nm) is clearly visible
    const baseDistance = 200;
    
    // Calculate camera position based on actual particle size relative to max possible size (1000nm)
    // This ensures a 1000nm particle appears 10x larger than a 100nm particle
    // while still keeping both fully in view
    const maxPossibleSize = 1000;
    const relativeSizeRatio = currentDesign.core.size / maxPossibleSize;
    
    // Scale factor is inversely proportional to particle size
    // Smaller particles need higher scale factors to be visible
    const scaleFactor = 10 / (0.5 + relativeSizeRatio * 0.5);
    
    // Apply the scale factor to position the camera
    camera.position.z = maxDim * scaleFactor;
    
    // Ensure camera can see very large particles
    camera.far = Math.max(10000, camera.position.z * 5);
    camera.updateProjectionMatrix();
    
    // Update controls
    if (controls) {
        controls.target.copy(center);
        controls.maxDistance = camera.position.z * 2;
        controls.update();
    }
}

function animate() {
    requestAnimationFrame(animate);
    
    if (controls) {
        controls.update();
    }
    
    if (nanoparticle) {
        nanoparticle.rotation.x += 0.005;
        nanoparticle.rotation.y += 0.005;
    }
    
    renderer.render(scene, camera);
}

// Layer diagram rendering
function renderLayerDiagram() {
    const container = document.getElementById('layerDiagram');
    container.innerHTML = '';
    
    const diagram = document.createElement('div');
    diagram.className = 'layer-diagram';
    
    // Start with the core
    const baseSize = 150;
    let currentSize = baseSize;
    
    // Create core circle
    const coreCircle = document.createElement('div');
    coreCircle.className = 'layer-circle';
    coreCircle.style.width = `${currentSize}px`;
    coreCircle.style.height = `${currentSize}px`;
    coreCircle.style.backgroundColor = `#${materialProperties.core[currentDesign.core.material].color.toString(16).padStart(6, '0')}`;
    
    // Core label
    const coreLabel = document.createElement('div');
    coreLabel.className = 'layer-label';
    coreLabel.innerHTML = `
        <div class="layer-info-title">${materialProperties.core[currentDesign.core.material].name}</div>
        <div class="layer-info-detail">Diameter: ${currentDesign.core.size} nm</div>
        <div class="layer-info-detail">Zeta: ${materialProperties.core[currentDesign.core.material].zeta} mV</div>
    `;
    
    const coreLine = document.createElement('div');
    coreLine.className = 'layer-line';
    
    coreLabel.prepend(coreLine);
    coreCircle.appendChild(coreLabel);
    diagram.appendChild(coreCircle);
    
    // Add each layer
    currentDesign.layers.forEach((layer, index) => {
        // Calculate new size based on thickness
        const layerSize = currentSize + (layer.thickness / currentDesign.core.size * baseSize);
        
        // Create layer circle
        const layerCircle = document.createElement('div');
        layerCircle.className = 'layer-circle';
        layerCircle.style.width = `${layerSize}px`;
        layerCircle.style.height = `${layerSize}px`;
        
        // Get layer color
        const layerColor = getLayerPropertyByType(layer.type, layer.material, 'color');
        layerCircle.style.backgroundColor = `#${layerColor.toString(16).padStart(6, '0')}`;
        
        // Layer label
        const layerLabel = document.createElement('div');
        layerLabel.className = 'layer-label';
        
        // Get properties for label
        const zeta = getLayerPropertyByType(layer.type, layer.material, 'zeta');
        const hydrophobicity = getLayerPropertyByType(layer.type, layer.material, 'hydrophobicity');
        
        layerLabel.innerHTML = `
            <div class="layer-info-title">${layer.materialName}</div>
            <div class="layer-info-detail">Thickness: ${layer.thickness} nm</div>
            <div class="layer-info-detail">Zeta: ${zeta} mV</div>
            <div class="layer-info-detail">Surface: ${hydrophobicity}</div>
            <div class="layer-info-detail">Coverage: ${layer.coverage}%</div>
        `;
        
        const layerLine = document.createElement('div');
        layerLine.className = 'layer-line';
        
        layerLabel.prepend(layerLine);
        layerCircle.appendChild(layerLabel);
        diagram.appendChild(layerCircle);
        
        currentSize = layerSize;
    });
    
    container.appendChild(diagram);
}

// Prediction view rendering
function renderPredictionView() {
    const container = document.getElementById('predictionResults');
    container.innerHTML = '';
    
    // Get all rule evaluations
    const sizeResult = compatibilityRules.size.rule(currentDesign);
    const zetaResult = compatibilityRules.zetaPotential.rule(currentDesign);
    const layerResult = compatibilityRules.layerInteractions.rule(currentDesign);
    const environmentResult = compatibilityRules.environmentCompatibility.rule(currentDesign);
    
    // Overall prediction section
    const overallPrediction = document.createElement('div');
    overallPrediction.className = 'prediction-result';
    
    const compatibility = evaluateCompatibility(currentDesign);
    
    overallPrediction.innerHTML = `
        <h3>Overall Stability Prediction</h3>
        <div class="compatibility-indicator compatibility-${compatibility.status}" style="margin-top: 1rem;">
            <i class="${compatibility.status === 'stable' ? 'fas fa-check-circle' : compatibility.status === 'warning' ? 'fas fa-exclamation-triangle' : 'fas fa-times-circle'}"></i>
            <div class="compatibility-message">
                <div class="compatibility-title">${compatibility.title}</div>
                <div class="compatibility-desc">${compatibility.message}</div>
            </div>
        </div>
    `;
    
    container.appendChild(overallPrediction);
    
    // Detailed prediction factors
    const detailedPrediction = document.createElement('div');
    detailedPrediction.className = 'prediction-result';
    
    detailedPrediction.innerHTML = `
        <h3>Stability Factors</h3>
        
        <div class="prediction-info">
            <h4>Size Effect</h4>
            <p class="status-text status-${sizeResult.status}">${sizeResult.message}</p>
        </div>
        
        <div class="prediction-info">
            <h4>Zeta Potential</h4>
            <p class="status-text status-${zetaResult.status}">${zetaResult.message}</p>
            <p>Current zeta potential: ${calculateZetaPotential(currentDesign).toFixed(1)} mV</p>
        </div>
        
        <div class="prediction-info">
            <h4>Layer Interactions</h4>
            <p class="status-text status-${layerResult.status}">${layerResult.message}</p>
        </div>
        
        <div class="prediction-info">
            <h4>Environment Compatibility</h4>
            <p class="status-text status-${environmentResult.status}">${environmentResult.message}</p>
        </div>
    `;
    
    container.appendChild(detailedPrediction);
    
    // Recommendations section
    const recommendations = document.createElement('div');
    recommendations.className = 'prediction-result';
    
    // Generate recommendations based on stability issues
    const recommendationText = generateRecommendations(currentDesign);
    
    recommendations.innerHTML = `
        <h3>Recommendations</h3>
        <div class="prediction-info">
            <p>${recommendationText}</p>
        </div>
    `;
    
    container.appendChild(recommendations);
}

function generateRecommendations(design) {
    const compatibility = evaluateCompatibility(design);
    
    if (compatibility.status === 'stable') {
        return "The current nanoparticle design is predicted to be stable. No modifications are necessary.";
    }
    
    // Get specific issues
    const zetaPotential = calculateZetaPotential(design);
    const recommendations = [];
    
    // Zeta potential issues
    if (Math.abs(zetaPotential) < 20) {
        recommendations.push(`The zeta potential (${zetaPotential.toFixed(1)} mV) is relatively low. Consider adding a charged surface layer like PEI (positive) or PAA (negative) to increase electrostatic repulsion.`);
    }
    
    // Size related issues
    if (design.core.size > 100) {
        const hydrophobicCount = design.layers.filter(
            layer => getLayerPropertyByType(layer.type, layer.material, 'hydrophobicity') === 'hydrophobic'
        ).length;
        
        if (hydrophobicCount >= 2) {
            recommendations.push("Large particles with multiple hydrophobic layers have a high risk of aggregation. Consider replacing one or more hydrophobic layers with hydrophilic alternatives.");
        }
    }
    
    // Environment related issues
    const environment = materialProperties.environment[design.environment.medium];
    if (environment.ionic_strength === 'high' && Math.abs(zetaPotential) < 30) {
        recommendations.push(`The selected medium (${design.environment.medium}) has high ionic strength, which can screen surface charges. A higher absolute zeta potential (>30 mV) is recommended for stability in this environment.`);
    }
    
    // Layer related issues
    if (design.layers.length >= 2) {
        for (let i = 0; i < design.layers.length - 1; i++) {
            const currentHydrophobicity = getLayerPropertyByType(
                design.layers[i].type, 
                design.layers[i].material, 
                'hydrophobicity'
            );
            
            const nextHydrophobicity = getLayerPropertyByType(
                design.layers[i + 1].type, 
                design.layers[i + 1].material, 
                'hydrophobicity'
            );
            
            if (currentHydrophobicity === 'hydrophobic' && nextHydrophobicity === 'hydrophilic') {
                recommendations.push(`Layer ${i+1} (${design.layers[i].materialName}) is hydrophobic while the next layer (${design.layers[i+1].materialName}) is hydrophilic. This may result in poor coverage and instability. Consider adding an amphiphilic intermediate layer.`);
            }
        }
    }
    
    // If no specific recommendations were generated
    if (recommendations.length === 0) {
        recommendations.push("Consider modifying surface charge, changing the dispersion medium, or adding stabilizing agents like PEG to improve stability.");
    }
    
    return recommendations.join(" ");
}

// Functions for action buttons
function saveDesign() {
    // Create a design object to save
    const designToSave = JSON.parse(JSON.stringify(currentDesign));
    
    // Add timestamp and name
    designToSave.timestamp = new Date().toISOString();
    designToSave.name = prompt("Enter a name for this design:", "My Nanoparticle Design");
    
    if (!designToSave.name) return; // User cancelled
    
    // Save to localStorage
    let savedDesigns = JSON.parse(localStorage.getItem('nanoforgeDesigns') || '[]');
    savedDesigns.push(designToSave);
    localStorage.setItem('nanoforgeDesigns', JSON.stringify(savedDesigns));
    
    alert("Design saved successfully!");
}

function exportData() {
    // Create export data with current design and calculated properties
    const exportData = {
        design: JSON.parse(JSON.stringify(currentDesign)),
        properties: {
            zetaPotential: calculateZetaPotential(currentDesign),
            hydrodynamicDiameter: calculateHydrodynamicDiameter(currentDesign),
            aggregationPotential: calculateAggregationPotential(currentDesign)
        }
    };
    
    // Create modal for export options
    const exportModal = document.createElement('div');
    exportModal.className = 'modal open';
    exportModal.id = 'exportModal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    modalHeader.innerHTML = `
        <h3>Export Options</h3>
        <span class="close">&times;</span>
    `;
    
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    modalBody.innerHTML = `
        <p>Choose export format:</p>
        <div class="export-options">
            <button class="btn btn-secondary export-btn" data-format="json">
                <i class="fas fa-file-code"></i> JSON
            </button>
            <button class="btn btn-secondary export-btn" data-format="csv">
                <i class="fas fa-file-csv"></i> CSV
            </button>
            <button class="btn btn-secondary export-btn" data-format="pdf">
                <i class="fas fa-file-pdf"></i> PDF Report
            </button>
        </div>
    `;
    
    const modalFooter = document.createElement('div');
    modalFooter.className = 'modal-footer';
    modalFooter.innerHTML = `
        <button id="cancelExportBtn" class="btn btn-secondary">Cancel</button>
    `;
    
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    exportModal.appendChild(modalContent);
    
    document.body.appendChild(exportModal);
    
    // Add event listeners
    const closeBtn = exportModal.querySelector('.close');
    const cancelBtn = exportModal.querySelector('#cancelExportBtn');
    const exportBtns = exportModal.querySelectorAll('.export-btn');
    
    closeBtn.addEventListener('click', closeExportModal);
    cancelBtn.addEventListener('click', closeExportModal);
    
    exportBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const format = this.getAttribute('data-format');
            
            switch(format) {
                case 'json':
                    downloadJSON(exportData);
                    break;
                case 'csv':
                    downloadCSV(exportData);
                    break;
                case 'pdf':
                    downloadPDF(exportData);
                    break;
            }
            
            closeExportModal();
        });
    });
    
    function closeExportModal() {
        document.body.removeChild(exportModal);
    }
}

function downloadJSON(data) {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    // Create download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `nanoparticle-design-${new Date().toISOString().split('T')[0]}.json`;
    
    // Trigger download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function downloadCSV(data) {
    // Flatten the data structure for CSV
    const flatData = {
        'Core Material': data.design.core.material,
        'Core Size (nm)': data.design.core.size,
        'Core Shape': data.design.core.shape,
        'Environment Medium': data.design.environment.medium,
        'Environment pH': data.design.environment.ph,
        'Environment Temperature (°C)': data.design.environment.temperature,
        'Zeta Potential (mV)': data.properties.zetaPotential.toFixed(1),
        'Hydrodynamic Diameter (nm)': data.properties.hydrodynamicDiameter.toFixed(1),
        'Aggregation Potential': data.properties.aggregationPotential.description
    };
    
    // Add layer data
    data.design.layers.forEach((layer, index) => {
        flatData[`Layer ${index+1} Type`] = layer.type;
        flatData[`Layer ${index+1} Material`] = layer.material;
        flatData[`Layer ${index+1} Thickness (nm)`] = layer.thickness;
        flatData[`Layer ${index+1} Coverage (%)`] = layer.coverage;
    });
    
    // Convert to CSV
    const header = Object.keys(flatData).join(',');
    const values = Object.values(flatData).join(',');
    const csvContent = `${header}\n${values}`;
    
    // Create download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `nanoparticle-design-${new Date().toISOString().split('T')[0]}.csv`;
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function downloadPDF(data) {
    // Make sure we're on the 3D view tab
    document.querySelector('.tab[data-tab="view-3d"]').click();
    
    // Create a loading indicator
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="spinner"></div>
        <div class="loading-text">Generating PDF...</div>
    `;
    document.body.appendChild(loadingOverlay);
    
    // Ensure 3D view is rendered
    renderer.render(scene, camera);
    
    // Get the canvas image data
    const canvasImage = document.getElementById('nanoparticleCanvas').toDataURL('image/png');
    
    setTimeout(() => {
        try {
            // Create PDF with jsPDF
            const pdf = new jspdf.jsPDF();
            
            // Add title
            pdf.setFontSize(20);
            pdf.setTextColor(58, 134, 255); // #3a86ff
            pdf.text('Nanoparticle Design Report', 105, 20, {align: 'center'});
            
            // Add date
            pdf.setFontSize(10);
            pdf.setTextColor(100, 100, 100);
            pdf.text(`Generated on ${new Date().toLocaleDateString()}`, 105, 28, {align: 'center'});
            
            // Add core properties section
            pdf.setFontSize(14);
            pdf.setTextColor(0, 0, 0);
            pdf.text('Core Properties', 20, 40);
            
            pdf.setFontSize(12);
            pdf.text(`Material: ${capitalizeFirstLetter(data.design.core.material)}`, 25, 50);
            pdf.text(`Size: ${data.design.core.size} nm`, 25, 58);
            pdf.text(`Shape: ${capitalizeFirstLetter(data.design.core.shape)}`, 25, 66);
            
            // Add environment section
            pdf.setFontSize(14);
            pdf.text('Environment', 20, 80);
            
            pdf.setFontSize(12);
            pdf.text(`Medium: ${capitalizeFirstLetter(data.design.environment.medium)}`, 25, 90);
            pdf.text(`pH: ${data.design.environment.ph}`, 25, 98);
            pdf.text(`Temperature: ${data.design.environment.temperature}°C`, 25, 106);
            
            // Add physical properties section
            pdf.setFontSize(14);
            pdf.text('Physical Properties', 20, 120);
            
            pdf.setFontSize(12);
            pdf.text(`Hydrodynamic Diameter: ${data.properties.hydrodynamicDiameter.toFixed(1)} nm`, 25, 130);
            pdf.text(`Zeta Potential: ${data.properties.zetaPotential.toFixed(1)} mV`, 25, 138);
            pdf.text(`Aggregation Potential: ${data.properties.aggregationPotential.description}`, 25, 146);
            
            // Add the 3D visualization
            pdf.addImage(canvasImage, 'PNG', 120, 40, 70, 70);
            
            // Add surface modifications table if there are layers
            if (data.design.layers.length > 0) {
                pdf.setFontSize(14);
                pdf.text('Surface Modifications', 20, 165);
                
                // Table headers
                pdf.setFillColor(240, 240, 240);
                pdf.rect(20, 170, 170, 10, 'F');
                pdf.setFontSize(10);
                pdf.text('Material', 25, 177);
                pdf.text('Type', 80, 177);
                pdf.text('Thickness (nm)', 120, 177);
                pdf.text('Coverage (%)', 160, 177);
                
                // Table rows
                let yPos = 180;
                data.design.layers.forEach((layer, index) => {
                    // Alternate row coloring
                    if (index % 2 === 1) {
                        pdf.setFillColor(248, 248, 248);
                        pdf.rect(20, yPos, 170, 10, 'F');
                    }
                    
                    pdf.text(layer.materialName, 25, yPos + 7);
                    pdf.text(capitalizeFirstLetter(layer.type), 80, yPos + 7);
                    pdf.text(layer.thickness.toString(), 120, yPos + 7);
                    pdf.text(layer.coverage.toString(), 160, yPos + 7);
                    
                    yPos += 10;
                    
                    // Add a new page if we're running out of space
                    if (yPos > 270 && index < data.design.layers.length - 1) {
                        pdf.addPage();
                        
                        // Reset yPos and add header on new page
                        yPos = 20;
                        pdf.setFontSize(14);
                        pdf.text('Surface Modifications (continued)', 20, yPos);
                        
                        // Table headers on new page
                        pdf.setFillColor(240, 240, 240);
                        pdf.rect(20, yPos + 5, 170, 10, 'F');
                        pdf.setFontSize(10);
                        pdf.text('Material', 25, yPos + 12);
                        pdf.text('Type', 80, yPos + 12);
                        pdf.text('Thickness (nm)', 120, yPos + 12);
                        pdf.text('Coverage (%)', 160, yPos + 12);
                        
                        yPos += 15;
                    }
                });
            }
            
            // Save the PDF
            pdf.save(`nanoparticle-design-${new Date().toISOString().split('T')[0]}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('An error occurred while generating the PDF. Please try again.');
        } finally {
            // Remove loading overlay
            document.body.removeChild(loadingOverlay);
        }
    }, 500); // Small delay to ensure rendering is complete
}

function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).replace(/-/g, ' ');
}

function onWindowResize() {
    const canvasContainer = document.getElementById('nanoparticleCanvas');
    
    camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
}

// Add back createPartialCoverage for backward compatibility
function createPartialCoverage(shape, innerDiameter, outerDiameter, color, coverage, coverageStyle) {
    try {
        // Use the safe version instead
        createSafePartialCoverage(shape, innerDiameter, outerDiameter, color, coverage, coverageStyle);
    } catch (error) {
        console.error("Error in createPartialCoverage:", error);
    }
}
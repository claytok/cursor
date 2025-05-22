# WickWise - Professional Lateral Flow Assay Designer

WickWise is a scientifically accurate web-based tool for designing lateral flow assays (LFAs) based on real material properties and fluid dynamics.

## Key Features

### Scientific Simulation
- **Real-time Flow Dynamics**: Uses the Washburn equation to accurately model capillary flow through porous media
- **Material-specific Calculations**: Integrates real manufacturer data for membranes, conjugate pads, and other components
- **Sensitivity & Specificity Prediction**: Estimates test performance based on component choices and design parameters

### Material Database
- **Complete Component Library**: Over 15 real materials from manufacturers like Millipore Sigma, Sartorius, and Cytiva
- **Accurate Material Properties**: Includes pore size, flow rate, protein binding capacity, and costs
- **Compatibility Analysis**: Provides scientific evaluation of component interfaces and interactions

### Design Optimization
- **Automated Performance Enhancement**: AI-based optimization of design for sensitivity, flow rate, and overall performance
- **Material Recommendations**: Suggests optimal materials based on sample type and application
- **Environment Simulation**: Tests performance across temperature and humidity conditions

### Templates & Export
- **Validated Designs**: Pre-configured templates based on published research and commercial tests
- **Design Export**: Save and share complete design specifications
- **Material Requirements**: Generate complete bill of materials for manufacturing

## Scientific Basis

WickWise incorporates peer-reviewed scientific principles:

1. **Capillary Flow**: Uses the Washburn equation with corrections for sample properties like viscosity and surface tension
2. **Binding Kinetics**: Models antibody-antigen interactions based on published kinetic rates
3. **Material Interfaces**: Accounts for pore size transitions and protein binding effects

## Usage Guide

1. **Choose Components**: Select from scientific-grade materials for each component
2. **Set Parameters**: Specify particle type, sample properties, and environmental conditions
3. **Run Simulation**: Calculate flow dynamics, sensitivity, and other performance metrics
4. **Optimize Design**: Use the AI optimizer to suggest improvements
5. **Export Results**: Save your complete design for implementation

## Data Sources

- **Material Datasheets**: Millipore Sigma, Cytiva, Sartorius
- **Scientific Literature**: Biosensors & Bioelectronics, Analytical Chemistry, Lab on a Chip
- **Fluid Dynamics**: NIST fluid property data, published wicking studies
- **Clinical Performance**: WHO/FDA guidance documents, published clinical validations

## Developer Information

WickWise uses JavaScript for all simulations with a responsive design for use on any device.

Version 2.1 - All calculations are performed client-side for privacy and performance.

# WickWise Fixed Version

This is a fixed version of WickWise with working membrane selection functionality.

## How to Use

1. Start the web server with:
   ```
   python3 -m http.server 8095
   ```

2. Open your browser and go to http://localhost:8095

3. To change the membrane material:
   - Click on the "Change Membrane" button in the top action bar
   - OR click the membrane component directly in the LFA design
   - OR click the "Change Membrane" button in the simulation results section

4. Select the desired membrane from the popup menu.

5. Watch as the simulation results update based on your selection, including:
   - Flow Time
   - Flow Rate 
   - Wicking Rate
   - Sensitivity
   - Total Cost

## What Was Fixed

The original version had several issues:
- The membrane changing functionality wasn't properly implemented
- Simulation values weren't updating when changing materials
- The reference to "membrane-selector.js" was problematic

This version fixes these issues by:
1. Adding a proper `changeMembranes()` function to app.js
2. Adding click handlers to the membrane component
3. Implementing a material database with real properties
4. Adding display update code with animation effects
5. Adding "Change Membrane" buttons in multiple locations

## Scientific Background

Each membrane type has different properties that affect your lateral flow assay:

- **Flow Rate**: How quickly fluid moves through the membrane (seconds/4cm)
- **Pore Size**: Size of the membrane pores, affecting particle capture (μm)
- **Protein Binding Capacity**: How much antibody/protein can bind to the membrane (μg/cm²)
- **Cost**: The relative cost of the membrane material

Different membranes are optimal for different applications:
- Higher flow rates = faster tests but potentially lower sensitivity
- Higher protein binding = better sensitivity but potentially higher cost
- Larger pore size = faster flow but potentially lower particle capture efficiency

# WickWise Complete Version

This is the complete version of WickWise that includes:
- Full sidebar with all design controls
- Complete material database 
- Working membrane change functionality
- Real-time updates of simulation values

## How to Use

1. Start the web server with:
   ```
   cd ~/Desktop/WickWise-Complete
   python3 -m http.server 8099
   ```

2. Open your browser and go to http://localhost:8099

3. The complete version includes multiple ways to change membranes:
   - From the sidebar: Click on the "Membrane" component card
   - From the design area: Click directly on the membrane in the LFA strip
   - From the action bar: Click the "Change Membrane" button in the canvas header
   - From the simulation panel: Click the "Change Membrane" button in the simulation controls

4. All simulation values and displays will update in real-time when you:
   - Change membrane materials
   - Modify particle properties
   - Adjust sample types and parameters
   - Change environmental conditions

This version combines the full UI of the original WickWise with the fixed membrane selection functionality.

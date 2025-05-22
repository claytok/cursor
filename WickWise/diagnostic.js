// Diagnostic JavaScript for WickWise
// This file contains utility functions for debugging and diagnostics

/**
 * Log diagnostic information about the current state
 */
function logDiagnostics() {
    console.log("=== WickWise Diagnostics ===");
    console.log("Current design state:", designState);
    console.log("Components:", designState.components);
    console.log("Particles:", designState.particles);
    console.log("Sample:", designState.sample);
    console.log("Performance:", designState.performance);
    console.log("Simulation Results:", designState.simulationResults);
    console.log("Costs:", designState.costs);
    console.log("=========================");
}

/**
 * Run diagnostics on demand
 */
function runDiagnostics() {
    logDiagnostics();
    return "Diagnostics logged to console";
}

// Function to add event handling to all component selectors
function setupComponentSelectors() {
    // Sample pad selector
    document.querySelectorAll('.component-card[data-component="sample-pad"]').forEach(card => {
        card.addEventListener('click', function() {
            console.log("Sample pad clicked");
        });
    });

    // Conjugate pad selector
    document.querySelectorAll('.component-card[data-component="conjugate-pad"]').forEach(card => {
        card.addEventListener('click', function() {
            console.log("Conjugate pad clicked");
        });
    });

    // Absorbent pad selector
    document.querySelectorAll('.component-card[data-component="absorbent-pad"]').forEach(card => {
        card.addEventListener('click', function() {
            console.log("Absorbent pad clicked");
        });
    });
}

// Run diagnostics when this file loads
console.log("Diagnostic module loaded");

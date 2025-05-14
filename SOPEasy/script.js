document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            // Toggle active class for navigation menu
            navLinks.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.classList.toggle('active');
            });
        });
    }
    
    // Close mobile menu when clicking anywhere else
    document.addEventListener('click', function(event) {
        const isClickInsideNav = event.target.closest('nav');
        
        if (!isClickInsideNav && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            
            // Reset hamburger animation
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.classList.remove('active');
            });
        }
    });
    
    // Add some additional styles for the hamburger animation
    const style = document.createElement('style');
    style.textContent = `
        .menu-toggle span.active:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .menu-toggle span.active:nth-child(2) {
            opacity: 0;
        }
        
        .menu-toggle span.active:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
    `;
    document.head.appendChild(style);
    
    // SOP Creator App Logic
    
    // Template Selection
    const templateOptions = document.querySelectorAll('.template-option');
    let selectedTemplate = 'lab-equipment'; // Default selected
    
    templateOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            templateOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Update selected template
            selectedTemplate = this.getAttribute('data-template');
        });
    });
    
    // Continue button event
    const selectTemplateBtn = document.getElementById('select-template');
    const templateSelection = document.getElementById('template-selection');
    const questionsFlow = document.getElementById('questions-flow');
    
    if (selectTemplateBtn) {
        selectTemplateBtn.addEventListener('click', function() {
            // Hide template selection and show questions
            templateSelection.style.display = 'none';
            questionsFlow.style.display = 'block';
            
            // Update progress indicator (first step)
            document.querySelector('.progress-fill').style.width = '25%';
        });
    }
    
    // Live Preview Functionality
    const sopTitleInput = document.getElementById('sop-title');
    const sopIdInput = document.getElementById('sop-id');
    const sopPurposeInput = document.getElementById('sop-purpose');
    const sopScopeInput = document.getElementById('sop-scope');
    
    // Live preview elements
    const previewSopTitle = document.getElementById('preview-sop-title');
    const previewSopId = document.getElementById('preview-sop-id');
    const previewPurpose = document.getElementById('preview-purpose');
    const previewScope = document.getElementById('preview-scope');
    
    // Update the preview as the user types
    if (sopTitleInput) {
        sopTitleInput.addEventListener('input', function() {
            previewSopTitle.textContent = this.value || 'Standard Operating Procedure';
        });
    }
    
    if (sopIdInput) {
        sopIdInput.addEventListener('input', function() {
            previewSopId.textContent = 'SOP ID: ' + (this.value || 'LAB-EQ-001');
        });
    }
    
    if (sopPurposeInput) {
        sopPurposeInput.addEventListener('input', function() {
            previewPurpose.textContent = this.value || 'This SOP describes the procedure for [purpose will appear here as you type].';
        });
    }
    
    if (sopScopeInput) {
        sopScopeInput.addEventListener('input', function() {
            previewScope.textContent = this.value || 'This procedure applies to [scope will appear here as you type].';
        });
    }
    
    // Next button functionality
    const nextButton = document.getElementById('next-question');
    
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            // In a real app, you would navigate to the next step/question set
            // For this demo, we'll just update the progress bar
            document.querySelector('.progress-fill').style.width = '50%';
            
            // Update active step in progress indicator
            const progressSteps = document.querySelectorAll('.progress-step');
            progressSteps[0].classList.remove('active');
            progressSteps[1].classList.add('active');
            
            // Update the current question section (in a real app, this would be more comprehensive)
            const currentQuestion = document.getElementById('current-question');
            currentQuestion.innerHTML = `
                <h2>Equipment & Materials</h2>
                
                <div class="question-field">
                    <label for="equipment-list">Required Equipment</label>
                    <textarea id="equipment-list" rows="4" placeholder="List all equipment needed for this procedure..." class="form-input"></textarea>
                    <div class="field-hint">Include model numbers and specifications where relevant</div>
                </div>
                
                <div class="question-field">
                    <label for="materials-list">Required Materials</label>
                    <textarea id="materials-list" rows="4" placeholder="List all materials, reagents, or consumables..." class="form-input"></textarea>
                    <div class="field-hint">Include grades, concentrations, and quantities if applicable</div>
                </div>
                
                <div class="question-field">
                    <label for="safety-equipment">Required Safety Equipment</label>
                    <textarea id="safety-equipment" rows="3" placeholder="List required PPE and safety equipment..." class="form-input"></textarea>
                    <div class="field-hint">Personal protective equipment, emergency equipment, etc.</div>
                </div>
                
                <div class="question-actions">
                    <button id="back-question" class="btn btn-secondary">Back: Basic Information</button>
                    <button id="next-procedure" class="btn btn-primary">Next: Procedure Steps</button>
                </div>
            `;
            
            // Update preview with a dummy equipment section
            const previewDocument = document.getElementById('preview-document');
            const materialsSection = previewDocument.querySelector('.sop-content .sop-section:nth-child(4)');
            if (materialsSection) {
                materialsSection.innerHTML = `
                    <h2>4. Materials and Equipment</h2>
                    <p>The following materials and equipment are required for this procedure:</p>
                    <p>[Your equipment list will appear here as you type]</p>
                `;
            }
            
            // Set up back button functionality
            const backButton = document.getElementById('back-question');
            if (backButton) {
                backButton.addEventListener('click', function() {
                    // In a real app, you would navigate back to the previous step
                    // For now, reload the page for simplicity
                    window.location.reload();
                });
            }
            
            // Set up next-procedure button
            const nextProcedureButton = document.getElementById('next-procedure');
            if (nextProcedureButton) {
                nextProcedureButton.addEventListener('click', function() {
                    // Update progress
                    document.querySelector('.progress-fill').style.width = '75%';
                    
                    // Update active step
                    const progressSteps = document.querySelectorAll('.progress-step');
                    progressSteps[1].classList.remove('active');
                    progressSteps[2].classList.add('active');
                    
                    // Show procedure steps interface
                    currentQuestion.innerHTML = `
                        <h2>Procedure Steps</h2>
                        
                        <div id="procedure-steps">
                            <div class="procedure-step">
                                <div class="step-header">
                                    <span class="step-number">Step 1</span>
                                    <div class="step-controls">
                                        <button class="step-control-btn add-step"><i class="fas fa-plus"></i></button>
                                    </div>
                                </div>
                                <div class="question-field">
                                    <input type="text" placeholder="Enter step title..." class="form-input step-title">
                                </div>
                                <div class="question-field">
                                    <textarea rows="3" placeholder="Describe the action in detail..." class="form-input step-description"></textarea>
                                </div>
                            </div>
                        </div>
                        
                        <div class="question-actions">
                            <button id="back-to-equipment" class="btn btn-secondary">Back: Equipment & Materials</button>
                            <button id="next-to-finalize" class="btn btn-primary">Next: Finalize SOP</button>
                        </div>
                    `;
                    
                    // Set up back to equipment button
                    const backToEquipmentButton = document.getElementById('back-to-equipment');
                    if (backToEquipmentButton) {
                        backToEquipmentButton.addEventListener('click', function() {
                            window.location.reload();
                        });
                    }
                    
                    // Set up procedure completion button
                    const nextToFinalizeButton = document.getElementById('next-to-finalize');
                    if (nextToFinalizeButton) {
                        nextToFinalizeButton.addEventListener('click', function() {
                            // Update progress to 100%
                            document.querySelector('.progress-fill').style.width = '100%';
                            
                            // Update active step
                            const progressSteps = document.querySelectorAll('.progress-step');
                            progressSteps[2].classList.remove('active');
                            progressSteps[3].classList.add('active');
                            
                            // Show finalization interface
                            currentQuestion.innerHTML = `
                                <h2>Finalize SOP</h2>
                                
                                <div class="success-message">
                                    <div class="success-icon">
                                        <i class="fas fa-check-circle"></i>
                                    </div>
                                    <h3>Your SOP is Ready!</h3>
                                    <p>You've successfully created a compliant Standard Operating Procedure that meets regulatory requirements.</p>
                                </div>
                                
                                <div class="question-field">
                                    <label for="sop-approvers">Approvers</label>
                                    <input type="text" id="sop-approvers" placeholder="Names of people who need to approve this SOP..." class="form-input">
                                    <div class="field-hint">Separate multiple names with commas</div>
                                </div>
                                
                                <div class="question-field">
                                    <label for="review-date">Next Review Date</label>
                                    <input type="date" id="review-date" class="form-input">
                                    <div class="field-hint">SOPs should be reviewed periodically to ensure they remain current</div>
                                </div>
                                
                                <div class="question-field">
                                    <label>Document Control</label>
                                    <div class="checkbox-group">
                                        <label class="checkbox-label">
                                            <input type="checkbox" checked> Include revision history table
                                        </label>
                                        <label class="checkbox-label">
                                            <input type="checkbox" checked> Include approval signatures section
                                        </label>
                                        <label class="checkbox-label">
                                            <input type="checkbox" checked> Include training requirements section
                                        </label>
                                    </div>
                                </div>
                                
                                <div class="finalize-actions">
                                    <button id="download-sop" class="btn btn-primary">
                                        <i class="fas fa-file-pdf"></i> Download SOP as PDF
                                    </button>
                                    <button id="share-sop" class="btn btn-primary">
                                        <i class="fas fa-share-alt"></i> Share for Review
                                    </button>
                                    <button id="save-to-library" class="btn btn-secondary">
                                        <i class="fas fa-save"></i> Save to My SOPs
                                    </button>
                                </div>
                            `;
                            
                            // Update the SOP preview with more complete content
                            const previewDocument = document.getElementById('preview-document');
                            if (previewDocument) {
                                // Get the content element within preview
                                const previewContent = previewDocument.querySelector('.preview-content');
                                if (previewContent) {
                                    // Update procedure section to show added steps
                                    const procedureSection = previewContent.querySelector('.sop-section:nth-child(5)');
                                    if (procedureSection) {
                                        procedureSection.innerHTML = `
                                            <h2>5. Procedure</h2>
                                            <ol class="procedure-steps">
                                                <li>
                                                    <strong>Preparation</strong>
                                                    <p>Ensure all equipment is available and calibrated. Put on appropriate PPE.</p>
                                                </li>
                                                <li>
                                                    <strong>Process Initiation</strong>
                                                    <p>Follow equipment manufacturer guidelines to start the process.</p>
                                                </li>
                                                <li>
                                                    <strong>Execution</strong>
                                                    <p>Complete the procedure following the technical specifications.</p>
                                                </li>
                                                <li>
                                                    <strong>Quality Check</strong>
                                                    <p>Verify results meet acceptance criteria before proceeding.</p>
                                                </li>
                                                <li>
                                                    <strong>Documentation</strong>
                                                    <p>Record all relevant data in the appropriate logbook or system.</p>
                                                </li>
                                            </ol>
                                        `;
                                    }
                                    
                                    // Add a new Approval section to the SOP
                                    previewContent.innerHTML += `
                                        <div class="sop-section">
                                            <h2>8. Approvals</h2>
                                            <table class="sop-table">
                                                <thead>
                                                    <tr>
                                                        <th>Role</th>
                                                        <th>Name</th>
                                                        <th>Signature</th>
                                                        <th>Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Prepared By</td>
                                                        <td>SOPEasy User</td>
                                                        <td>_____________</td>
                                                        <td>May 13, 2025</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Reviewed By</td>
                                                        <td>TBD</td>
                                                        <td>_____________</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Approved By</td>
                                                        <td>TBD</td>
                                                        <td>_____________</td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    `;
                                }
                            }
                            
                            // Set up actions for finalization buttons
                            const downloadSopBtn = document.getElementById('download-sop');
                            if (downloadSopBtn) {
                                downloadSopBtn.addEventListener('click', function() {
                                    alert('In a production environment, this would generate and download a PDF of your SOP.');
                                });
                            }
                            
                            const shareSopBtn = document.getElementById('share-sop');
                            if (shareSopBtn) {
                                shareSopBtn.addEventListener('click', function() {
                                    alert('In a production environment, this would open a dialog to share the SOP with colleagues for review and approval.');
                                });
                            }
                            
                            const saveToLibraryBtn = document.getElementById('save-to-library');
                            if (saveToLibraryBtn) {
                                saveToLibraryBtn.addEventListener('click', function() {
                                    alert('SOP saved to your library! In a production environment, this would save the SOP to your account for future access.');
                                });
                            }
                        });
                    }
                });
            }
        });
    }
    
    // Preview toggle functionality
    const togglePreviewBtn = document.getElementById('toggle-preview');
    const previewPanel = document.querySelector('.preview-panel');
    const questionPanel = document.querySelector('.question-panel');
    
    if (togglePreviewBtn) {
        togglePreviewBtn.addEventListener('click', function() {
            if (previewPanel.classList.contains('expanded')) {
                // Restore normal view
                previewPanel.classList.remove('expanded');
                questionPanel.style.display = 'block';
                togglePreviewBtn.innerHTML = '<i class="fas fa-expand"></i>';
            } else {
                // Expand preview panel
                previewPanel.classList.add('expanded');
                questionPanel.style.display = 'none';
                togglePreviewBtn.innerHTML = '<i class="fas fa-compress"></i>';
                
                // Add the expanded styles
                const expandedStyle = document.createElement('style');
                expandedStyle.id = 'expanded-preview-style';
                expandedStyle.textContent = `
                    .preview-panel.expanded {
                        max-width: 100%;
                        width: 100%;
                    }
                `;
                
                // Remove any existing expanded style to avoid duplicates
                const existingStyle = document.getElementById('expanded-preview-style');
                if (existingStyle) {
                    existingStyle.remove();
                }
                
                document.head.appendChild(expandedStyle);
            }
        });
    }
    
    // Export and Share preview buttons
    const exportPreviewBtn = document.getElementById('export-preview');
    if (exportPreviewBtn) {
        exportPreviewBtn.addEventListener('click', function() {
            alert('In a production environment, this would generate and download a PDF of your current SOP draft.');
        });
    }
    
    const sharePreviewBtn = document.getElementById('share-preview');
    if (sharePreviewBtn) {
        sharePreviewBtn.addEventListener('click', function() {
            alert('In a production environment, this would provide options to share your current SOP draft with colleagues.');
        });
    }
    
    // Start New SOP button in navigation
    const startNewSopBtn = document.getElementById('start-new-sop');
    if (startNewSopBtn) {
        startNewSopBtn.addEventListener('click', function() {
            // In a real app, this might check for unsaved changes
            // For this demo, we'll just reload the page
            window.location.reload();
        });
    }
    
    // Additional style for SOP creation ui
    const sopCreatorStyle = document.createElement('style');
    sopCreatorStyle.textContent = `
        .success-message {
            text-align: center;
            margin: 2rem 0;
            padding: 1.5rem;
            background-color: rgba(12, 206, 107, 0.1);
            border-radius: 10px;
        }
        
        .success-icon {
            font-size: 3rem;
            color: var(--success);
            margin-bottom: 1rem;
        }
        
        .success-message h3 {
            color: var(--success);
            margin-bottom: 0.5rem;
        }
        
        .checkbox-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .checkbox-label {
            display: flex;
            align-items: center;
            cursor: pointer;
        }
        
        .checkbox-label input {
            margin-right: 0.5rem;
        }
        
        .finalize-actions {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .procedure-step {
            background-color: #f9f9f9;
            padding: 1rem;
            border-radius: 5px;
            margin-bottom: 1rem;
        }
        
        .step-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
        }
        
        .step-number {
            font-weight: 600;
            color: var(--primary);
        }
        
        .step-controls {
            display: flex;
            gap: 0.5rem;
        }
        
        .step-control-btn {
            background: none;
            border: none;
            color: var(--text-light);
            cursor: pointer;
            transition: color 0.3s ease;
        }
        
        .step-control-btn:hover {
            color: var(--primary);
        }
        
        /* SOP specific styling */
        .procedure-steps {
            padding-left: 1.5rem;
        }
        
        .procedure-steps li {
            margin-bottom: 1rem;
        }
        
        .procedure-steps strong {
            display: block;
            margin-bottom: 0.3rem;
        }
    `;
    document.head.appendChild(sopCreatorStyle);
});document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            // Toggle active class for navigation menu
            navLinks.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.classList.toggle('active');
            });
        });
    }
    
    // Close mobile menu when clicking anywhere else
    document.addEventListener('click', function(event) {
        const isClickInsideNav = event.target.closest('nav');
        
        if (!isClickInsideNav && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            
            // Reset hamburger animation
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.classList.remove('active');
            });
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip if it's just "#" (likely a placeholder link)
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                
                // Reset hamburger animation
                const spans = menuToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.classList.remove('active');
                });
            }
            
            // Scroll to the target element
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Offset for the sticky header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add some additional styles for the hamburger animation
    const style = document.createElement('style');
    style.textContent = `
        .menu-toggle span.active:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .menu-toggle span.active:nth-child(2) {
            opacity: 0;
        }
        
        .menu-toggle span.active:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
    `;
    document.head.appendChild(style);
});

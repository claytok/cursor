document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const progressBar = document.getElementById('progress');
    const steps = document.querySelectorAll('.step');
    const sections = document.querySelectorAll('.step-content');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    const downloadBtn = document.getElementById('download-btn');
    const finalDownloadBtn = document.getElementById('final-download-btn');
    const restartBtn = document.getElementById('restart-btn');
    const saveProgressBtn = document.getElementById('save-progress-btn');
    const loadProgressBtn = document.getElementById('load-progress-btn');
    const themeToggle = document.getElementById('theme-toggle-checkbox');
    const notification = document.getElementById('notification');
    const recruitmentMethodSelect = document.getElementById('recruitment-method');
    const otherRecruitmentMethodContainer = document.getElementById('other-recruitment-method-container');
    const templateName = document.getElementById('template-name');
    const templateCriteria = document.getElementById('template-criteria');
    const irbForm = document.getElementById('irb-form');

    // State
    let currentStep = 1;
    let formData = {
        'site-type': '',
        'focus-area': '',
        'institution-type': '',
        'risk-level': '',
        'pi-name': '',
        'study-title': '',
        'study-abstract': '',
        'recruitment-method': ''
    };

    // Templates mapping based on user selections
    const templates = {
        'Single-site_Biomedical_Academic_Exempt': {
            name: 'Academic Biomedical Exempt Template',
            sections: [
                {
                    title: 'Introduction',
                    prompt: 'Briefly describe the background and purpose of the study. E.g., "This study aims to evaluate the effects of [treatment/intervention] on [outcome]."'
                },
                {
                    title: 'Research Personnel',
                    prompt: 'List all personnel involved in the study, including their roles, qualifications, and responsibilities.'
                },
                {
                    title: 'Study Protocol',
                    prompt: 'Explain what participants will be asked to do, including duration, activities, and any procedures they will undergo. Include information about follow-up sessions if applicable.'
                },
                {
                    title: 'Participant Information',
                    prompt: 'Describe the target population, inclusion/exclusion criteria, and the number of participants you plan to recruit.'
                },
                {
                    title: 'Minimal Risk Assessment',
                    prompt: 'Explain why this study qualifies for exempt status by describing the minimal risks involved and any steps taken to mitigate these risks.'
                },
                {
                    title: 'Data Management',
                    prompt: 'Describe how data will be collected, stored, protected, and when/how it will be destroyed. Include details about anonymization or de-identification procedures.'
                },
                {
                    title: 'Declaration',
                    prompt: 'Provide a statement confirming compliance with ethical standards and institutional policies.'
                }
            ]
        },
        'Single-site_Biomedical_Academic_Expedited': {
            name: 'Academic Biomedical Expedited Template',
            sections: [
                {
                    title: 'Introduction',
                    prompt: 'Provide a comprehensive background of the study, including relevant literature and the gap your research aims to fill. State your research question and hypothesis clearly.'
                },
                {
                    title: 'Research Personnel',
                    prompt: 'List all personnel involved in the study, their qualifications, roles, and their experience with similar research. Include training certifications relevant to this research.'
                },
                {
                    title: 'Study Protocol',
                    prompt: 'Provide a detailed description of all procedures, interventions, and measurements. Include timeline, visit schedules, and any equipment or substances that will be used.'
                },
                {
                    title: 'Risk Assessment',
                    prompt: 'Identify all potential risks (physical, psychological, social, legal, etc.) and the probability and magnitude of each. Describe measures to minimize these risks and manage adverse events.'
                },
                {
                    title: 'Participant Information',
                    prompt: 'Describe your target population in detail, justification for inclusion/exclusion criteria, and recruitment strategies. Explain how you determined your sample size.'
                },
                {
                    title: 'Informed Consent Process',
                    prompt: 'Describe how consent will be obtained, documented, and maintained. Include provisions for participants who may have diminished capacity or require special considerations.'
                },
                {
                    title: 'Data Security Plan',
                    prompt: 'Detail your comprehensive plan for data collection, storage, security, sharing, and destruction. Specify software, physical safeguards, and access controls.'
                },
                {
                    title: 'Declaration',
                    prompt: 'Affirm adherence to research ethics, confidentiality obligations, conflict of interest disclosures, and institutional policies.'
                }
            ]
        },
        'Single-site_Behavioral/Social Science_Academic_Exempt': {
            name: 'Academic Behavioral Science Exempt Template',
            sections: [
                {
                    title: 'Introduction',
                    prompt: 'Describe the purpose and significance of your research in the context of existing behavioral science literature. Explain how this study will contribute to the field.'
                },
                {
                    title: 'Research Team',
                    prompt: 'List all team members, their qualifications, and specific responsibilities in this study. Note any relevant specialized training.'
                },
                {
                    title: 'Methods',
                    prompt: 'Describe your research design, data collection methods (surveys, interviews, observations, etc.), and analytical approach. Include sample materials or instruments.'
                },
                {
                    title: 'Participant Demographics',
                    prompt: 'Describe target population, recruitment strategies, inclusion/exclusion criteria, and sample size with justification.'
                },
                {
                    title: 'Minimal Risk Statement',
                    prompt: 'Explain why this study qualifies for exempt status by describing the minimal risks to participants and how these compare to everyday activities.'
                },
                {
                    title: 'Data Collection & Privacy',
                    prompt: 'Detail how data will be collected, stored, anonymized, and protected. Specify who will have access to the data and when it will be destroyed.'
                },
                {
                    title: 'Declaration',
                    prompt: 'Confirm compliance with ethical guidelines for behavioral research and any relevant institutional policies.'
                }
            ]
        },
        'Single-site_Behavioral/Social Science_Academic_Expedited': {
            name: 'Academic Behavioral Science Expedited Template',
            sections: [
                {
                    title: 'Introduction',
                    prompt: 'Provide a thorough literature review, research questions, and theoretical framework. Explain the potential impact of your study on the field and society.'
                },
                {
                    title: 'Research Team',
                    prompt: 'List all researchers and their qualifications, roles, and experience with similar studies. Include details on specialized training relevant to sensitive topics if applicable.'
                },
                {
                    title: 'Methods & Procedures',
                    prompt: 'Describe in detail your research design, methodologies, instruments/measures, and procedures. Explain participant tasks, duration, and location of research activities.'
                },
                {
                    title: 'Participant Demographics',
                    prompt: 'Detail your recruitment strategies, inclusion/exclusion criteria, and justification for your sample characteristics. Explain how you will ensure diverse representation if applicable.'
                },
                {
                    title: 'Risk Assessment',
                    prompt: 'Identify all potential risks (psychological, social, economic, legal) and their likelihood. Describe safeguards to minimize risks and your plan for handling adverse events.'
                },
                {
                    title: 'Informed Consent Process',
                    prompt: 'Describe how you will obtain, document, and maintain informed consent. Include provisions for vulnerable populations if applicable.'
                },
                {
                    title: 'Data Collection & Privacy',
                    prompt: 'Detail your data management plan, including collection methods, security measures, access restrictions, and long-term storage or destruction protocols.'
                },
                {
                    title: 'Declaration',
                    prompt: 'Affirm adherence to ethical standards in behavioral research, addressing confidentiality, conflicts of interest, and institutional compliance.'
                }
            ]
        }
    };

    // Default template when specific combination is not found
    const defaultTemplate = {
        name: 'Standard IRB Template',
        sections: [
            {
                title: 'Introduction',
                prompt: 'Provide background information, the purpose of the study, and its significance to the field.'
            },
            {
                title: 'Research Team',
                prompt: 'List all personnel involved in the study, their roles, qualifications, and responsibilities.'
            },
            {
                title: 'Study Protocol',
                prompt: 'Explain the study design, methods, procedures, and timeline. Describe what participants will do during the study.'
            },
            {
                title: 'Participant Information',
                prompt: 'Describe the target population, inclusion/exclusion criteria, and recruitment methods.'
            },
            {
                title: 'Risk Assessment',
                prompt: 'Identify potential risks to participants and describe how these risks will be minimized.'
            },
            {
                title: 'Informed Consent',
                prompt: 'Describe the informed consent process and how participant consent will be obtained and documented.'
            },
            {
                title: 'Data Management',
                prompt: 'Explain how data will be collected, stored, secured, and eventually destroyed or archived.'
            },
            {
                title: 'Declaration',
                prompt: 'Provide attestations regarding compliance with institutional policies and ethical standards.'
            }
        ]
    };

    // Initialize
    function init() {
        updateProgressBar();
        checkForSavedTheme();
        addEventListeners();
        checkFormInputs();
    }

    // Event Listeners
    function addEventListeners() {
        // Next buttons
        nextButtons.forEach(button => {
            button.addEventListener('click', () => {
                const nextStep = parseInt(button.getAttribute('data-next'));
                goToStep(nextStep);
            });
        });

        // Previous buttons
        prevButtons.forEach(button => {
            button.addEventListener('click', () => {
                const prevStep = parseInt(button.getAttribute('data-prev'));
                goToStep(prevStep);
            });
        });

        // Radio buttons for site type
        document.querySelectorAll('input[name="site-type"]').forEach(radio => {
            radio.addEventListener('change', function() {
                formData['site-type'] = this.value;
                enableNextButton(2);
                saveToLocalStorage();
            });
        });

        // Radio buttons for focus area
        document.querySelectorAll('input[name="focus-area"]').forEach(radio => {
            radio.addEventListener('change', function() {
                formData['focus-area'] = this.value;
                enableNextButton(3);
                saveToLocalStorage();
            });
        });

        // Radio buttons for institution type
        document.querySelectorAll('input[name="institution-type"]').forEach(radio => {
            radio.addEventListener('change', function() {
                formData['institution-type'] = this.value;
                enableNextButton(4);
                saveToLocalStorage();
            });
        });

        // Radio buttons for risk level
        document.querySelectorAll('input[name="risk-level"]').forEach(radio => {
            radio.addEventListener('change', function() {
                formData['risk-level'] = this.value;
                enableNextButton(5);
                saveToLocalStorage();
            });
        });

        // Form inputs in step 6
        document.getElementById('pi-name').addEventListener('input', updateFormData);
        document.getElementById('study-title').addEventListener('input', updateFormData);
        document.getElementById('study-abstract').addEventListener('input', updateFormData);
        
        // Recruitment method selection
        recruitmentMethodSelect.addEventListener('change', function() {
            formData['recruitment-method'] = this.value;
            
            if (this.value === 'Other') {
                otherRecruitmentMethodContainer.style.display = 'block';
                document.getElementById('other-recruitment-method').addEventListener('input', function() {
                    formData['other-recruitment-method'] = this.value;
                    checkFormCompletion();
                    saveToLocalStorage();
                });
            } else {
                otherRecruitmentMethodContainer.style.display = 'none';
            }
            
            checkFormCompletion();
            saveToLocalStorage();
        });

        // Generate template button
        downloadBtn.addEventListener('click', function() {
            goToStep(7);
        });

        // Final download button
        finalDownloadBtn.addEventListener('click', generateDocument);

        // Restart button
        restartBtn.addEventListener('click', resetForm);

        // Save progress button
        saveProgressBtn.addEventListener('click', function() {
            saveToLocalStorage();
            showNotification('Progress saved successfully!');
        });

        // Load progress button
        loadProgressBtn.addEventListener('click', loadFromLocalStorage);

        // Theme toggle
        themeToggle.addEventListener('change', toggleTheme);
    }

    // Functions to handle form navigation
    function goToStep(step) {
        // Hide current step
        document.getElementById(`step-${currentStep}`).classList.remove('active');
        
        // Show next step
        document.getElementById(`step-${step}`).classList.add('active');
        
        // Update steps
        if (step > currentStep) {
            for (let i = currentStep; i < step; i++) {
                steps[i-1].classList.add('completed');
            }
        }
        
        // Update current step
        currentStep = step;
        
        // Update progress bar
        updateProgressBar();
        
        // If we're on step 6, update the template info
        if (step === 6) {
            updateTemplateInfo();
        }
    }

    function updateProgressBar() {
        const activeStep = currentStep - 1; // Steps are 1-indexed, array is 0-indexed
        const percent = (activeStep / (steps.length - 1)) * 100;
        progressBar.style.width = `${percent}%`;
        
        steps.forEach((step, idx) => {
            if (idx < activeStep) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (idx === activeStep) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active');
                step.classList.remove('completed');
            }
        });
    }

    function enableNextButton(step) {
        const nextBtn = document.querySelector(`#step-${step} .next-btn`);
        if (nextBtn) {
            nextBtn.disabled = false;
        }
    }

    // Form data handling
    function updateFormData(e) {
        const id = e.target.id;
        formData[id] = e.target.value;
        checkFormCompletion();
        saveToLocalStorage();
    }

    function checkFormCompletion() {
        const requiredFields = ['pi-name', 'study-title', 'study-abstract', 'recruitment-method'];
        const allFilled = requiredFields.every(field => {
            if (field === 'recruitment-method' && formData[field] === 'Other') {
                return formData['other-recruitment-method'] && formData['other-recruitment-method'].trim() !== '';
            }
            return formData[field] && formData[field].trim() !== '';
        });
        
        downloadBtn.disabled = !allFilled;
    }

    function checkFormInputs() {
        // Check if any form inputs are already filled (e.g., from localStorage)
        if (formData['site-type']) {
            document.querySelector(`input[value="${formData['site-type']}"]`).checked = true;
            enableNextButton(2);
        }
        
        if (formData['focus-area']) {
            document.querySelector(`input[value="${formData['focus-area']}"]`).checked = true;
            enableNextButton(3);
        }
        
        if (formData['institution-type']) {
            document.querySelector(`input[value="${formData['institution-type']}"]`).checked = true;
            enableNextButton(4);
        }
        
        if (formData['risk-level']) {
            document.querySelector(`input[value="${formData['risk-level']}"]`).checked = true;
            enableNextButton(5);
        }
        
        if (formData['pi-name']) {
            document.getElementById('pi-name').value = formData['pi-name'];
        }
        
        if (formData['study-title']) {
            document.getElementById('study-title').value = formData['study-title'];
        }
        
        if (formData['study-abstract']) {
            document.getElementById('study-abstract').value = formData['study-abstract'];
        }
        
        if (formData['recruitment-method']) {
            document.getElementById('recruitment-method').value = formData['recruitment-method'];
            
            if (formData['recruitment-method'] === 'Other') {
                otherRecruitmentMethodContainer.style.display = 'block';
                document.getElementById('other-recruitment-method').value = formData['other-recruitment-method'] || '';
            }
        }
        
        checkFormCompletion();
    }

    // Template handling
    function updateTemplateInfo() {
        const templateKey = `${formData['site-type']}_${formData['focus-area']}_${formData['institution-type']}_${formData['risk-level']}`;
        const selectedTemplate = templates[templateKey] || defaultTemplate;
        
        templateName.textContent = selectedTemplate.name;
        templateCriteria.innerHTML = '';
        
        // Add the criteria to the list
        const criteria = [
            { label: 'Site Type', value: formData['site-type'] },
            { label: 'Focus Area', value: formData['focus-area'] },
            { label: 'Institution Type', value: formData['institution-type'] },
            { label: 'Risk Level', value: formData['risk-level'] }
        ];
        
        criteria.forEach(criterion => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-check-circle"></i> <strong>${criterion.label}:</strong> ${criterion.value}`;
            templateCriteria.appendChild(li);
        });
    }

    // Document generation
    function generateDocument() {
        const format = document.querySelector('input[name="format"]:checked').value;
        const templateKey = `${formData['site-type']}_${formData['focus-area']}_${formData['institution-type']}_${formData['risk-level']}`;
        const selectedTemplate = templates[templateKey] || defaultTemplate;
        
        if (format === 'docx') {
            generateDocx(selectedTemplate);
        } else {
            generatePdf(selectedTemplate);
        }
    }

    function generateDocx(template) {
        const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } = window.docx;
        
        // Create document
        const doc = new Document({
            title: formData['study-title'],
            description: 'IRB Template',
            styles: {
                paragraphStyles: [
                    {
                        id: 'Normal',
                        name: 'Normal',
                        run: {
                            size: 24, // 12pt
                            font: 'Calibri'
                        },
                        paragraph: {
                            spacing: {
                                line: 276 // 1.15 line spacing
                            }
                        }
                    },
                    {
                        id: 'Prompt',
                        name: 'Prompt',
                        run: {
                            size: 24, // 12pt
                            font: 'Calibri',
                            italics: true,
                            color: '808080'
                        },
                        paragraph: {
                            spacing: {
                                line: 276, // 1.15 line spacing
                                after: 200
                            }
                        }
                    }
                ]
            }
        });
        
        // Add title
        doc.addSection({
            children: [
                new Paragraph({
                    text: formData['study-title'],
                    heading: HeadingLevel.TITLE,
                    alignment: AlignmentType.CENTER,
                    spacing: {
                        after: 200
                    }
                }),
                new Paragraph({
                    text: 'IRB Application',
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.CENTER,
                    spacing: {
                        after: 400
                    }
                }),
                new Paragraph({
                    text: `Template: ${template.name}`,
                    alignment: AlignmentType.CENTER,
                    spacing: {
                        after: 400
                    }
                }),
                new Paragraph({
                    text: `Principal Investigator: ${formData['pi-name']}`,
                    spacing: {
                        after: 200
                    }
                }),
                new Paragraph({
                    text: 'Study Abstract:',
                    heading: HeadingLevel.HEADING_2,
                    spacing: {
                        after: 100
                    }
                }),
                new Paragraph({
                    text: formData['study-abstract'],
                    spacing: {
                        after: 200
                    }
                }),
                new Paragraph({
                    text: `Recruitment Method: ${formData['recruitment-method'] === 'Other' ? formData['other-recruitment-method'] : formData['recruitment-method']}`,
                    spacing: {
                        after: 400
                    }
                })
            ]
        });
        
        // Add each section from the template
        const sectionContent = new Array();
        
        template.sections.forEach(section => {
            sectionContent.push(
                new Paragraph({
                    text: section.title,
                    heading: HeadingLevel.HEADING_1,
                    spacing: {
                        before: 400,
                        after: 200
                    }
                }),
                new Paragraph({
                    text: section.prompt,
                    style: 'Prompt',
                    spacing: {
                        after: 200
                    }
                }),
                new Paragraph({
                    text: '',
                    spacing: {
                        after: 200
                    }
                })
            );
        });
        
        doc.addSection({
            children: sectionContent
        });
        
        // Generate and download
        Packer.toBlob(doc).then(blob => {
            // Create a link and download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.style.display = 'none';
            a.href = url;
            a.download = `${formData['study-title'].replace(/\s+/g, '_')}_IRB_Template.docx`;
            a.click();
            window.URL.revokeObjectURL(url);
            showNotification('Document downloaded successfully!');
        });
    }

    function generatePdf(template) {
        const { jsPDF } = window.jspdf;
        
        // Create document
        const doc = new jsPDF();
        
        // Set font
        doc.setFont("helvetica");
        
        // Add title
        doc.setFontSize(24);
        doc.text(formData['study-title'], 105, 20, { align: 'center' });
        
        // Add subtitle
        doc.setFontSize(18);
        doc.text('IRB Application', 105, 30, { align: 'center' });
        
        // Add template name
        doc.setFontSize(12);
        doc.text(`Template: ${template.name}`, 105, 40, { align: 'center' });
        
        // Add PI name
        doc.setFontSize(12);
        doc.text(`Principal Investigator: ${formData['pi-name']}`, 20, 55);
        
        // Add abstract
        doc.setFontSize(14);
        doc.text('Study Abstract:', 20, 65);
        
        // Split abstract into multiple lines
        const splitAbstract = doc.splitTextToSize(formData['study-abstract'], 170);
        doc.setFontSize(12);
        doc.text(splitAbstract, 20, 75);
        
        // Add recruitment method
        const recruitmentMethod = formData['recruitment-method'] === 'Other' 
            ? formData['other-recruitment-method'] 
            : formData['recruitment-method'];
        doc.text(`Recruitment Method: ${recruitmentMethod}`, 20, 95 + splitAbstract.length * 5);
        
        // Add each section from the template
        let yPosition = 115 + splitAbstract.length * 5;
        
        template.sections.forEach(section => {
            // Check if we need a new page
            if (yPosition > 270) {
                doc.addPage();
                yPosition = 20;
            }
            
            doc.setFontSize(16);
            doc.text(section.title, 20, yPosition);
            yPosition += 10;
            
            // Add prompt text
            doc.setFontSize(10);
            doc.setTextColor(128, 128, 128); // Gray color
            doc.setFont("helvetica", "italic");
            
            // Split prompt into multiple lines
            const splitPrompt = doc.splitTextToSize(section.prompt, 170);
            doc.text(splitPrompt, 20, yPosition);
            yPosition += splitPrompt.length * 5 + 10;
            
            // Reset font
            doc.setFont("helvetica", "normal");
            doc.setTextColor(0, 0, 0); // Black color
            
            yPosition += 10;
        });
        
        // Generate and download
        doc.save(`${formData['study-title'].replace(/\s+/g, '_')}_IRB_Template.pdf`);
        showNotification('Document downloaded successfully!');
    }

    // Local Storage functions
    function saveToLocalStorage() {
        localStorage.setItem('irbFormData', JSON.stringify(formData));
        localStorage.setItem('irbCurrentStep', currentStep);
    }

    function loadFromLocalStorage() {
        const savedData = localStorage.getItem('irbFormData');
        const savedStep = localStorage.getItem('irbCurrentStep');
        
        if (savedData) {
            formData = JSON.parse(savedData);
            checkFormInputs();
            showNotification('Progress loaded successfully!');
        }
        
        if (savedStep) {
            goToStep(parseInt(savedStep));
        }
    }

    // Theme functions
    function checkForSavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            themeToggle.checked = true;
        }
    }

    function toggleTheme() {
        if (themeToggle.checked) {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    }

    // Utility functions
    function showNotification(message) {
        notification.innerHTML = `<p>${message}</p>`;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    function resetForm() {
        // Clear form data
        formData = {
            'site-type': '',
            'focus-area': '',
            'institution-type': '',
            'risk-level': '',
            'pi-name': '',
            'study-title': '',
            'study-abstract': '',
            'recruitment-method': ''
        };
        
        // Uncheck all radio buttons
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });
        
        // Clear all text inputs
        document.querySelectorAll('input[type="text"], textarea, select').forEach(input => {
            input.value = '';
        });
        
        // Disable next buttons
        document.querySelectorAll('.next-btn').forEach(button => {
            button.disabled = true;
        });
        
        // Reset to step 1
        goToStep(1);
        
        // Clear localStorage
        localStorage.removeItem('irbFormData');
        localStorage.removeItem('irbCurrentStep');
        
        showNotification('Form has been reset!');
    }

    // Initialize the app
    init();
});

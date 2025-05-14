// SVG icons data
const svgIcons = {
    "microscope": `<svg viewBox="0 0 24 24" width="100%" height="100%">
        <path d="M18,2h-7v2h7c0.55,0,1,0.45,1,1v7h2V5C21,3.34,19.66,2,18,2z" fill="currentColor"/>
        <path d="M11,12c-0.55,0-1,0.45-1,1v1H6.5C5.12,14,4,15.12,4,16.5S5.12,19,6.5,19H15c1.1,0,2-0.9,2-2v-4H11z M13,17H6.5 C6.22,17,6,16.78,6,16.5S6.22,16,6.5,16H13V17z" fill="currentColor"/>
        <path d="M10,5v5c0,0.55,0.45,1,1,1h5V5H10z" fill="currentColor"/>
        <path d="M12,9.5c-0.55,0-1-0.45-1-1s0.45-1,1-1s1,0.45,1,1S12.55,9.5,12,9.5z" fill="currentColor"/>
    </svg>`,
    "petri-dish": `<svg viewBox="0 0 24 24" width="100%" height="100%">
        <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.42,0-8-3.58-8-8s3.58-8,8-8s8,3.58,8,8 S16.42,20,12,20z" fill="currentColor"/>
        <circle cx="8.5" cy="9.5" r="1.5" fill="currentColor"/>
        <circle cx="11.5" cy="7" r="1" fill="currentColor"/>
        <circle cx="15" cy="9" r="1" fill="currentColor"/>
        <circle cx="10" cy="13" r="1.5" fill="currentColor"/>
        <circle cx="15.5" cy="14" r="1.5" fill="currentColor"/>
        <circle cx="8" cy="16" r="1" fill="currentColor"/>
    </svg>`,
    "flask": `<svg viewBox="0 0 24 24" width="100%" height="100%">
        <path d="M5,19c0,1.1,0.9,2,2,2h10c1.1,0,2-0.9,2-2v-1c0-0.55-0.45-1-1-1h-1.5v-5H18c0.55,0,1-0.45,1-1v-1c0-0.55-0.45-1-1-1h-1.5V5 c0-0.55-0.45-1-1-1h-5c-0.55,0-1,0.45-1,1v4H8c-0.55,0-1,0.45-1,1v1c0,0.55,0.45,1,1,1h1.5v5H8c-0.55,0-1,0.45-1,1V19z M12.5,5.5h1 v2h-1V5.5z M11,5.5v2h-1v-2H11z M9,13.5h6v5H9V13.5z" fill="currentColor"/>
        <circle cx="12" cy="16" r="1" fill="currentColor"/>
        <circle cx="10" cy="15" r="0.5" fill="currentColor"/>
        <circle cx="14" cy="15" r="0.5" fill="currentColor"/>
    </svg>`,
    "dna": `<svg viewBox="0 0 24 24" width="100%" height="100%">
        <path d="M18,20c-0.17,0-0.33-0.09-0.42-0.23c-1.02-1.61-2.83-2.58-4.85-2.68c-1.25-0.07-2.48,0.2-3.47,0.75 c-0.99,0.56-1.83,1.4-2.36,2.38c-0.14,0.27-0.48,0.37-0.74,0.22c-0.27-0.14-0.37-0.48-0.22-0.74c0.63-1.17,1.63-2.15,2.8-2.82 c1.17-0.66,2.63-0.99,4.13-0.9c2.41,0.13,4.54,1.31,5.79,3.21c0.15,0.26,0.05,0.59-0.21,0.74C18.2,19.98,18.1,20,18,20z" fill="currentColor"/>
        <path d="M6,4c0.17,0,0.33,0.09,0.42,0.23c1.02,1.61,2.83,2.58,4.85,2.68c1.25,0.07,2.48-0.2,3.47-0.75c0.99-0.56,1.83-1.4,2.36-2.38 c0.14-0.27,0.48-0.37,0.74-0.22c0.27,0.14,0.37,0.48,0.22,0.74c-0.63,1.17-1.63,2.15-2.8,2.82c-1.17,0.66-2.63,0.99-4.13,0.9 c-2.41-0.13-4.54-1.31-5.79-3.21C5.64,4.49,5.73,4.16,6,4.01C6.09,4.02,6.09,4,6,4z" fill="currentColor"/>
        <path d="M14.5,9h-5c-0.28,0-0.5-0.22-0.5-0.5v0c0-0.28,0.22-0.5,0.5-0.5h5c0.28,0,0.5,0.22,0.5,0.5v0C15,8.77,14.78,9,14.5,9z" fill="currentColor"/>
        <path d="M14.5,11h-5c-0.28,0-0.5-0.22-0.5-0.5v0c0-0.28,0.22-0.5,0.5-0.5h5c0.28,0,0.5,0.22,0.5,0.5v0C15,10.77,14.78,11,14.5,11 z" fill="currentColor"/>
        <path d="M14.5,13h-5c-0.28,0-0.5-0.22-0.5-0.5v0c0-0.28,0.22-0.5,0.5-0.5h5c0.28,0,0.5,0.22,0.5,0.5v0C15,12.77,14.78,13,14.5,13 z" fill="currentColor"/>
        <path d="M14.5,15h-5c-0.28,0-0.5-0.22-0.5-0.5v0c0-0.28,0.22-0.5,0.5-0.5h5c0.28,0,0.5,0.22,0.5,0.5v0C15,14.77,14.78,15,14.5,15 z" fill="currentColor"/>
        <path d="M14.5,17h-5c-0.28,0-0.5-0.22-0.5-0.5v0c0-0.28,0.22-0.5,0.5-0.5h5c0.28,0,0.5,0.22,0.5,0.5v0C15,16.77,14.78,17,14.5,17 z" fill="currentColor"/>
    </svg>`,
    "molecule": `<svg viewBox="0 0 24 24" width="100%" height="100%">
        <circle cx="12" cy="12" r="2.5" fill="currentColor"/>
        <circle cx="6" cy="6" r="2" fill="currentColor"/>
        <circle cx="18" cy="6" r="2" fill="currentColor"/>
        <circle cx="6" cy="18" r="2" fill="currentColor"/>
        <circle cx="18" cy="18" r="2" fill="currentColor"/>
        <path d="M12,10.3L6.7,6.7 M12,10.3l5.3-3.6 M12,13.7l-5.3,3.6 M12,13.7l5.3,3.6" stroke="currentColor" stroke-width="1.5" fill="none"/>
    </svg>`,
    // Drawing tools
    "line": `<svg viewBox="0 0 24 24" width="100%" height="100%"><path d="M4,20L20,4" stroke="currentColor" stroke-width="2" fill="none"/></svg>`,
    "arrow": `<svg viewBox="0 0 24 24" width="100%" height="100%">
        <defs>
            <marker id="arrowhead-icon" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" stroke="none"/>
            </marker>
        </defs>
        <line x1="4" y1="20" x2="17" y2="7" stroke="currentColor" stroke-width="2" fill="none" marker-end="url(#arrowhead-icon)"/>
    </svg>`,
    "rectangle": `<svg viewBox="0 0 24 24" width="100%" height="100%"><rect x="4" y="4" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"/></svg>`,
    "circle": `<svg viewBox="0 0 24 24" width="100%" height="100%"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" fill="none"/></svg>`
};

// Templates for the template buttons
const templates = {
    // Removing the templates as requested
};

// State variables
let currentTool = "microscope";
let isDragging = false;
let currentDragElement = null;
let offsetX = 0;
let offsetY = 0;
let selectedElement = null;
let activeMenu = null;
let canvasScale = 1;
let history = [];
let historyIndex = -1;
let elementCounter = 0;
let currentColor = "#000000"; // Default color for drawing tools
// Variables for drawing
let isDrawing = false;
let startX = 0;
let startY = 0;
let drawingElement = null;

// DOM Elements
const canvas = document.getElementById("editor-canvas");
const statusBar = document.getElementById("status-bar");
const toast = document.getElementById("toast");

// Initialize the app
function init() {
    // Set up sidebar tool buttons
    document.querySelectorAll('.sidebar-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update current tool
            currentTool = btn.dataset.tool;
            updateStatusBar();
            
            // Check if this is an image tool (not a drawing tool)
            const drawingTools = ['line', 'arrow', 'rectangle', 'circle', 'text'];
            if (!drawingTools.includes(currentTool)) {
                // Directly add the image to the canvas when tool is selected
                const canvasRect = canvas.getBoundingClientRect();
                const x = canvasRect.width / 2;
                const y = canvasRect.height / 2;
                addElement(x, y, currentTool);
            }
        });
    });
    
    // Set up delete button
    const deleteBtn = document.getElementById('delete-btn');
    deleteBtn.addEventListener('click', () => {
        if (selectedElement) {
            const elementToRemove = selectedElement;
            deselectElement();
            elementToRemove.remove();
            updateStatusBar();
            saveToHistory();
            showToast('Element deleted');
        } else {
            showToast('No element selected');
            deleteBtn.disabled = true;
            setTimeout(() => {
                deleteBtn.disabled = false;
            }, 1000);
        }
    });
    
    // Set up drop-down menus
    document.querySelectorAll('.menu-item').forEach(menuItem => {
        menuItem.addEventListener('click', (e) => {
            if (e.target === menuItem) {
                // Close any active menu
                if (activeMenu && activeMenu !== menuItem) {
                    activeMenu.classList.remove('active');
                }
                
                // Toggle current menu
                menuItem.classList.toggle('active');
                activeMenu = menuItem.classList.contains('active') ? menuItem : null;
                
                // Prevent click from bubbling to document
                e.stopPropagation();
            }
        });
    });
    
    // Close dropdown when clicking elsewhere
    document.addEventListener('click', () => {
        if (activeMenu) {
            activeMenu.classList.remove('active');
            activeMenu = null;
        }
    });
    
    // Set up menu actions
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const action = item.dataset.action;
            handleMenuAction(action);
            
            // Close menu after action
            if (activeMenu) {
                activeMenu.classList.remove('active');
                activeMenu = null;
            }
            
            // Prevent bubbling
            e.stopPropagation();
        });
    });
    
    // Set up template buttons
    document.querySelectorAll('.template-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const template = btn.dataset.template;
            if (template === "export") {
                exportAsPNG();
            } else {
                applyTemplate(template);
            }
        });
    });
    
    // Set up format buttons
    document.querySelectorAll('.format-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (selectedElement && selectedElement.classList.contains('text-element')) {
                const format = btn.title.toLowerCase();
                applyFormatting(selectedElement, format);
                btn.classList.toggle('active');
            } else {
                showToast('Please select a text element first');
            }
        });
    });
    
    // Set up font selectors
    document.getElementById('font-select').addEventListener('change', (e) => {
        if (selectedElement && selectedElement.classList.contains('text-element')) {
            selectedElement.style.fontFamily = e.target.value;
            showToast(`Font changed to ${e.target.value}`);
        } else {
            showToast('Please select a text element first');
        }
    });
    
    document.getElementById('font-size').addEventListener('change', (e) => {
        if (selectedElement && selectedElement.classList.contains('text-element')) {
            selectedElement.style.fontSize = e.target.value + 'px';
            showToast(`Font size changed to ${e.target.value}px`);
        } else {
            showToast('Please select a text element first');
        }
    });
    
    // Set up color picker
    document.getElementById('color-picker').addEventListener('change', (e) => {
        currentColor = e.target.value;
        showToast(`Color changed to ${currentColor}`);
        
        // Update selected element color if any element is selected
        if (selectedElement) {
            applySVGColor(selectedElement, currentColor);
            saveToHistory();
        }
    });
    
    // Set up canvas mouse events for drawing
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    
    // Set up canvas click handler for adding elements
    canvas.addEventListener('click', (e) => {
        // Only add if click is directly on the canvas (not on an element)
        if (e.target === canvas) {
            const rect = canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) / canvasScale;
            const y = (e.clientY - rect.top) / canvasScale;
            
            if (currentTool === 'text') {
                addTextElement(x, y);
            }
        }
    });
    
    // Set up double-click handler for text editing
    canvas.addEventListener('dblclick', (e) => {
        if (e.target.classList.contains('text-element') || e.target.parentElement.classList.contains('text-element')) {
            const textElement = e.target.classList.contains('text-element') ? e.target : e.target.parentElement;
            makeTextEditable(textElement);
        }
    });
    
    // Setup keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Delete key to remove selected element
        if ((e.key === 'Delete' || e.key === 'Backspace') && selectedElement) {
            e.preventDefault(); // Prevent browser back navigation with backspace
            const elementToRemove = selectedElement;
            deselectElement();
            elementToRemove.remove();
            updateStatusBar();
            saveToHistory();
            showToast('Element deleted');
        }
        
        // Ctrl+S to save
        if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault(); // Prevent browser save dialog
            handleMenuAction('save');
        }
        
        // Ctrl+Z for undo
        if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            undo();
        }
        
        // Ctrl+Y or Ctrl+Shift+Z for redo
        if ((e.key === 'y' && (e.ctrlKey || e.metaKey)) || 
            (e.key === 'z' && (e.ctrlKey || e.metaKey) && e.shiftKey)) {
            e.preventDefault();
            redo();
        }
        
        // Escape to deselect
        if (e.key === 'Escape') {
            if (selectedElement) {
                deselectElement();
            }
            
            // Close any open menu
            if (activeMenu) {
                activeMenu.classList.remove('active');
                activeMenu = null;
            }
        }
    });
    
    // Save initial state
    saveToHistory();
    
    // No image added on load (removed as requested)
    showToast('Welcome to SciCanvas!', 3000);
    
    // Update status bar
    updateStatusBar();
}

// Function to apply color to SVG elements
function applySVGColor(element, color) {
    if (!element) return;
    
    // Update all SVG paths, lines, rectangles, circles
    const svgPaths = element.querySelectorAll('path, rect, circle, line, ellipse');
    svgPaths.forEach(path => {
        path.setAttribute('stroke', color);
        
        // Make sure fill is set to none for shape elements
        if (path.tagName.toLowerCase() !== 'polygon') {
            path.setAttribute('fill', 'none');
        }
    });
    
    // Update arrowhead polygons
    const polygons = element.querySelectorAll('polygon');
    polygons.forEach(polygon => {
        polygon.setAttribute('fill', color);
    });
    
    // Update markers if present
    const markers = element.querySelectorAll('marker');
    markers.forEach(marker => {
        const markerPolygon = marker.querySelector('polygon');
        if (markerPolygon) {
            markerPolygon.setAttribute('fill', color);
        }
    });
}

// Function to add a new element to the canvas
function addElement(x, y, toolType) {
    elementCounter++;
    const element = document.createElement('div');
    
    // Different class based on if it's a drawing tool or not
    const drawingTools = ['line', 'arrow', 'rectangle', 'circle'];
    const isDrawingTool = drawingTools.includes(toolType);
    
    element.className = isDrawingTool ? 'drawing-element' : 'draggable-element';
    element.id = `element-${elementCounter}`;
    element.innerHTML = svgIcons[toolType];
    element.dataset.tool = toolType;
    
    // Apply color to SVG elements if it's a drawing tool
    if (isDrawingTool) {
        applySVGColor(element, currentColor);
    }
    
    // Calculate position (center the element on the click position)
    const elemWidth = 60;
    const elemHeight = 60;
    
    // Position element
    element.style.left = (x - elemWidth / 2) + 'px';
    element.style.top = (y - elemHeight / 2) + 'px';
    
    // Add drag and selection handlers
    element.addEventListener('mousedown', startDrag);
    element.addEventListener('click', (e) => {
        selectElement(element);
        e.stopPropagation(); // Prevent canvas click
    });
    
    // Add right-click context menu for delete
    element.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        selectElement(element);
        
        // Show a confirmation or directly delete
        const confirmDelete = confirm('Delete this element?');
        if (confirmDelete) {
            const elementToRemove = selectedElement;
            deselectElement();
            elementToRemove.remove();
            updateStatusBar();
            saveToHistory();
            showToast('Element deleted');
        }
    });
    
    // Add to canvas
    canvas.appendChild(element);
    
    // Select the new element
    selectElement(element);
    
    // Save state
    saveToHistory();
    
    // Update status
    updateStatusBar(`Added ${toolType}`);
}

// Function to add a text element
function addTextElement(x, y) {
    elementCounter++;
    const element = document.createElement('div');
    element.className = 'text-element';
    element.id = `element-${elementCounter}`;
    element.textContent = 'Double-click to edit';
    element.contentEditable = false;
    element.dataset.tool = 'text';
    
    // Position element
    element.style.left = x + 'px';
    element.style.top = y + 'px';
    
    // Add drag and selection handlers
    element.addEventListener('mousedown', startDrag);
    element.addEventListener('click', (e) => {
        selectElement(element);
        e.stopPropagation(); // Prevent canvas click
    });
    
    // Add right-click context menu for delete
    element.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        selectElement(element);
        
        // Show a confirmation or directly delete
        const confirmDelete = confirm('Delete this text element?');
        if (confirmDelete) {
            const elementToRemove = selectedElement;
            deselectElement();
            elementToRemove.remove();
            updateStatusBar();
            saveToHistory();
            showToast('Text element deleted');
        }
    });
    
    // Add to canvas
    canvas.appendChild(element);
    
    // Select the new element
    selectElement(element);
    
    // Make it editable
    makeTextEditable(element);
    
    // Save state
    saveToHistory();
    
    // Update status
    updateStatusBar('Added text');
}

// Function to make text editable
function makeTextEditable(element) {
    element.contentEditable = true;
    element.focus();
    
    // Select all text
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    
    // Save when focus is lost
    element.addEventListener('blur', () => {
        element.contentEditable = false;
        saveToHistory();
    }, { once: true });
}

// Function to apply formatting to text
function applyFormatting(element, format) {
    switch (format) {
        case 'bold':
            if (element.style.fontWeight === 'bold') {
                element.style.fontWeight = 'normal';
            } else {
                element.style.fontWeight = 'bold';
            }
            break;
        case 'italic':
            if (element.style.fontStyle === 'italic') {
                element.style.fontStyle = 'normal';
            } else {
                element.style.fontStyle = 'italic';
            }
            break;
        case 'underline':
            if (element.style.textDecoration === 'underline') {
                element.style.textDecoration = 'none';
            } else {
                element.style.textDecoration = 'underline';
            }
            break;
    }
    saveToHistory();
}

// Function to select an element
function selectElement(element) {
    // Clear previous selection
    deselectElement();
    
    // Set new selection
    selectedElement = element;
    element.style.outline = '2px solid var(--primary-color)';
    element.style.outlineOffset = '2px';
    
    // Update status
    updateStatusBar(`Selected: ${element.dataset.tool}`);
    
    // Update formatting controls if it's a text element
    if (element.classList.contains('text-element')) {
        // Update font selector
        const fontSelect = document.getElementById('font-select');
        if (element.style.fontFamily) {
            // Try to find and select the current font
            for (let i = 0; i < fontSelect.options.length; i++) {
                if (fontSelect.options[i].value === element.style.fontFamily) {
                    fontSelect.selectedIndex = i;
                    break;
                }
            }
        }
        
        // Update font size selector
        const fontSizeSelect = document.getElementById('font-size');
        if (element.style.fontSize) {
            const size = parseInt(element.style.fontSize);
            // Try to find and select the current size
            for (let i = 0; i < fontSizeSelect.options.length; i++) {
                if (parseInt(fontSizeSelect.options[i].value) === size) {
                    fontSizeSelect.selectedIndex = i;
                    break;
                }
            }
        }
        
        // Update format buttons
        document.getElementById('bold-btn').classList.toggle('active', element.style.fontWeight === 'bold');
        document.getElementById('italic-btn').classList.toggle('active', element.style.fontStyle === 'italic');
        document.getElementById('underline-btn').classList.toggle('active', element.style.textDecoration === 'underline');
    }
}

// Function to deselect the current element
function deselectElement() {
    if (selectedElement) {
        selectedElement.style.outline = 'none';
        selectedElement = null;
        updateStatusBar();
    }
}

// Drag handlers
function startDrag(e) {
    // Prevent default to stop text selection
    e.preventDefault();
    
    // Get current element
    currentDragElement = e.currentTarget;
    
    // Select the element
    selectElement(currentDragElement);
    
    // Calculate offsets
    const rect = currentDragElement.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    
    // Set dragging state
    isDragging = true;
    
    // Add document event listeners
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
}

function drag(e) {
    if (isDragging && currentDragElement) {
        // Get canvas
        const canvasRect = canvas.getBoundingClientRect();
        
        // Calculate new position relative to canvas with scale factor
        let newX = (e.clientX - canvasRect.left - offsetX) / canvasScale;
        let newY = (e.clientY - canvasRect.top - offsetY) / canvasScale;
        
        // Constrain to canvas bounds
        newX = Math.max(0, Math.min(newX, canvas.offsetWidth - currentDragElement.offsetWidth));
        newY = Math.max(0, Math.min(newY, canvas.offsetHeight - currentDragElement.offsetHeight));
        
        // Update position
        currentDragElement.style.left = newX + 'px';
        currentDragElement.style.top = newY + 'px';
        
        // Update status bar with coordinates
        updateStatusBar(`Position: ${Math.round(newX)}, ${Math.round(newY)} px`);
    }
}

function stopDrag() {
    if (isDragging) {
        isDragging = false;
        saveToHistory();
    }
    
    currentDragElement = null;
    
    // Remove document event listeners
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
    
    // Update status
    if (selectedElement) {
        updateStatusBar(`Selected: ${selectedElement.dataset.tool}`);
    } else {
        updateStatusBar();
    }
}

// Function to save current state to history
function saveToHistory() {
    // Get canvas content
    const canvasHTML = canvas.innerHTML;
    
    // If we're not at the end of history, truncate
    if (historyIndex < history.length - 1) {
        history = history.slice(0, historyIndex + 1);
    }
    
    // Add new state to history
    history.push(canvasHTML);
    
    // Trim history if too long
    if (history.length > 20) {
        history.shift();
    }
    
    // Update index to point to latest
    historyIndex = history.length - 1;
}

// Function to undo
function undo() {
    if (historyIndex > 0) {
        historyIndex--;
        canvas.innerHTML = history[historyIndex];
        showToast('Undo');
        
        // Reattach event listeners
        reattachEventListeners();
        
        // Clear selection
        selectedElement = null;
        updateStatusBar();
    } else {
        showToast('Nothing to undo');
    }
}

// Function to redo
function redo() {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        canvas.innerHTML = history[historyIndex];
        showToast('Redo');
        
        // Reattach event listeners
        reattachEventListeners();
        
        // Clear selection
        selectedElement = null;
        updateStatusBar();
    } else {
        showToast('Nothing to redo');
    }
}

// Reattach event listeners after undo/redo
function reattachEventListeners() {
    // Reattach to all elements
    document.querySelectorAll('.draggable-element, .drawing-element, .text-element').forEach(element => {
        element.style.pointerEvents = 'all';
        
        // Special handling for arrow elements
        if (element.dataset.tool === 'arrow') {
            const svg = element.querySelector('svg');
            if (svg) {
                // Ensure it has a click area
                if (!svg.querySelector('rect[pointer-events="all"]')) {
                    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                    rect.setAttribute("x", "0");
                    rect.setAttribute("y", "0");
                    rect.setAttribute("width", "100%");
                    rect.setAttribute("height", "100%");
                    rect.setAttribute("fill", "transparent");
                    rect.setAttribute("stroke", "transparent");
                    rect.setAttribute("pointer-events", "all");
                    svg.appendChild(rect);
                }
            }
        }
        
        // Add standard event listeners
        element.addEventListener('mousedown', startDrag);
        element.addEventListener('click', (e) => {
            selectElement(element);
            e.stopPropagation();
        });
        
        // Add right-click delete
        element.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            selectElement(element);
            
            // Show a confirmation or directly delete
            const confirmDelete = confirm('Delete this element?');
            if (confirmDelete) {
                const elementToRemove = selectedElement;
                deselectElement();
                elementToRemove.remove();
                updateStatusBar();
                saveToHistory();
                showToast('Element deleted');
            }
        });
    });
}

// Clear the canvas of all elements
function clearCanvas() {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
    selectedElement = null;
    updateStatusBar();
    saveToHistory();
}

// Function to handle menu actions
function handleMenuAction(action) {
    switch (action) {
        case 'new':
            if (confirm('Create a new project? Unsaved changes will be lost.')) {
                clearCanvas();
                showToast('New project created');
            }
            break;
        case 'save':
            saveProject();
            break;
        case 'saveas':
            saveProjectAs();
            break;
        case 'open':
            openProject();
            break;
        case 'export-png':
            exportAsPNG();
            break;
        case 'export-pdf':
            showToast('PDF export not implemented in this version');
            break;
        case 'delete':
            if (selectedElement) {
                selectedElement.remove();
                selectedElement = null;
                updateStatusBar();
                saveToHistory();
                showToast('Element deleted');
            } else {
                showToast('Nothing selected to delete');
            }
            break;
        case 'zoom-in':
            zoomCanvas(0.1);
            break;
        case 'zoom-out':
            zoomCanvas(-0.1);
            break;
        case 'fit-screen':
            resetZoom();
            break;
        case 'show-grid':
            toggleGrid();
            break;
        case 'undo':
            undo();
            break;
        case 'redo':
            redo();
            break;
        default:
            showToast(`Action: ${action} not implemented yet`);
    }
}

// Function to zoom canvas
function zoomCanvas(amount) {
    canvasScale = Math.max(0.5, Math.min(3, canvasScale + amount));
    canvas.style.transform = `scale(${canvasScale})`;
    canvas.style.transformOrigin = 'center center';
    showToast(`Zoom: ${Math.round(canvasScale * 100)}%`);
    updateStatusBar();
}

// Function to reset zoom
function resetZoom() {
    canvasScale = 1;
    canvas.style.transform = 'scale(1)';
    showToast('Zoom reset to 100%');
    updateStatusBar();
}

// Function to toggle grid
function toggleGrid() {
    canvas.classList.toggle('show-grid');
    showToast(canvas.classList.contains('show-grid') ? 'Grid shown' : 'Grid hidden');
}

// Function to apply a template
function applyTemplate(templateId) {
    if (templates[templateId]) {
        if (confirm(`Apply the ${templates[templateId].name}? Current content will be replaced.`)) {
            clearCanvas();
            
            // Add each element from the template
            templates[templateId].elements.forEach(elem => {
                if (elem.type === 'text') {
                    const textElem = document.createElement('div');
                    elementCounter++;
                    textElem.className = 'text-element';
                    textElem.id = `element-${elementCounter}`;
                    textElem.textContent = elem.content;
                    textElem.style.cssText = elem.style;
                    textElem.style.left = elem.x + 'px';
                    textElem.style.top = elem.y + 'px';
                    textElem.dataset.tool = 'text';
                    
                    // Add event listeners
                    textElem.addEventListener('mousedown', startDrag);
                    textElem.addEventListener('click', (e) => {
                        selectElement(textElem);
                        e.stopPropagation();
                    });
                    
                    canvas.appendChild(textElem);
                } else {
                    addElement(elem.x, elem.y, elem.type);
                }
            });
            
            saveToHistory();
            showToast(`Applied ${templates[templateId].name}`);
        }
    } else {
        showToast(`Template not found`);
    }
}

// Function to export canvas as PNG
function exportAsPNG() {
    // Hide selection outline temporarily
    if (selectedElement) {
        selectedElement.style.outline = 'none';
    }
    
    // Use html2canvas library if available
    if (typeof html2canvas !== 'undefined') {
        html2canvas(canvas).then(function(canvas) {
            const link = document.createElement('a');
            link.download = 'scicanvas-export.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            
            // Restore selection outline
            if (selectedElement) {
                selectedElement.style.outline = '2px solid var(--primary-color)';
            }
            
            showToast('Exported as PNG');
        });
    } else {
        // Fallback message if html2canvas is not available
        const fallbackMsg = document.createElement('div');
        fallbackMsg.style.position = 'fixed';
        fallbackMsg.style.top = '50%';
        fallbackMsg.style.left = '50%';
        fallbackMsg.style.transform = 'translate(-50%, -50%)';
        fallbackMsg.style.padding = '20px';
        fallbackMsg.style.background = 'white';
        fallbackMsg.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
        fallbackMsg.style.zIndex = '1000';
        fallbackMsg.innerHTML = `
            <p>To export as PNG, the html2canvas library is required.</p>
            <p>Add this to your HTML:</p>
            <pre>&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"&gt;&lt;/script&gt;</pre>
            <button id="close-msg" style="margin-top: 10px; padding: 5px 10px;">OK</button>
        `;
        document.body.appendChild(fallbackMsg);
        
        document.getElementById('close-msg').addEventListener('click', () => {
            document.body.removeChild(fallbackMsg);
            // Restore selection outline
            if (selectedElement) {
                selectedElement.style.outline = '2px solid var(--primary-color)';
            }
        });
    }
}

// Function to save project (simplified without actual file saving)
function saveProject() {
    // In a real app, this would save to a server or local storage
    localStorage.setItem('scicanvas-project', canvas.innerHTML);
    showToast('Project saved to local storage');
}

// Function to save project with a new name (simplified)
function saveProjectAs() {
    // In a real app, this would prompt for a filename
    const projectName = prompt('Enter project name:', 'scicanvas-project');
    if (projectName) {
        localStorage.setItem(`scicanvas-${projectName}`, canvas.innerHTML);
        showToast(`Project saved as "${projectName}"`);
    }
}

// Function to open a project (simplified)
function openProject() {
    // In a real app, this would load from a server or file
    const projectData = localStorage.getItem('scicanvas-project');
    if (projectData) {
        if (confirm('Load saved project? Current changes will be lost.')) {
            canvas.innerHTML = projectData;
            reattachEventListeners();
            saveToHistory();
            showToast('Project loaded from local storage');
        }
    } else {
        showToast('No saved project found');
    }
}

// Show toast notification
function showToast(message, duration = 2000) {
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// Update status bar
function updateStatusBar(message) {
    if (message) {
        statusBar.textContent = message + ' | Canvas: 800 × 600 px' + (canvasScale !== 1 ? ` | Zoom: ${Math.round(canvasScale * 100)}%` : '');
    } else {
        statusBar.textContent = 'Ready | Canvas: 800 × 600 px | Tool: ' + currentTool + (canvasScale !== 1 ? ` | Zoom: ${Math.round(canvasScale * 100)}%` : '');
    }
}

// Add tool for text
document.addEventListener('DOMContentLoaded', () => {
    // Add text tool to sidebar
    const sidebar = document.querySelector('.sidebar');
    const textBtn = document.createElement('button');
    textBtn.className = 'sidebar-btn';
    textBtn.dataset.tool = 'text';
    textBtn.innerHTML = `
        <svg viewBox="0 0 24 24">
            <path d="M5 4v3h5.5v12h3V7H19V4H5z"/>
        </svg>
    `;
    sidebar.appendChild(textBtn);
    
    // Add event listener
    textBtn.addEventListener('click', () => {
        document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
        textBtn.classList.add('active');
        currentTool = 'text';
        updateStatusBar();
    });
    
    // Initialize the app
    init();
});

// Drawing functions
function startDrawing(e) {
    if (['line', 'arrow', 'rectangle', 'circle'].includes(currentTool)) {
        isDrawing = true;
        
        // Get canvas position
        const rect = canvas.getBoundingClientRect();
        startX = (e.clientX - rect.left) / canvasScale;
        startY = (e.clientY - rect.top) / canvasScale;
        
        // Create drawing element
        elementCounter++;
        drawingElement = document.createElement('div');
        drawingElement.className = 'drawing-element';
        drawingElement.id = `element-${elementCounter}`;
        drawingElement.dataset.tool = currentTool;
        
        // Add SVG container based on tool type
        const svgContent = createSVGForDrawing(currentTool, 0, 0);
        drawingElement.innerHTML = svgContent;
        
        // Set color
        applySVGColor(drawingElement, currentColor);
        
        // Set initial position
        drawingElement.style.left = startX + 'px';
        drawingElement.style.top = startY + 'px';
        
        // Add to canvas
        canvas.appendChild(drawingElement);
        
        // Prevent standard drag behavior
        e.preventDefault();
    }
}

function draw(e) {
    if (isDrawing && drawingElement) {
        // Get canvas position
        const rect = canvas.getBoundingClientRect();
        const currentX = (e.clientX - rect.left) / canvasScale;
        const currentY = (e.clientY - rect.top) / canvasScale;
        
        // Calculate width and height
        const width = Math.abs(currentX - startX);
        const height = Math.abs(currentY - startY);
        
        // Determine direction
        const left = Math.min(currentX, startX);
        const top = Math.min(currentY, startY);
        
        // Update element position
        drawingElement.style.left = left + 'px';
        drawingElement.style.top = top + 'px';
        
        // Update SVG based on tool type
        updateDrawingSVG(drawingElement, currentTool, width, height, currentX > startX, currentY > startY);
        
        // Update status
        updateStatusBar(`Drawing ${currentTool}: ${Math.round(width)} × ${Math.round(height)} px`);
        
        // Prevent standard drag behavior
        e.preventDefault();
    }
}

function stopDrawing() {
    if (isDrawing) {
        isDrawing = false;
        
        // Add event handlers to the drawing element
        if (drawingElement) {
            // Make it properly interactive
            drawingElement.style.pointerEvents = 'all';
            
            // Special handling for arrows to ensure they're clickable
            if (drawingElement.dataset.tool === 'arrow') {
                // Make sure the invisible hit area is working
                const svg = drawingElement.querySelector('svg');
                if (svg) {
                    // Add a transparent overlay if not exists
                    if (!svg.querySelector('rect[pointer-events="all"]')) {
                        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                        rect.setAttribute("x", "0");
                        rect.setAttribute("y", "0");
                        rect.setAttribute("width", "100%");
                        rect.setAttribute("height", "100%");
                        rect.setAttribute("fill", "transparent");
                        rect.setAttribute("stroke", "transparent");
                        rect.setAttribute("pointer-events", "all");
                        svg.appendChild(rect);
                    }
                }
            }
            
            drawingElement.addEventListener('mousedown', startDrag);
            drawingElement.addEventListener('click', (e) => {
                selectElement(drawingElement);
                e.stopPropagation();
            });
            
            // Add right-click context menu for delete
            drawingElement.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                selectElement(drawingElement);
                
                // Show a confirmation or directly delete
                const confirmDelete = confirm('Delete this element?');
                if (confirmDelete) {
                    const elementToRemove = selectedElement;
                    deselectElement();
                    elementToRemove.remove();
                    updateStatusBar();
                    saveToHistory();
                    showToast('Element deleted');
                }
            });
            
            // Select the new element
            selectElement(drawingElement);
            drawingElement = null;
            
            // Save state
            saveToHistory();
        }
    }
}

function createSVGForDrawing(tool, width, height) {
    // Default minimal sizes
    const w = Math.max(width, 10);
    const h = Math.max(height, 10);
    
    // Create unique ID for markers
    const markerId = `arrowhead-${elementCounter}`;
    
    switch (tool) {
        case 'line':
            return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="100%">
                      <line x1="0" y1="0" x2="${w}" y2="${h}" stroke="${currentColor}" stroke-width="2" />
                    </svg>`;
        case 'arrow':
            return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <marker id="${markerId}" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill="${currentColor}" stroke="none"/>
                        </marker>
                      </defs>
                      <line x1="0" y1="0" x2="${w-1}" y2="${h-1}" stroke="${currentColor}" stroke-width="2" 
                            marker-end="url(#${markerId})" fill="none"/>
                      <!-- Invisible rect to make clicking easier -->
                      <rect x="0" y="0" width="${w}" height="${h}" fill="transparent" stroke="transparent" pointer-events="all"/>
                    </svg>`;
        case 'rectangle':
            return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="100%">
                      <rect x="0" y="0" width="${w}" height="${h}" stroke="${currentColor}" stroke-width="2" fill="none" />
                    </svg>`;
        case 'circle':
            return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="100%">
                      <ellipse cx="${w/2}" cy="${h/2}" rx="${w/2}" ry="${h/2}" stroke="${currentColor}" 
                               stroke-width="2" fill="none" />
                    </svg>`;
        default:
            return '';
    }
}

function updateDrawingSVG(element, tool, width, height, isRightDirection, isDownDirection) {
    const w = Math.max(width, 10);
    const h = Math.max(height, 10);
    
    const svg = element.querySelector('svg');
    if (!svg) return;
    
    // Update viewBox
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    
    // Update element dimensions
    element.style.width = `${w}px`;
    element.style.height = `${h}px`;
    
    // Update shape based on tool
    switch (tool) {
        case 'line':
            const line = svg.querySelector('line');
            if (line) {
                if (isRightDirection && isDownDirection) {
                    line.setAttribute('x1', '0');
                    line.setAttribute('y1', '0');
                    line.setAttribute('x2', w);
                    line.setAttribute('y2', h);
                } else if (!isRightDirection && isDownDirection) {
                    line.setAttribute('x1', w);
                    line.setAttribute('y1', '0');
                    line.setAttribute('x2', '0');
                    line.setAttribute('y2', h);
                } else if (isRightDirection && !isDownDirection) {
                    line.setAttribute('x1', '0');
                    line.setAttribute('y1', h);
                    line.setAttribute('x2', w);
                    line.setAttribute('y2', '0');
                } else {
                    line.setAttribute('x1', w);
                    line.setAttribute('y1', h);
                    line.setAttribute('x2', '0');
                    line.setAttribute('y2', '0');
                }
            }
            break;
        case 'arrow':
            const arrow = svg.querySelector('line');
            if (arrow) {
                // Adjust endpoint slightly to avoid overlap with arrowhead
                const endAdjust = 1;
                if (isRightDirection && isDownDirection) {
                    arrow.setAttribute('x1', '0');
                    arrow.setAttribute('y1', '0');
                    arrow.setAttribute('x2', w-endAdjust);
                    arrow.setAttribute('y2', h-endAdjust);
                } else if (!isRightDirection && isDownDirection) {
                    arrow.setAttribute('x1', w);
                    arrow.setAttribute('y1', '0');
                    arrow.setAttribute('x2', endAdjust);
                    arrow.setAttribute('y2', h-endAdjust);
                } else if (isRightDirection && !isDownDirection) {
                    arrow.setAttribute('x1', '0');
                    arrow.setAttribute('y1', h);
                    arrow.setAttribute('x2', w-endAdjust);
                    arrow.setAttribute('y2', endAdjust);
                } else {
                    arrow.setAttribute('x1', w);
                    arrow.setAttribute('y1', h);
                    arrow.setAttribute('x2', endAdjust);
                    arrow.setAttribute('y2', endAdjust);
                }
                
                // Update arrow marker orientation
                const marker = svg.querySelector('marker');
                if (marker) {
                    let orient = "auto";
                    if (isRightDirection && isDownDirection) orient = "auto";
                    else if (!isRightDirection && isDownDirection) orient = "auto-start-reverse";
                    else if (isRightDirection && !isDownDirection) orient = "auto";
                    else orient = "auto-start-reverse";
                    
                    marker.setAttribute('orient', orient);
                }
            }
            break;
        case 'rectangle':
            const rect = svg.querySelector('rect');
            if (rect) {
                rect.setAttribute('width', w);
                rect.setAttribute('height', h);
            }
            break;
        case 'circle':
            const ellipse = svg.querySelector('ellipse');
            if (ellipse) {
                ellipse.setAttribute('cx', w/2);
                ellipse.setAttribute('cy', h/2);
                ellipse.setAttribute('rx', w/2);
                ellipse.setAttribute('ry', h/2);
            }
            break;
    }
}

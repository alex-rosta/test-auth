// main.js - Client-side functionality for authentication app

// Function to handle custom organization logo
function setupOrganizationLogo() {
    // This function can be extended to load a custom organization logo
    // For example, you could fetch this from a config endpoint or localStorage
    console.log('Organization logo module initialized');
    
    // Example of how to update the logo (uncomment to use)
    // const logoUrl = 'https://example.com/your-org-logo.png';
    // document.getElementById('org-logo').src = logoUrl;
}

// Function to add animated transitions between pages
function setupPageTransitions() {
    document.addEventListener('DOMContentLoaded', () => {
        // Initial animation of content
        const mainContent = document.querySelector('.animate-slide-up');
        if (mainContent) {
            mainContent.style.opacity = '0';
            mainContent.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'translateY(0)';
            }, 100);
        }
    });
}

// Utility function to create toast notifications
function showNotification(message, type = 'info') {
    const container = document.createElement('div');
    container.className = `fixed top-4 right-4 max-w-sm w-full p-4 rounded-lg shadow-lg animate-fade-in z-50 ${
        type === 'error' 
            ? 'bg-red-100 border-l-4 border-red-500 text-red-700' 
            : type === 'success'
                ? 'bg-green-100 border-l-4 border-green-500 text-green-700'
                : 'bg-blue-100 border-l-4 border-blue-500 text-blue-700'
    }`;
    
    container.innerHTML = `
        <div class="flex items-center">
            <div class="flex-shrink-0">
                ${type === 'error' 
                    ? '<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>' 
                    : type === 'success'
                        ? '<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>'
                        : '<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>'
                }
            </div>
            <div class="ml-3">
                <p class="text-sm">${message}</p>
            </div>
            <div class="ml-auto pl-3">
                <button class="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150">
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(container);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        container.style.opacity = '0';
        setTimeout(() => {
            container.remove();
        }, 300);
    }, 5000);
    
    // Close on click
    container.querySelector('button').addEventListener('click', () => {
        container.style.opacity = '0';
        setTimeout(() => {
            container.remove();
        }, 300);
    });
}

// Initialize all modules
function initApp() {
    setupOrganizationLogo();
    setupPageTransitions();
    
    // Example usage of notification
    // Uncomment to test
    // setTimeout(() => {
    //     showNotification('Authentication successful!', 'success');
    // }, 1000);
}

// Start the app when document is loaded
document.addEventListener('DOMContentLoaded', initApp);

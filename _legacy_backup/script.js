// Function to render projects based on data from projects.js
function renderProjects(filter = 'all') {
    const container = document.getElementById('projects-container');
    if (!container) return;

    // Clear current items
    container.innerHTML = '';

    // Filter projects based on the selected category
    const filteredProjects = window.PROJECTS.filter(p => {
        if (filter === 'all') return true;
        return p.category.toLowerCase().includes(filter.toLowerCase());
    });

    if(filteredProjects.length === 0) {
        container.innerHTML = '<p>No projects found in this category.</p>';
        return;
    }

    filteredProjects.forEach(project => {
        const cardHTML = `
            <div class="work-card">
                <img src="${project.image}" alt="${project.title}" class="work-img">
                <div class="work-info">
                    <div>
                        <h3>${project.title}</h3>
                        <p>${project.category}</p>
                    </div>
                    <a href="${project.caseStudyPdf}" target="_blank" class="pdf-btn" aria-label="Read PDF Case Study">
                        <i class="fa-solid fa-file-pdf"></i> Read PDF
                    </a>
                </div>
                <div class="work-desc" style="margin-top: 1rem; color: var(--text-muted); font-size: 0.95rem;">
                    ${project.description}
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    if (themeToggleBtn && themeIcon) {
        // Check local storage or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        
        function applyTheme(theme) {
            if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                document.documentElement.removeAttribute('data-theme');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }

        // Apply theme initially
        applyTheme(currentTheme);

        // Toggle event
        themeToggleBtn.addEventListener('click', () => {
            currentTheme = currentTheme === 'light' ? 'dark' : 'light';
            applyTheme(currentTheme);
            localStorage.setItem('theme', currentTheme);
        });
    }

    // Initial Render
    renderProjects('all');

    // Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            e.target.classList.add('active');
            
            const filterValue = e.target.getAttribute('data-filter');
            renderProjects(filterValue);
        });
    });
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

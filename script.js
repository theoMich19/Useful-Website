const sites = [
    {
        name: 'CodinGame',
        description: 'Une plateforme pour apprendre à coder en jouant à des jeux de programmation.',
        categories: ['dev', 'games'],
        url: 'https://www.codingame.com/start/fr/'
    },
    {
        name: 'Flexbox Defense',
        description: 'Un jeu pour apprendre le Flexbox CSS en défendant votre base contre des vagues d\'ennemis.',
        categories: ['design', 'games', 'css'],
        url: 'http://www.flexboxdefense.com/'
    },
    {
        name: 'CodeCombat',
        description: 'Un jeu où vous apprenez à coder en jouant à un RPG de programmation.',
        categories: ['dev', 'games'],
        url: 'https://codecombat.com/'
    },
    {
        name: 'Flexbox Froggy',
        description: 'Un jeu éducatif pour apprendre le CSS Flexbox en plaçant des grenouilles sur des nénuphars.',
        categories: ['design', 'games', 'css'],
        url: 'https://flexboxfroggy.com/#fr'
    },
    {
        name: 'CheckiO',
        description: 'Un jeu de codage basé sur des défis, conçu pour apprendre le Python et le JavaScript.',
        categories: ['dev', 'games', 'python', 'javascript'],
        url: 'https://checkio.org/'
    },
    {
        name: 'Untrusted',
        description: 'Un jeu où vous devez utiliser JavaScript pour manipuler le monde du jeu et atteindre votre objectif.',
        categories: ['dev', 'games', 'javascript'],
        url: 'https://www.playuntrusted.com/'
    },
    {
        name: 'GitHub',
        description: 'La plus grande plateforme de développement collaboratif et de gestion de code source.',
        categories: ['dev', 'tools', 'version-control'],
        url: 'https://github.com/'
    },
    {
        name: 'Figma',
        description: 'Un outil de design collaboratif pour la création de prototypes, d\'interfaces utilisateur et plus.',
        categories: ['design', 'tools'],
        url: 'https://www.figma.com/fr-fr/'
    },
    {
        name: 'Laravel',
        description: 'Un framework PHP moderne pour développer des applications web robustes et élégantes.',
        categories: ['dev', 'framework', 'php'],
        url: 'https://laravel.com/'
    },
    {
        name: 'ChatGPT',
        description: 'Une intelligence artificielle conversationnelle développée par OpenAI pour aider dans diverses tâches.',
        categories: ['ai', 'tools'],
        url: 'https://chatgpt.com/auth/login'
    },
    // Additional sites
    {
        name: 'Stack Overflow',
        description: 'Une communauté de développeurs pour poser des questions et obtenir des réponses sur la programmation.',
        categories: ['dev', 'tools'],
        url: 'https://stackoverflow.com/'
    },
    {
        name: 'MDN Web Docs',
        description: 'Documentation complète pour HTML, CSS, JavaScript et d\'autres technologies web.',
        categories: ['dev', 'documentation'],
        url: 'https://developer.mozilla.org/'
    },
    {
        name: 'FreeCodeCamp',
        description: 'Une plateforme d\'apprentissage gratuite pour apprendre à coder en réalisant des projets concrets.',
        categories: ['dev', 'education'],
        url: 'https://www.freecodecamp.org/'
    },
    {
        name: 'Canva',
        description: 'Un outil de design en ligne pour créer des graphiques, des présentations et des publications sur les réseaux sociaux.',
        categories: ['design', 'tools'],
        url: 'https://www.canva.com/'
    },
    {
        name: 'CodePen',
        description: 'Un environnement de développement social pour HTML, CSS, et JavaScript.',
        categories: ['dev', 'tools', 'css', 'javascript'],
        url: 'https://codepen.io/'
    }
];
const cardContainer = document.getElementById('cardContainer');
const searchInput = document.getElementById('searchInput');
const selectBox = document.getElementById('selectBox');
const optionsContainer = document.getElementById('optionsContainer');
const loader = document.getElementById('loader');
let searchTimeout;

selectBox.addEventListener('click', () => {
    selectBox.classList.toggle('active');
});

function getSelectedCategories() {
    const selectedCategories = [];
    const checkboxes = optionsContainer.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => selectedCategories.push(checkbox.value));
    return selectedCategories;
}

function createCard(site) {
    const card = document.createElement('a');
    card.className = 'card';
    card.href = site.url;
    card.target = "_blank";

    const categoryBadges = site.categories.map(category => {
        return `<span class="category-badge ${category}">${category}</span>`;
    }).join('');

    card.innerHTML = `
        <h2>${site.name}</h2>
        <div class="category-container">
            ${categoryBadges}
        </div>
        <p class="description">${site.description}</p>
    `;
    cardContainer.appendChild(card);
}

function displayCards() {
    const searchValue = searchInput.value.toLowerCase();
    const selectedCategories = getSelectedCategories();

    cardContainer.innerHTML = '';

    const filteredSites = sites.filter(site => {
        const matchesSearch = site.name.toLowerCase().includes(searchValue) ||
                              site.description.toLowerCase().includes(searchValue);
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.some(cat => site.categories.includes(cat));

        return matchesSearch && matchesCategory;
    });

    filteredSites.forEach(site => {
        createCard(site);
    });

    gsap.fromTo('.card', 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.2, ease: 'power1.out', scrollTrigger: '.card' }
    );

    // Hide loader after rendering
    loader.style.display = 'none';
}

function debounceSearch() {
    clearTimeout(searchTimeout);
    loader.style.display = 'block'; // Show loader when starting to search
    cardContainer.innerHTML = ''; // Clear previous cards immediately
    searchTimeout = setTimeout(displayCards, 2000);
}

searchInput.addEventListener('input', debounceSearch);
optionsContainer.addEventListener('change', () => {
    loader.style.display = 'block';
    cardContainer.innerHTML = ''; // Clear previous cards immediately
    displayCards();
});

window.onload = displayCards;

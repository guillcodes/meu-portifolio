// Menu Mobile
const menuToggle = document.querySelector('.menu-toggle');
const navMobile = document.querySelector('.nav-mobile');
const closeMenu = document.querySelector('.close-menu');
const mobileLinks = document.querySelectorAll('.nav-mobile a');
let navOverlay;

// Criar o overlay se ainda não existir
if (!document.querySelector('.nav-overlay')) {
    navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);
} else {
    navOverlay = document.querySelector('.nav-overlay');
}

// Função para abrir o menu
const openMenu = () => {
    navMobile.classList.add('active');
    navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
};

// Função para fechar o menu
const closeMenuMobile = () => {
    navMobile.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
};

// Event Listeners para o menu mobile
menuToggle.addEventListener('click', openMenu);
closeMenu.addEventListener('click', closeMenuMobile);
navOverlay.addEventListener('click', closeMenuMobile);

mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenuMobile);
});

// Fechar menu ao pressionar ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMobile.classList.contains('active')) {
        closeMenuMobile();
    }
});

// Back to Top Button
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animações ao Scroll
const scrollElements = document.querySelectorAll('.fade-in');

const elementInView = (el, offset = 150) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset
    );
};

const displayScrollElement = element => {
    element.classList.add('active');
};

const hideScrollElement = element => {
    element.classList.remove('active');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 150)) {
            displayScrollElement(el);
        } else {
            hideScrollElement(el);
        }
    });
};

window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// Smooth Scroll para Links Internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Sempre começa com o tema claro
document.documentElement.setAttribute('data-theme', 'light');
themeIcon.className = 'bi bi-sun';

// Verifica se há tema salvo no localStorage apenas se não for a primeira visita
const isFirstVisit = !localStorage.getItem('hasVisited');
if (!isFirstVisit) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeIcon.className = savedTheme === 'dark' ? 'bi bi-moon' : 'bi bi-sun';
    }
}

// Marca que o usuário já visitou o site
localStorage.setItem('hasVisited', 'true');

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Atualiza o ícone
    themeIcon.className = newTheme === 'dark' ? 'bi bi-moon' : 'bi bi-sun';
});

// Formulário de Contato
const form = document.querySelector('.contact-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            alert('Mensagem enviada com sucesso!');
            form.reset();
        } else {
            throw new Error('Erro ao enviar mensagem');
        }
    } catch (error) {
        alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
});

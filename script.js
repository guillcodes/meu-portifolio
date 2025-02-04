document.addEventListener('DOMContentLoaded', () => {
    const btnAbrir = document.querySelector('.btn-abir-menu');
    const menuMobile = document.querySelector('.menu-mobile');
    const overlay = document.querySelector('.overlay-menu');

    const toggleMenu = (show) => {
        menuMobile.style.right = show ? '0' : '-100%';
        overlay.style.display = show ? 'block' : 'none';
        menuMobile.classList.toggle('menu-aberto', show);
    };

    const updateMenuVisibility = () => {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            btnAbrir.style.display = 'block'; // Mostrar botão abrir no mobile
        } else {
            btnAbrir.style.display = 'none'; // Ocultar botão abrir no desktop
            toggleMenu(false); // Fechar o menu caso esteja aberto
        }
    };

    // Adicionar os listeners do menu mobile
    btnAbrir.addEventListener('click', () => toggleMenu(true));
    overlay.addEventListener('click', () => toggleMenu(false));
    menuMobile.addEventListener('click', (e) => {
        if (e.target.closest('.btn-fechar') || e.target.tagName === 'A') {
            toggleMenu(false);
        }
    });

    // Atualizar a visibilidade do menu com base no tamanho da tela
    updateMenuVisibility();
    window.addEventListener('resize', updateMenuVisibility);
});

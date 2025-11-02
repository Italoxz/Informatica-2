document.addEventListener('DOMContentLoaded', function() {

    // Lógica para o menu hambúrguer
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links ul li a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Adiciona um ícone de "X" ao abrir e "hambúrguer" ao fechar
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Fecha o menu ao clicar em um link (útil para one-page sites)
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.querySelector('i').classList.remove('fa-times');
                hamburger.querySelector('i').classList.add('fa-bars');
            }
        });
    });


    // --- Animações de Scroll Reveal (Efeito "animado") ---
    const revealElements = document.querySelectorAll('.reveal');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.15 // Elemento visível em 15% para ativar
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Adiciona um delay diferente para itens de grid
                // Isso faz os cards aparecerem um após o outro
                const parentGrid = entry.target.closest('.indicadores-grid, .causas-grid, .graficos-grid, .action-list');
                if (parentGrid) {
                    const items = Array.from(parentGrid.children);
                    const index = items.indexOf(entry.target);
                    // Define a variável CSS '--delay' para o CSS usar
                    entry.target.style.setProperty('--delay', `${index * 0.1}s`);
                }

                // Descomente a linha abaixo se quiser que a animação aconteça apenas uma vez
                // observer.unobserve(entry.target); 
            } else {
                // Opcional: remover a classe 'active' quando sair da viewport
                // entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });

});
// ========================================
// MENU HAMBURGER
// ========================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu hamburger
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Efeito de sombra e blur
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========================================
// FORMULÁRIO DE AGENDAMENTO (WhatsApp)
// ========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service');
        const message = document.getElementById('message').value.trim();
        
        // Validação
        if (!name || !phone) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        if (phone.replace(/\D/g, '').length < 10) {
            alert('Por favor, insira um número de telefone válido.');
            return;
        }
        
        // Obter serviço selecionado
        const selectedService = service.options[service.selectedIndex].text;
        
        // Criar mensagem para WhatsApp
        let whatsappMessage = `Olá! Gostaria de agendar um horário.\n\n`;
        whatsappMessage += `*Nome:* ${name}\n`;
        whatsappMessage += `*Telefone:* ${phone}\n`;
        whatsappMessage += `*Serviço de Interesse:* ${selectedService}\n`;
        
        if (message) {
            whatsappMessage += `*Observações:* ${message}\n`;
        }
        
        whatsappMessage += `\nAguardo seu retorno!`;
        
        // Codificar para URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappNumber = '5511967651240';
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // Abrir WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Resetar formulário
        contactForm.reset();
        
        // Mostrar mensagem simples
        const successDiv = document.createElement('div');
        successDiv.textContent = '✓ Agendamento enviado!';
        successDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #4CAF50; color: white; padding: 12px 16px; border-radius: 6px; z-index: 9999;';
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    });
}

// ========================================
// MÁSCARA DE TELEFONE
// ========================================
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value.length <= 2) {
                value = `(${value}`;
            } else if (value.length <= 7) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            } else if (value.length <= 11) {
                value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
            } else {
                value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
            }
        }
        
        e.target.value = value;
    });
}

// ========================================
// SCROLL SUAVE PARA TODOS OS LINKS INTERNOS
// ========================================
function initSmoothScroll() {
    // Selecionar todos os links que começam com #
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignorar links vazios
            if (href === '#' || href === '#!') {
                return;
            }
            
            // Tentar encontrar o elemento alvo
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calcular posição do elemento
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                
                // Scroll suave
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Atualizar URL (opcional)
                history.pushState(null, null, href);
            }
        });
    });
    
    console.log('Scroll suave inicializado');
}

// ========================================
// ATIVAR LINK ATUAL NO MENU
// ========================================
function initMenuHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!sections.length || !navLinks.length) return;
    
    // Observar seções para destacar link ativo
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Remover active de todos os links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Adicionar active ao link correspondente
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    // Observar cada seção
    sections.forEach(section => {
        observer.observe(section);
    });
}

// ========================================
// INICIALIZAÇÃO COMPLETA
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Vida Espaço Estética - Site carregado com sucesso!');
    
    // Iniciar scroll suave
    initSmoothScroll();
    
    // Iniciar destaque do menu
    initMenuHighlight();
    
    // Iniciar carrossel
    initCarrossel();
    
    // Corrigir botões do mapa
    corrigirBotaoMapa();
    
    // Verificar imagens
    verificarImagens();
    
    // Adicionar fallback para todas as imagens
    document.querySelectorAll('img').forEach(img => {
        img.onerror = function() {
            console.log(`Erro ao carregar: ${this.src}`);
            this.onerror = null;
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjcwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjYzVkYmZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzVmOGNmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkF2YWxpYcOnw6NvPC90ZXh0Pjwvc3ZnPg==';
        };
    });
});
// ========================================
// CARROSSEL DE AVALIAÇÕES - SIMPLES
// ========================================
function initCarrossel() {
    const slides = document.querySelectorAll('.carrossel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carrossel-prev');
    const nextBtn = document.querySelector('.carrossel-next');
    
    if (!slides.length) {
        console.log('Nenhum slide encontrado');
        return;
    }
    
    let currentSlide = 0;
    let carrosselInterval;
    
    function showSlide(index) {
        // Esconder todos os slides
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.display = 'none';
        });
        
        // Remover active de todos os dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Mostrar slide atual
        slides[index].classList.add('active');
        slides[index].style.display = 'block';
        
        // Ativar dot correspondente
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }
    
    function prevSlide() {
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = slides.length - 1;
        }
        showSlide(prevIndex);
    }
    
    function goToSlide(index) {
        if (index >= 0 && index < slides.length) {
            showSlide(index);
        }
    }
    
    // Iniciar carrossel automático
    function startCarrossel() {
        carrosselInterval = setInterval(nextSlide, 5000);
    }
    
    // Parar carrossel
    function stopCarrossel() {
        clearInterval(carrosselInterval);
    }
    
    // Event Listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            nextSlide();
            stopCarrossel();
            setTimeout(startCarrossel, 10000);
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            prevSlide();
            stopCarrossel();
            setTimeout(startCarrossel, 10000);
        });
    }
    
    // Event Listeners para dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            goToSlide(index);
            stopCarrossel();
            setTimeout(startCarrossel, 10000);
        });
    });
    
    // Pausar carrossel quando o mouse estiver sobre ele
    const carrossel = document.querySelector('.avaliacoes-carrossel');
    if (carrossel) {
        carrossel.addEventListener('mouseenter', stopCarrossel);
        carrossel.addEventListener('mouseleave', startCarrossel);
    }
    
    // Inicializar primeiro slide
    showSlide(0);
    startCarrossel();
    
    // Log para debug
    console.log(`Carrossel inicializado com ${slides.length} slides`);
}

// ========================================
// CORREÇÃO DO BOTÃO DO MAPA
// ========================================
function corrigirBotaoMapa() {
    const endereco = "Rua Guido Bonici, 117, Jardim Flamengo, São Paulo - SP, 03813-190";
    const enderecoCodificado = encodeURIComponent(endereco);
    
    document.querySelectorAll('.btn-mapa').forEach(botao => {
        botao.href = `https://www.google.com/maps/dir/?api=1&destination=${enderecoCodificado}&travelmode=driving`;
        botao.setAttribute('target', '_blank');
        botao.setAttribute('rel', 'noopener noreferrer');
    });
}

// ========================================
// VERIFICAR SE AS IMAGENS EXISTEM
// ========================================
function verificarImagens() {
    const imagens = document.querySelectorAll('.carrossel-slide img');
    
    imagens.forEach((img, index) => {
        // Testar se a imagem carrega
        const tempImg = new Image();
        
        tempImg.onload = function() {
            console.log(`Imagem ${index + 1} carregada: ${img.src}`);
        };
        
        tempImg.onerror = function() {
            console.log(`Imagem ${index + 1} não encontrada: ${img.src}`);
            // Usar fallback
            img.src = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
        };
        
        tempImg.src = img.src;
    });
}

// ========================================
// INICIALIZAÇÃO COMPLETA
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Vida Espaço Estética - Site carregado com sucesso!');
    
    // Iniciar carrossel
    initCarrossel();
    
    // Corrigir botões do mapa
    corrigirBotaoMapa();
    
    // Verificar imagens
    verificarImagens();
    
    // Adicionar fallback para todas as imagens
    document.querySelectorAll('img').forEach(img => {
        img.onerror = function() {
            console.log(`Erro ao carregar: ${this.src}`);
            this.onerror = null;
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjcwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjYzVkYmZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzVmOGNmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkF2YWxpYcOnw6NvPC90ZXh0Pjwvc3ZnPg==';
        };
    });
});
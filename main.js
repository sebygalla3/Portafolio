document.addEventListener('DOMContentLoaded', function() {
    // Navegación móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    });
    
    // Scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animaciones al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in-up');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Configurar elementos animados
    const animateElements = function() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach((section, index) => {
            const elements = section.querySelectorAll('h2, .service-card, .project-card, .about-content, .contact-form');
            
            elements.forEach((element, i) => {
                element.classList.add('fade-in-up');
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                
                // Agregar un pequeño retraso a cada elemento para un efecto escalonado
                element.style.transitionDelay = `${i * 0.1}s`;
            });
        });
    };
    
    // Inicializar animaciones
    animateElements();
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar una vez al cargar la página
    
    // Formulario de contacto
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const honeypot = document.getElementById('honeypot').value;
            
            // Validar honeypot
            if (honeypot !== '') {
                console.log('Spam detectado');
                return;
            }
            
            // Validar campos requeridos
            if (!name || !email || !message) {
                showAlert('Por favor completa todos los campos requeridos', 'error');
                return;
            }
            
            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('Por favor ingresa un correo electrónico válido', 'error');
                return;
            }
            
            // Aquí iría el código para enviar el formulario
            // Por ahora, solo mostramos un mensaje de éxito
            showAlert('¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.', 'success');
            contactForm.reset();
        });
    }
    
    // Mostrar notificaciones
    function showAlert(message, type = 'success') {
        // Eliminar notificaciones existentes
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        
        // Estilos para la notificación
        alert.style.position = 'fixed';
        alert.style.top = '20px';
        alert.style.right = '20px';
        alert.style.padding = '1rem 1.5rem';
        alert.style.borderRadius = '0.375rem';
        alert.style.color = 'white';
        alert.style.fontWeight = '500';
        alert.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        alert.style.zIndex = '9999';
        alert.style.animation = 'fadeIn 0.3s ease-out';
        
        if (type === 'success') {
            alert.style.backgroundColor = '#10b981';
        } else {
            alert.style.backgroundColor = '#ef4444';
        }
        
        document.body.appendChild(alert);
        
        // Eliminar la notificación después de 5 segundos
        setTimeout(() => {
            alert.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 5000);
    }
    
    // Agregar estilos para las animaciones
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
    
    // Lazy loading para imágenes
    if ('loading' in HTMLImageElement.prototype) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback para navegadores que no soportan loading="lazy"
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
});

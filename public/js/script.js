// La dirección de tu bodega (Backend)
const API_URL = "http://localhost:8080/api/proyectos";
const CONTACTO_URL = "http://localhost:8080/api/contacto";

async function cargarProyectos() {
    try {
        // Pedimos los datos al servidor de Java
        const respuesta = await fetch(API_URL);
        const proyectos = await respuesta.json();

        const contenedor = document.getElementById("portfolio-grid");
        contenedor.innerHTML = ""; // Limpiamos el texto de "Cargando..."

        // Por cada proyecto en la base de datos, creamos una tarjeta
        proyectos.forEach(p => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <h3>${p.title}</h3>
                <p>${p.description}</p>
                <span>🛠️ ${p.techStack}</span>
                <div class="links">
                    <a href="${p.repoUrl}" target="_blank">Código</a>
                </div>
            `;
            contenedor.appendChild(card);
        });
    } catch (error) {
        console.error("Error al conectar:", error);
        document.getElementById("portfolio-grid").innerHTML = "No se pudo conectar con el servidor de Java.";
    }
}

// Ejecutamos la función al cargar la página
// Ejecutamos la función al cargar la página
// cargarProyectos();

// --- LÓGICA DEL FORMULARIO DE CONTACTO ---
const formulario = document.getElementById('formulario-contacto');

if (formulario) {
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que la página se recargue

        // Capturamos los datos
        const datosFormulario = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        try {
            const respuesta = await fetch(CONTACTO_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosFormulario)
            });

            if (respuesta.ok) {
                alert("¡Mensaje enviado con éxito!");
                formulario.reset(); // Limpia el formulario
            } else {
                alert("Hubo un error al enviar el mensaje.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error de conexión con el servidor.");
        }
    });
}

function crearBurbujas(selectorSeccion, cantidad) {
    // Busca la sección donde pondremos las burbujas
    const seccion = document.querySelector(selectorSeccion);
    if (!seccion) {
        console.warn(`No se encontró la sección: ${selectorSeccion}`);
        return;
    }

    // Aseguramos que la sección tenga posición relativa para las burbujas
    if (window.getComputedStyle(seccion).position === 'static') {
        seccion.style.position = 'relative';
    }
    seccion.style.overflow = 'hidden';

    for (let i = 0; i < cantidad; i++) {
        const burbuja = document.createElement('div');
        burbuja.classList.add('burbuja');
        
        // Tamaño aleatorio entre 10px y 40px
        const size = Math.random() * 30 + 10 + 'px';
        burbuja.style.width = size;
        burbuja.style.height = size;
        
        // Posición horizontal aleatoria (0% a 100% del ancho)
        burbuja.style.left = Math.random() * 100 + '%';
        
        // Velocidad aleatoria (entre 5s y 15s)
        const velocidad = Math.random() * 10 + 5 + 's';
        burbuja.style.animationDuration = velocidad;
        
        // Retraso aleatorio para que no salgan todas juntas
        burbuja.style.animationDelay = Math.random() * 10 + 's';
        
        seccion.appendChild(burbuja);
    }
}

// --- MENÚ HAMBURGUESA ---
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navegacion = document.querySelector('.navegacion');

if(mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navegacion.classList.toggle('mostrar');
    });
}

// --- SKILLS CAROUSEL LOGIC ---
function initSkillsCarousel() {
    const track = document.querySelector('.skills-track');
    if (track) {
        // Clonamos los elementos para crear el efecto infinito
        // La animación mueve el track -50%, así que necesitamos duplicar el contenido exacto una vez
        const items = Array.from(track.children);
        items.forEach(item => {
            const clone = item.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true'); // Mejor práctica de accesibilidad
            track.appendChild(clone);
        });
    }
}

// Iniciar el carrusel
initSkillsCarousel();

// --- TRADUCCIÓN / TRANSLATION ---
const translations = {
    es: {
        "nav.home": "Inicio",
        "nav.about": "Sobre mí",
        "nav.portfolio": "Portafolio",
        "nav.contact": "Contacto",
        "hero.badge": "Full Stack Developer",
        "hero.title": "Eric Perucho<br>Solis",
        "hero.subtitle": "Navegando entre código y creatividad",
        "hero.explore": "Explorar ↓",
        "hero.cv": "Descargar CV",
        "home.badge": "Bienvenido a mi océano",
        "home.greeting": "Hola, soy Eric Perucho Solis",
        "home.iam": "Soy",
        "home.description": "Me especializo en sumergirme en el código para crear experiencias web profundas y fluidas.",
        "home.cv": "Descargar CV",
        "home.contact": "Contacto",
        "about.photo": "Foto",
        "about.p1": "¡Hola! Soy Eric Perucho. Mi camino en el código empezó con una meta clara: entender cómo funcionan las cosas desde adentro. Soy Desarrollador Full Stack con base en análisis de sistemas, pero más que eso, soy un apasionado por resolver problemas y nunca dejar de aprender.",
        "about.p2": "Hace poco decidí llevar mi aprendizaje al siguiente nivel creando Perucho Dev, un espacio donde comparto mi proceso dominando la lógica de programación y lenguajes como Java y Python. No solo busco construir software robusto; mi objetivo es diseñar soluciones que realmente le hagan la vida más fácil al usuario.",
        "about.p3": "Actualmente estoy en proceso de titulación y siempre busco entornos donde la precisión y el trabajo en equipo sean la clave. Si algo me define, es mi curiosidad insaciable: si no lo sé, lo investigo; si lo aprendo, te lo explico.",
        "about.quote": "\"Programar es como navegar en mar abierto: la superficie puede verse en calma, pero la verdadera magia reside en la profundidad de su lógica.\"",
        "about.author": "- Filosofía del Código",
        "skills.title": "Habilidades",
        "skills.view_all": "Ver Todas",
        "skills.view_less": "Ver Menos",
        "portfolio.title": "Portafolio",
        "portfolio.coming_soon_small": "TENEMOS ALGO NUEVO",
        "portfolio.coming_soon_big": "PRÓXI<br>MAMENTE",
        "contact.title": "Contacto",
        "contact.name": "Nombre",
        "contact.email": "Email",
        "contact.message": "Mensaje",
        "contact.send": "Enviar Mensaje"
    },
    en: {
        "nav.home": "Home",
        "nav.about": "About",
        "nav.portfolio": "Portfolio",
        "nav.contact": "Contact",
        "hero.badge": "Full Stack Developer",
        "hero.title": "Eric Perucho<br>Solis",
        "hero.subtitle": "Navigating between code and creativity",
        "hero.explore": "Explore ↓",
        "hero.cv": "Download CV",
        "home.badge": "Welcome to my ocean",
        "home.greeting": "Hi, I'm Eric Perucho Solis",
        "home.iam": "I am a",
        "home.description": "I specialize in diving into code to create deep and seamless web experiences.",
        "home.cv": "Download CV",
        "home.contact": "Contact",
        "about.photo": "Photo",
        "about.p1": "Hi! I'm Eric Perucho. My journey in code began with a clear goal: to understand how things work from the inside out. I'm a Full Stack Developer with a background in systems analysis, but more than that, I'm passionate about solving problems and never stopping learning.",
        "about.p2": "I recently decided to take my learning to the next level by creating Perucho Dev, a space where I share my process of mastering programming logic and languages like Java and Python. I don't just seek to build robust software; my goal is to design solutions that truly make life easier for the user.",
        "about.p3": "I am currently in the process of obtaining my degree and I always look for environments where precision and teamwork are key. If anything defines me, it's my insatiable curiosity: if I don't know it, I research it; if I learn it, I explain it.",
        "about.quote": "\"Programming is like sailing the open sea: the surface may look calm, but the real magic lies in the depth of its logic.\"",
        "about.author": "- Code Philosophy",
        "skills.title": "Skills",
        "skills.view_all": "View All",
        "skills.view_less": "View Less",
        "portfolio.title": "Portfolio",
        "portfolio.coming_soon_small": "WE GOT SOMETHING NEW",
        "portfolio.coming_soon_big": "COMING<br>SOON",
        "contact.title": "Contact",
        "contact.name": "Name",
        "contact.email": "Email",
        "contact.message": "Message",
        "contact.send": "Send Message"
    }
};

let currentLang = localStorage.getItem('portfolio_lang') || 'en'; // Idioma por defecto desde localStorage

function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-key]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            // Si el elemento contiene HTML (como el BR en Coming Soon), usar innerHTML
            if (element.tagName === 'H1' || element.tagName === 'P' || element.tagName === 'SPAN') {
                element.innerHTML = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });

    // Actualizar botón
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.textContent = lang === 'es' ? 'ES | EN' : 'EN | ES';
    }

    // Actualizar tooltips de controles
    if (typeof updateTooltips === 'function') {
        updateTooltips(lang);
    }
}

const langToggleBtn = document.getElementById('lang-toggle');
if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        localStorage.setItem('portfolio_lang', currentLang);
        updateLanguage(currentLang);
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: currentLang, translations: translations[currentLang] } }));
    });
}

// Aplicar idioma inicial
// updateLanguage(currentLang); -> MOVIDO AL FINAL

// --- SCROLL SPY (Active Link) ---
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navegacion__enlace");

const scrollSpyOptions = {
    threshold: 0.5 /* Se activa cuando el 50% de la sección es visible */
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove("active");
                // Add active class if href matches the id
                if (link.getAttribute("href") === "#" + entry.target.id) {
                    link.classList.add("active");
                }
            });
        }
    });
}, scrollSpyOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Event Listener para clic manual (feedback instantáneo)
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
    });
});

// --- TOGGLE SKILLS VIEW & CONTROLS ---
const toggleSkillsBtn = document.getElementById('toggle-skills-btn');
const skillsCarousel = document.querySelector('.skills-carousel');

// Función de ayuda para tooltips
function updateTooltips(lang) {
    if (!toggleSkillsBtn) return;
    
    // Grid Toggle Tooltip
    const isExpanded = skillsCarousel.classList.contains('expanded');
    
    if (lang === 'es') {
        toggleSkillsBtn.setAttribute('data-tooltip', isExpanded ? 'Ver Menos' : 'Ver Todas');
    } else {
        toggleSkillsBtn.setAttribute('data-tooltip', isExpanded ? 'View Less' : 'View All');
    }
}

if (toggleSkillsBtn && skillsCarousel) {
    // Inicializar tooltips
    updateTooltips(currentLang);

    // Grid Toggle Logic
    toggleSkillsBtn.addEventListener('click', () => {
        skillsCarousel.classList.toggle('expanded');
        toggleSkillsBtn.classList.toggle('active');
        updateTooltips(currentLang);
    });
}

// Aplicar idioma inicial (Al final para que todas las dependencias estén cargadas)
updateLanguage(currentLang);


// --- SCROLL REVEAL (Efecto de aparición al bajar) ---
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Dejar de observar una vez revelado para que no parpadee al volver a subir
            observer.unobserve(entry.target); 
        }
    });
}, {
    root: null,
    threshold: 0.15, // Se activa cuando el 15% del elemento es visible
    rootMargin: "0px"
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// --- LÓGICA DE ANIMACIÓN AL HACER SCROLL ---
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // 15% del elemento debe ser visible para animarse
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, observerOptions);

    const sElements = document.querySelectorAll('.scroll-reveal, .scroll-float');
    sElements.forEach(el => scrollObserver.observe(el));
});

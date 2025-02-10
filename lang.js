document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.querySelector('.lang-toggle');
    const langSpan = langToggle.querySelector('span');
    const htmlElement = document.documentElement;

    // Check for saved language preference
    const savedLang = localStorage.getItem('lang') || 'en';
    htmlElement.setAttribute('data-lang', savedLang);
    langSpan.textContent = savedLang.toUpperCase();

    // Language toggle handler
    langToggle.addEventListener('click', () => {
        const currentLang = htmlElement.getAttribute('data-lang');
        const newLang = currentLang === 'en' ? 'es' : 'en';
        
        htmlElement.setAttribute('data-lang', newLang);
        localStorage.setItem('lang', newLang);
        langSpan.textContent = newLang.toUpperCase();

        // Here you would trigger the translation function
        translateContent(newLang);
    });
});

// Translation dictionary
const translations = {
    en: {
        title: "AI & Automation Expert | Digital Marketing Strategist",
        subtitle: "Transforming Business Through AI & Automation",
        about: {
            title: "About Me",
            content: [
                "As a Digital Marketing Strategist and AI Automation Expert, I specialize in bridging the gap between marketing innovation and technical implementation. With a proven track record in developing AI-driven solutions and automation workflows, I've helped global companies streamline their operations and achieve significant growth.",
                "My expertise spans digital marketing, web development, and cutting-edge AI technologies, allowing me to create comprehensive solutions that drive real business results. Through my international experience across Canada, Uruguay, and Spain, I've developed a global perspective that enables me to craft culturally-aware, scalable solutions for diverse markets."
            ]
        },
        experience: {
            title: "Experience",
            vairix: {
                company: "VAIRIX Software Development",
                role: "Marketing Lead",
                period: "2021 - 2023",
                description: "Spearheaded digital transformation initiatives and implemented AI-driven solutions:",
                achievements: [
                    "Developed and deployed AI-powered lead generation systems using OpenAI and custom workflows",
                    "Created automated marketing campaigns that increased engagement by 150%",
                    "Implemented n8n automation workflows, reducing manual tasks by 70%",
                    "Integrated LangChain and AI tools for content optimization"
                ]
            },
            towerhouse: {
                company: "TowerHouse Studio",
                role: "Marketing Lead",
                period: "2021 - 2022",
                description: "Led marketing strategy and digital initiatives:",
                achievements: [
                    "Established comprehensive marketing frameworks and KPI tracking systems",
                    "Developed and executed data-driven marketing campaigns",
                    "Implemented marketing automation tools to streamline operations"
                ]
            },
            pgi: {
                company: "Power Global Innovation",
                role: "Associate / CTO",
                period: "2019 - 2021",
                description: "Led technical strategy and development for two major projects:",
                achievements: [
                    "RankingOnline.es: Built and scaled a 360° digital agency from ground up",
                    "TallerDelPatinete.es: Developed an eCommerce platform with integrated inventory management",
                    "Managed technical teams and implemented automation workflows"
                ]
            },
            latamgaming: {
                company: "LatamGaming",
                role: "Product Manager",
                period: "2017 - 2019",
                description: "Managed large-scale iGaming affiliate network:",
                achievements: [
                    "Scaled network to 80+ websites across Latin America",
                    "Implemented SEO/SEM strategies achieving 200% growth",
                    "Led development teams and marketing initiatives"
                ]
            }
        },
        skills: {
            title: "Skills",
            professional: "Professional",
            software: "Software & Tools",
            items: {
                digital_marketing: "Digital Marketing",
                ai_implementation: "AI Implementation",
                marketing_automation: "Marketing Automation",
                sem: "SEM",
                seo: "SEO",
                adobe_suite: "Adobe Creative Suite",
                n8n_make: "n8n & Make.com",
                langchain_openai: "LangChain & OpenAI",
                git: "Git & Version Control",
                analytics: "Analytics Tools"
            }
        },
        contact: {
            button: "Contact Me",
            email: "Email",
            call: "Call",
            whatsapp: "WhatsApp",
            telegram: "Telegram",
            location: "Montevideo, Uruguay",
            website: "RodrigoViola.online",
            email_address: "rv.rodrigo.viola@gmail.com",
            phone: "+598 092 033 302"
        },
        automation: {
            title: "Automation & AI Expertise",
            subtitle: "Specialized in building sophisticated automation systems and AI integrations that transform business operations:",
            categories: {
                ai: {
                    title: "AI & LLMs",
                    tags: ["OpenAI GPT-4", "Claude", "DeepSeek", "LangChain"]
                },
                automation: {
                    title: "Automation",
                    tags: ["n8n", "Make.com", "Puppeteer", "Zapier", "Axiom"]
                },
                development: {
                    title: "Development",
                    tags: ["HTML5", "CSS3", "JavaScript", "Python", "Node.js", "REST APIs"]
                }
            }
        },
        education: {
            title: "Education",
            items: [
                {
                    degree: "Marketing Analyst",
                    school: "ORT University, Montevideo, Uruguay | 2015 - 2017",
                    description: "Enhanced analytical skills and digital marketing expertise while improving Spanish language proficiency."
                },
                {
                    degree: "Advertising & Marketing Communications",
                    school: "Algonquin College, Ottawa, Canada | 2009 - 2012",
                    description: "Focused on business aspects of advertising and comprehensive business understanding."
                },
                {
                    degree: "Advertising & Design",
                    school: "Sheridan College, Toronto, Canada | 2007 - 2009",
                    description: "Developed foundation in design principles and discovered passion for business side of advertising."
                }
            ]
        },
        interests: {
            title: "Interests & Activities",
            items: [
                { title: "Gaming", detail: "Strategy, RPGs & Board Games" },
                { title: "Urban Exploration", detail: "City Discovery & Hidden Gems" },
                { title: "Camping", detail: "Nature & Adventure" },
                { title: "Cycling", detail: "Urban & Trail Exploration" },
                { title: "Café Culture", detail: "Work Spaces & Coffee Tasting" },
                { title: "Reading", detail: "Tech, Sci-Fi & Philosophy" },
                { title: "Tech Exploration", detail: "AI & Automation Projects" },
                { title: "Beach", detail: "Relaxation & Water Sports" },
                { title: "Cinema", detail: "Sci-Fi & Psychological Thrillers" },
                { title: "Travel", detail: "Cultural Immersion & Discovery" },
                { title: "Mindfulness", detail: "Yoga & Meditation" },
                { title: "Entrepreneurship", detail: "Side Projects & Startups" }
            ]
        }
    },
    es: {
        title: "Experto en IA y Automatización | Estratega de Marketing Digital",
        subtitle: "Transformando Negocios a través de IA y Automatización",
        about: {
            title: "Sobre Mí",
            content: [
                "Como Estratega de Marketing Digital y Experto en Automatización de IA, me especializo en cerrar la brecha entre la innovación en marketing y la implementación técnica. Con un historial comprobado en el desarrollo de soluciones impulsadas por IA y flujos de trabajo automatizados, he ayudado a empresas globales a optimizar sus operaciones y lograr un crecimiento significativo.",
                "Mi experiencia abarca marketing digital, desarrollo web y tecnologías de IA de vanguardia, lo que me permite crear soluciones integrales que generan resultados comerciales reales. A través de mi experiencia internacional en Canadá, Uruguay y España, he desarrollado una perspectiva global que me permite crear soluciones escalables y culturalmente conscientes para mercados diversos."
            ]
        },
        experience: {
            title: "Experiencia",
            vairix: {
                company: "VAIRIX Desarrollo de Software",
                role: "Líder de Marketing",
                period: "2021 - 2023",
                description: "Lideré iniciativas de transformación digital e implementé soluciones impulsadas por IA:",
                achievements: [
                    "Desarrollé y desplegué sistemas de generación de leads impulsados por IA utilizando OpenAI y flujos de trabajo personalizados",
                    "Creé campañas de marketing automatizadas que aumentaron el compromiso en un 150%",
                    "Implementé flujos de trabajo de automatización n8n, reduciendo tareas manuales en un 70%",
                    "Integré herramientas de LangChain e IA para la optimización de contenido"
                ]
            },
            towerhouse: {
                company: "TowerHouse Studio",
                role: "Líder de Marketing",
                period: "2021 - 2022",
                description: "Lideré la estrategia de marketing e iniciativas digitales:",
                achievements: [
                    "Establecí marcos de marketing integrales y sistemas de seguimiento de KPI",
                    "Desarrollé y ejecuté campañas de marketing basadas en datos",
                    "Implementé herramientas de automatización de marketing para optimizar operaciones"
                ]
            },
            pgi: {
                company: "Power Global Innovation",
                role: "Asociado / CTO",
                period: "2019 - 2021",
                description: "Lideré la estrategia técnica y el desarrollo de dos proyectos principales:",
                achievements: [
                    "RankingOnline.es: Construí y escalé una agencia digital 360° desde cero",
                    "TallerDelPatinete.es: Desarrollé una plataforma de comercio electrónico con gestión de inventario integrada",
                    "Gestioné equipos técnicos e implementé flujos de trabajo automatizados"
                ]
            },
            latamgaming: {
                company: "LatamGaming",
                role: "Gerente de Producto",
                period: "2017 - 2019",
                description: "Gestioné una red de afiliados de iGaming a gran escala:",
                achievements: [
                    "Escalé la red a más de 80 sitios web en América Latina",
                    "Implementé estrategias SEO/SEM logrando un crecimiento del 200%",
                    "Lideré equipos de desarrollo e iniciativas de marketing"
                ]
            }
        },
        skills: {
            title: "Habilidades",
            professional: "Profesionales",
            software: "Software y Herramientas",
            items: {
                digital_marketing: "Marketing Digital",
                ai_implementation: "Implementación de IA",
                marketing_automation: "Automatización de Marketing",
                sem: "SEM",
                seo: "SEO",
                adobe_suite: "Adobe Creative Suite",
                n8n_make: "n8n & Make.com",
                langchain_openai: "LangChain & OpenAI",
                git: "Git y Control de Versiones",
                analytics: "Herramientas de Análisis"
            }
        },
        contact: {
            button: "Contáctame",
            email: "Correo Electrónico",
            call: "Llamar",
            whatsapp: "WhatsApp",
            telegram: "Telegram",
            location: "Montevideo, Uruguay",
            website: "RodrigoViola.online",
            email_address: "rv.rodrigo.viola@gmail.com",
            phone: "+598 092 033 302"
        },
        automation: {
            title: "Experiencia en Automatización e IA",
            subtitle: "Especializado en la construcción de sistemas de automatización sofisticados e integraciones de IA que transforman las operaciones comerciales:",
            categories: {
                ai: {
                    title: "IA y LLMs",
                    tags: ["OpenAI GPT-4", "Claude", "DeepSeek", "LangChain"]
                },
                automation: {
                    title: "Automatización",
                    tags: ["n8n", "Make.com", "Puppeteer", "Zapier", "Axiom"]
                },
                development: {
                    title: "Desarrollo",
                    tags: ["HTML5", "CSS3", "JavaScript", "Python", "Node.js", "REST APIs"]
                }
            }
        },
        education: {
            title: "Educación",
            items: [
                {
                    degree: "Analista de Marketing",
                    school: "Universidad ORT, Montevideo, Uruguay | 2015 - 2017",
                    description: "Mejoré habilidades analíticas y experiencia en marketing digital mientras mejoraba la competencia en el idioma español."
                },
                {
                    degree: "Publicidad y Comunicaciones de Marketing",
                    school: "Algonquin College, Ottawa, Canadá | 2009 - 2012",
                    description: "Enfocado en aspectos comerciales de la publicidad y comprensión empresarial integral."
                },
                {
                    degree: "Publicidad y Diseño",
                    school: "Sheridan College, Toronto, Canadá | 2007 - 2009",
                    description: "Desarrollé una base en principios de diseño y descubrí una pasión por el lado comercial de la publicidad."
                }
            ]
        },
        interests: {
            title: "Intereses y Actividades",
            items: [
                { title: "Juegos", detail: "Estrategia, RPGs y Juegos de Mesa" },
                { title: "Exploración Urbana", detail: "Descubrimiento de Ciudades y Tesoros Ocultos" },
                { title: "Camping", detail: "Naturaleza y Aventura" },
                { title: "Ciclismo", detail: "Exploración Urbana y de Senderos" },
                { title: "Cultura de Café", detail: "Espacios de Trabajo y Cata de Café" },
                { title: "Lectura", detail: "Tecnología, Ciencia Ficción y Filosofía" },
                { title: "Exploración Tecnológica", detail: "Proyectos de IA y Automatización" },
                { title: "Playa", detail: "Relajación y Deportes Acuáticos" },
                { title: "Cine", detail: "Ciencia Ficción y Thrillers Psicológicos" },
                { title: "Viajes", detail: "Inmersión Cultural y Descubrimiento" },
                { title: "Mindfulness", detail: "Yoga y Meditación" },
                { title: "Emprendimiento", detail: "Proyectos Paralelos y Startups" }
            ]
        }
    }
};

// Translation function
function translateContent(lang) {
    // Update meta tags
    document.documentElement.lang = lang;
    
    // Helper function to translate by data attribute
    function translateElements(selector, path) {
        document.querySelectorAll(selector).forEach(element => {
            const keys = path.split('.');
            let translation = translations[lang];
            for (const key of keys) {
                translation = translation[key];
            }
            if (translation) {
                element.textContent = translation;
            }
        });
    }

    // Helper function to translate lists
    function translateList(selector, path) {
        const elements = document.querySelectorAll(selector);
        const keys = path.split('.');
        let translationArray = translations[lang];
        for (const key of keys) {
            translationArray = translationArray[key];
        }
        
        elements.forEach((element, index) => {
            if (translationArray[index]) {
                element.textContent = translationArray[index];
            }
        });
    }

    // Translate main sections
    translateElements('[data-translate="title"]', 'title');
    translateElements('[data-translate="subtitle"]', 'subtitle');
    translateElements('[data-translate="about.title"]', 'about.title');
    translateElements('[data-translate="experience.title"]', 'experience.title');
    translateElements('[data-translate="skills.title"]', 'skills.title');
    translateElements('[data-translate="contact.button"]', 'contact.button');

    // Translate about section
    translateList('[data-translate="about.content"] p', 'about.content');

    // Translate experience section
    document.querySelectorAll('[data-company]').forEach(jobSection => {
        const company = jobSection.dataset.company;
        if (translations[lang].experience[company]) {
            const exp = translations[lang].experience[company];
            jobSection.querySelector('[data-translate="role"]').textContent = exp.role;
            jobSection.querySelector('[data-translate="period"]').textContent = exp.period;
            jobSection.querySelector('[data-translate="description"]').textContent = exp.description;
            
            const achievements = jobSection.querySelectorAll('[data-translate="achievements"] li');
            exp.achievements.forEach((achievement, index) => {
                if (achievements[index]) {
                    achievements[index].textContent = achievement;
                }
            });
        }
    });

    // Translate contact options
    translateElements('[data-translate="contact.email"]', 'contact.email');
    translateElements('[data-translate="contact.call"]', 'contact.call');
    translateElements('[data-translate="contact.whatsapp"]', 'contact.whatsapp');
    translateElements('[data-translate="contact.telegram"]', 'contact.telegram');

    // Translate section titles
    translateElements('[data-translate="automation.title"]', 'automation.title');
    translateElements('[data-translate="automation.subtitle"]', 'automation.subtitle');
    translateElements('[data-translate="education.title"]', 'education.title');
    translateElements('[data-translate="interests.title"]', 'interests.title');

    // Translate education items
    const educationItems = translations[lang].education.items;
    document.querySelectorAll('.education-item').forEach((item, index) => {
        if (educationItems[index]) {
            item.querySelector('h3').textContent = educationItems[index].degree;
            item.querySelector('.school').textContent = educationItems[index].school;
            item.querySelector('p:not(.school)').textContent = educationItems[index].description;
        }
    });

    // Translate interests
    const interestItems = translations[lang].interests.items;
    document.querySelectorAll('.interest-item').forEach((item, index) => {
        if (interestItems[index]) {
            item.querySelector('span').textContent = interestItems[index].title;
            item.querySelector('.interest-detail').textContent = interestItems[index].detail;
        }
    });

    // Translate tech categories
    const techCategories = translations[lang].automation.categories;
    Object.keys(techCategories).forEach(category => {
        const categoryElement = document.querySelector(`.tech-category.${category}`);
        if (categoryElement) {
            categoryElement.querySelector('h4').textContent = techCategories[category].title;
        }
    });

    // Translate skill names and progress bars
    Object.keys(translations[lang].skills.items).forEach(skillKey => {
        const skillElement = document.querySelector(`[data-translate="skills.items.${skillKey}"]`);
        if (skillElement) {
            skillElement.textContent = translations[lang].skills.items[skillKey];
            const progressBar = skillElement.nextElementSibling?.querySelector('.progress');
            if (progressBar) {
                progressBar.style.width = translations[lang].skills.items.progress[skillKey];
            }
        }
    });

    // Translate tech category items
    Object.keys(translations[lang].tech_categories).forEach(category => {
        const categoryElement = document.querySelector(`.tech-category.${category}`);
        if (categoryElement) {
            const tags = categoryElement.querySelectorAll('.tech-tags .tag');
            const items = translations[lang].tech_categories[category].items;
            tags.forEach((tag, index) => {
                if (items[index]) {
                    tag.textContent = items[index];
                }
            });
        }
    });

    // Translate all job sections
    ['vairix', 'towerhouse', 'pgi', 'latamgaming'].forEach(company => {
        const jobSection = document.querySelector(`[data-company="${company}"]`);
        if (jobSection && translations[lang].experience[company]) {
            const exp = translations[lang].experience[company];
            jobSection.querySelector('[data-translate="role"]').textContent = exp.role;
            jobSection.querySelector('[data-translate="period"]').textContent = exp.period;
            jobSection.querySelector('[data-translate="description"]').textContent = exp.description;
            
            const achievements = jobSection.querySelectorAll('[data-translate="achievements"] li');
            exp.achievements.forEach((achievement, index) => {
                if (achievements[index]) {
                    achievements[index].textContent = achievement;
                }
            });
        }
    });

    // Translate company names
    ['vairix', 'towerhouse', 'pgi', 'latamgaming'].forEach(company => {
        const jobSection = document.querySelector(`[data-company="${company}"]`);
        if (jobSection && translations[lang].experience[company]) {
            jobSection.querySelector('h3').textContent = translations[lang].experience[company].company;
            // ... existing job translation code ...
        }
    });

    // Translate contact info
    translateElements('[data-translate="contact.email_address"]', 'contact.email_address');
    translateElements('[data-translate="contact.website"]', 'contact.website');
    translateElements('[data-translate="contact.phone"]', 'contact.phone');
    translateElements('[data-translate="contact.location"]', 'contact.location');

    // Add smooth transition effect
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 200);
}

// Add transition style to body
document.body.style.transition = 'opacity 0.2s ease'; 
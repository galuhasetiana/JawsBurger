// ========== DATA MENU (LANGSUNG - TANPA PERLU JSON) ==========
const menuData = [{
        id: "1",
        name: "CEPOT STANDAR",
        description: "Bun dengan 1 patty, selada, bawang bombay goreng, dan secret sauce. (No cheese)",
        price: "22K",
        image_url: "https://drive.google.com/thumbnail?id=1O6xsRob4JZP6OgyB66ruF8dMcjHfLYoN&sz=w500"
    },
    {
        id: "2",
        name: "PETRUK CHEESEBURGER",
        description: "Bun dengan 1 patty, 1 keju, selada, bawang bombay goreng, dan secret sauce.",
        price: "25K",
        image_url: "https://drive.google.com/thumbnail?id=1pK1-e5o0ahKLZGEhM0dDf20Gn0gCA1KU&sz=w500"
    },
    {
        id: "3",
        name: "DOUBLE SEMAR",
        description: "Bun dengan 2 patty, 2 keju, selada, bawang bombay goreng, dan secret sauce.",
        price: "32K",
        image_url: "https://drive.google.com/thumbnail?id=1Sr1c1DMn6CckiKY5ma3GKNm_fIGXIl_F&sz=w500"
    },
    {
        id: "4",
        name: "GARENG SPESIAL",
        description: "Bun dengan 2 patty, 2 keju, telur, selada, bawang bombay goreng, dan secret sauce.",
        price: "35K",
        image_url: "https://drive.google.com/thumbnail?id=1Sr1c1DMn6CckiKY5ma3GKNm_fIGXIl_F&sz=w500"
    },
    {
        id: "5",
        name: "TRIPLE BAGONG",
        description: "Bun dengan 3 patty, 3 keju, selada, bawang bombay goreng, dan secret sauce.",
        price: "45K",
        image_url: "https://drive.google.com/thumbnail?id=1zdA3hVRdOaxr-j2svNs5WwxmWBqiVJs_&sz=w500"
    }
];

// ========== DATA MOMENT (LANGSUNG) ==========
const momentData = [
    { id: "1", image_url: "https://drive.google.com/thumbnail?id=1FS-9LxH_qp7napQ_U8JOvM5b-t4tXavb&sz=w500" },
    { id: "2", image_url: "https://drive.google.com/thumbnail?id=14X0cmJqdF_rR1EC38cCBn4OZpebQ8kHr&sz=w500" },
    { id: "3", image_url: "https://drive.google.com/thumbnail?id=1uZ_3SotR0bbh5F4fsj66mHFR1mDdccUo&sz=w500" },
    { id: "4", image_url: "https://drive.google.com/thumbnail?id=1-0Ek8Qhfz3yb2kFi6erhax1a4Q5I8z-G&sz=w500" },
    { id: "5", image_url: "https://drive.google.com/thumbnail?id=1GOTlCaaR1ZVqB6tR_Ebc9hZGoiuM0J22&sz=w500" },
    { id: "6", image_url: "https://drive.google.com/thumbnail?id=1vB85vOo7oKVDC-dz0oz1VN22R_dLZBlE&sz=w500" },
    { id: "7", image_url: "https://drive.google.com/thumbnail?id=1zZgTP-MbEMtAtpwf27r1LTpeqC5xLHTD&sz=w500" },
    { id: "8", image_url: "https://drive.google.com/thumbnail?id=1JvZy9pXF2Sx62pOS-R4fFu6FTSI5M930&sz=w500" },
    { id: "9", image_url: "https://drive.google.com/thumbnail?id=1wIjd3PCgNeRKMLd7lWZ3SUW5cq7nbeFA&sz=w500" },
    { id: "10", image_url: "https://drive.google.com/thumbnail?id=1zfPS5VAmS1y7-ppDOGbGpNqdB_QMC1l-&sz=w500" }
];

// ========== RENDER MENU ==========
function renderMenu() {
    const container = document.getElementById('menuContainer');
    if (!container) {
        console.error("Element menuContainer tidak ditemukan!");
        return;
    }

    if (menuData.length === 0) {
        container.innerHTML = '<div class="no-results">Ora ono menu nang kene 🤷‍♂️</div>';
        return;
    }

    container.innerHTML = menuData.map(item => `
        <div class="menu-card">
            <div class="menu-img-container">
                <img class="menu-img" 
                     src="${item.image_url}" 
                     alt="${item.name}"
                     onerror="this.src='https://placehold.co/400x300/red/white?text=No+Image'">
            </div>
            <div class="menu-info">
                <h3 class="menu-title">${escapeHtml(item.name)}</h3>
                <p class="menu-desc">${escapeHtml(item.description)}</p>
                <div class="menu-bottom">
                    <span class="menu-price">${escapeHtml(item.price)}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ========== RENDER MOMENT ==========
function renderMoment() {
    const container = document.getElementById('momentContainer');
    if (!container) {
        console.error("Element momentContainer tidak ditemukan!");
        return;
    }

    if (momentData.length === 0) {
        container.innerHTML = '<div class="no-results">Ora ono moment nang kene 📸</div>';
        return;
    }

    container.innerHTML = momentData.map((item, index) => {
        let sizeClass = '';
        if (index % 3 === 0) {
            sizeClass = 'moment-tall';
        } else if (index % 5 === 0) {
            sizeClass = 'moment-wide';
        }

        return `
            <div class="moment-card ${sizeClass}">
                <img class="moment-img" 
                     src="${item.image_url}" 
                     alt="Moment ${item.id}"
                     onerror="this.src='https://placehold.co/400x300/FFD700/3E0B0E?text=Jaws+Moment'">
            </div>
        `;
    }).join('');
}

// ========== FUNGSI ORDER (WA) ==========
function orderNow(itemName) {
    const waNumber = "628xxxxxxxxxx"; // GANTI DENGAN NOMOR WA ANDA
    const message = `Halo Jaws Burger, saya mau order ${itemName}`;
    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.open(waLink, '_blank');
}

// ========== ACTIVE MENU SAAT SCROLL ==========
function setActiveMenu() {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    const scrollPosition = window.scrollY + 150; // Offset untuk trigger

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = sectionId;
        }
    });

    // Untuk Home (header)
    if (window.scrollY < 100) {
        current = 'home';
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1); // hapus #
        if (href === current) {
            link.classList.add('active');
        }
    });
}

// ========== SMOOTH SCROLL UNTUK NAV LINK ==========
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========== UTILITY ==========
function escapeHtml(text) {
    if (!text) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log("Website JAWS BURGER berjalan!");
    renderMenu();
    renderMoment();
    setupSmoothScroll();
    setActiveMenu();

    // Update active menu saat scroll
    window.addEventListener('scroll', setActiveMenu);
    window.addEventListener('resize', setActiveMenu);
});
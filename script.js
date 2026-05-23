const API_URL = "https://script.google.com/macros/s/AKfycbyE2SaVGZiQQr34g3McCJlqZn87EvMJAA2RnJoBRnxaTfrJUxyx4wCLCphyb91-BSAQCw/exec";

let menuData = [];
let momentData = [];
let currentMomentLimit = 6; 

async function fetchSpreadsheetData() {
    const cachedData = localStorage.getItem('jaws_data_cache');
    if (cachedData) {
        try {
            const parsedData = JSON.parse(cachedData);
            menuData = parsedData.menu || [];
            momentData = parsedData.moment || [];
            renderMenu();
            renderMoment();
            console.log("Menampilkan data dari cache lokal (Cepat)");
        } catch (e) {
            console.error("Cache rusak, akan ambil data baru.");
        }
    }

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Gagal mengambil data");
        
        const freshData = await response.json();
        
        if (JSON.stringify(freshData) !== cachedData) {
            menuData = freshData.menu || [];
            momentData = freshData.moment || [];
            
            localStorage.setItem('jaws_data_cache', JSON.stringify(freshData));
            
            renderMenu();
            renderMoment();
            console.log("Data terbaru berhasil diperbarui dari Spreadsheet.");
        } else {
            console.log("Data Spreadsheet tidak ada perubahan.");
        }

    } catch (error) {
        console.error("Error fetching data:", error);
        if (!cachedData) {
            document.getElementById('menuContainer').innerHTML = '<div class="error-msg" style="color:red; text-align:center; padding: 20px;">Gagal memuat menu. Cek koneksi atau URL API kamu.</div>';
            document.getElementById('momentContainer').innerHTML = '<div class="error-msg" style="color:red; text-align:center; padding: 20px;">Gagal memuat moment. Cek koneksi atau URL API kamu.</div>';
        }
    }
}

function fixDriveImageUrl(url) {
    if (!url) return '';
    const match = url.match(/id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
        const id = match[1];
        return `https://drive.google.com/thumbnail?id=${id}&sz=w800`;
    }
    return url;
}

function renderMenu() {
    const container = document.getElementById('menuContainer');
    if (!container) return; 

    if (menuData.length === 0) {
        container.innerHTML = '<div class="no-results">Ora ono menu nang kene 🤷‍♂️</div>';
        return;
    }

    let dataToRender = menuData; 
    const currentPath = window.location.pathname;
    const isHome = currentPath.endsWith('/') || currentPath.endsWith('index.html') || currentPath === '';
    
    if (isHome) {
        dataToRender = menuData.filter(item => 
            item.favourite && item.favourite.toString().toLowerCase() === 'yes'
        );
        dataToRender = dataToRender.slice(0, 3);
    }

    container.innerHTML = dataToRender.map(item => {
        const safeImageUrl = fixDriveImageUrl(item.image_url);
        
        const buyButtonHTML = isHome ? '' : `<button class="buy-btn" onclick="orderNow('${escapeHtml(item.name)}')">Buy Now</button>`;
        
        return `
        <div class="menu-card">
            <div class="menu-img-container">
                <img class="menu-img" 
                     src="${safeImageUrl}" 
                     alt="${escapeHtml(item.name)}"
                     loading="lazy"
                     onerror="this.src='https://placehold.co/400x300/red/white?text=No+Image'">
            </div>
            <div class="menu-info">
                <h3 class="menu-title">${escapeHtml(item.name)}</h3>
                <p class="menu-desc">${escapeHtml(item.desc || item.description)}</p>
                <div class="menu-bottom">
                    <span class="menu-price">${escapeHtml(item.price)}</span>
                    ${buyButtonHTML}
                </div>
            </div>
        </div>
        `;
    }).join('');
}

function renderMoment() {
    const container = document.getElementById('momentContainer');
    if (!container) return; 

    if (momentData.length === 0) {
        container.innerHTML = '<div class="no-results">Ora ono moment nang kene 📸</div>';
        return;
    }

    let dataToRender = momentData;
    const currentPage = window.location.pathname.split("/").pop();
    const loadMoreContainer = document.getElementById('loadMoreContainer');
    
    if (currentPage === "index.html" || currentPage === "") {
        dataToRender = momentData.filter(item => 
            item.favourite && item.favourite.toString().toLowerCase() === 'yes'
        );
        dataToRender = dataToRender.slice(0, 4);
        
        if (loadMoreContainer) loadMoreContainer.style.display = 'none';
    } else {
        dataToRender = momentData.slice(0, currentMomentLimit);
        
        if (loadMoreContainer) {
            if (currentMomentLimit >= momentData.length) {
                loadMoreContainer.style.display = 'none';
            } else {
                loadMoreContainer.style.display = 'block';
            }
        }
    }

    container.innerHTML = dataToRender.map((item, index) => {
        const safeImageUrl = fixDriveImageUrl(item.image_url);
        
        let sizeClass = '';
        if (index % 3 === 0) {
            sizeClass = 'moment-tall';
        } else if (index % 5 === 0) {
            sizeClass = 'moment-wide';
        }

        return `
            <div class="moment-card ${sizeClass}">
                <img class="moment-img" 
                     src="${safeImageUrl}" 
                     alt="Moment ${item.id}"
                     loading="lazy"
                     onerror="this.src='https://placehold.co/400x300/FFD700/3E0B0E?text=Jaws+Moment'">
            </div>
        `;
    }).join('');
}

function loadMoreMoments() {
    currentMomentLimit += 6;
    renderMoment();
}

function orderNow(itemName) {
    const formLink = `https://forms.gle/XZ49M2Accr1UN4qi8`;
    window.open(formLink, '_blank');
}

function setActiveMenu() {
    let currentPage = window.location.pathname.split("/").pop();
    
    if (currentPage === "") {
        currentPage = "index.html";
    }

    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const target = link.getAttribute('href');
            
            if (target.startsWith('#')) {
                e.preventDefault(); 
                const targetElement = document.querySelector(target);

                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

function escapeHtml(text) {
    if (!text) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("Website JAWS BURGER berjalan!");
    
    setupSmoothScroll();
    setActiveMenu();
    // window.addEventListener('scroll', setActiveMenu);
    window.addEventListener('resize', setActiveMenu);

    fetchSpreadsheetData();
});
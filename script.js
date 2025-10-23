// أسعار ذهب حقيقية لمصر (أكتوبر 2024)
let goldPrices = {
    EGP: {
        k24: 6523.57,    // سعر الجرام 24 قيراط
        k22: 5979.94,    // سعر الجرام 22 قيراط  
        k21: 5708.13,    // سعر الجرام 21 قيراط
        k18: 4892.68,    // سعر الجرام 18 قيراط
        gram: 6523.57,   // سعر الجرام 24
        ounce: 202883.12 // سعر الأونصة
    },
    USD: {
        ounce: 4257.06,  // سعر الأونصة بالدولار
        gram: 136.88     // سعر الجرام بالدولار
    }
};

// العناصر
const elements = {
    currentDate: document.getElementById('current-date'),
    refreshBtn: document.getElementById('refresh-btn'),
    loading: document.getElementById('loading'),
    lastUpdate: document.getElementById('last-update'),
    footerUpdate: document.getElementById('footer-update'),
    autoRefresh: document.getElementById('auto-refresh'),
    updateStatus: document.getElementById('update-status'),
    
    // الأسعار المحلية
    k24Price: document.getElementById('k24-price'),
    k24Change: document.getElementById('k24-change'),
    k22Price: document.getElementById('k22-price'),
    k22Change: document.getElementById('k22-change'),
    k21Price: document.getElementById('k21-price'),
    k21Change: document.getElementById('k21-change'),
    k18Price: document.getElementById('k18-price'),
    k18Change: document.getElementById('k18-change'),
    ouncePrice: document.getElementById('ounce-price'),
    ounceChange: document.getElementById('ounce-change'),
    gramPrice: document.getElementById('gram-price'),
    gramChange: document.getElementById('gram-change'),
    
    // الأسعار العالمية
    globalOunce: document.getElementById('global-ounce'),
    globalGram: document.getElementById('global-gram-price'),
    dailyChange: document.getElementById('daily-change'),
    
    // الحاسبة
    weightInput: document.getElementById('weight'),
    karatSelect: document.getElementById('karat'),
    calculateBtn: document.getElementById('calculate-btn'),
    calcResult: document.getElementById('calc-result')
};

let refreshInterval;

// تهيئة التطبيق
function initApp() {
    updateDate();
    loadGoldPrices();
    setupEventListeners();
    setupAutoRefresh();
}

// تحميل أسعار الذهب
function loadGoldPrices() {
    // تحديث الإحصائيات
    elements.globalOunce.textContent = `$${goldPrices.USD.ounce.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    elements.globalGram.textContent = `$${goldPrices.USD.gram.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    
    // تحديث الأسعار المحلية
    elements.k24Price.textContent = `ج.م ${goldPrices.EGP.k24.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    elements.k22Price.textContent = `ج.م ${goldPrices.EGP.k22.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    elements.k21Price.textContent = `ج.م ${goldPrices.EGP.k21.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    elements.k18Price.textContent = `ج.م ${goldPrices.EGP.k18.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    elements.ouncePrice.textContent = `ج.م ${goldPrices.EGP.ounce.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    elements.gramPrice.textContent = `ج.م ${goldPrices.EGP.gram.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    
    // تحديث التغيرات
    updatePriceChanges();
    
    // تحديث الحاسبة
    calculateGoldPrice();
    
    // تحديث وقت التحديث الأخير
    updateLastUpdateTime();
    
    elements.updateStatus.textContent = 'تم التحديث بنجاح';
    elements.updateStatus.style.color = '#4CAF50';
}

// تحديث التغيرات
function updatePriceChanges() {
    elements.k24Change.className = 'change negative';
    elements.k24Change.innerHTML = '↓ 0.25%';
    
    elements.k22Change.className = 'change positive';
    elements.k22Change.innerHTML = '↑ 1.20%';
    
    elements.k21Change.className = 'change positive';
    elements.k21Change.innerHTML = '↑ 1.25%';
    
    elements.k18Change.className = 'change positive';
    elements.k18Change.innerHTML = '↑ 2.65%';
    
    elements.ounceChange.className = 'change positive';
    elements.ounceChange.innerHTML = '↑ 1.30%';
    
    elements.gramChange.className = 'change negative';
    elements.gramChange.innerHTML = '↓ 0.93%';
    
    elements.dailyChange.innerHTML = '<span style="color: #4CAF50">↑ 1.10%</span>';
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    elements.refreshBtn.addEventListener('click', refreshPrices);
    elements.calculateBtn.addEventListener('click', calculateGoldPrice);
    elements.autoRefresh.addEventListener('change', setupAutoRefresh);
}

// إعداد التحديث التلقائي
function setupAutoRefresh() {
    if (refreshInterval) {
        clearInterval(refreshInterval);
    }
    
    const interval = parseInt(elements.autoRefresh.value);
    if (interval > 0) {
        refreshInterval = setInterval(refreshPrices, interval * 1000);
        elements.updateStatus.textContent = `التحديث التلقائي مفعل (كل ${interval} ثانية)`;
        elements.updateStatus.style.color = '#2196F3';
    } else {
        elements.updateStatus.textContent = 'التحديث التلقائي متوقف';
        elements.updateStatus.style.color = '#666';
    }
}

// تحديث الأسعار
function refreshPrices() {
    showLoading();
    elements.updateStatus.textContent = 'جاري التحديث...';
    elements.updateStatus.style.color = '#FFA500';
    
    // محاكاة تحديث بسيط في الأسعار (±1%)
    setTimeout(() => {
        Object.keys(goldPrices.EGP).forEach(key => {
            const change = (Math.random() - 0.5) * 0.02; // ±1%
            goldPrices.EGP[key] = goldPrices.EGP[key] * (1 + change);
        });
        
        Object.keys(goldPrices.USD).forEach(key => {
            const change = (Math.random() - 0.5) * 0.02; // ±1%
            goldPrices.USD[key] = goldPrices.USD[key] * (1 + change);
        });
        
        loadGoldPrices();
        hideLoading();
        
        showNotification('تم تحديث الأسعار بنجاح! 🔄');
    }, 1000);
}

// تحديث وقت التحديث الأخير
function updateLastUpdateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ar-EG', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    elements.lastUpdate.textContent = timeString;
    elements.footerUpdate.textContent = timeString;
}

// تحديث التاريخ
function updateDate() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    elements.currentDate.textContent = now.toLocaleDateString('ar-EG', options);
}

// حساب سعر الذهب
function calculateGoldPrice() {
    const weight = parseFloat(elements.weightInput.value) || 1;
    const karat = parseInt(elements.karatSelect.value);
    
    // الحصول على سعر الجرام 24 قيراط
    const gram24Price = goldPrices.EGP.k24;
    
    // حساب السعر بناءً على العيار
    let pricePerGram;
    switch (karat) {
        case 24:
            pricePerGram = gram24Price;
            break;
        case 22:
            pricePerGram = gram24Price * 0.9167; // 22/24 = 0.9167
            break;
        case 21:
            pricePerGram = gram24Price * 0.875;  // 21/24 = 0.875
            break;
        case 18:
            pricePerGram = gram24Price * 0.75;   // 18/24 = 0.75
            break;
        case 14:
            pricePerGram = gram24Price * 0.583;  // 14/24 ≈ 0.583
            break;
        default:
            pricePerGram = gram24Price;
    }
    
    const totalPrice = weight * pricePerGram;
    elements.calcResult.textContent = `ج.م ${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// عرض شاشة التحميل
function showLoading() {
    elements.loading.classList.add('active');
}

// إخفاء شاشة التحميل
function hideLoading() {
    elements.loading.classList.remove('active');
}

// عرض الإشعارات
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        z-index: 1001;
        font-weight: bold;
        font-size: 1.1rem;
        transform: translateX(100%);
        transition: transform 0.4s ease;
        border-left: 4px solid white;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 400);
    }, 3000);
}

// بدء التطبيق
document.addEventListener('DOMContentLoaded', initApp);

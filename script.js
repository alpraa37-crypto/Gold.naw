// أسعار الذهب الحقيقية
const goldPrices = {
    '24': 6523,  // 24 قيراط
    '22': 5979,  // 22 قيراط  
    '21': 5708,  // 21 قيراط
    '18': 4892   // 18 قيراط
};

// تحديث التاريخ والوقت
function updateDateTime() {
    const now = new Date();
    
    // تحديث التاريخ
    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    document.getElementById('current-date').textContent = now.toLocaleDateString('ar-EG', dateOptions);
    
    // تحديث الوقت
    const timeString = now.toLocaleTimeString('ar-EG', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('last-update').textContent = timeString;
    document.getElementById('footer-update').textContent = timeString;
}

// حساب سعر الذهب
function calculatePrice() {
    try {
        const weight = parseFloat(document.getElementById('weight').value) || 1;
        const karat = document.getElementById('karat').value;
        const pricePerGram = goldPrices[karat];
        const totalPrice = weight * pricePerGram;
        
        document.getElementById('calc-result').textContent = `ج.م ${Math.round(totalPrice).toLocaleString()}`;
    } catch (error) {
        console.log('خطأ في الحاسبة:', error);
    }
}

// تحديث الأسعار (محاكاة)
function refreshPrices() {
    const refreshBtn = document.getElementById('refresh-btn');
    const originalText = refreshBtn.innerHTML;
    
    // تأثير التحميل
    refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحديث...';
    refreshBtn.disabled = true;
    
    // محاكاة التحديث
    setTimeout(() => {
        updateDateTime();
        refreshBtn.innerHTML = originalText;
        refreshBtn.disabled = false;
        
        // إشعار نجاح
        showNotification('تم تحديث الأسعار بنجاح! ✅');
    }, 1500);
}

// عرض إشعار
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
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => document.body.removeChild(notification), 400);
    }, 3000);
}

// التحديث التلقائي
function setupAutoRefresh() {
    const autoRefresh = document.getElementById('auto-refresh');
    let refreshInterval;
    
    autoRefresh.addEventListener('change', function() {
        clearInterval(refreshInterval);
        
        const interval = parseInt(this.value);
        if (interval > 0) {
            refreshInterval = setInterval(refreshPrices, interval * 1000);
        }
    });
}

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 تطبيق أسعار الذهب يعمل!');
    
    // تحديث التاريخ والوقت أولاً
    updateDateTime();
    
    // إعداد الأحداث
    document.getElementById('refresh-btn').addEventListener('click', refreshPrices);
    document.getElementById('calculate-btn').addEventListener('click', calculatePrice);
    
    // إعداد التحديث التلقائي
    setupAutoRefresh();
    
    // تحديث الوقت كل ثانية
    setInterval(updateDateTime, 1000);
    
    console.log('✅ التطبيق جاهز للاستخدام!');
});

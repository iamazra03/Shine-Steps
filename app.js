// ========== DOM Element Referansları ==========
// Header ve Navigasyon
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

// Form Elementleri
const taskForm = document.getElementById('task-form');
const taskTitle = document.getElementById('task-title');
const taskDescription = document.getElementById('task-description');
const taskCategory = document.getElementById('task-category');
const taskPriority = document.getElementById('task-priority');
const taskDuration = document.getElementById('task-duration');

// Hata Mesajları
const titleError = document.getElementById('title-error');
const descriptionError = document.getElementById('description-error');
const categoryError = document.getElementById('category-error');
const priorityError = document.getElementById('priority-error');
const durationError = document.getElementById('duration-error');

// Görev Listeleri
const activeTasksList = document.getElementById('active-tasks-list');
const completedTasksList = document.getElementById('completed-tasks-list');
const noActiveTasks = document.getElementById('no-active-tasks');
const noCompletedTasks = document.getElementById('no-completed-tasks');

// Sekmeler
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// İstatistikler
const todayCompleted = document.getElementById('today-completed');
const todayTotal = document.getElementById('today-total');
const todayProgress = document.getElementById('today-progress');
const weekCompleted = document.getElementById('week-completed');
const weekTotal = document.getElementById('week-total');
const weekProgress = document.getElementById('week-progress');
const currentStreakEl = document.getElementById('current-streak');
const longestStreakEl = document.getElementById('longest-streak');
const totalCompletedEl = document.getElementById('total-completed');
const totalTasksEl = document.getElementById('total-tasks');
const totalProgressEl = document.getElementById('total-progress');

// Raporlar
const todayAddedEl = document.getElementById('today-added');
const todayDoneEl = document.getElementById('today-done');
const weekAddedEl = document.getElementById('week-added');
const weekDoneEl = document.getElementById('week-done');
const weekRateEl = document.getElementById('week-rate');

// Kategori İstatistikleri
const categoryStats = {
    egitim: document.getElementById('cat-egitim'),
    spor: document.getElementById('cat-spor'),
    kariyer: document.getElementById('cat-kariyer'),
    kisisel: document.getElementById('cat-kisisel'),
    hobi: document.getElementById('cat-hobi')
};

// Modaller
const timerModal = document.getElementById('timer-modal');
const timerMinutes = document.getElementById('timer-minutes');
const timerSeconds = document.getElementById('timer-seconds');
const timerTitle = document.getElementById('timer-title');
const timerDescription = document.getElementById('timer-description');
const timerStart = document.getElementById('timer-start');
const timerPause = document.getElementById('timer-pause');
const timerComplete = document.getElementById('timer-complete');
const timerCancel = document.getElementById('timer-cancel');
const closeTimer = document.getElementById('close-timer');

const successModal = document.getElementById('success-modal');
const successMessage = document.getElementById('success-message');
const motivationQuote = document.getElementById('motivation-quote');
const successOk = document.getElementById('success-ok');
const closeSuccess = document.getElementById('close-success');

// Diğer Elementler
const badges = document.querySelectorAll('.badge');
const notificationContainer = document.getElementById('notification-container');
const motivationMessage = document.getElementById('motivation-message');

// ========== Uygulama Verileri ==========
// Görevler
let tasks = [];
let completedTasks = [];

// Zamanlayıcı Değişkenleri
let currentTask = null;
let timerInterval = null;
let remainingSeconds = 0;
let timerRunning = false;
let timerPaused = false;

// İstatistikler
let stats = {
    daily: {
        added: 0,
        completed: 0,
        date: new Date().toDateString()
    },
    weekly: {
        added: 0,
        completed: 0,
        startDate: getStartOfWeek().toDateString()
    },
    categories: {
        egitim: 0,
        spor: 0,
        kariyer: 0,
        kisisel: 0,
        hobi: 0
    },
    streak: {
        current: 0,
        longest: 0,
        lastDate: null
    }
};

// Rozet Kilitleri
let badgeUnlocks = {
    'first-task': false,
    'five-tasks': false,
    'streak-3': false,
    'all-categories': false,
    'high-priority': false
};

// Motivasyon Mesajları
const motivationalMessages = [
    "Her başarı, küçük adımlarla başlar. Bugün attığın adım, yarının başarısıdır.",
    "Zorluklar, güçlü insanları bulmaz; onları yaratır.",
    "Başarı bir yolculuktur, varış noktası değil.",
    "Kendini geliştirmek için harcadığın her dakika, geleceğine yapılan bir yatırımdır.",
    "Bugün yapamadığın şey, yarın yapabildiğin şey olacak.",
    "Küçük ilerlemeler bile, zamanla büyük değişimlere yol açar.",
    "Başarı merdiveni, tek seferde değil adım adım çıkılır.",
    "Kendini aşmak, başkalarını geçmekten daha önemlidir.",
    "Yarının nasıl olacağını merak ediyorsan, bugün ne yaptığına bak.",
    "Disiplin, istediğin ile ihtiyacın olan arasındaki köprüdür.",
    "Disiplin, istediğin ile ihtiyacın olan arasındaki köprüdür.",
    "Hayallerine giden yol, bugün atacağın küçük adımlarla başlar.",
    "Bir şeyleri değiştirmek istiyorsan, her gün aynı şeyleri yapmayı bırak.",
    "İlerlemenin sırrı başlamaktır. Başlamanın sırrı, karmaşık görevleri basit eylemlere bölmektir.",
    "Gelişim konforlu alanda değil, zorlukların içinde gizlidir.",
    "Her gün bir önceki günden daha iyi olmak için çabala.",
    "Mükemmeliyetçilik ilerlemeni engeller. İlerleme, mükemmel olandan değil yapılandan gelir.",
    "Başarısızlıklar öğretir, başarılar motive eder.",
    "İlerleme mükemmel olmak değil, her gün daha iyi olmaktır.",
    "En büyük engellerden biri 'Yarın yapacağım' demektir.",
    "Senin için imkansız görünen, başlangıçta herkes için imkansızdı.",
    "Bugünün çabası, yarının kolaylığıdır.",
    "Her yeni alışkanlık, yeni bir ben inşa eder.",
    "İstikrar, yetenekten daha güçlüdür.",
    "Her şeyi yapamayacağını bilmek bilgelik, denemeyi bırakmamak cesarettir.",
    "Başarı, küçük adımların toplamından ibaret bir yolculuktur."
];

// ========== Olay Dinleyicileri ==========
document.addEventListener('DOMContentLoaded', () => {
    // LocalStorage'dan verileri yükle
    loadFromLocalStorage();
    
    // Görevleri ve istatistikleri göster
    renderTasks();
    renderCompletedTasks();
    updateAllStatistics();
    
    // Motivasyon mesajı göster
    updateMotivationMessage();
    
    // Mobil menü
    menuToggle.addEventListener('click', toggleMobileMenu);
    
    // Form submit olayı
    taskForm.addEventListener('submit', handleTaskSubmit);
    
    // Sekme değiştirme
    tabButtons.forEach(button => {
        button.addEventListener('click', () => switchTab(button.dataset.tab));
    });
    
    // Zamanlayıcı modal kontrolleri
    timerStart.addEventListener('click', startTimer);
    timerPause.addEventListener('click', pauseTimer);
    timerComplete.addEventListener('click', completeTimerTask);
    timerCancel.addEventListener('click', cancelTimer);
    closeTimer.addEventListener('click', closeTimerModal);
    
    // Başarı modal kontrolleri
    successOk.addEventListener('click', closeSuccessModal);
    closeSuccess.addEventListener('click', closeSuccessModal);
});

// ========== Temel Fonksiyonlar ==========
// Mobil Menü Aç/Kapat
function toggleMobileMenu() {
    mobileMenu.classList.toggle('open');
}

// Sekme Değiştirme
function switchTab(tabId) {
    // Aktif sekme butonunu değiştir
    tabButtons.forEach(button => {
        button.classList.toggle('active', button.dataset.tab === tabId);
    });
    
    // Aktif sekme içeriğini değiştir
    tabContents.forEach(content => {
        content.classList.toggle('active', content.id === tabId);
    });
}

// Form Gönderimi
function handleTaskSubmit(e) {
    e.preventDefault();
    
    // Form doğrulama
    if (!validateTaskForm()) {
        return;
    }
    
    // Yeni görev oluştur
    const newTask = {
        id: Date.now(),
        title: taskTitle.value.trim(),
        description: taskDescription.value.trim(),
        category: taskCategory.value,
        priority: taskPriority.value,
        duration: parseInt(taskDuration.value),
        createdAt: new Date().toISOString()
    };
    
    // Görevi listeye ekle
    tasks.push(newTask);
    
    // İstatistikleri güncelle
    stats.daily.added++;
    stats.weekly.added++;
    
    // LocalStorage'a kaydet ve görüntüle
    saveToLocalStorage();
    renderTasks();
    updateAllStatistics();
    
    // Formu temizle
    taskForm.reset();
    
    // Başarılı bildirimi göster
    showNotification('Başarılı', 'Görev başarıyla eklendi.', 'success');
}

// Form Doğrulama
function validateTaskForm() {
    let isValid = true;
    
    // Başlık doğrulama
    if (!taskTitle.value.trim()) {
        showInputError(taskTitle, titleError, 'Görev başlığı zorunludur.');
        isValid = false;
    } else {
        clearInputError(taskTitle, titleError);
    }
    
    // Açıklama doğrulama
    if (!taskDescription.value.trim()) {
        showInputError(taskDescription, descriptionError, 'Görev açıklaması zorunludur.');
        isValid = false;
    } else {
        clearInputError(taskDescription, descriptionError);
    }
    
    // Kategori doğrulama
    if (!taskCategory.value) {
        showInputError(taskCategory, categoryError, 'Kategori seçimi zorunludur.');
        isValid = false;
    } else {
        clearInputError(taskCategory, categoryError);
    }
    
    // Öncelik doğrulama
    if (!taskPriority.value) {
        showInputError(taskPriority, priorityError, 'Öncelik seçimi zorunludur.');
        isValid = false;
    } else {
        clearInputError(taskPriority, priorityError);
    }
    
    // Süre doğrulama
    if (!taskDuration.value) {
        showInputError(taskDuration, durationError, 'Süre zorunludur.');
        isValid = false;
    } else if (isNaN(taskDuration.value) || parseInt(taskDuration.value) <= 0) {
        showInputError(taskDuration, durationError, 'Süre pozitif bir sayı olmalıdır.');
        isValid = false;
    } else if (parseInt(taskDuration.value) > 180) {
        showInputError(taskDuration, durationError, 'Süre en fazla 180 dakika olabilir.');
        isValid = false;
    } else {
        clearInputError(taskDuration, durationError);
    }
    
    return isValid;
}

// Hata Mesajı Göster
function showInputError(inputElement, errorElement, message) {
    inputElement.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('visible');
}

// Hata Mesajını Temizle
function clearInputError(inputElement, errorElement) {
    inputElement.classList.remove('error');
    errorElement.classList.remove('visible');
    errorElement.textContent = '';
}

// ========== Görev İşlemleri ==========
// Aktif Görevleri Göster
function renderTasks() {
    if (tasks.length === 0) {
        noActiveTasks.style.display = 'block';
        activeTasksList.innerHTML = '';
        return;
    }
    
    noActiveTasks.style.display = 'none';
    activeTasksList.innerHTML = '';
    
    // Öncelik sırasına göre sırala
    const sortedTasks = [...tasks].sort((a, b) => {
        const priorityOrder = { 'yuksek': 0, 'orta': 1, 'dusuk': 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    
    // Görevleri görüntüle
    sortedTasks.forEach(task => {
        const taskElement = createTaskElement(task);
        activeTasksList.appendChild(taskElement);
    });
}

// Tamamlanan Görevleri Göster
function renderCompletedTasks() {
    if (completedTasks.length === 0) {
        noCompletedTasks.style.display = 'block';
        completedTasksList.innerHTML = '';
        return;
    }
    
    noCompletedTasks.style.display = 'none';
    completedTasksList.innerHTML = '';
    
    // Tarihe göre sırala (en yeni üstte)
    const sortedTasks = [...completedTasks].sort((a, b) => {
        return new Date(b.completedAt) - new Date(a.completedAt);
    });
    
    // Tamamlanan görevleri görüntüle
    sortedTasks.forEach(task => {
        const taskElement = createCompletedTaskElement(task);
        completedTasksList.appendChild(taskElement);
    });
}

// Görev Elementi Oluştur
function createTaskElement(task) {
    const taskElement = document.createElement('div');
    taskElement.className = 'task-card';
    taskElement.dataset.id = task.id;
    taskElement.dataset.priority = task.priority;
    
    taskElement.innerHTML = `
        <h3>${task.title}</h3>
        <div class="task-meta">
            <span data-category="${task.category}"><i class="fas fa-folder"></i> ${getCategoryName(task.category)}</span>
            <span data-priority="${task.priority}"><i class="fas fa-flag"></i> ${getPriorityName(task.priority)}</span>
            <span><i class="fas fa-clock"></i> ${task.duration} dk</span>
        </div>
        <p>${task.description}</p>
        <div class="task-actions">
            <button class="btn btn-primary start-task"><i class="fas fa-play"></i> Başlat</button>
            <button class="btn btn-danger delete-task"><i class="fas fa-trash"></i> Sil</button>
        </div>
    `;
    
    // Başlat butonuna tıklama olayı ekle
    const startButton = taskElement.querySelector('.start-task');
    startButton.addEventListener('click', () => openTimerModal(task));
    
    // Sil butonuna tıklama olayı ekle
    const deleteButton = taskElement.querySelector('.delete-task');
    deleteButton.addEventListener('click', () => deleteTask(task.id));
    
    return taskElement;
}
// Tamamlanan Görev Elementi Oluştur
function createCompletedTaskElement(task) {
    const taskElement = document.createElement('div');
    taskElement.className = 'task-card';
    taskElement.dataset.id = task.id;
    taskElement.dataset.priority = task.priority;
    
    taskElement.innerHTML = `
        <h3>${task.title}</h3>
        <div class="completed-info">
            <i class="fas fa-check-circle"></i> ${formatDate(task.completedAt)}
        </div>
        <div class="task-meta">
            <span data-category="${task.category}"><i class="fas fa-folder"></i> ${getCategoryName(task.category)}</span>
            <span data-priority="${task.priority}"><i class="fas fa-flag"></i> ${getPriorityName(task.priority)}</span>
            <span><i class="fas fa-clock"></i> ${task.duration} dk</span>
        </div>
        <p>${task.description}</p>
        <div class="task-actions">
            <button class="btn btn-danger delete-completed-task"><i class="fas fa-trash"></i> Sil</button>
        </div>
    `;
    
    // Sil butonuna tıklama olayı ekle
    const deleteButton = taskElement.querySelector('.delete-completed-task');
    deleteButton.addEventListener('click', () => deleteCompletedTask(task.id));
    
    return taskElement;
}
// Görev Silme Fonksiyonu
function deleteTask(taskId) {
    // Silme onayı iste
    if (!confirm('Bu görevi silmek istediğinize emin misiniz?')) {
        return;
    }
    
    // Görevler dizisinden sil
    tasks = tasks.filter(task => task.id !== taskId);
    
    // LocalStorage'a kaydet
    saveToLocalStorage();
    
    // Görevleri yeniden göster
    renderTasks();
    
    // İstatistikleri güncelle
    updateAllStatistics();
    
    // Bildirim göster
    showNotification('Bilgi', 'Görev başarıyla silindi.', 'info');
}
// Tamamlanan Görev Silme Fonksiyonu
function deleteCompletedTask(taskId) {
    // Silme onayı iste
    if (!confirm('Bu tamamlanan görevi silmek istediğinize emin misiniz?')) {
        return;
    }
    
    // Tamamlanan görevler dizisinden sil
    completedTasks = completedTasks.filter(task => task.id !== taskId);
    
    // LocalStorage'a kaydet
    saveToLocalStorage();
    
    // Tamamlanan görevleri yeniden göster
    renderCompletedTasks();
    
    // İstatistikleri güncelle
    updateAllStatistics();
    
    // Bildirim göster
    showNotification('Bilgi', 'Tamamlanan görev başarıyla silindi.', 'info');
}

// Tamamlanan Görev Elementi Oluştur
function createCompletedTaskElement(task) {
    const taskElement = document.createElement('div');
    taskElement.className = 'task-card';
    taskElement.dataset.id = task.id;
    taskElement.dataset.priority = task.priority;
    
    taskElement.innerHTML = `
        <h3>${task.title}</h3>
        <div class="completed-info">
            <i class="fas fa-check-circle"></i> ${formatDate(task.completedAt)}
        </div>
        <div class="task-meta">
            <span data-category="${task.category}"><i class="fas fa-folder"></i> ${getCategoryName(task.category)}</span>
            <span data-priority="${task.priority}"><i class="fas fa-flag"></i> ${getPriorityName(task.priority)}</span>
            <span><i class="fas fa-clock"></i> ${task.duration} dk</span>
        </div>
        <p>${task.description}</p>
    `;
    
    return taskElement;
}

// Zamanlayıcı Modal İşlemleri
function openTimerModal(task) {
    // Şu anki görevi ayarla
    currentTask = task;
    remainingSeconds = task.duration * 60;
    
    // Modal içeriğini güncelle
    updateTimerDisplay();
    timerTitle.textContent = task.title;
    timerDescription.textContent = task.description;
    
    // Buton durumlarını ayarla
    timerStart.disabled = false;
    timerPause.disabled = true;
    timerRunning = false;
    timerPaused = false;
    
    // Modalı göster
    timerModal.classList.add('active');
}

function startTimer() {
    if (timerRunning && !timerPaused) return;
    
    timerRunning = true;
    timerPaused = false;
    
    // Buton durumlarını ayarla
    timerStart.disabled = true;
    timerPause.disabled = false;
    
    // Zamanlayıcıyı başlat
    timerInterval = setInterval(() => {
        if (remainingSeconds <= 0) {
            completeTimerTask();
            return;
        }
        
        remainingSeconds--;
        updateTimerDisplay();
    }, 1000);
}

function pauseTimer() {
    if (!timerRunning || timerPaused) return;
    
    clearInterval(timerInterval);
    timerPaused = true;
    
    // Buton durumlarını ayarla
    timerStart.disabled = false;
    timerPause.disabled = true;
}

function cancelTimer() {
    // Zamanlayıcıyı durdur
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    // Modalı kapat
    closeTimerModal();
    
    // Bildirim göster
    showNotification('Bilgi', 'Zamanlayıcı iptal edildi.', 'info');
}

function completeTimerTask() {
    // Zamanlayıcıyı durdur
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    if (!currentTask) return;
    
    // Görevi tamamla
    completeTask(currentTask);
    
    // Modalı kapat
    closeTimerModal();
}

function closeTimerModal() {
    timerModal.classList.remove('active');
    currentTask = null;
    
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    timerRunning = false;
    timerPaused = false;
}

function updateTimerDisplay() {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    
    timerMinutes.textContent = minutes.toString().padStart(2, '0');
    timerSeconds.textContent = seconds.toString().padStart(2, '0');
}

// Görev Tamamlama
function completeTask(task) {
    // Görevi aktif listeden kaldır
    const taskIndex = tasks.findIndex(t => t.id === task.id);
    if (taskIndex === -1) return;
    
    const completedTask = { ...tasks[taskIndex], completedAt: new Date().toISOString() };
    tasks.splice(taskIndex, 1);
    completedTasks.push(completedTask);
    
    // İstatistikleri güncelle
    updateStatsOnTaskComplete(completedTask);
    
    // Rozetleri kontrol et
    checkBadges();
    
    // LocalStorage'a kaydet
    saveToLocalStorage();
    
    // Görüntüyü güncelle
    renderTasks();
    renderCompletedTasks();
    updateAllStatistics();
    
    // Başarı modalını göster
    showSuccessModal(completedTask);
}

// İstatistikleri Güncelle (Görev Tamamlandığında)
function updateStatsOnTaskComplete(task) {
    // Günlük ve haftalık istatistikleri güncelle
    stats.daily.completed++;
    stats.weekly.completed++;
    
    // Kategori istatistiğini güncelle
    stats.categories[task.category]++;
    
    // Çalışma serisini güncelle
    updateStreak();
}

// Çalışma Serisi Güncelleme
function updateStreak() {
    const today = new Date().toDateString();
    
    if (!stats.streak.lastDate) {
        // İlk görev tamamlanıyorsa, seriyi 1 olarak başlat
        stats.streak.current = 1;
        stats.streak.longest = 1;
        stats.streak.lastDate = today;
        return;
    }
    
    if (stats.streak.lastDate === today) {
        // Bugün zaten görev tamamlanmış, seriyi değiştirme
        return;
    }
    
    // Dün bir görev tamamlanmış mı kontrol et
    const lastDate = new Date(stats.streak.lastDate);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastDate.toDateString() === yesterday.toDateString()) {
        // Dün görev tamamlanmışsa seriyi artır
        stats.streak.current++;
        
        // En uzun seriyi kontrol et
        if (stats.streak.current > stats.streak.longest) {
            stats.streak.longest = stats.streak.current;
        }
    } else {
        // Seri kesilmiş, yeniden başlat
        stats.streak.current = 1;
    }
    
    // Son tamamlama tarihini güncelle
    stats.streak.lastDate = today;
}

// ========== Rozet İşlemleri ==========
// Rozetleri Kontrol Et
function checkBadges() {
    // İlk Görev Rozeti
    if (completedTasks.length >= 1 && !badgeUnlocks['first-task']) {
        unlockBadge('first-task');
    }
    
    // 5 Görev Rozeti
    if (completedTasks.length >= 5 && !badgeUnlocks['five-tasks']) {
        unlockBadge('five-tasks');
    }
    
    // 3 Gün Üst Üste Rozeti
    if (stats.streak.current >= 3 && !badgeUnlocks['streak-3']) {
        unlockBadge('streak-3');
    }
    
    // Tüm Kategoriler Rozeti
    const completedCategories = new Set();
    completedTasks.forEach(task => completedCategories.add(task.category));
    
    if (completedCategories.size >= 5 && !badgeUnlocks['all-categories']) {
        unlockBadge('all-categories');
    }
    
    // Yüksek Öncelikli Görevler Rozeti
    const highPriorityTasks = completedTasks.filter(task => task.priority === 'yuksek').length;
    
    if (highPriorityTasks >= 5 && !badgeUnlocks['high-priority']) {
        unlockBadge('high-priority');
    }
}

// Rozet Kilidi Aç
function unlockBadge(badgeId) {
    badgeUnlocks[badgeId] = true;
    
    // Rozet görüntüsünü güncelle
    const badge = document.querySelector(`.badge[data-badge="${badgeId}"]`);
    if (badge) {
        badge.classList.remove('locked');
    }
    
    // Bildirim göster
    showNotification('Yeni Rozet!', `"${getBadgeName(badgeId)}" rozetini kazandınız!`, 'success');
}

// Rozet İsmi Al
function getBadgeName(badgeId) {
    const badgeNames = {
        'first-task': 'İlk Görev',
        'five-tasks': '5 Görev',
        'streak-3': '3 Gün Serisi',
        'all-categories': 'Çeşitlilik',
        'high-priority': 'Öncelikli'
    };
    
    return badgeNames[badgeId] || badgeId;
}

// Rozetleri Güncelle
function updateBadges() {
    badges.forEach(badge => {
        const badgeId = badge.dataset.badge;
        if (badgeUnlocks[badgeId]) {
            badge.classList.remove('locked');
        } else {
            badge.classList.add('locked');
        }
    });
}

// ========== İstatistik İşlemleri ==========
// Tüm İstatistikleri Güncelle
function updateAllStatistics() {
    // Başarı istatistikleri
    const totalTaskCount = tasks.length + completedTasks.length;
    const completedTaskCount = completedTasks.length;
    const completionRate = totalTaskCount > 0 ? Math.round((completedTaskCount / totalTaskCount) * 100) : 0;
    
    // Toplam görevler
    totalTasksEl.textContent = totalTaskCount;
    totalCompletedEl.textContent = completedTaskCount;
    totalProgressEl.style.width = `${completionRate}%`;
    totalProgressEl.textContent = `${completionRate}%`;
    
    // Günlük görevler
    const dailyRate = stats.daily.added > 0 ? Math.round((stats.daily.completed / stats.daily.added) * 100) : 0;
    todayTotal.textContent = stats.daily.added;
    todayCompleted.textContent = stats.daily.completed;
    todayProgress.style.width = `${dailyRate}%`;
    
    // Haftalık görevler
    const weeklyRate = stats.weekly.added > 0 ? Math.round((stats.weekly.completed / stats.weekly.added) * 100) : 0;
    weekTotal.textContent = stats.weekly.added;
    weekCompleted.textContent = stats.weekly.completed;
    weekProgress.style.width = `${weeklyRate}%`;
    
    // Çalışma serisi
    currentStreakEl.textContent = stats.streak.current;
    longestStreakEl.textContent = stats.streak.longest;
    
    // Raporlar
    todayAddedEl.textContent = stats.daily.added;
    todayDoneEl.textContent = stats.daily.completed;
    weekAddedEl.textContent = stats.weekly.added;
    weekDoneEl.textContent = stats.weekly.completed;
    weekRateEl.textContent = `${weeklyRate}%`;
    
    // Kategori istatistikleri
    for (const category in stats.categories) {
        if (categoryStats[category]) {
            categoryStats[category].textContent = stats.categories[category];
        }
    }
    
    // Rozetleri güncelle
    updateBadges();
}

// ========== Modal İşlemleri ==========
// Başarı Modalını Göster
function showSuccessModal(task) {
    // Rastgele motivasyon mesajı seç
    const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
    const message = motivationalMessages[randomIndex];
    
    // Modal içeriğini ayarla
    successMessage.textContent = `"${task.title}" görevini başarıyla tamamladın!`;
    motivationQuote.textContent = message;
    
    // Modalı göster
    successModal.classList.add('active');
}

// Başarı Modalını Kapat
function closeSuccessModal() {
    successModal.classList.remove('active');
}

// ========== Yardımcı Fonksiyonlar ==========
// Bildirimi Göster
function showNotification(title, message, type = 'info') {
    // Bildirim elementini oluştur
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas ${getNotificationIcon(type)}"></i>
        </div>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Bildirim konteynerine ekle
    notificationContainer.appendChild(notification);
    
    // Kapatma düğmesine tıklama olayı ekle
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.classList.add('removing');
        setTimeout(() => notification.remove(), 300);
    });
    
    // Otomatik kapanma
    setTimeout(() => {
        notification.classList.add('removing');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Bildirim İkonunu Al
function getNotificationIcon(type) {
    const icons = {
        'success': 'fa-check-circle',
        'error': 'fa-exclamation-circle',
        'warning': 'fa-exclamation-triangle',
        'info': 'fa-info-circle'
    };
    
    return icons[type] || icons.info;
}

// Motivasyon Mesajını Güncelle
function updateMotivationMessage() {
    if (motivationMessage) {
        const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
        motivationMessage.textContent = motivationalMessages[randomIndex];
    }
}

// Kategori İsmini Al
function getCategoryName(category) {
    const categories = {
        'egitim': 'Eğitim',
        'spor': 'Spor/Sağlık',
        'kariyer': 'Kariyer',
        'kisisel': 'Kişisel Gelişim',
        'hobi': 'Hobi'
    };
    
    return categories[category] || category;
}

// Öncelik İsmini Al
function getPriorityName(priority) {
    const priorities = {
        'yuksek': 'Yüksek',
        'orta': 'Orta',
        'dusuk': 'Düşük'
    };
    
    return priorities[priority] || priority;
}

// Tarih Formatla
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    return date.toLocaleDateString('tr-TR', options);
}

// Haftanın Başlangıcını Al
function getStartOfWeek() {
    const date = new Date();
    const day = date.getDay(); // 0: Pazar, 1: Pazartesi, ...
    
    // Pazartesi başlangıç olarak al
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    
    const startOfWeek = new Date(date.setDate(diff));
    startOfWeek.setHours(0, 0, 0, 0);
    
    return startOfWeek;
}

// ========== Veri Saklama (localStorage) ==========
// LocalStorage'a Kaydet
function saveToLocalStorage() {
    try {
        localStorage.setItem('shinesteps_tasks', JSON.stringify(tasks));
        localStorage.setItem('shinesteps_completedTasks', JSON.stringify(completedTasks));
        localStorage.setItem('shinesteps_stats', JSON.stringify(stats));
        localStorage.setItem('shinesteps_badges', JSON.stringify(badgeUnlocks));
    } catch (error) {
        console.error('LocalStorage kayıt hatası:', error);
        showNotification('Hata', 'Veriler kaydedilirken bir sorun oluştu.', 'error');
    }
}

// LocalStorage'dan Yükle
function loadFromLocalStorage() {
    try {
        // Görevleri yükle
        const savedTasks = localStorage.getItem('shinesteps_tasks');
        if (savedTasks) {
            tasks = JSON.parse(savedTasks);
        }
        
        // Tamamlanan görevleri yükle
        const savedCompletedTasks = localStorage.getItem('shinesteps_completedTasks');
        if (savedCompletedTasks) {
            completedTasks = JSON.parse(savedCompletedTasks);
        }
        
        // İstatistikleri yükle
        const savedStats = localStorage.getItem('shinesteps_stats');
        if (savedStats) {
            stats = JSON.parse(savedStats);
            
            // Tarihi kontrol et ve gerekirse günlük istatistikleri sıfırla
            const today = new Date().toDateString();
            if (stats.daily.date !== today) {
                stats.daily = {
                    added: 0,
                    completed: 0,
                    date: today
                };
            }
            
            // Haftalık istatistikleri kontrol et
            const currentWeekStart = getStartOfWeek().toDateString();
            if (stats.weekly.startDate !== currentWeekStart) {
                stats.weekly = {
                    added: 0,
                    completed: 0,
                    startDate: currentWeekStart
                };
            }
        }
        
        // Rozet kilitlerini yükle
        const savedBadges = localStorage.getItem('shinesteps_badges');
        if (savedBadges) {
            badgeUnlocks = JSON.parse(savedBadges);
        }
    } catch (error) {
        console.error('LocalStorage yükleme hatası:', error);
        showNotification('Hata', 'Veriler yüklenirken bir sorun oluştu.', 'error');
        
        // Varsayılan değerleri kullan
        resetAppData();
    }
}

// Uygulama Verilerini Sıfırla
function resetAppData() {
    tasks = [];
    completedTasks = [];
    
    stats = {
        daily: {
            added: 0,
            completed: 0,
            date: new Date().toDateString()
        },
        weekly: {
            added: 0,
            completed: 0,
            startDate: getStartOfWeek().toDateString()
        },
        categories: {
            egitim: 0,
            spor: 0,
            kariyer: 0,
            kisisel: 0,
            hobi: 0
        },
        streak: {
            current: 0,
            longest: 0,
            lastDate: null
        }
    };
    
    badgeUnlocks = {
        'first-task': false,
        'five-tasks': false,
        'streak-3': false,
        'all-categories': false,
        'high-priority': false
    };
    
    saveToLocalStorage();
}
// ========== Geri Bildirim İşlevleri ==========
// DOM Elementleri
const feedbackForm = document.getElementById('feedback-form');
const feedbackName = document.getElementById('feedback-name');
const feedbackEmail = document.getElementById('feedback-email');
const feedbackMessage = document.getElementById('feedback-message');
const feedbackSuccess = document.getElementById('feedback-success');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const usageTimeError = document.getElementById('usage-time-error');
const featuresError = document.getElementById('features-error');
const satisfactionError = document.getElementById('satisfaction-error');
const messageError = document.getElementById('message-error');
const noFeedback = document.getElementById('no-feedback');
const feedbackList = document.getElementById('feedback-list');
// Geri Bildirim Verisi
let feedbacks = [];
// Geri Bildirim Formu Event Listener
if (feedbackForm) {
    feedbackForm.addEventListener('submit', handleFeedbackSubmit);
}
// Form Gönderimi
function handleFeedbackSubmit(e) {
    e.preventDefault();
    
    // Form doğrulama
    if (!validateFeedbackForm()) {
        return;
    }
    
    // Seçili özellikleri al
    const checkedFeatures = document.querySelectorAll('input[name="favorite-features"]:checked');
    const favoriteFeatures = Array.from(checkedFeatures).map(checkbox => checkbox.value);
    
    // Seçili kullanım süresini al
    const usageTime = document.querySelector('input[name="usage-time"]:checked').value;
    
    // Seçili memnuniyet derecesini al
    const satisfaction = document.querySelector('input[name="satisfaction"]:checked').value;
    
    // Yeni geri bildirim oluştur
    const newFeedback = {
        id: Date.now(),
        name: feedbackName.value.trim(),
        email: feedbackEmail.value.trim(),
        usageTime: usageTime,
        favoriteFeatures: favoriteFeatures,
        satisfaction: satisfaction,
        message: feedbackMessage.value.trim(),
        date: new Date().toISOString()
    };
    
    // Geri bildirimi listeye ekle
    feedbacks.push(newFeedback);
    
    // LocalStorage'a kaydet
    saveFeedbacksToLocalStorage();
    
    // Geri bildirimleri göster
    renderFeedbacks();
    
    // Başarı mesajını göster
    feedbackSuccess.style.display = 'flex';
    
    // Formu temizle
    feedbackForm.reset();
    
    // 5 saniye sonra başarı mesajını gizle
    setTimeout(() => {
        feedbackSuccess.style.display = 'none';
    }, 5000);
    
    // Bildirimi göster
    showNotification('Başarılı', 'Geri bildiriminiz için teşekkürler!', 'success');
}
// Form Doğrulama
function validateFeedbackForm() {
    let isValid = true;
    
    // İsim doğrulama
    if (!feedbackName.value.trim()) {
        showInputError(feedbackName, nameError, 'İsim zorunludur.');
        isValid = false;
    } else {
        clearInputError(feedbackName, nameError);
    }
    
    // Email doğrulama
    if (!feedbackEmail.value.trim()) {
        showInputError(feedbackEmail, emailError, 'E-posta zorunludur.');
        isValid = false;
    } else if (!isValidEmail(feedbackEmail.value.trim())) {
        showInputError(feedbackEmail, emailError, 'Geçerli bir e-posta adresi giriniz.');
        isValid = false;
    } else {
        clearInputError(feedbackEmail, emailError);
    }
    
    // Kullanım süresi doğrulama
    const usageTimeChecked = document.querySelector('input[name="usage-time"]:checked');
    if (!usageTimeChecked) {
        usageTimeError.textContent = 'Kullanım süresi seçimi zorunludur.';
        usageTimeError.classList.add('visible');
        isValid = false;
    } else {
        usageTimeError.classList.remove('visible');
        usageTimeError.textContent = '';
    }
    
    // Favori özellikler doğrulama
    const featuresChecked = document.querySelectorAll('input[name="favorite-features"]:checked');
    if (featuresChecked.length === 0) {
        featuresError.textContent = 'En az bir özellik seçmelisiniz.';
        featuresError.classList.add('visible');
        isValid = false;
    } else {
        featuresError.classList.remove('visible');
        featuresError.textContent = '';
    }
    
    // Memnuniyet doğrulama
    const satisfactionChecked = document.querySelector('input[name="satisfaction"]:checked');
    if (!satisfactionChecked) {
        satisfactionError.textContent = 'Memnuniyet derecesi seçimi zorunludur.';
        satisfactionError.classList.add('visible');
        isValid = false;
    } else {
        satisfactionError.classList.remove('visible');
        satisfactionError.textContent = '';
    }
    
    // Mesaj doğrulama
    if (!feedbackMessage.value.trim()) {
        showInputError(feedbackMessage, messageError, 'Mesaj zorunludur.');
        isValid = false;
    } else if (feedbackMessage.value.trim().length < 10) {
        showInputError(feedbackMessage, messageError, 'Mesaj en az 10 karakter olmalıdır.');
        isValid = false;
    } else {
        clearInputError(feedbackMessage, messageError);
    }
    
    return isValid;
}
// Email Doğrulama Fonksiyonu
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
// Geri Bildirimleri Göster
function renderFeedbacks() {
    if (feedbacks.length === 0) {
        noFeedback.style.display = 'block';
        feedbackList.innerHTML = '';
        return;
    }
    
    noFeedback.style.display = 'none';
    feedbackList.innerHTML = '';
    
    // En yeni geri bildirim üstte olacak şekilde sırala
    const sortedFeedbacks = [...feedbacks].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
    
    // Geri bildirimleri listele
    sortedFeedbacks.forEach(feedback => {
        const feedbackElement = createFeedbackElement(feedback);
        feedbackList.appendChild(feedbackElement);
    });
}
// Geri Bildirim Elementi Oluştur
function createFeedbackElement(feedback) {
    const feedbackElement = document.createElement('div');
    feedbackElement.className = 'feedback-item';
    feedbackElement.dataset.id = feedback.id;
    
    // Kullanım süresi text'ini al
    const usageTimeText = getUsageTimeText(feedback.usageTime);
    
    // Yıldız HTML'i oluştur
    const starsHtml = generateStarsHTML(parseInt(feedback.satisfaction));
    
    feedbackElement.innerHTML = `
        <div class="feedback-item-header">
            <div class="feedback-item-name">${feedback.name}</div>
            <div class="feedback-item-actions">
                <button class="edit-feedback-btn" title="Düzenle"><i class="fas fa-edit"></i></button>
                <button class="delete-feedback-btn" title="Sil"><i class="fas fa-trash"></i></button>
                <div class="feedback-item-date">${formatDate(feedback.date)}</div>
            </div>
        </div>
        <div class="feedback-item-meta">
            <span><i class="fas fa-clock"></i> ${usageTimeText}</span>
            ${feedback.favoriteFeatures.map(feature => `<span><i class="fas fa-star"></i> ${getFeatureName(feature)}</span>`).join('')}
        </div>
        <div class="feedback-item-message">${feedback.message}</div>
        <div class="feedback-item-rating">Memnuniyet: ${starsHtml}</div>
    `;
    
    // Sil butonuna tıklama olayı ekle
    const deleteBtn = feedbackElement.querySelector('.delete-feedback-btn');
    deleteBtn.addEventListener('click', () => deleteFeedback(feedback.id));
    
    // Düzenle butonuna tıklama olayı ekle
    const editBtn = feedbackElement.querySelector('.edit-feedback-btn');
    editBtn.addEventListener('click', () => editFeedback(feedback.id));
    
    return feedbackElement;
}
// Kullanım Süresi Text'ini Al
function getUsageTimeText(usageTime) {
    switch (usageTime) {
        case '0-7':
            return '0-7 gün';
        case '8-30':
            return '8-30 gün';
        case '1-3ay':
            return '1-3 ay';
        case '3+':
            return '3+ ay';
        default:
            return usageTime;
    }
}
// Özellik Adını Al
function getFeatureName(feature) {
    switch (feature) {
        case 'görev-takibi':
            return 'Görev Takibi';
        case 'istatistikler':
            return 'İstatistikler';
        case 'rozetler':
            return 'Rozetler';
        case 'kategori-sistemi':
            return 'Kategori Sistemi';
        case 'motivasyon':
            return 'Motivasyon';
        case 'zamanlayıcı':
            return 'Zamanlayıcı';
        default:
            return feature;
    }
}
// Yıldız HTML'i Oluştur
function generateStarsHTML(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHtml += '<i class="fas fa-star"></i>';
        } else {
            starsHtml += '<i class="far fa-star"></i>';
        }
    }
    return starsHtml;
}
// LocalStorage İşlemleri
function saveFeedbacksToLocalStorage() {
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
}
function loadFeedbacksFromLocalStorage() {
    const savedFeedbacks = localStorage.getItem('feedbacks');
    if (savedFeedbacks) {
        feedbacks = JSON.parse(savedFeedbacks);
    }
}
// Sayfa Yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    // Mobil menüye geri bildirim linkini ekle
    addFeedbackLinkToMenu();
    
    // Geri bildirimleri yükle ve göster
    if (feedbackForm) {
        loadFeedbacksFromLocalStorage();
        renderFeedbacks();
    }
});
// Mobil Menüye Geri Bildirim Linki Ekle
function addFeedbackLinkToMenu() {
    // Ana menüye ekle
    const mainNav = document.querySelector('nav ul');
    if (mainNav) {
        const feedbackLi = document.createElement('li');
        feedbackLi.innerHTML = '<a href="#feedback"><i class="fas fa-comment"></i> Geri Bildirim</a>';
        mainNav.appendChild(feedbackLi);
    }
    
    // Mobil menüye ekle
    const mobileMenu = document.querySelector('.mobile-menu ul');
    if (mobileMenu) {
        const feedbackLi = document.createElement('li');
        feedbackLi.innerHTML = '<a href="#feedback"><i class="fas fa-comment"></i> Geri Bildirim</a>';
        mobileMenu.appendChild(feedbackLi);
    }
}
// Geri Bildirim Silme Fonksiyonu
function deleteFeedback(id) {
    if (!confirm('Bu geri bildirimi silmek istediğinize emin misiniz?')) {
        return;
    }
    
    // ID'ye göre feedback'i bul ve sil
    feedbacks = feedbacks.filter(feedback => feedback.id !== id);
    
    // LocalStorage'a kaydet
    saveFeedbacksToLocalStorage();
    
    // Geri bildirimleri yeniden göster
    renderFeedbacks();
    
    // Bildirim göster
    showNotification('Bilgi', 'Geri bildirim başarıyla silindi.', 'info');
}
// Geri Bildirim Düzenleme Fonksiyonu
function editFeedback(id) {
    // ID'ye göre feedback'i bul
    const feedback = feedbacks.find(feedback => feedback.id === id);
    if (!feedback) return;
    
    // Form alanlarını doldur
    feedbackName.value = feedback.name;
    feedbackEmail.value = feedback.email;
    feedbackMessage.value = feedback.message;
    
    // Kullanım süresini seç
    document.querySelector(`input[name="usage-time"][value="${feedback.usageTime}"]`).checked = true;
    
    // Özellikleri seç
    document.querySelectorAll('input[name="favorite-features"]').forEach(checkbox => {
        checkbox.checked = feedback.favoriteFeatures.includes(checkbox.value);
    });
    
    // Memnuniyet derecesini seç
    document.querySelector(`input[name="satisfaction"][value="${feedback.satisfaction}"]`).checked = true;
    
    // Gönder butonunu güncelle
    const submitBtn = feedbackForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Geri Bildirimi Güncelle';
    feedbackForm.dataset.editId = id;
    
    // Forma scroll yap
    feedbackForm.scrollIntoView({ behavior: 'smooth' });
    
    // Güncelleme modu için submit event listener'ı değiştir
    feedbackForm.removeEventListener('submit', handleFeedbackSubmit);
    feedbackForm.addEventListener('submit', handleFeedbackUpdate);
    
    // İptal butonu ekle
    addCancelEditButton();
}
// Geri Bildirim Güncelleme İşleyici
function handleFeedbackUpdate(e) {
    e.preventDefault();
    
    // Form doğrulama
    if (!validateFeedbackForm()) {
        return;
    }
    
    // Düzenlenen ID'yi al
    const editId = parseInt(feedbackForm.dataset.editId);
    
    // Seçili özellikleri al
    const checkedFeatures = document.querySelectorAll('input[name="favorite-features"]:checked');
    const favoriteFeatures = Array.from(checkedFeatures).map(checkbox => checkbox.value);
    
    // Seçili kullanım süresini al
    const usageTime = document.querySelector('input[name="usage-time"]:checked').value;
    
    // Seçili memnuniyet derecesini al
    const satisfaction = document.querySelector('input[name="satisfaction"]:checked').value;
    
    // Geri bildirimi güncelle
    const feedbackIndex = feedbacks.findIndex(feedback => feedback.id === editId);
    if (feedbackIndex !== -1) {
        // Tarihi güncelleme
        const currentDate = new Date().toISOString();
        
        // Güncellenen geri bildirim
        feedbacks[feedbackIndex] = {
            ...feedbacks[feedbackIndex],
            name: feedbackName.value.trim(),
            email: feedbackEmail.value.trim(),
            usageTime: usageTime,
            favoriteFeatures: favoriteFeatures,
            satisfaction: satisfaction,
            message: feedbackMessage.value.trim(),
            updatedAt: currentDate
        };
        
        // LocalStorage'a kaydet
        saveFeedbacksToLocalStorage();
        
        // Geri bildirimleri göster
        renderFeedbacks();
        
        // Başarı mesajını göster
        feedbackSuccess.style.display = 'flex';
        feedbackSuccess.innerHTML = '<i class="fas fa-check-circle"></i> Geri bildiriminiz başarıyla güncellendi!';
        
        // 5 saniye sonra başarı mesajını gizle
        setTimeout(() => {
            feedbackSuccess.style.display = 'none';
        }, 5000);
        
        // Formu temizle ve normal moda geri dön
        feedbackForm.reset();
        delete feedbackForm.dataset.editId;
        
        // Gönder butonunu normal haline getir
        const submitBtn = feedbackForm.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Geri Bildirim Gönder';
        
        // İptal butonunu kaldır
        const cancelBtn = document.getElementById('cancel-edit-button');
        if (cancelBtn) cancelBtn.remove();
        
        // Event listener'ları değiştir
        feedbackForm.removeEventListener('submit', handleFeedbackUpdate);
        feedbackForm.addEventListener('submit', handleFeedbackSubmit);
        
        // Bildirimi göster
        showNotification('Başarılı', 'Geri bildiriminiz başarıyla güncellendi!', 'success');
    }
}
// Forma İptal Butonu Ekle
function addCancelEditButton() {
    // Halihazırda buton varsa ekleme
    if (document.getElementById('cancel-edit-button')) return;
    
    const submitBtn = feedbackForm.querySelector('button[type="submit"]');
    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.id = 'cancel-edit-button';
    cancelBtn.className = 'btn btn-secondary';
    cancelBtn.style.marginLeft = '10px';
    cancelBtn.innerHTML = 'İptal';
    
    cancelBtn.addEventListener('click', () => {
        // Formu temizle
        feedbackForm.reset();
        delete feedbackForm.dataset.editId;
        
        // Gönder butonunu normal haline getir
        submitBtn.textContent = 'Geri Bildirim Gönder';
        
        // İptal butonunu kaldır
        cancelBtn.remove();
        
        // Event listener'ları değiştir
        feedbackForm.removeEventListener('submit', handleFeedbackUpdate);
        feedbackForm.addEventListener('submit', handleFeedbackSubmit);
    });
    
    submitBtn.parentNode.insertBefore(cancelBtn, submitBtn.nextSibling);
}


/**
 * ShineSteps Enhanced Chatbot
 * 
 * Bu script, ShineSteps uygulamasına entegre edilebilecek gelişmiş bir chatbot ekler.
 * Sayfa yüklendiğinde otomatik olarak başlatılır ve API veya yerel yanıt sistemini kullanır.
 * 
 * Kullanım: <script src="/enhanced-chatbot.js"></script>
 */

(function() {
  // Chatbot'un yüklendiğini kontrol etmek için flag
  let chatbotLoaded = false;

  // Chatbot Ana Fonksiyonu
  function initializeChatbot() {
    // Çifte yükleme engelle
    if (chatbotLoaded) return;
    chatbotLoaded = true;
    
    console.log("[ShineSteps Chatbot] Başlatılıyor...");
    
    // Stil ekle
    addChatbotStyles();
    
    // HTML yapısını ekle
    addChatbotHTML();
    
    // Olay dinleyicilerini ayarla
    setupEventListeners();
    
    // Bot'un ilk mesajını ekle
    setTimeout(() => {
      addBotMessage('Merhaba! 👋 Ben ShineBot, ShineSteps uygulamasında size yardımcı olmak için buradayım. Nasıl yardımcı olabilirim?');
    }, 600);

    console.log("[ShineSteps Chatbot] Başarıyla yüklendi.");
  }
  
  // Chatbot için stil ekle
  function addChatbotStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      /* Chatbot Konteyneri */
      .chatbot-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
      
      /* Chatbot Toggle Butonu */
      .chatbot-toggle {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #7b66ff;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        border: none;
      }
      
      .chatbot-toggle:hover {
        background-color: #6a57d9;
        transform: scale(1.05);
      }
      
      .chatbot-toggle i {
        font-size: 24px;
      }
      
      /* Chatbot Ana Pencere */
      .chatbot-window {
        position: absolute;
        bottom: 70px;
        right: 0;
        width: 350px;
        height: 500px;
        background-color: white;
        border-radius: 16px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transform-origin: bottom right;
        transform: scale(0);
        opacity: 0;
        transition: all 0.3s ease;
        visibility: hidden;
        pointer-events: none;
      }
      
      .chatbot-window.active {
        transform: scale(1);
        opacity: 1;
        visibility: visible;
        pointer-events: all;
      }
      
      /* Chatbot Başlık */
      .chatbot-header {
        background-color: #7b66ff;
        color: white;
        padding: 16px;
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .chatbot-header-icon {
        font-size: 20px;
      }
      
      .chatbot-header-title {
        flex: 1;
      }
      
      .chatbot-header-title h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
      }
      
      .chatbot-header-title p {
        margin: 0;
        font-size: 12px;
        opacity: 0.8;
      }
      
      .chatbot-close {
        cursor: pointer;
        font-size: 16px;
        opacity: 0.8;
        transition: opacity 0.2s;
        background: none;
        border: none;
        color: white;
      }
      
      .chatbot-close:hover {
        opacity: 1;
      }
      
      /* Mesajlaşma Alanı */
      .chatbot-messages {
        flex: 1;
        padding: 16px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      
      /* Mesaj Stilleri */
      .chatbot-message {
        display: flex;
        gap: 8px;
        max-width: 85%;
        animation: fadeIn 0.3s ease-out;
      }
      
      .chatbot-message.user {
        margin-left: auto;
        flex-direction: row-reverse;
      }
      
      .chatbot-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        flex-shrink: 0;
      }
      
      .chatbot-avatar.bot {
        background-color: #7b66ff;
        color: white;
      }
      
      .chatbot-avatar.user {
        background-color: #e5e7eb;
        color: #4b5563;
      }
      
      .chatbot-avatar.error {
        background-color: #ef4444;
        color: white;
      }
      
      .chatbot-bubble {
        background-color: #f3f4f6;
        padding: 12px;
        border-radius: 12px;
        font-size: 14px;
        line-height: 1.5;
      }
      
      .chatbot-message.user .chatbot-bubble {
        background-color: #7b66ff;
        color: white;
      }
      
      .chatbot-message.error .chatbot-bubble {
        background-color: #fee2e2;
        color: #b91c1c;
      }
      
      /* Yazıyor İndikatörü */
      .chatbot-typing {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 8px 12px;
      }
      
      .chatbot-typing-dot {
        width: 6px;
        height: 6px;
        background-color: #6b7280;
        border-radius: 50%;
        animation: typing-animation 1s infinite ease-in-out;
      }
      
      .chatbot-typing-dot:nth-child(1) {
        animation-delay: 0s;
      }
      
      .chatbot-typing-dot:nth-child(2) {
        animation-delay: 0.2s;
      }
      
      .chatbot-typing-dot:nth-child(3) {
        animation-delay: 0.4s;
      }
      
      @keyframes typing-animation {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-4px);
        }
      }
      
      /* Input Alanı */
      .chatbot-input-form {
        display: flex;
        padding: 12px;
        border-top: 1px solid #e5e7eb;
      }
      
      .chatbot-input-field {
        flex: 1;
        padding: 8px 12px;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        outline: none;
        font-size: 14px;
      }
      
      .chatbot-input-field:focus {
        border-color: #7b66ff;
        box-shadow: 0 0 0 2px rgba(123, 102, 255, 0.1);
      }
      
      .chatbot-send-button {
        background-color: #7b66ff;
        color: white;
        border: none;
        border-radius: 8px;
        margin-left: 8px;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      
      .chatbot-send-button:hover {
        background-color: #6a57d9;
      }
      
      .chatbot-send-button:disabled {
        background-color: #d1d5db;
        cursor: not-allowed;
      }
      
      /* Yanıt Edilirken Butonu Devre Dışı Bırakma */
      .chatbot-input-form.disabled input,
      .chatbot-input-form.disabled button {
        opacity: 0.5;
        pointer-events: none;
      }
      
      /* Linkler */
      .chatbot-bubble a {
        color: #3b82f6;
        text-decoration: underline;
      }
      
      .chatbot-message.user .chatbot-bubble a {
        color: #e5e7eb;
      }
      
      /* Mobil için Duyarlı Tasarım */
      @media (max-width: 768px) {
        .chatbot-window {
          width: calc(100vw - 40px);
          height: 60vh;
          right: 0;
        }
      }
      
      /* Animasyonlar */
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      /* Formatlanmış içerik stilleri */
      .chatbot-bubble p {
        margin: 0 0 8px 0;
      }
      
      .chatbot-bubble p:last-child {
        margin-bottom: 0;
      }
      
      .chatbot-bubble .list-item {
        display: block;
        padding-left: 12px;
        margin-bottom: 4px;
      }
      
      .chatbot-bubble .emoji {
        font-size: 1.2em;
        display: inline-block;
        vertical-align: middle;
        margin: 0 2px;
      }
    `;
    document.head.appendChild(styleElement);
    
    // Font Awesome'ı ekle (eğer yoksa)
    if (!document.querySelector('link[href*="fontawesome"]')) {
      const fontAwesomeLink = document.createElement('link');
      fontAwesomeLink.rel = 'stylesheet';
      fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
      document.head.appendChild(fontAwesomeLink);
    }
  }
  
  // Chatbot için HTML yapısını ekle
  function addChatbotHTML() {
    const chatbotContainer = document.createElement('div');
    chatbotContainer.className = 'chatbot-container';
    
    chatbotContainer.innerHTML = `
      <button class="chatbot-toggle" aria-label="Chatbot'u aç/kapat">
        <i class="fas fa-robot"></i>
      </button>
      
      <div class="chatbot-window">
        <div class="chatbot-header">
          <div class="chatbot-header-icon">
            <i class="fas fa-robot"></i>
          </div>
          <div class="chatbot-header-title">
            <h3>ShineSteps Yardım</h3>
            <p>Sizlere nasıl yardımcı olabilirim?</p>
          </div>
          <button class="chatbot-close" aria-label="Chatbot'u kapat">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="chatbot-messages" id="chatbot-messages">
          <!-- Mesajlar buraya eklenecek -->
        </div>
        
        <form class="chatbot-input-form" id="chatbot-form">
          <input 
            type="text" 
            class="chatbot-input-field"
            id="chatbot-input" 
            placeholder="Mesajınızı yazın..." 
            aria-label="Mesajınızı yazın"
             autocomplete="off"
          >
          
          <button 
            type="submit" 
            class="chatbot-send-button" 
            id="chatbot-send" 
            aria-label="Gönder"
          >
            <i class="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    `;
    
    document.body.appendChild(chatbotContainer);
  }
  
  // Olay dinleyicilerini ayarla
  function setupEventListeners() {
    // DOM elementlerini bul
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotForm = document.getElementById('chatbot-form');
    
    // Elementlerin varlığını kontrol et
    if (!chatbotToggle || !chatbotClose || !chatbotWindow || !chatbotInput || !chatbotForm) {
      console.error('[Chatbot] DOM elementleri bulunamadı');
      return;
    }
    
    // Toggle butonu ile chatbot'u aç/kapat
    chatbotToggle.addEventListener('click', () => {
      chatbotWindow.classList.toggle('active');
      // Aktifse inputa odaklan
      if (chatbotWindow.classList.contains('active')) {
        setTimeout(() => chatbotInput.focus(), 300);
      }
    });
    
    // Kapat butonu ile chatbot'u kapat
    chatbotClose.addEventListener('click', () => {
      chatbotWindow.classList.remove('active');
    });
    
    // Mesaj gönderme
    chatbotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSubmit();
    });
  }
  
  // Yerel bilgi tabanı
  const knowledgeBase = {
    'shinesteps': 'ShineSteps, kişisel gelişim yolculuğunuzu izlemek ve organize etmek için tasarlanmış bir görev ve hedef yönetimi uygulamasıdır. Görevlerinizi ekleyebilir, kategorilere ayırabilir, zamanlayıcı ile çalışabilir ve tamamladıkça rozetler kazanabilirsiniz. Günlük, haftalık ve toplam ilerlemelerinizi istatistiklerle görebilirsiniz. Gelişiminizi ölçerek motivasyonunuzu arttırmak için tasarlanmıştır. 🌟',
    'görev': 'Görev eklemek için ana sayfadaki "Yeni Görev Ekle" formunu kullanabilirsiniz. Görev başlığı, açıklaması, kategorisi ve önceliğini belirleyerek yeni görev oluşturabilirsiniz. Görevlerinizi tamamladığınızda başarı rozetleri kazanabilirsiniz! 📝✅',
    'tamamla': 'Görevleri tamamlamak için görev kartı üzerindeki "Tamamla" butonuna tıklayabilirsiniz. İsterseniz zamanlayıcı ile çalışarak tamamlayabilirsiniz. Tamamlanan görevler, başarılarınıza eklenir ve istatistiklerinizi iyileştirir. 🏆',
    'sil': 'Bir görevi silmek istiyorsanız, görev kartının sağ üst köşesindeki "Sil" butonuna tıklayabilirsiniz. Silinen görevler geri alınamaz, bu yüzden dikkatli olun!',
    'kategori': 'ShineSteps\'te görevlerinizi 5 farklı kategoride organize edebilirsiniz: Eğitim 📚, Spor/Sağlık 🏃‍♂️, Kariyer 💼, Kişisel Gelişim 🌱 ve Hobi 🎨. Her kategorideki ilerlemeniz ayrı ayrı takip edilir.',
    'öncelik': 'Görevlerinize 3 farklı öncelik atayabilirsiniz: Yüksek 🔴, Orta 🟠 ve Düşük 🟢. Bu öncelik seviyeleri, görevlerinizi önem sırasına göre organize etmenize yardımcı olur. Yüksek öncelikli görevler listenin en üstünde görünür.',
    'rozet': 'ShineSteps\'te 5 farklı rozet kazanabilirsiniz:\n1. İlk Görev ⭐: İlk görevinizi tamamladığınızda kazanılır.\n2. 5 Görev 🏅: 5 görev tamamlandığında kazanılır.\n3. 3 Günlük Seri 🔥: Üst üste 3 gün görev tamamladığında kazanılır.\n4. Kategorilerde Uzman 🧩: Her kategoride en az bir görev tamamladığında kazanılır.\n5. Öncelik Ustası ⚡: 5 yüksek öncelikli görev tamamladığında kazanılır.',
    'istatistik': 'İstatistikler bölümünde günlük, haftalık ve toplam ilerlemenizi görebilirsiniz. Tamamlanan görevler, kategoriye göre dağılım ve çalışma seriniz burada görüntülenir. İstatistikleriniz otomatik olarak güncellenir. 📊',
    'zamanlayıcı': 'Görevlerinizi tamamlarken Pomodoro benzeri zamanlayıcı kullanabilirsiniz. Görev kartındaki zamanlayıcı simgesine tıklayarak başlatabilirsiniz. Zamanlayıcı ile çalışmak, verimli zaman yönetimi sağlar. ⏱️',
    'merhaba': 'Merhaba! 👋 Ben ShineBot, ShineSteps uygulamasında size yardımcı olmak için buradayım. Görevler, kategoriler, zamanlayıcı ve rozetler hakkında bilgi alabilirsiz. Nasıl yardımcı olabilirim?',
    'selam': 'Selam! 😊 ShineSteps görev yönetimi uygulamasına hoş geldiniz. Size nasıl yardımcı olabilirim?',
    'nasılsın': 'Teşekkürler, ben her zaman harikayım! Size ShineSteps hakkında nasıl yardımcı olabilirim? 🤖',
    'teşekkür': 'Rica ederim! 😊 Başka bir konuda yardıma ihtiyacınız olursa buradayım. Verimli çalışmalar dilerim!',
    'yardım': 'Size aşağıdaki konularda yardımcı olabilirim:\n• Görevlerin eklenmesi ve yönetimi 📝\n• Kategoriler ve öncelikler 📊\n• Zamanlayıcı kullanımı ⏱️\n• Rozetler ve başarılar 🏆\n• İstatistikler ve ilerleme takibi 📈\nHangi konuda bilgi almak istersiniz?',
    'başarı': 'ShineSteps\'teki başarılarınız "Başarılarım" sekmesinde görüntülenir. Burada tamamladığınız görevler, kazandığınız rozetler ve genel ilerlemenizi görebilirsiniz. İlerledikçe yeni rozetler kazanabilirsiniz! 🏆',
    'rapor': 'Raporlar bölümünde günlük ve haftalık aktivitelerinizi görebilirsiniz. Eklenen ve tamamlanan görevlerin sayısı, tamamlanma oranı ve kategori dağılımı burada görüntülenir. Bu veriler ilerlemenizi takip etmenize yardımcı olur. 📊',
    'veri': 'Verileriniz yerel depolamada (localStorage) saklanır ve tamamen gizlidir. Bu veriler sadece sizin tarayıcınızda tutulur, herhangi bir sunucuya gönderilmez. Uygulamayı farklı bir tarayıcıda veya bilgisayarda kullanırsanız, verileriniz orada görünmez.',
    'uygulama': 'ShineSteps, kişisel gelişiminizi ve görevlerinizi takip etmek için tasarlanmış bir görev yönetimi uygulamasıdır. Görevler ekleyebilir, tamamlayabilir, zamanlayıcı kullanabilir ve başarılarınızı takip edebilirsiniz. Tamamen ücretsizdir ve verileriniz yerel olarak saklanır.',
    'hedef': 'ShineSteps\'te belirli hedeflere ulaşmak için görevler oluşturabilirsiniz. Örneğin, her gün 30 dakika kitap okumak gibi. Görevlerinizi kategorilere ayırıp öncelik belirleyerek hedeflerinize daha organize şekilde ilerleyebilirsiniz. Hedeflerinize ulaştıkça rozetler kazanırsınız!',
    'nedir': 'ShineSteps, kişisel gelişim yolculuğunuzu izlemek ve organize etmek için tasarlanmış bir görev ve hedef yönetimi uygulamasıdır. Görevlerinizi ekleyebilir, kategorilere ayırabilir, zamanlayıcı ile çalışabilir ve tamamladıkça rozetler kazanabilirsiniz. Günlük, haftalık ve toplam ilerlemelerinizi istatistiklerle görebilirsiniz. 🌟',
    'başarılarım': 'Başarılarım bölümü, tamamladığınız görevleri ve kazandığınız rozetleri gösterir. Tamamladığınız her görev, ilerleme kaydetmenize ve yeni rozetler kazanmanıza yardımcı olur. Seri halinde görev tamamlama, farklı kategorilerde çalışma ve yüksek öncelikli görevleri bitirme gibi başarılar elde edebilirsiniz. 🏆',
    'github': 'ShineSteps\'in kaynak kodu GitHub\'da bulunmaktadır. Proje açık kaynaklıdır ve https://github.com/iamazra03/ShineSteps adresinden erişebilirsiniz. 👩‍💻',
    'azra': 'Azra Cengiz, ShineSteps uygulamasının geliştiricisidir. GitHub\'da iamazra03 kullanıcı adıyla bulabilirsiniz. 👩‍💻'
  };
  
  // Mesaj gönderme işlemi
  async function handleSubmit() {
    const chatbotInput = document.getElementById('chatbot-input');
    if (!chatbotInput) {
      console.error('[Chatbot] Input alanı bulunamadı');
      return;
    }
    
    const userMessage = chatbotInput.value.trim();
    if (!userMessage) return;
    
    // Kullanıcı mesajını ekle
    addUserMessage(userMessage);
    
    // Input'u temizle
    chatbotInput.value = '';
    
    // Input'u devre dışı bırak
    disableInput(true);
    
    // "Yazıyor..." göstergesini ekle
    addTypingIndicator();
    
    try {
      // Yerel yanıt alma işlemi
      const response = getLocalResponse(userMessage);
      
      // Gerçekçi yazma süresi simüle et
      const typingDuration = Math.min(1500, 800 + response.length * 5);
      await new Promise(resolve => setTimeout(resolve, typingDuration));
      
      // "Yazıyor..." göstergesini kaldır
      removeTypingIndicator();
      
      // Bot yanıtını ekle
      addBotMessage(response);
      
    } catch (error) {
      console.error('[Chatbot] Yanıt üretme hatası:', error);
      
      // "Yazıyor..." göstergesini kaldır
      removeTypingIndicator();
      
      // Hata mesajı ekle
      addErrorMessage('Üzgünüm, bir sorun oluştu. Lütfen tekrar deneyin.');
    } finally {
      // Input'u tekrar etkinleştir
      disableInput(false);
      
      // Mesaj alanını en alta kaydır
      scrollToBottom();
    }
  }
  
  // Yerel yanıt bulma fonksiyonu
  function getLocalResponse(message) {
    const lowercaseMessage = message.toLowerCase();
    
    // Anahtar kelimeleri kontrol et
    for (const keyword in knowledgeBase) {
      if (lowercaseMessage.includes(keyword)) {
        return knowledgeBase[keyword];
      }
    }
    
    // Herhangi bir eşleşme bulunamazsa
    return "Üzgünüm, bu konuda bilgim yok. Size görevler, kategoriler, öncelikler, zamanlayıcı, rozetler veya istatistikler hakkında yardımcı olabilirim.";
  }
  
  // Kullanıcı mesajı ekle
  function addUserMessage(text) {
    const messagesContainer = document.getElementById('chatbot-messages');
    if (!messagesContainer) {
      console.error('[Chatbot] Mesaj konteyneri bulunamadı');
      return;
    }
    
    const messageElement = document.createElement('div');
    messageElement.className = 'chatbot-message user';
    
    messageElement.innerHTML = `
      <div class="chatbot-avatar user">
        <i class="fas fa-user"></i>
      </div>
      <div class="chatbot-bubble">
        ${formatMessageText(text)}
      </div>
    `;
    
    messagesContainer.appendChild(messageElement);
    scrollToBottom();
  }
  
  // Bot mesajı ekle
  function addBotMessage(text) {
    const messagesContainer = document.getElementById('chatbot-messages');
    if (!messagesContainer) {
      console.error('[Chatbot] Mesaj konteyneri bulunamadı');
      return;
    }
    
    const messageElement = document.createElement('div');
    messageElement.className = 'chatbot-message';
    
    messageElement.innerHTML = `
      <div class="chatbot-avatar bot">
        <i class="fas fa-robot"></i>
      </div>
      <div class="chatbot-bubble">
        ${formatMessageText(text)}
      </div>
    `;
    
    messagesContainer.appendChild(messageElement);
    scrollToBottom();
  }
  
  // Hata mesajı ekle
  function addErrorMessage(text) {
    const messagesContainer = document.getElementById('chatbot-messages');
    if (!messagesContainer) {
      console.error('[Chatbot] Mesaj konteyneri bulunamadı');
      return;
    }
    
    const messageElement = document.createElement('div');
    messageElement.className = 'chatbot-message error';
    
    messageElement.innerHTML = `
      <div class="chatbot-avatar error">
        <i class="fas fa-exclamation-triangle"></i>
      </div>
      <div class="chatbot-bubble">
        ${formatMessageText(text)}
      </div>
    `;
    
    messagesContainer.appendChild(messageElement);
    scrollToBottom();
  }
  
  // Yazıyor indikatörü ekle
  function addTypingIndicator() {
    const messagesContainer = document.getElementById('chatbot-messages');
    if (!messagesContainer) {
      console.error('[Chatbot] Mesaj konteyneri bulunamadı');
      return;
    }
    
    // Zaten varsa ekleme
    if (document.querySelector('.chatbot-message.typing')) {
      return;
    }
    
    const typingElement = document.createElement('div');
    typingElement.className = 'chatbot-message typing';
    
    typingElement.innerHTML = `
      <div class="chatbot-avatar bot">
        <i class="fas fa-robot"></i>
      </div>
      <div class="chatbot-bubble chatbot-typing">
        <div class="chatbot-typing-dot"></div>
        <div class="chatbot-typing-dot"></div>
        <div class="chatbot-typing-dot"></div>
      </div>
    `;
    
    messagesContainer.appendChild(typingElement);
    scrollToBottom();
  }
  
  // Yazıyor indikatörünü kaldır
  function removeTypingIndicator() {
    const typingElement = document.querySelector('.chatbot-message.typing');
    if (typingElement) {
      typingElement.remove();
    }
  }
  
  // Mesaj metnini formatla
  function formatMessageText(text) {
    if (!text) return '';
    
    // Satır sonlarını HTML'e çevir
    let formattedText = text.replace(/\n/g, '<br>');
    
    // URL'leri bağlantıya çevir
    formattedText = formattedText.replace(
      /(https?:\/\/[^\s]+)/g, 
      '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    );
    
    // İncelemeleri vurgula (1-5 yıldız)
    formattedText = formattedText.replace(
      /(\d ?(yıldız|puan|star))/gi,
      '<span class="emoji">⭐</span>$1'
    );
    
    // Liste elemanlarını formatla
    formattedText = formattedText.replace(
      /^[•\-*]\s(.*)/gm,
      '<span class="list-item">• $1</span>'
    );
    
    return formattedText;
  }
  
  // Mesaj alanını en alta kaydır
  function scrollToBottom() {
    const messagesContainer = document.getElementById('chatbot-messages');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }
  
  // Input alanını etkinleştir/devre dışı bırak
  function disableInput(disabled) {
    const chatbotForm = document.getElementById('chatbot-form');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    
    if (!chatbotForm || !chatbotInput || !chatbotSend) {
      console.error('[Chatbot] Input elemanları bulunamadı');
      return;
    }
    
    if (disabled) {
      chatbotForm.classList.add('disabled');
      chatbotInput.disabled = true;
      chatbotSend.disabled = true;
    } else {
      chatbotForm.classList.remove('disabled');
      chatbotInput.disabled = false;
      chatbotSend.disabled = false;
      chatbotInput.focus();
    }
  }
  
  // Sayfada script yüklendiğinde chatbot'u başlat
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initializeChatbot();
  } else {
    document.addEventListener('DOMContentLoaded', initializeChatbot);
  }
})();

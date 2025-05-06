# Shine-Steps
A self-help guide written in html css and js.
# ✨ ShineSteps - Kişisel Görev ve Gelişim Takibi

ShineSteps, kişisel gelişim yolculuğunuzu organize etmenize ve takip etmenize yardımcı olan bir görev yönetim uygulamasıdır. Görevlerinizi kategorilere ayırabilir, önceliklendirebilir, zamanlayıcı ile çalışabilir ve tamamladıkça rozetler kazanabilirsiniz.

## 🌟 Özellikler

- **Görev Yönetimi**: Görevler ekleyin, düzenleyin ve tamamlayın
- **Kategoriler**: Görevlerinizi 5 farklı kategoride organize edin (Eğitim, Spor/Sağlık, Kariyer, Kişisel Gelişim, Hobi)
- **Öncelik Seviyeleri**: Görevlerinizi önem sırasına göre yüksek, orta ve düşük olarak önceliklendirin
- **Zamanlayıcı**: Görevler üzerinde çalışırken zamanlayıcı kullanın
- **Başarı Rozetleri**: İlerlemenize bağlı olarak çeşitli rozetler kazanın
- **İstatistikler**: Günlük, haftalık ve toplam ilerlemenizi takip edin
- **Yerel Depolama**: Tüm verileriniz tarayıcınızda yerel olarak saklanır
- **ShineBot Asistanı**: Uygulamanın kullanımıyla ilgili sorularınızı yanıtlayan AI destekli chatbot

## 🔍 Rozet Sistemi

ShineSteps'te aşağıdaki rozetleri kazanabilirsiniz:

1. **İlk Görev**: İlk görevinizi tamamladığınızda kazanılır
2. **5 Görev**: 5 görev tamamlandığında kazanılır
3. **3 Günlük Seri**: Üst üste 3 gün görev tamamladığında kazanılır
4. **Kategorilerde Uzman**: Her kategoride en az bir görev tamamladığında kazanılır
5. **Öncelik Ustası**: 5 yüksek öncelikli görev tamamladığında kazanılır

## 💬 ShineBot Yardım Asistanı

ShineBot, uygulama içinde size yardımcı olmak için tasarlanmış AI destekli bir chatbot asistanıdır. Görevler, kategoriler, zamanlayıcı, rozetler ve diğer özellikler hakkında sorularınızı yanıtlar.

- OpenAI API ile güçlendirilmiştir
- İnternet bağlantısı olmadığında veya API limitlerine ulaşıldığında yerel bilgi tabanına geçiş yapar

## 🔧 Kurulum

1. Depoyu klonlayın:
   ```
   git clone https://github.com/kullaniciadi/shinesteps.git
   ```

2. İndex.html dosyasını bir web tarayıcısında açın veya bir web sunucusu üzerinden servis edin.

3. AI asistanı özelliğini kullanmak için `.env` dosyası oluşturun ve OpenAI API anahtarınızı ekleyin:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

## 📝 Kullanım

- Ana sayfadaki form aracılığıyla yeni görevler ekleyin
- Görevleri tamamlamak için "Tamamla" butonuna tıklayın veya zamanlayıcı kullanın
- "Başarılarım" sekmesinde kazandığınız rozetleri görüntüleyin
- "Raporlar" sekmesinde genel ilerlemenizi takip edin
- Sağ alt köşedeki robot simgesine tıklayarak ShineBot'a erişin

## 🔒 Veri Gizliliği

Tüm verileriniz tarayıcınızın yerel depolama alanında (localStorage) saklanır ve hiçbir şekilde harici sunuculara gönderilmez.

## 📄 Lisans

[MIT Lisansı](LICENSE) altında dağıtılmaktadır.

---

Designed and developed by [Azra Cengiz](https://github.com/iamazra03) © 2025 ShineSteps | Tüm Hakları Saklıdır

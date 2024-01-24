
# Balıkesir Üniversitesi OBS Not Botu


Aşağıda yer alan örnek kodlar ile baun obs üzerinden not sayfanızın verilerini çekebilirsiniz. Her 30 saniyede bir çekecek şekilde tasarlanmıştır özellik ekleyip PR açarsanız kabul edeceğim.


## Nasıl Kullanılır?

- Projeyi masaüstünüze klonlayın
- npm & yarn install komutu ile proje bağımlılıklarını indirin.
- .env dosyası içerisinde yer alan verileri sağlayın (aşağıda nasıl yapılacağı anlatılmıştır.)
- npm run dev komutu ile çalışmayı başlatabilirsiniz.

  
## .ENV Değerlerine nasıl ulaşabilirim.

OBS Ana sayfasına giriş yaptıktan sonra F12 ile tarayıcı developer consoleyi aktif edin işaretlenen network kısmına gelin. All seçeneğinin işaretli olduğundan emin olun. Sol tarafta yer alan istekler kısmında işaretlenen isteği bulun. Headers kısmında gerekli olan tüm kaynaklara sahip olacaksınız.

  

![Logo](https://i.ibb.co/KFLx1vY/Screenshot-from-2024-01-24-23-32-50.jpg)

    
## Dikkat Edilmesi Gerekenler

Eğer 5 dakika boyunca tekrar istek yapmazsanız OBS session verinizi iptal edecektir bu yüzden tekrar verilere ulaşamayacaksınız.



  
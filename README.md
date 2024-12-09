
# Balıkesir Üniversitesi OBS Not Botu


Aşağıda yer alan örnek kodlar ile baun obs üzerinden not sayfanızın verilerini çekebilirsiniz. Her 30 saniyede bir çekecek şekilde tasarlanmıştır özellik ekleyip PR açarsanız kabul edeceğim.


## Nasıl Kullanılır?

- Projeyi masaüstünüze klonlayın
- npm & yarn install komutu ile proje bağımlılıklarını indirin.
- .env dosyası içerisinde yer alan verileri sağlayın (aşağıda nasıl yapılacağı anlatılmıştır.)
- npm run dev komutu ile çalışmayı başlatabilirsiniz.

  
## .ENV Değerlerine nasıl ulaşabilirim.

OBS Ana sayfasına giriş yaptıktan sonra F12 ile tarayıcı developer consoleyi aktif edin işaretlenen network kısmına gelin. All seçeneğinin işaretli olduğundan emin olun. Ardından Not listesi sayfasını ziyaret etin, Sol tarafta yer alan istekler kısmında işaretlenen isteği bulun. Headers kısmında gerekli olan tüm kaynaklara sahip olacaksınız.

Buradan request verification token ve session id degerini alin. .ENV'de gerekli yerlere yapistirin.

  

![Logo](https://i.ibb.co/NsQHFRK/2024-12-09-23-20.png)

    
## Dikkat Edilmesi Gerekenler

Eğer 5 dakika boyunca tekrar istek yapmazsanız OBS session verinizi iptal edecektir bu yüzden tekrar verilere ulaşamayacaksınız.



  

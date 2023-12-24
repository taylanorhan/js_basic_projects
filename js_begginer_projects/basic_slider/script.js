var models = [
    {
        name : 'Bmw 418d',
        image : 'img/bmw.jpg',
        link : 'http://www.arabalar.com.tr/bmw/4-serisi/2018/418d-2-0-gran-coupe'
    },
    {
        name : 'Mazda CX-3',
        image : 'img/mazda.jpg',
        link : 'http://www.arabalar.com.tr/mazda/cx-3/2017/1-5-sky-d-motion'
    },
    {
        name : 'Volvo S60',
        image : 'img/volvo.jpg',
        link : 'http://www.arabalar.com.tr/volvo/s60/2018/1-5-t3-advance'
    },
    {
        name : 'Skoda Superb',
        image : 'img/skoda.jpg',
        link : 'http://www.arabalar.com.tr/skoda/superb/2018/1-4-tsi-active'
    },
    {
        name : 'Honda Civic',
        image : 'img/honda.jpg',
        link : 'http://www.arabalar.com.tr/honda/civic/2018/1-6-elegance'
    }
];
//indexler 0 dan başlasın
var index = 0;
//slaytcount parametresini model dizisinin toplam elemanı kadar işle
var slaytCount = models.length;
var interval;

var settings={
    //kullanıcı herhangi ok tuşuna basmassa 2 saniyede bir oto resimleri geç
    duration : '2000',
    //resimleri random deği sırası ile geç
    random : false
};

init(settings);
//sol oka bastığında bir tane azaltıp azalan indexteki nesneyi print eder 
document.querySelector('.fa-arrow-circle-left').addEventListener('click',function(){
    index--;
    showSlide(index);
    console.log(index);
});
//sağ oka bastığında bir tane azaltıp azalan indexteki nesneyi print eder 
document.querySelector('.fa-arrow-circle-right').addEventListener('click',function(){
    index++;
    showSlide(index);
    console.log(index);    
});
// Tüm '.arrow' sınıfına sahip öğeleri seçiyoruz ve her biri için aşağıdaki işlemleri yapıyoruz:
document.querySelectorAll('.arrow').forEach(function(item){
    // Fare bu öğenin üzerine gelirse...
    item.addEventListener('mouseenter', function(){
        // Zamanlayıcıyı durduruyoruz, böylece slayt geçişi durur.
        clearInterval(interval);
    })
});

// Aynı '.arrow' öğelerini tekrar seçiyoruz ve her biri için aşağıdaki işlemleri yapıyoruz:
document.querySelectorAll('.arrow').forEach(function(item){
    // Fare bu öğeden çıkarsa...
    item.addEventListener('mouseleave', function(){
        // 'init' fonksiyonunu çağırarak slayt gösterisini başlatıyoruz. 
        // 'settings' değişkeni içindeki ayarları kullanarak yeniden başlıyoruz.
        init(settings);
    })
})




function init(settings){

    var prev; // Bir önceki slayt indeksi için değişken tanımlıyoruz.
    interval = setInterval(function(){
        
        if(settings.random){
            // Eğer ayarlar rastgele slayt gösterimini istiyorsa:
            // Rastgele bir slayt indeksi seç ve önceki indeksle aynı olmadığından emin olana kadar tekrar et.
            do{
                index = Math.floor(Math.random() * slaytCount); // Slayt sayısı içinde rastgele bir indeks seçiyoruz.
            } while(index == prev) // Eğer seçilen indeks bir önceki indekse eşitse, yeni bir indeks seçiyoruz.
            prev = index; // Seçilen indeksi önceki indeks olarak kaydediyoruz.
        } else {
            // Eğer ayarlar sıralı slayt gösterimini istiyorsa:
            // Slayt indeksini artırıyoruz, eğer son slayta gelinmişse ilk slayta geri dönüyoruz.
            if(slaytCount == index+1){
                index = -1; // Eğer indeks son slayta eşitse, ilk slayta geri dönüyoruz.
            }
            showSlide(index); // Gösterilecek slaytı göstermek için 'showSlide' fonksiyonunu çağırıyoruz.
            console.log(index); // Konsola güncel indeksi yazdırıyoruz.
            index++; // Slayt indeksini bir sonraki slayta geçmek için arttırıyoruz.
        }
        showSlide(index); // Gösterilecek slaytı göstermek için 'showSlide' fonksiyonunu çağırıyoruz.

    }, settings.duration) // Belirtilen süre aralığında bu işlemi tekrar et.
}



//showslide adında fonksyon tanımladık dışardan index aldık
function showSlide(i){

    index = i;
/* Sol oku kullanarak 0. indexe geldik bu kod blouğunu yazmadan 
çalıştırsak sistem hata verir -1. index olmadığı için bu kod ile 
en başa yani 4.indexte bulunan elemana gideriz  */
    if (i<0) {
        index = slaytCount - 1;
    }
    /* max 4 index var 4 ten sonra sağ oka basarsak 5.index olmadığından
    hata verir bu 4 ten sonra başa döndürmeyi sağlar  */
    if(i >= slaytCount){
        index =0;
    }
    //card title classını model listesindeki elemanların ismine göre güncelle 
    document.querySelector('.card-title').textContent = models[index].name;
    //card-img-top classını model listesindeki elemanların srcde bulunan resimlerine  göre güncelle 
    document.querySelector('.card-img-top').setAttribute('src',models[index].image);
    /*card-link classını model listesindeki elemanların href üzerindeki linklerine göre güncelle
    sitedeki linklerine aktarır  */
    document.querySelector('.card-link').setAttribute('href',models[index].link);
}




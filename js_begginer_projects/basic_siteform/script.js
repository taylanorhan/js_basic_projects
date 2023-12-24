//Form elemanlarını HTML'den al
const form = document.getElementById('form'); // formu seç
const username = document.getElementById('username'); // kullanıcı adı alanını seç
const email = document.getElementById('email'); // email alanını seç
const password = document.getElementById('password'); // parola alanını seç
const repassword = document.getElementById('repassword'); // parola tekrar alanını seç

//
// Hata ve başarı durumlarını işaretlemek için fonksiyonlar
function error(input, message) {
    input.className = 'form-control is-invalid'; // hatalı durumu işaretleyen sınıfı ekle
    const div = input.nextElementSibling; // hata mesajı için bir 'div' oluştur
    div.innerText = message; // hata mesajını 'div'e ekle
    div.className = 'invalid-feedback'; // hata mesajı için sınıf ekle
}

function success(input) {
    input.className = 'form-control is-valid'; // başarılı durumu işaretleyen sınıfı ekle
}

// Emaili kontrol etmek için düzenli ifade (regular expression) kullan
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(input.value)) {
        success(input); // email geçerliyse başarılı durumu işaretle
    } else {
        error(input, 'hatalı bir mail adresi'); // değilse hata mesajı göster
    }
}

// Zorunlu alanları kontrol et
function checkRequired(inputs) {
    inputs.forEach(function (input) {
        if (input.value === '') {
            error(input, `${input.id} is required.`); // boşsa hata mesajı göster
        } else {
            success(input); // doluysa başarılı durumu işaretle
        }
    });
}

// Karakter uzunluğunu kontrol et
function checkLength(input, min, max) {
    if (input.value.length < min) {
        error(input, `${input.id} en az ${min} karakter olmalıdır`); // minimum uzunluğu kontrol et
    } else if (input.value.length > max) {
        error(input, `${input.id} en fazla ${max} karakter olmalıdır`); // maksimum uzunluğu kontrol et
    } else {
        success(input); // belirtilen aralıkta ise başarılı durumu işaretle
    }
}

// Parolaların eşleşip eşleşmediğini kontrol et
function checkPasswords(input1, input2) {
    if (input1.value !== input2.value) {
        error(input2, 'Parolalar eşleşmiyor'); // eşleşmiyorsa hata mesajı göster
    }
}

// Telefon numarasını kontrol et
function checkPhone(input) {
    var exp = /^\d{10}$/;
    if (!exp.test(input.value))
        error(input, 'Telefon 10 karakterli olmalıdır.'); // belirtilen formata uymuyorsa hata mesajı göster
}

// Form gönderimini kontrol et ve doğrulama işlemlerini yap
form.addEventListener('submit', function (e) {
    e.preventDefault(); // formun otomatik gönderimini engelle

    checkRequired([username, email, password, repassword, phone]); // zorunlu alanları kontrol et
    checkEmail(email); // email doğruluğunu kontrol et
    checkLength(username, 7, 15); // kullanıcı adı uzunluğunu kontrol et
    checkLength(password, 7, 12); // parola uzunluğunu kontrol et
    checkPasswords(password, repassword); // parolaların eşleşip eşleşmediğini kontrol et
    checkPhone(phone); // telefon numarasını kontrol et
});

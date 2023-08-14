
# Restful Api

Node js ve mysql kullanılarak hazırlanmış bir Restful Api'dir.


## Yetenekleri

Verilen kriterlere göre siparişler oluşturur, stok kontrolü sağlar.

4 adet içerikten oluşan çok satan listesi oluşturur.

Kampanyalar oluşturur.

Var olan kampanyaları siparişlere uygular ve kontrolünü sağlar.

Kullanıcı girişi ile sipariş detayı görüntüler.

Docker ile ayağa kaldırılmaya uygundur.


 


#### Kullanımı

```http
  docker-compose up 
```



```http
  docker-compose down
```


#### Çalışan Containerlar aynı Networkte çalışmazlar ise 

```http
docker network prune
docker network inspect restapi_default
```
bu komut ile Containerlar aynı networke taşınabilir. ve buradaki gateway DATABASE HOST için kullanılabilir.

  ## API Kullanımı
1. Sırasıyla 

    http://localhost:3000//createtables/products

    http://localhost:3000//createtables/orders

    http://localhost:3000//createtables/campaign

    Adreslerine boş Get isteği atılarak boş tablolar oluşturulur.

2. Sırasıyla 
     
     Yine aynı adrreslere:
     
             products adresi için:  "Case_Products.json" içeriği bodyden gönderilir ve database doldurulur.
             orders adresi için: "orderexample.json" bodyden gönderilir ve database doldurulur.
             campaign adresi için: "campaignexample.json" bodyden gönderilir ve database doldurulur.
             

http://localhost:3000/ Ençok satılan 4 ürünü gettirir.

http://localhost:3000/allbooks Tüm ürünleri ve bilgilerini getirir.

       POST  http://localhost:3000/orders  Örnek sipariş şemasıyla stoklar çerçevesinde sipariş verilebilir. sipariş sonunda dönen Respons içerisinde Sipariş ID'di bulunmaktadır.
            bu ID ise lokal olarak tanımlanmış username ve password değişkenlerinin 
        GET  http://localhost:3000/order/ID adrresine bodyden gönerilmesiyle adres üzerinde ID'ye ait sipariş detayları görüntülenir.

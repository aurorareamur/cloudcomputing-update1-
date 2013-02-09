var databaseUrl = "localhost/datakorban";
var collections = ["datakorban"];
var db = require("mongojs").connect(databaseUrl, collections);

// cari korban
db.datakorban.find({nama: "Kasma"}, function(err, datakorban) {
  if( err || !datakorban) console.log("Tidak ada korban bencana alam  bernama Kasma");
  else datakorban.forEach( function(emps) {
    console.log(emps);
  });
});

// simpan data korban baru
db.datakorban.save({nama : "Kasmawati", asal : "Sulawesi", thn_lahir : "1991", kondisi : "sehat"}, function(err, saved) {
  if( err || !saved ) console.log("Korban 'Kasmawati' gagal disimpan");
  else console.log("Korban nama 'Kasma' tersimpan");
});

// update data korban
db.datakorban.update({nama : "Raras"}, {$set: {asal: "Purworejo"}}, function(err, updated) {
  if( err || !updated ) console.log("Data 'Raras' gagal diperbaharui");
  else console.log("Data 'Raras' berhasil diperbaharui");
});

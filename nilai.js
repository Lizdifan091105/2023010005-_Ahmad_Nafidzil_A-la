function tampil(){
     // mendapatkan nilai dari html
let nomernim=document.getElementById("nim").value;
let namamahasiwa= document.getElementById("nama").value;
let matkul1 =document.getElementById("matkul").value
let nilai =parseFloat(document.getElementById("nilaiakhir").value)

let x
let y
let ket


if (nilai>=85&&nilai<=100){
    x ="A"
    y =4.00
    ket="selamat nilai kamu Memuaskan"
}
if (nilai>=79&&nilai<=84){
    x ="A-"
     y =3.67
     ket="sangat Memuaskan"
}
if (nilai>=74&&nilai<=78){
     x ="B+"
     y =3.33
     ket="sangat Memuaskan"
}
if (nilai>=69&&nilai<=73){
     x ="B"
     y =3.00
     ket=" Memuaskan"
}
if (nilai>=64&&nilai<=68){
    x ="B-"
    y =2.67
    ket=" Memuaskan"
}
if (nilai>=59&&nilai<=63){
    x ="C+"
     y =2.33
    ket="-"
}
if (nilai>=54&&nilai<=58){
     x ="C"
     y =2.00
    ket="-"
}
if (nilai>=41&&nilai<=53){
     x ="D"
     y =1.00
     ket="-"
}
if (nilai>=0&&nilai<=40){
     x ="E"
     y =0.00
     ket="-"
}
if (nilai<=-1||nilai>=101){
     x= "input Tidak Valid"
     y= "input Tidak Valid"
     ket= "input Tidak Valid"
}
let hasilakhir1=`
<h3>Hasil</h3>
<p>  Nama Mahasiswa = ${namamahasiwa}</p>
<p>  NIM = ${nomernim}</p>
<p>  Mata Kuliah = ${matkul1}</p>
<p>  Nilai Akhir = ${nilai}</p>
<p>  Nilai Huruf = ${x}</p>
<p>  Indeks Nilai = ${y}</p>
<p>Keterangan = ${ket}</p>`
document.getElementById("hasilakhir").innerHTML= hasilakhir1;
}


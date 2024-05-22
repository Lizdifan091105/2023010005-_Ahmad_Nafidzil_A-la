function functionType(from = Number  ,text =String ){
    document.write(`<P>${from +'.'+text}</P>`)
}
let hari = [ "Nama Hari :","Senin ","Selasa","Rabu","Kamis","Jum'at","sabtu","Minggu",]
let nb =0
for (nb;nb<8;nb++){
    functionType(nb,hari[nb])

}

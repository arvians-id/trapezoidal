document.querySelector('#btnSubmit').addEventListener("click", function () {
    // persamaan 2*x^4 + 4x^2
    // Tentukan batas atas dan batas bawah
    const a = parseInt(document.querySelector('[name="a"]').value);
    const b = parseInt(document.querySelector('[name="b"]').value);

    // Tentukan jumlah pembagi atau interval
    let n = parseInt(document.querySelector('[name="n"]').value);
    let h = (b - a) / n;
    document.querySelector('#x').innerHTML = `batas atas (b) = ${b} | batas bawah (a) = ${a} | n = ${n} | h = ${h.toFixed(2)}`
    // Mulai
    let x = [];
    let fx = [];
    for (let i = a; i <= b; i += h) {
        // Nilai X
        x.push(i);
        // Nilai setelah digunakan persamaan diatas
        // let persFx = 2*x^4 + 4x^2
        let persFx = (2 * Math.pow(i, 4)) + (4 * Math.pow(i, 2));
        fx.push(persFx)
    }

    // Ambil nilai x1 sampai x2
    let dx = null;
    fx.slice(1, -1).map(item => dx += 2 * item)

    // Ambil nilai a dan b
    let arrAwalAkhir = []
    let iAwal = fx[0];
    let iAkhir = fx[fx.length - 1]
    arrAwalAkhir.push(iAwal, iAkhir, dx)

    // Ambil yang sudah dihitung 2 * fx
    let arrFx = []
    let z = fx.slice(1, -1).map(item => 2 * item);
    arrFx.push(iAwal, ...z, iAkhir)

    // hitung L
    const l = arrAwalAkhir.reduce((acu, val) => acu + val)

    // Tampilkan Ke Website
    let showX = ''
    x.forEach(val => {
        showX += `<tr>
                        <td>${val.toFixed(2)}</td>
                    </tr>`
    });
    document.querySelector('#showX').innerHTML = showX;

    let showFx = ''
    fx.forEach(val => {
        showFx += `<tr>
                        <td>${val.toFixed(2)}</td>
                    </tr>`
    });
    document.querySelector('#showFx').innerHTML = showFx;

    let show2f = ''
    arrFx.forEach(val => {
        show2f += `<tr>
                        <td>${val.toFixed(2)}</td>
                    </tr>`
    });
    let trap = parseFloat((l * h) / 2).toFixed(2);
    let galat = (hitung_eksak(a, b) - trap) / hitung_eksak(a, b);
    let persError = (galat * 100) / 100;
    document.querySelector('#show2f').innerHTML = show2f;
    document.querySelector('#hasilAkhir').innerHTML = `Hasil Integral Trapezoidal : ${trap}`;
    document.querySelector('#hasilEksak').innerHTML = `Hasil Integral Eksak : ${hitung_eksak(a, b)}`;
    document.querySelector('#error').innerHTML = `Persentase Error : ${parseFloat(persError).toFixed(3)}%`;
})
// Hitung Eksak atau Metode Analitik
const hitung_eksak = (a, b) => {
    let p1 = 4 + 1;
    let p2 = 2 + 1;
    let hasil = (2 * (Math.pow(b, p1) - Math.pow(a, p1)) / p1) + (4 * (Math.pow(b, p2) - Math.pow(a, p2)) / p2);

    return parseFloat(hasil.toFixed(2))
}
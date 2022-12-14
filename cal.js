import { timBaoDong } from "./shared/timBaoDong.js";
import { XiGenerate } from "./timKhoa/XiGenerate.js";
import { timTNVaTG } from "./timKhoa/timTNVaTG.js";
import { timKhoaVaHienThi } from "./timKhoa/timKhoaVaHienThi.js";
import { nhapF } from "./shared/nhapF.js";
import { tachChuoi } from "./shared/tachChuoi.js";
import { timFPhay } from "./timPTT/timFPhay.js";
import { luocVT } from "./timPTT/luocVT.js";
import { luocPTHDT } from "./timPTT/luocPTHDT.js";
import { chuan2 } from "./timDC/chuan2.js";
import { chuan3 } from "./timDC/chuan3.js";
import { chuanBC } from "./timDC/chuanBC.js";
var F = [];
var VP = [];
var VT = [];
var TN = [];
var TG = [];
var qCong = [];
var tapKhoa = [];
//test
// var F = [{L : 'BE', R: 'HE'}, {L: 'H', R: 'C'}, {L: 'C', R: 'A'}, {L: 'A', R: 'DG'}, {L: 'I', R: 'B'}, {L: 'D', R:'I'}]
// var F = [{L : '', R: ''},{L : '', R: ''},{L : '', R: ''},{L : '', R: ''},{L : '', R: ''},{L : '', R: ''},{L : '', R: ''},{L : '', R: ''}]
// var F = [{L:'AB',R:'C'},{L:'D',R: 'B'},{L:'C',R:'ABD'}]
// document.getElementById("properties").value = "ABCD";

document.getElementById("add").addEventListener("click", () => {
  let left = document.getElementById("left");
  let right = document.getElementById("right");
  if (left.value !== "" && right.value !== "") {
    F = [...nhapF()];
  } else F = [...F, ...tachChuoi()];
});
document.getElementsByTagName("body")[0].addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let left = document.getElementById("left");
    let right = document.getElementById("right");
    if (left.value !== "" && right.value !== "") {
      F = [...nhapF()];
    } else F = [...F, ...tachChuoi()];
  }
});

document.getElementById("calBtn").addEventListener("click", () => {
  let tempArr = document
    .getElementById("properties")
    .value.toUpperCase()
    .split(/[^A-Za-z]/)
    .filter((el) => el !== "");
  for (let item of tempArr) {
    qCong = [...qCong, ...item.split("")];
  }
  const timTK = new Promise((resolve, reject) => {
    tinhTapKhoa();
    resolve();
  });
  tinhPTT();
  timTK.then(() => {
    tinhDC();
  });
});

document.getElementById("reset").addEventListener("click", () => {
  location.reload();
});

const tinhTapKhoa = () => {
  if (F.length === 0) {
    var err = document.getElementById("err");
    err.removeAttribute("hidden");
    err.textContent = `Vui l??ng nh???p F `;
  } else if (qCong.length === 0) {
    var err = document.getElementById("err");
    err.removeAttribute("hidden");
    err.textContent = `Vui l??ng nh???p Q`;
  } else {
    const tNvaTG = timTNVaTG(F, VT, VP, TN, TG, qCong);
    TN = tNvaTG.TN;
    TG = tNvaTG.TG;
    var result = document.getElementById("result");
    const displayTN = document.createElement("h3");
    displayTN.className = "text";
    displayTN.innerHTML = `T???p ngu???n: ${TN.join("")}`;
    const displayTG = document.createElement("h3");
    displayTG.className = "text";
    displayTG.innerHTML = `T???p trung gian: ${TG.join("")}`;
    result.appendChild(displayTN);
    result.appendChild(displayTG);
    if (TG.length > 0) {
      var tGKhacRong = document.createElement("h3");
      tGKhacRong.className = "text";
      tGKhacRong.textContent = `V?? t???p trung gian kh??ng r???ng n??n ta x??t t???p ngu???n: `;
      result.appendChild(tGKhacRong);
      var tempTN = TN;
      const baoDongTN = timBaoDong(tempTN, F);
      if (qCong.filter((el) => !baoDongTN.includes(el)).length === 0) {
        let label = document.createElement("h3");
        label.style.color = "red";
        label.textContent = `Bao ????ng t???p ngu???n b???ng Q+ n??n TN = ${TN.join(
          ""
        )} ch??nh l?? kho??`;
        tapKhoa = [...TN];
        result.appendChild(label);
      } else {
        let label = document.createElement("h3");
        label.className = "text";
        label.textContent = `Bao ????ng t???p ngu???n kh??ng b???ng Q+ n??n ch??ng ta s??? x??t t???ng thu???c t??nh qua b???ng sau: `;
        result.appendChild(label);
        const Xi = XiGenerate(TG);
        tapKhoa = [...timKhoaVaHienThi(TN, Xi, F, qCong)];
      }
    } else {
      var tGRong = document.createElement("h3");
      tGRong.innerHTML = `T???p trung gian r???ng n??n TN: ${TN} l?? kho?? duy nh???t`;
      tapKhoa = [...TN];
      console.log(tapKhoa);
      tGRong.style.color = `red`;
      result.appendChild(tGRong);
    }
  }
};

const tinhPTT = () => {
  if (F.length === 0) {
    var err = document.getElementById("err");
    err.removeAttribute("hidden");
    err.textContent = `Vui l??ng nh???p F `;
  } else if (qCong.length === 0) {
    var err = document.getElementById("err");
    err.removeAttribute("hidden");
    err.textContent = `Vui l??ng nh???p Q`;
  } else {
    var FPhay = timFPhay(F);
    var b1 = document.getElementById("b1");
    var h4 = document.createElement("h4");
    h4.innerHTML = `F\' = `;
    for (let item of FPhay) h4.innerHTML += `${item.L} -> ${item.R}, `;
    h4.style.color = `yellow`;
    h4.innerHTML = h4.innerHTML.slice(0, h4.innerHTML.length - 2);
    b1.appendChild(h4);
    FPhay = luocVT(FPhay);
    var b2 = document.getElementById("b2");
    var h4 = document.createElement("h4");
    h4.innerHTML = `F\' sau khi lo???i b??? c??c thu???c t??nh d?? th???a ??? v??? tr??i: <br/>F\' = `;
    for (let item of FPhay) h4.innerHTML += `${item.L} -> ${item.R}, `;
    h4.style.color = `yellow`;
    h4.innerHTML = h4.innerHTML.slice(0, h4.innerHTML.length - 2);
    b2.appendChild(h4);
    FPhay = luocPTHDT(FPhay);
    var b3 = document.getElementById("b3");
    var h4 = document.createElement("h4");
    h4.innerHTML = `F\' sau khi lo???i b??? c??c ph??? thu???c h??m d?? th???a: <br/>F\' = `;
    for (let item of FPhay) h4.innerHTML += `${item.L} -> ${item.R}, `;
    h4.innerHTML = h4.innerHTML.slice(0, h4.innerHTML.length - 2);
    h4.style.color = `red`;
    b3.appendChild(h4);
  }
};

const tinhDC = () => {
  //Chu???n 2
  var h3TK = document.createElement('h3')
  h3TK.innerHTML = `T???p kho?? = { ${tapKhoa} }`
  document.getElementById("chuan1").appendChild(h3TK);
  const tempTK = tapKhoa.join("").split("");
  var khongKhoa = qCong.filter((el) => !tempTK.includes(el));
  var h3Chuan1 = document.createElement("h3");
  h3Chuan1.innerHTML = `T???p kh??ng kho?? = {${khongKhoa.join("")}}`;
  document.getElementById("chuan1").appendChild(h3Chuan1);

  
  const datChuan2 = chuan2(F, khongKhoa, tapKhoa);
  var h3Chuan2 = document.createElement("h3");
  if (datChuan2) {
    h3Chuan2.style.color = "yellow";
    h3Chuan2.innerHTML = `Thu???c t??nh kh??ng kho?? ${datChuan2.pTKDD} kh??ng ph??? thu???c ?????y ????? v??o t???p kho?? ${datChuan2.tK} do ${datChuan2.xil}+ = ${datChuan2.baoDong} n??n d??? li???u kh??ng th??? ?????t chu???n 2`;
    document.getElementById("chuan2").appendChild(h3Chuan2);
    return;
  }
  h3Chuan2.style.color = "yellow";
  h3Chuan2.innerHTML = `T???p kh??ng kho?? ph??? thu???c h??m ?????y ????? v??o t???p kho?? n??n d??? li???u ?????t ??t nh???t chu???n 2`;
  document.getElementById("chuan2").appendChild(h3Chuan2);


  const datChuan3 = chuan3(F, tapKhoa);
  var h3Chuan3 = document.createElement('h3')
  if (datChuan3) {
    let result = ''
    for(let item of datChuan3){
      result += ` ${item.L} -> ${item.R},`
    }
    result = result.slice(0, result.length -1)
    h3Chuan3.innerHTML = `C??c ph??? thu???c h??m ${result} c?? v??? Tr??i/Ph???i kh??ng ch???a kho??/Thu???c t??nh kho?? n??n d??? li???u kh??ng th??? ?????t chu???n 3`;
    document.getElementById("chuan3").appendChild(h3Chuan3);
    return;
  }
  h3Chuan3.style.color = "yellow";
  h3Chuan3.innerHTML = `V??? tr??i v?? v??? ph???i ?????u ch???a kho??/thu???c t??nh kho?? n??n d??? li???u ?????t ??t nh???t chu???n 3`;
  document.getElementById("chuan3").appendChild(h3Chuan3);


  const datChuanBC = chuanBC(F, tapKhoa);
  var h3ChuanBC = document.createElement("h3");
  h3ChuanBC.style.color = 'red'
  if (datChuanBC) {
    h3ChuanBC.innerHTML = `Ph??? thu???c h??m ${datChuanBC.L} -> ${datChuanBC.R} c?? v??? tr??i kh??ng ch???a kho?? n??n d??? li???u kh??ng th??? ?????t chu???n BC`;
    document.getElementById("chuanBC").appendChild(h3ChuanBC);
    return;
  }
  h3ChuanBC.innerHTML = `M???i ph??? thu???c h??m ?????u c?? v??? tr??i ch???a kho?? n??n d??? li???u ?????t ??t nh???t chu???n BC`;
  document.getElementById("chuanBC").appendChild(h3ChuanBC);
};

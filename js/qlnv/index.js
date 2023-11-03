// mảng chứa id của tất cả input cần lấy dữ liệu
var arrIdInput = [
  "tknv",
  "name",
  "email",
  "password",
  "datepicker",
  "luongCB",
  "chucvu",
  "gioLam",
];

var arrIdSpan = [
  "tbTKNV",
  "tbTen",
  "tbEmail",
  "tbMatKhau",
  "tbNgay",
  "tbLuongCB",
  "tbChucVu",
  "tbGiolam",
];

// B3: tạo mảng lưu trữ thông tin người dùng
var arrNhanVien = [];

// B1: Tạo hàm lấy dữ liệu người dùng
function getValueUser() {
  // B2: tạo đối tượng lưu trữ thông tin nhân viên
  var nhanVien = new NhanVien();

  //   chạy vòng lặp
  var isValid = true;
  for (var i = 0; i < arrIdInput.length; i++) {
    var valueInput = document.getElementById(arrIdInput[i]).value;

    // ------validation------
    if (arrIdInput[i] == "tknv") {
      isValid &=
        checkEmptyValue(valueInput, arrIdSpan[i]) &&
        checkIDValue(valueInput, arrIdSpan[i]);
    } else if (arrIdInput[i] == "name") {
      isValid &=
        checkEmptyValue(valueInput, arrIdSpan[i]) &&
        checkName(valueInput, arrIdSpan[i]);
    } else if (arrIdInput[i] == "email") {
      isValid &=
        checkEmptyValue(valueInput, arrIdSpan[i]) &&
        checkEmailValue(valueInput, arrIdSpan[i]);
    } else if (arrIdInput[i] == "password") {
      isValid &=
        checkEmptyValue(valueInput, arrIdSpan[i]) &&
        checkPass(valueInput, arrIdSpan[i]);
    } else if (arrIdInput[i] == "datepicker") {
      isValid &=
        checkEmptyValue(valueInput, arrIdSpan[i]) &&
        checkDate(valueInput, arrIdSpan[i]);
    } else if (arrIdInput[i] == "luongCB") {
      isValid &=
        checkEmptyValue(valueInput, arrIdSpan[i]) &&
        checkNumber(valueInput, arrIdSpan[i], 1000000, 20000000);
    } else if (arrIdInput[i] == "gioLam") {
      isValid &=
        checkEmptyValue(valueInput, arrIdSpan[i]) &&
        checkNumber(valueInput, arrIdSpan[i], 80, 200);
    } else {
      isValid &= checkEmptyValue(valueInput, arrIdSpan[i]);
    }

    // kiểm tra dữ liệu đầu vào từ người dùng
    // trả về 0 hoặc 1 true && false => false
    isValid = isValid && checkEmptyValue(valueInput, arrIdSpan[i]);

    nhanVien[arrIdInput[i]] = valueInput;
  }

  if (isValid) {
    // gọi mảng và dùng push để đưa dữ liệu nhân viên vào mảng lưu trữ
    console.log(arrNhanVien);

    arrNhanVien.push(nhanVien);
    saveLocalStore("arrNhanVien", arrNhanVien);
    renderDisplay();

    // xử lý reset value
    document.getElementById("formQLNV").reset();
  }
}

document.getElementById("btnThemNV").onclick = getValueUser;

function renderDisplay(arr) {
  console.log(arr);

  if (!arr) {
    arr = arrNhanVien;
  }

  var content = "";
  // dùng vòng lặp đưa tất cả dữ liệu nhân viên lên giao diện
  for (var z = 0; z < arr.length; z++) {
    // khởi tạo 1 đối tượng để giúp các đối tượng được lấy từ local lên sẽ có phương thức
    var nhanVien = new NhanVien();
    var valueNhanVien = arr[z];
    Object.assign(nhanVien, valueNhanVien);
    console.log(nhanVien);

    content += `
    <tr>
      <td>${nhanVien.tknv}</td>
      <td>${nhanVien.name}</td>
      <td>${nhanVien.email}</td>
      <td>${nhanVien.datepicker}</td>
      <td>${nhanVien.chucvu}</td>
      <td>${nhanVien.totalSalary()}</td>
      <td>${nhanVien.staffRating()}</td>
      <td>
        <button onclick="deleteUser('${
          nhanVien.tknv
        }')" class="btn btn-danger mb-2">Xóa</button>
        <button onclick="getInfoUser('${
          nhanVien.tknv
        }')" class="btn btn-dark mb-2" data-toggle="modal" data-target="#myModal">Sửa</button>

      </td>
    </tr>
    `;
  }
  document.getElementById("tableDanhSach").innerHTML = content;
}

// Chức năng xóa nhân viên
function deleteUser(taikhoanNV) {
  console.log("tôi là xóa");
  console.log(taikhoanNV);
  var index = -1;
  for (var i = 0; i < arrNhanVien.length; i++) {
    var nhanVien = arrNhanVien[i];
    if (nhanVien.tknv == taikhoanNV) {
      console.log(i);
      index = i;
    }
  }
  if (index != -1) {
    arrNhanVien.splice(index, 1);
    saveLocalStore("arrNhanVien", arrNhanVien);

    // gọi lại hàm render để cập nhật dữ liệu mới
    renderDisplay();
    console.log(arrNhanVien);
  }
}

// Chức năng sửa nhân viên
function getInfoUser(taikhoanNV) {
  console.log(taikhoanNV);
  var nhanVien = {};
  for (var i = 0; i < arrNhanVien.length; i++) {
    if (arrNhanVien[i].tknv == taikhoanNV) {
      nhanVien = arrNhanVien[i];
    }
  }
  console.log(nhanVien);
  // dùng dữ liệu đã lấy được và truyền lên input
  for (var z = 0; z < arrIdInput.length; z++) {
    document.getElementById(arrIdInput[z]).value = nhanVien[arrIdInput[z]];

    // set input mã sinh viên chỉ được đọc
    if (arrIdInput[z] == "tknv") {
      document.getElementById(arrIdInput[z]).readOnly = true;
    }
  }
  document.getElementById("myModal").style.display = "block";
}

var isValid = true;
function getInfoUserHienTai() {
  var nhanVien = new NhanVien();
  for (var i = 0; i < arrIdInput.length; i++) {
    var valueInput = document.getElementById(arrIdInput[i]).value;

    // validation
    if (arrIdInput[i] == "name") {
      isValid &=
        checkEmptyValue(valueInput, arrIdSpan[i]) &&
        checkName(valueInput, arrIdSpan[i]);
    } else if (arrIdInput[i] == "email") {
      isValid &=
        checkEmptyValue(valueInput, arrIdSpan[i]) &&
        checkEmailValue(valueInput, arrIdSpan[i]);
    } else if (arrIdInput[i] == "password") {
      isValid &=
        checkEmptyValue(valueInput, arrIdSpan[i]) &&
        checkPass(valueInput, arrIdSpan[i]);
    } else if (arrIdInput[i] == "datepicker") {
      isValid &=
        checkEmptyValue(valueInput, arrIdSpan[i]) &&
        checkDate(valueInput, arrIdSpan[i]);
    } else if (arrIdInput[i] == "luongCB") {
      isValid &=
        checkEmptyValue(valueInput, arrIdSpan[i]) &&
        checkNumber(valueInput, arrIdSpan[i], 1000000, 20000000);
    } else if (arrIdInput[i] == "gioLam") {
      isValid &=
        checkEmptyValue(valueInput, arrIdSpan[i]) &&
        checkNumber(valueInput, arrIdSpan[i], 80, 200);
    } else {
      isValid &= checkEmptyValue(valueInput, arrIdSpan[i]);
    }

    // kiểm tra dữ liệu đầu vào từ người dùng
    // trả về 0 hoặc 1 true && false => false
    isValid = isValid && checkEmptyValue(valueInput, arrIdSpan[i]);

    nhanVien[arrIdInput[i]] = valueInput;
  }
  if (isValid) {
    return nhanVien;
    // } else {
    //   return null;
  }
}

function editValueUser() {
  var nhanVien = getInfoUserHienTai();
  if (!nhanVien) {
    // dữ liệu không hợp lệ, không thực hiện cập nhật
    return;
  }

  var index = -1;

  for (var i = 0; i < arrNhanVien.length; i++) {
    if (nhanVien.tknv == arrNhanVien[i].tknv) {
      index = i;
    }
  }
  document.getElementById("tknv").readOnly = false;
  // document.getElementById("formQLNV").reset();
  // CRUD ==> Create, Read, Update, Delete
  arrNhanVien[index] = nhanVien;
  saveLocalStore("arrNhanVien", arrNhanVien);
  renderDisplay();
  // closeModal();
  document.getElementById("formQLNV").reset();
}
document.getElementById("btnCapNhat").onclick = editValueUser;

// // Chức năng đóng modal
// function closeModal() {
//   document.getElementById("myModal").style.display = "none";
// }

// Chức năng lưu dữ liệu xuống localStorage
function saveLocalStore(key, value) {
  var valueString = JSON.stringify(value);
  localStorage.setItem(key, valueString);
}

// Chức năng lấy dữ liệu từ localStorage
function getLocalStore(key) {
  var arrLocal = JSON.parse(localStorage.getItem(key));
  console.log(arrLocal);

  if (arrLocal) {
    arrNhanVien = arrLocal;
    console.log(arrNhanVien);
    renderDisplay();
  }
}
getLocalStore("arrNhanVien");

// // // ----tìm kiếm theo tên nhân viên----
function searchInfoUser(event) {
  var keyword = event.target.value;

  var newKeyWord = removeVietnameseTones(keyword.toLowerCase().trim());

  var arrFilter = [];
  for (var i = 0; i < arrNhanVien.length; i++) {
    var tenNhanVien = removeVietnameseTones(
      arrNhanVien[i].name.toLowerCase().trim()
    );

    if (tenNhanVien.includes(newKeyWord)) {
      //   console.log("Tôi là nhân viên bạn cần kiếm, arrNhanVien[i]");
      // } else {
      //   console.log("toi khong phai, arrNhanVien[i]");
      arrFilter.push(arrNhanVien[i]);
    }
  }
  renderDisplay(arrFilter);
}
document.getElementById("btnTimNV").onclick = searchInfoUser;

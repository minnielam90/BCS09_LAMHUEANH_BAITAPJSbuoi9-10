function checkEmptyValue(value, idSpan) {
  // kiểm tra dữ liệu từ người dùng
  if (value == "") {
    document.getElementById(idSpan).innerHTML = "Vui lòng không bỏ trống";
    document.getElementById(idSpan).style.display = "block";

    return false;
  } else {
    document.getElementById(idSpan).innerHTML = "";
    return true;
    document.getElementById(idSpan).style.display = "none";
  }
}

// kiểm tra email
function checkEmailValue(value, idSpan) {
  var regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  regexEmail.test(value);
  if (regexEmail.test(value)) {
    // dữ liệu thỏa regex
    document.getElementById(idSpan).innerHTML = "";
    return true;
  } else {
    document.getElementById(idSpan).innerHTML =
      "Định dạng email không chính xác";
    return false;
  }
}

// kiểm tra tối đa 4-6 ký số cho tài khoản nhân viên
function checkIDValue(value, idSpan) {
  var regexID = /^\d{4,6}$/;
  regexID.test(value);
  if (regexID.test(value)) {
    document.getElementById(idSpan).innerHTML = "";
    return true;
  } else {
    document.getElementById(idSpan).innerHTML =
      "Tài khoản phải tối đa 4-6 ký số";
    return false;
  }
}

// kiểm tra tên nhân viên phải là chữ
function checkName(value, idSpan) {
  var checkName = /^[a-zA-Z\s]+$/;
  checkName.test(value);
  if (checkName.test(value)) {
    document.getElementById(idSpan).innerHTML = "";
    return true;
  } else {
    document.getElementById(idSpan).innerHTML =
      "Vui lòng nhập chữ cho tên nhân viên";
    return false;
  }
}

// kiểm tra mật khẩu
function checkPass(value, idSpan) {
  var checkPass = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,10}$/;
  checkPass.test(value);
  if (checkPass.test(value)) {
    document.getElementById(idSpan).innerHTML = "";
    return true;
  } else {
    document.getElementById(idSpan).innerHTML =
      "Mật khẩu phải từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa và 1 ký tự đặc biệt !@#$%^&*";
    return false;
  }
}

// kiểm tra ngày làm
function checkDate(value, idSpan) {
  var checkDate = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
  checkDate.test(value);
  if (checkDate.test(value)) {
    document.getElementById(idSpan).innerHTML = "";
    return true;
  } else {
    document.getElementById(idSpan).innerHTML =
      "Vui lòng nhập theo định dạng mm/dd/yyyy";
    return false;
  }
}

// kiểm tra chuỗi số
function checkNumber(value, idSpan, min, max) {
  const parsedNumber = parseInt(value, 10);
  if (!isNaN(parsedNumber) && parsedNumber >= min && parsedNumber <= max) {
    document.getElementById(idSpan).innerHTML = "";
    return true;
  } else {
    document.getElementById(
      idSpan
    ).innerHTML = `Vui lòng nhập tối thiểu ${min} và tối đa ${max}`;
    return false;
  }
}

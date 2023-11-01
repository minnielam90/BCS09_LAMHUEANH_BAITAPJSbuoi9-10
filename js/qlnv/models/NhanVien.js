// tài khoản, họ tên, email, mật khẩu, ngày làm, lương CB, chức vụ, giờ làm
function NhanVien() {
  this.tknv = "";
  this.name = "";
  this.email = "";
  this.password = "";
  this.datepicker = "";
  this.luongCB = "";
  this.chucvu = "";
  this.gioLam = "";

  // tính tổng lương salary
  this.totalSalary = function () {
    let calSalary;
    if (this.chucvu === "Giám đốc") {
      calSalary = this.luongCB * 3;
    } else if (this.chucvu === "Trưởng phòng") {
      calSalary = this.luongCB * 2;
    } else {
      calSalary = this.luongCB;
    }
    return calSalary;
  };

  // xếp loại nhân viên staffRank
  this.staffRating = function () {
    if (this.gioLam >= 192) {
      return "Xuất sắc";
    } else if (this.gioLam < 192 && this.gioLam >= 176) {
      return "Giỏi";
    } else if (this.gioLam < 176 && this.gioLam >= 160) {
      return "Khá";
    } else {
      return "Trung Bình";
    }
  };
}

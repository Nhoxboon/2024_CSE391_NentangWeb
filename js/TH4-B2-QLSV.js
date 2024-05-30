$(document).ready(function () {

    let data = {};

// Đọc dữ liệu từ data.json và hiển thị danh sách lớp vào dropdown
    $.getJSON("data.json", function (response) {
        data = response;
        const themLop = $("#lop");
        data.lopHoc.forEach((cls, index) => {
            themLop.append(new Option(cls.tenLop, index));
        })

    });

// Xử lý sự kiện khi chọn lớp từ dropdown
    $("#lop").change(function () {
        const chonLop = $(this).val();
        if (chonLop !== "") {
            const chonLopMoi = data.lopHoc[chonLop];
            hienThiBang(chonLopMoi.sinhVien);
        }

    });

    function hienThiBang(sinhVien) {
        const tbody = $("#bangSinhVien tbody");
        tbody.empty();
        sinhVien.forEach((sv, index) => {
            const row =
                `<tr>
    <td>${sv.hoTen}</td>
    <td>${sv.maSV}</td>
    <td>${sv.ngaySinh}</td>

    <td>
        <button class="btn btn-primary btn-edit" data-index="${index}">Sửa</button>
        <button class="btn btn-danger btn-delete" data-index="${index}">Xóa</button>
    </td>
</tr>`
            tbody.append(row);
        })
    }


// Các hàm xử lý sự kiện thêm, sửa, xóa sinh viên


});
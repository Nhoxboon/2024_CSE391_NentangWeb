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
    <td class="border px-4 py-2">${sv.hoTen}</td>
    <td class="border px-4 py-2">${sv.maSV}</td>
    <td class="border px-4 py-2">${sv.ngaySinh}</td>

    <td>
        <button class="btn btn-primary btn-edit" id="btn-edit" data-index="${index}">Sửa</button>
        <button class="btn btn-danger btn-delete" data-index="${index}">Xóa</button>
    </td>
</tr>`
            tbody.append(row);
        });
        $(".btn-delete").click(function () {
            if (confirm("Bạn có chắc chắn muốn xóa sinh viên này không?")) {
                const studentIndex = $(this).data("index");
                const classIndex = $(this).data("class-index");
                xoaSv(classIndex, studentIndex);
            }
        });
    }


// Các hàm xử lý sự kiện thêm, sửa, xóa sinh viên

// xoa sinh vien
//     $(".btn-delete").click(function () {
//
//         if (confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) {
//             const indexSv = $(this).data('index');
//             const classIndex = $(this).data('class-index');
//             xoaSv(indexSv, classIndex);
//         }
//     })


    function xoaSv(indexSv, classIndex) {
        data.lopHoc[classIndex].sinhVien.splice(indexSv, 1);
        // saveData();
        updateDataFile()
        hienThiBang(data.lopHoc[classIndex].sinhVien);
    }

    // function saveData() {
    //     $.ajax({
    //         url: "data.json",
    //         method: "POST",
    //         data: JSON.stringify(data),
    //         contentType: "application/json",
    //         success: function (response) {
    //             console.log('quyet chim to vai lon');
    //         }
    //     });
    // }

    function updateDataFile() {
        $.ajax({
            url: "save.php",
            method: "POST",
            data: {data: JSON.stringify(data)},
            success: function (response) {
                console.log("Data updated successfully");
            },
            error: function (xhr, status, error) {
                console.error("Error updating data: ", error);
            }
        });
    }

});
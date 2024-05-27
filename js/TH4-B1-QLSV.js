$(document).ready(function () {
    let sinhVien = JSON.parse(localStorage.getItem('sinhVien')) || [];

    function renderTable() {
        const tbody = $('#bangSinhVien tbody');
        tbody.empty();
        sinhVien.forEach((sv, index) => {
            tbody.append(`
                    <tr>
                        <td>${sv.name}</td>
                        <td>${sv.mssv}</td>
                        <td>${sv.dob}</td>
                        <td>${sv.class}</td>
                        <td>
                            <button class="btn btn-warning btn-edit" data-index="${index}"><i class="bi bi-pencil-square"></i></button>
                            <button class="btn btn-danger btn-delete" data-index="${index}"><i class="bi bi-trash3"></i></button>
                        </td>
                    </tr>
                `);
        });
    }

    function saveToLocalStorage() {
        localStorage.setItem('sinhVien', JSON.stringify(sinhVien));
    }

    $('#formSinhVien').submit(function (e) {
        e.preventDefault();
        const name = $('#name').val();
        const mssv = $('#mssv').val();
        const dob = $('#dob').val();
        const classSV = $('#class').val();
        if (name === '' || mssv === '' || dob === '' || classSV === '') {
            alert('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        const editIndex = $("#btnAdd").data('edit-index');
        if (editIndex !== undefined) {
            // Cập nhật thông tin sinh viên
            sinhVien[editIndex] = {name, mssv, dob, class: classSV};
            $('#btnAdd').text('Thêm').removeData('edit-index');
        } else {
            // Thêm sinh viên mới
            sinhVien.push({name, mssv, dob, class: classSV});
        }
        saveToLocalStorage();
        renderTable();
        this.reset();
    });

    $(document).on('click', '.btn-delete', function () {
        const index = $(this).data('index');
        if (confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) {
            sinhVien.splice(index, 1);
            saveToLocalStorage();
            renderTable();
        }
    });

    $(document).on('click', '.btn-edit', function () {
        const index = $(this).data('index');
        const sv = sinhVien[index];
        $('#name').val(sv.name);
        $('#mssv').val(sv.mssv);
        $('#dob').val(sv.dob);
        $('#class').val(sv.class);
        $('#btnAdd').text('Cập nhật').data('edit-index', index);
    });

    renderTable();
});

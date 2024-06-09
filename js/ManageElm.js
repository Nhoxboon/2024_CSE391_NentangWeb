$(document).ready(function () {
    $('#formAdd').hide()
    $('#addElm').click(function () {
        $('#formAdd').show()
        $('#exitForm').click(() => {
            $('#formAdd').hide()
        })
        //     cac truong nhap khong dc de rong
        $('.bg-warning-subtle').click(() => {
            if ($('#f-name').val() == '' || $('#email').val() == '' || $('#address').val() == '' || $('#phone').val() == '') {
                alert('Khong duoc de trong')
            }
            //     va kiem tra dieu kien phone kho dc qua 10 so va so dau tien la 0
            else if ($('#phone').val().length > 10 || $('#phone').val().charAt(0) != 0) {
                alert('So dien thoai khong hop le')
            }
        })
    })


})
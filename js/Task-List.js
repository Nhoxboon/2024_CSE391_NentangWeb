$(document).ready(function () {
    $('.form-input').hide();
    $('.add-task').click(function () {
        $('.form-input').toggle()
    })

    $('.add').click(() => {
        if ($('.input').val().length >= 100) {
            alert('Khong dc nhap qua 100 ky tu')
        }
    })
    $.getJSON('data-task-list.json', function (data) {
        // Lấy mảng công việc từ đối tượng JSON
        const tasks = data.tasks;

        tasks.forEach(item => {
            $('.list-task').append(`
                        <li class="border rounded row m-2">
                            <div class="col">
                                <p class="text-secondary">Task</p>
                                <p>${item.taskName}</p>
                            </div>
                            <div class="col">
                                <p class="text-secondary">Priority</p>
                                <p class="text-danger">${item.priority}</p>
                            </div>
                            <div class="col align-self-center d-flex p-3">
                                <p class="bg-secondary rounded text-light">${item.status}</p>
                            </div>
                            <div class="col align-self-center">
                                <i class="bi bi-circle"></i>
                            </div>
                            <div class="col d-flex align-self-center">
                                <i class="bi bi-pencil-square fs-2 text"></i>
                                <i class="bi bi-trash-fill fs-2 text text-danger"></i>
                            </div>
                        </li>
                    `);
        });
    }).fail(function () {
        alert("Không thể tải dữ liệu từ tệp JSON.");
    });
})
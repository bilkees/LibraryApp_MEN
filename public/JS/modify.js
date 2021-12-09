function deleteFunc() {
    if ($('#code').val() == '1') {
        let userData = {

            id: $('#bookId').val()

        }
        // console.log("book");
        console.log('role', localStorage.getItem("role"))
        Swal.fire({
            title: "Are you sure?",
            // type: "warning",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Yes, archive it!",
            denyButtonText: "No, cancel please!",
            showDenyButton: true,
            text: "You won't be able to revert this!",
            icon: 'warning',
            cancelButtonColor: '#d33',

        }).then((result) => {
            if (result.isConfirmed) {

                $.ajax({
                    type: "POST",
                    url: '/group/deletebook',
                    data: userData,
                    dataType: 'json',

                    success: function (response) {

                        if (response.status) {
                            location.replace("/group/books") //return to books
                        }
                    },
                    error: function (e) {
                        console.log("ERROR: ", e);
                    }

                });
            } else {
                Swal.fire("Cancelled", "Your  file is safe ", "error");
            }
        });


    }
    else {
        console.log("author");

        let userData = {

            id: $('#bookId').val(),
        }
        Swal.fire({
            title: "Are you sure?",
            // type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, archive it!",
            cancelButtonText: "No, cancel please!",
            // closeOnConfirm: false,
            // closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {

                    $.ajax({
                        type: "POST",
                        url: '/group/deleteauthor',
                        data: userData,
                        dataType: 'json',

                        success: function (response) {

                            if (response.status) {

                                location.replace("/group/authors") //return to authors
                            }
                        },
                        error: function (e) {
                            console.log("ERROR: ", e);
                        }

                    });
                } else {
                    Swal.fire("Cancelled", "Your  file is safe ", "error");
                }
            });

    }
}

function updateFunc() {
    // console.log("\n update ", $('#bookId').val(), $('#code').val());
    if ($('#code').val() == '1') {
        // console.log("update");
        $.ajax({
            type: "GET",
            url: '/add/update_book/' + $('#bookId').val(),
            // data: userData,
            dataType: 'json',

            success: function (response) {

                if (response.status) {
                    // location.replace("/group/books") //return to books
                }
            },
            error: function (e) {
                console.log("ERROR: ", e);
            }

        });
    }
    else {
        // console.log("author");

        let userData = {

            id: $('#bookId').val(),
            updateData: {
                title: '',
                description: '',
            }
        }
        Swal.fire({
            title: "Are you sure?",
            // type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, archive it!",
            cancelButtonText: "No, cancel please!",
            // closeOnConfirm: false,
            // closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {

                    $.ajax({
                        type: "POST",
                        url: '/group/deleteauthor',
                        data: userData,
                        dataType: 'json',

                        success: function (response) {

                            if (response.status) {

                                location.replace("/group/authors") //return to authors
                            }
                        },
                        error: function (e) {
                            console.log("ERROR: ", e);
                        }

                    });
                } else {
                    Swal.fire("Cancelled", "Your  file is safe ", "error");
                }
            });

    }
}

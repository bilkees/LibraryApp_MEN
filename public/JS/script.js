
$(document).ready(() => {

    var em = document.getElementById("em");
    var pas = document.getElementById("pass");
    let regexp = /^([A-Za-z0-9\.-]+)@([A-Za-z0-9]+).([a-z]{2,3})(.[a-z]{2,3})?$/

    //password validator//
    var regex = new Array();
    regex.push("[A-Z]"); //Uppercase Alphabet.
    regex.push("[a-z]"); //Lowercase Alphabet.
    regex.push("[0-9]"); //Digit.
    regex.push("[$@$!%*#?&]"); //Special Character.





    $("#button1").click(() => { //signIn
        if (em.value.trim() == "" || pas.value.trim() == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter details',
            });
            em.style.border = em.value.trim() == "" ? "2px solid red" : '';
            pas.style.border = pas.value.trim() == "" ? "2px solid red" : '';

            return false;
        }


        else {
            let user = {
                username: em.value.trim(),
                password: pas.value.trim()
            }
            $.ajax({
                type: "POST",
                url: '/login',
                data: user,
                // dataType: 'json',

                success: function (response) {
                    if (response.status) {
                        location.replace("/")
                    } else {
                        Swal.fire(
                            'Warning!!',
                            'User not found!',
                            'error'
                        )
                    }
                },
                error: function (e) {
                    console.log("ERROR: ", e);
                }
            });

        }


    });
    // ------------------------------------sign up validation---------------------------------------//

    var pass1 = document.getElementById("pass1");
    var pass2 = document.getElementById("pass2");
    var email = document.getElementById("em2");
    var user = document.getElementById("user1");

    // console.log(pass1, pass2, email, user);

    $("#button2").click(() => {
        if (pass1.value.trim() == "" || pass2.value.trim() == "" || email.value.trim() == "" || user.value.trim() == "") {

            pass1.style.border = pass1.value.trim() == "" ? "2px solid red" : '';
            pass2.style.border = pass2.value.trim() == "" ? "2px solid red" : '';
            email.style.border = email.value.trim() == "" ? "2px solid red" : '';
            user.style.border = user.value.trim() == "" ? "2px solid red" : '';

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all fields',
            });
            return false;
        }

        else if (regexp.test(email.value) == false) {
            email.style.border = "2px solid red";
            Swal.fire({
                icon: 'error',
                title: 'Invalid Email !',
                text: 'Ex: axxxx@gmail.com , byyyy@gmail.co.in',
            });
            return false;
        }

        else if (user.value.length < 8) {
            user.style.border = "2px solid red";
            Swal.fire({
                icon: 'warning',
                title: 'User-name must have atleast 8 characters !',
            });
            return false;
        }

        else if (!new RegExp(regex[0]).test(pass1.value) || !new RegExp(regex[1]).test(pass1.value) || !new RegExp(regex[2]).test(pass1.value)) {
            Swal.fire({
                icon: 'warning',
                title: 'Password must contain atleast one uppercase, one lower case and one number',
                text: 'Please enter again',
            });
            return false;
        }
        else if (pass1.value.trim() != pass2.value.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Passwords doesnt match!',
                text: 'Please check again',
            });
            pass1.style.border = "2px solid red";
            pass2.style.border = "2px solid red";
            return false;
        }

        else {

            let userData = {
                Username: user.value.trim(),
                Password: pass1.value.trim(),
                Email: email.value.trim()
            }
            $.ajax({
                type: "POST",
                url: '/login/signup',
                data: userData,
                dataType: 'json',

                success: function (response) {

                    if (response.status) {
                        Swal.fire('Successfully added !!!', '', 'success')
                        .then(function () {
                            location.replace("/") 
                        });
                    } else {
                        Swal.fire(
                            'Error!!',
                            'No Welcome Admin!',
                            'error'
                        )
                    }

                },
                error: function (e) {
                    console.log("ERROR: ", e);
                }

            })
        }
    });

    //-------add data---

    var addtitle = document.getElementById("addtitle");
    var addbook = document.getElementById("addbook");
    var addtext = document.getElementById("addtext");
    var addfile = document.getElementById("addfile");


    $("#addsubmit").click((event) => {
        // console.log('\n add submit')
        if (addtitle.value.trim() == "" || addbook.value.trim() == "" || addtext.value.trim() == "" || addfile.value.trim() == "") {

            addtitle.style.border = addtitle.value.trim() == "" ? "2px solid red" : '';
            addbook.style.border = addbook.value.trim() == "" ? "2px solid red" : '';
            addtext.style.border = addtext.value.trim() == "" ? "2px solid red" : '';
            addfile.style.border = addfile.value.trim() == "" ? "2px solid red" : '';


            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please fill all fields',
            });
            return false;
        }
        else {
            Swal.fire({
                icon: 'question',
                title: 'Do you want to save the details?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: `Yes`,
                denyButtonText: `Don't save`,

            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('Successfully added !!!', '', 'success')
                        .then(function () {
                            location.replace("/") //return to authors
                        });

                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'error')
                    return false;
                }
            })
        }
    });




});


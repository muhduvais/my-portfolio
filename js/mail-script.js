    // // -------   Mail Send ajax

    //  $(document).ready(function() {
    //     var form = $('#myForm'); // contact form
    //     var submit = $('.submit-btn'); // submit button
    //     var alert = $('.alert-msg'); // alert div for show alert message

    //     // form submit event
    //     form.on('submit', function(e) {
    //         e.preventDefault(); // prevent default form submit

    //         $.ajax({
    //             url: 'mail.php', // form action url
    //             type: 'POST', // form submit method get/post
    //             dataType: 'html', // request type html/json/xml
    //             data: form.serialize(), // serialize form data
    //             beforeSend: function() {
    //                 alert.fadeOut();
    //                 submit.html('Sending....'); // change submit button text
    //             },
    //             success: function(data) {
    //                 alert.html(data).fadeIn(); // fade in response data
    //                 form.trigger('reset'); // reset form
    //                 submit.attr("style", "display: none !important");; // reset submit button text
    //             },
    //             error: function(e) {
    //                 console.log(e)
    //             }
    //         });
    //     });
    // });

    const form = document.getElementById('emailForm');
    const email = document.getElementById('email');

    form.addEventListener('submit', e => {
        e.preventDefault();
        
        validateEmail();

        if(isMailValid()) {
            
            form.submit();
            form.reset();
        }
    })

    const isMailValid = () => {
        return email.parentElement.classList.contains('success');
    }

    const setError = (element, message) => {
        const inputField = element.parentElement;
        const displayError = inputField.querySelector('.error');

        displayError.innerText = message;
        inputField.classList.add('error');
        inputField.classList.remove('success');
    }

    const setSuccess = element => {
        const inputField = element.parentElement;
        const displayError = inputField.querySelector('.error');

        displayError.innerText = 'Submitting...';
        inputField.classList.add('success');
        inputField.classList.remove('error');
    }

    const isValidEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validateEmail = () => {
        const emailValue = email.value.trim();

        if(emailValue === '') {
            setError(email, '*Email cannot be empty');
        }
        else if(!isValidEmail(emailValue)) {
            setError(email, '*Please enter a valid email');
        }
        else {
            setSuccess(email);
        }
    }
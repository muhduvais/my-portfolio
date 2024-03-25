// $(document).ready(function(){
    
//     (function($) {
//         "use strict";

    
//     jQuery.validator.addMethod('answercheck', function (value, element) {
//         return this.optional(element) || /^\bcat\b$/.test(value)
//     }, "type the correct answer -_-");

//     // validate contactForm form
//     $(function() {
//         $('#contactForm').validate({
//             rules: {
//                 name: {
//                     required: true,
//                     minlength: 2
//                 },
//                 subject: {
//                     required: true,
//                     minlength: 4
//                 },
//                 number: {
//                     required: true,
//                     minlength: 5
//                 },
//                 email: {
//                     required: true,
//                     email: true
//                 },
//                 message: {
//                     required: true,
//                     minlength: 20
//                 }
//             },
//             messages: {
//                 name: {
//                     required: "come on, you have a name, don't you?",
//                     minlength: "your name must consist of at least 2 characters"
//                 },
//                 subject: {
//                     required: "come on, you have a subject, don't you?",
//                     minlength: "your subject must consist of at least 4 characters"
//                 },
//                 number: {
//                     required: "come on, you have a number, don't you?",
//                     minlength: "your Number must consist of at least 5 characters"
//                 },
//                 email: {
//                     required: "no email, no message"
//                 },
//                 message: {
//                     required: "um...yea, you have to write something to send this form.",
//                     minlength: "thats all? really?"
//                 }
//             },
//             submitHandler: function(form) {
//                 $(form).ajaxSubmit({
//                     type:"POST",
//                     data: $(form).serialize(),
//                     url:"https://api.web3forms.com/submit",
//                     success: function() {
//                         $('#contactForm :input').attr('disabled', 'disabled');
//                         $('#contactForm').fadeTo( "slow", 1, function() {
//                             $(this).find(':input').attr('disabled', 'disabled');
//                             $(this).find('label').css('cursor','default');
//                             $('#success').fadeIn()
//                             $('.modal').modal('hide');
// 		                	$('#success').modal('show');
//                         })
//                     },
//                     error: function() {
//                         $('#contactForm').fadeTo( "slow", 1, function() {
//                             $('#error').fadeIn()
//                             $('.modal').modal('hide');
// 		                	$('#error').modal('show');
//                         })
//                     }
//                 })
//             }
//         })
//     })
        
//  })(jQuery)
// })


const form = document.getElementById('contactForm');
const fname = document.getElementById('fname');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const message = document.getElementById('message');
const btn = form.querySelector('.primary_btn span');

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();

    if (isFormValid()) {
        btn.innerText = 'Sending...';
        form.submit();
        form.reset();
    }
});

const isFormValid = () => {
    return fname.parentElement.classList.contains('success') &&
           email.parentElement.classList.contains('success') &&
           phone.parentElement.classList.contains('success') &&
           message.parentElement.classList.contains('success');
}

const setError = (element, messages) => {
    const formgroup = element.parentElement;
    const errorDisplay = formgroup.querySelector('.error');

    errorDisplay.innerText = messages;
    formgroup.classList.add('error');
    formgroup.classList.remove('success');

}

const setSuccess = element => {
    const formgroup = element.parentElement;
    const errorDisplay = formgroup.querySelector('.error');


    errorDisplay.innerText = '';
    formgroup.classList.add('success');
    formgroup.classList.remove('error');
}

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const fnameValue = fname.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const messageValue = message.value.trim();

    if(fnameValue === '') {
        setError(fname, 'Please enter your name');
    }
    else if(fnameValue.length < 3) {
        setError(fname, 'Your name should contain atleast 3 characters')
    }
    else{
        setSuccess(fname);
    }

    if(emailValue === '') {
        setError(email, 'Please enter your email');
    }
    else if(!isValidEmail(emailValue)) {
        setError(email, 'Please enter a valid email');
    }
    else{
        setSuccess(email);
    }

    if(phoneValue === '') {
        setError(phone, 'Please enter your phone number');
    }
    else if(phoneValue.toString().length != 10) {
        setError(phone, 'Please enter exactly 10 digits.')
    }
    else{
        setSuccess(phone);
    }

    if(messageValue === '') {
        setError(message, 'Please enter your message');
    }
    else{
        setSuccess(message);
    }
};

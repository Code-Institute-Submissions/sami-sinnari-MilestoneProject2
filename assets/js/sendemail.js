//This code was thought by CI
function sendMail(contactForm) {
    emailjs.send("sami", "ms2-project", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.email.value,
        "from_number": contactForm.number.value,
        "request_message": contactForm.message.value,
    })
        .then(
            function () {
                let sentButton = document.getElementById('submit-btn');
                sentButton.style.backgroundColor = "green";
                sentButton.innerHTML = "Sent :)";
            },
            function (error) {
                alert("Sorry, it seems we have a problem. Please fill out the form and Submit again", error);
            });
            document.getElementById('contactForm').reset();
    return false;
}
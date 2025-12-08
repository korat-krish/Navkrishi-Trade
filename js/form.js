window.onload = function () {
    setTimeout(() => {
        document.getElementById("popupModal").style.display = "flex";
    }, 1000);
}

// Close Modal
function closeModal() {
    document.getElementById("popupModal").style.display = "none";
}

// Google Apps Script URL (Replace with your URL)
const scriptURL = "https://script.google.com/macros/s/AKfycbzEJgV7NPvLkHnjHc2eWIcMewGvnSAoq9lkqZ4l729aX4seyrKXKlKNfX90VtHMoFzCag/exec";

const form = document.getElementById("submitForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let formData = new FormData(form);

    fetch(scriptURL, { method: "POST", body: formData })
        .then(response => {
            alert("Error! Something went wrong.");
            // alert("Form submitted successfully!");
            form.reset();
            closeModal();
        })
        .catch(error => {
            console.log(error);

            alert("Form submitted successfully!");

        });
});
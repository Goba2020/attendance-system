
document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.getElementById("email");
    const notesInput = document.getElementById("notes");
    const form = document.getElementById("attendanceForm");
    const messageBox = document.getElementById("confirmationMessage");

    // Load saved email
    const savedEmail = localStorage.getItem("employeeEmail");
    if (savedEmail) emailInput.value = savedEmail;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const notes = notesInput.value.trim();

        if (!email) {
            messageBox.textContent = "يرجى إدخال البريد الإلكتروني";
            return;
        }

        localStorage.setItem("employeeEmail", email);

        if (!navigator.geolocation) {
            messageBox.textContent = "الموقع الجغرافي غير مدعوم";
            return;
        }

        navigator.geolocation.getCurrentPosition(position => {
            const data = {
                email: email,
                notes: notes,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };

            fetch("https://script.google.com/macros/s/AKfycbywBjznfzqlV5SOWCFFcWtz3mHhG1W4UrmPlBroYGKLFMn-HpACUFtYCxmvintd7xYh/exec", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(response => response.text())
            .then(result => {
                messageBox.textContent = "✅ تم تسجيل حضورك بنجاح";
                form.reset();
            })
            .catch(error => {
                console.error("Error!", error.message);
                messageBox.textContent = "حدث خطأ أثناء الإرسال";
            });
        }, () => {
            messageBox.textContent = "لم يتم السماح بالوصول إلى الموقع الجغرافي";
        });
    });
});

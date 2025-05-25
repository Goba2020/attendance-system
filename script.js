
const form = document.getElementById('attendance-form');
const scriptURL = 'YOUR_SCRIPT_URL';  // ضع هنا رابط Google Apps Script

if (localStorage.getItem("email")) {
  document.getElementById("email").value = localStorage.getItem("email");
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const employeeCode = document.getElementById('employeeCode').value;
  const name = document.getElementById('name').value;
  const notes = document.getElementById('notes').value;

  localStorage.setItem("email", email);

  navigator.geolocation.getCurrentPosition(position => {
    const location = `${position.coords.latitude},${position.coords.longitude}`;

    const data = {
      employeeCode,
      name,
      email,
      notes,
      location
    };

    fetch(scriptURL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.text())
    .then(msg => {
      document.getElementById('response').innerText = msg;
      form.reset();
    })
    .catch(error => {
      document.getElementById('response').innerText = "حدث خطأ أثناء الإرسال.";
      console.error(error);
    });
  });
});


document.getElementById("attendance-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const empCode = document.getElementById("empCode").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const notes = document.getElementById("notes").value;

  if (!navigator.geolocation) {
    alert("المتصفح لا يدعم تحديد الموقع الجغرافي.");
    return;
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    const location = position.coords.latitude + "," + position.coords.longitude;
    const now = new Date();
    const date = now.toLocaleDateString("ar-EG");
    const time = now.toLocaleTimeString("ar-EG");
    const transactionCode = Math.random().toString(36).substr(2, 9);

    const data = {
      "Transaction code": transactionCode,
      "Employee Code": empCode,
      "Name": name,
      "Email": email,
      "Check In": time,
      "Notes": notes,
      "Date": date,
      "Location": location,
    };

    fetch("https://script.google.com/macros/s/AKfycbxwE6BHM_IDbFFzk-SgTYDL8-1gz6Gk9T4X8v9-YPTpaT4ODwMiBLCvnAbqHEzbGeg4/exec", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => response.json())
    .then(result => {
      document.getElementById("success-message").textContent = "✅ تم تسجيل الحضور بنجاح!";
      document.getElementById("attendance-form").reset();
    })
    .catch(error => {
      alert("حدث خطأ أثناء الإرسال: " + error.message);
    });
  });
});

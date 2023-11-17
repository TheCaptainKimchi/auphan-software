document.getElementById("loginForm").onsubmit = function (e) {
  // Prevent the form from submitting by default
  e.preventDefault();

  // Capture result element
  const result = document.querySelector(".main__form-result");

  // Remove any pre-rendered classes/values
  result.textContent = "";
  result.classList.remove("error");
  result.classList.remove("success");

  // Expression to validate email
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  // Capture email and password values
  const email = document.querySelector(".main__form-email").value;
  const password = document.querySelector(".main__form-password").value;

  // Validate email

  // If email is validated, send request to PHP server
  if (emailRegex.test(email)) {
    // POST request to PHP server sending Email and Password as headers
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/server.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Email", email);
    xhr.setRequestHeader("Password", password);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        // If status returned successfull, display success message in result element
        if (xhr.status === 200) {
          result.classList.add("success");
          result.textContent = `Login Successful.`;

          // Handle error if any other response is returned
        } else {
          result.classList.add("error");
          result.textContent = `Incorrect Username/Password`;
        }
      }
    };

    const data = JSON.stringify({ email: email, password: password });
    xhr.send(data);

    // If email is not validated, display error message in result element
  } else {
    result.classList.add("error");
    result.textContent = "Invalid email. Please enter a valid email";
  }
};

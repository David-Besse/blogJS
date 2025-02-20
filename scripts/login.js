function initLoginPage() {
  console.log("init login page");

  emailInput = document.getElementById("email");
  passwordInput = document.getElementById("password");

  submitButton = document.querySelector('button[type="submit"]');
  submitButton.addEventListener("click", (event) => login(event));
}

async function login(event) {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const response = await fetch("http://localhost:8001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data) {
      accessToken = data.access_token;
      localStorage.setItem("accessToken", accessToken);
      console.log("accessToken:", accessToken);
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

initLoginPage();
function registerPage() {
  console.log("init register page");

  usernameInput = document.getElementById("username");
  emailInput = document.getElementById("email");
  passwordInput = document.getElementById("password");

  submitButton = document.querySelector('button[type="submit"]');
  submitButton.addEventListener("click", (event) => register(event));
}

async function getId() {
  const url = "http://localhost:8001/api/auth/me";

  try {
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();

    if (response.ok && data) {
      localStorage.setItem("blog_user_id", data);
      return data;
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

async function register(event) {
  event.preventDefault();

  const username = usernameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const url = "http://localhost:8001/api/auth/register";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data) {
      localStorage.setItem("user", data);
      console.log("user:", data);
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

registerPage();

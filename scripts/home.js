function initHomePage() {
  console.log("init");

  document.getElementById("loadHome").addEventListener("click", () => {
    loadPage("pages/home.html");
  });

  document.getElementById("loadConnexion").addEventListener("click", () => {
    loadPage("pages/login.html");
  });

  document.getElementById("loadInscription").addEventListener("click", () => {
    loadPage("pages/register.html");
  });

  document.getElementById("loadBlog").addEventListener("click", () => {
    loadPage("pages/blog.html");
  });
}

document.addEventListener("DOMContentLoaded", initHomePage());

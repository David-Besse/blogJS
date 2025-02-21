let emailInput;
let passwordInput;
let usernameInput;
let submitButton;
let accessToken;
let userId;
let articles;
let titleInput;
let contentInput;
let imageInput;

function loadPage(page) {
  // Enlever "pages/" et ".html" de l'URL
  const newUrl = page.replace("pages/", "").replace(".html", "");

  fetch(page)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
      }
      return response.text();
    })
    .then((html) => {
      document.getElementById("content").innerHTML = html;
      // Changer l'URL sans recharger la page
      history.pushState(null, "", newUrl);

      // Enlever les fichiers CSS précédents sauf "reset.css", "style.css" et celui de la page "home"
      const links = document.querySelectorAll("link[rel='stylesheet']");
      links.forEach((link) => {
        if (!link.href.includes("reset.css") && !link.href.includes("style.css") && !link.href.includes("home.css") && !link.href.includes(`${newUrl}.css`)) {
          document.head.removeChild(link);
        }
      });

      // Vérifier et charger le fichier CSS si nécessaire
      const cssLink = `styles/${newUrl}.css`;
      if (!document.querySelector(`link[href='${cssLink}']`)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = cssLink;
        document.head.appendChild(link);
      }

      // Enlever les scripts précédents sauf celui de la page "home"
      const scripts = document.querySelectorAll("script");
      scripts.forEach((script) => {
        if (!script.src.includes("home.js")) {
          document.body.removeChild(script);
        }
      });

      // Vérifier si le script home.js est déjà chargé
      if (newUrl === "home" && !document.querySelector("script[src='scripts/home.js']")) {
        const homeScript = document.createElement("script");
        homeScript.src = "scripts/home.js";
        homeScript.defer = true;
        document.body.appendChild(homeScript);
      } else if (newUrl !== "home") {
        // Charger le fichier JS pour d'autres pages
        const script = document.createElement("script");
        script.src = `scripts/${newUrl}.js`;
        script.defer = true;

        // Vérifier si le script est déjà chargé
        if (!document.querySelector(`script[src='${script.src}']`)) {
          document.body.appendChild(script);
        }
      }
    })
    .catch((error) => {
      console.error("Erreur lors du chargement de la page :", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  loadPage("pages/home.html");
});

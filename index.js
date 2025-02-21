let emailInput;
let passwordInput;
let usernameInput;
let submitButton;
let accessToken;
let userId;
let article;
let articles;
let titleInput;
let contentInput;
let imageInput;
let articleTitle;
let articleContent;
let articleImage;
let articleId;
let articleDate;
let articleAuthor;
let newTitleInput;
let newContentInput;
let newImageInput;
let postForm;

function loadPage(page) {
  let newUrl;

  // Modifier l'URL en fonction de la page chargée
  switch (page) {
    case "pages/home.html":
      newUrl = "home";
      break;
    case "pages/blog.html":
      newUrl = "blog";
      break;
    case "pages/article.html":
      newUrl = "article";
      break;
    case "pages/login.html":
      newUrl = "login";
      break;
    case "pages/register.html":
      newUrl = "register";
      break;
    case "pages/create-post.html":
      newUrl = "create-post";
      break;
    case "pages/edit-post.html":
      newUrl = "edit-post";
      break;
    default:
      newUrl = page;
      break;
  }

  let postId;
  let urlParams;
  if (newUrl.includes("article")) {
    urlParams = new URLSearchParams(window.location.search);
    postId = urlParams.get("postId");
    if (postId) {
      history.pushState(null, "", `article?postId=${postId}`);
    }
  }

  if (newUrl.includes("edit-post")) {
    urlParams = new URLSearchParams(window.location.search);
    postId = urlParams.get("postId");
    if (postId) {
      history.pushState(null, "", `edit-post?postId=${postId}`);
    }
  }

  fetch(page)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
      }
      return response.text();
    })
    .then((html) => {
      document.getElementById("content").innerHTML = html;

      // Modifier l'URL après le chargement de la page
      if (postId) {
        if (newUrl.includes("edit-post")) {
          history.pushState(null, "", `edit-post?postId=${postId}`);
        }
        if (newUrl.includes("article")) {
          history.pushState(null, "", `article?postId=${postId}`);
        }
      } else {
        history.pushState(null, "", newUrl);
      }

      // Enlever les fichiers CSS précédents sauf "reset.css", "style.css" et celui de la page "home"
      const links = document.querySelectorAll("link[rel='stylesheet']");
      links.forEach((link) => {
        if (
          !link.href.includes("reset.css") &&
          !link.href.includes("style.css") &&
          !link.href.includes("home.css") &&
          !link.href.includes(`${newUrl}.css`)
        ) {
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
      if (
        newUrl === "home" &&
        !document.querySelector("script[src='scripts/home.js']")
      ) {
        const homeScript = document.createElement("script");
        homeScript.src = "scripts/home.js";
        homeScript.defer = true;
        document.body.appendChild(homeScript);
      } else if (newUrl !== "home") {
        // Charger le fichier JS pour d'autres pages
        const script = document.createElement("script");
        console.log(`scripts/${newUrl}.js`);
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

document.addEventListener("DOMContentLoaded", loadPage("pages/home.html"));

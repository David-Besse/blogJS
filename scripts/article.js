async function initArticlePage() {
  console.log("init article page");

  const articleContainer = document.querySelector(".article-content");
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("postId");

  if (!postId) {
    console.error("Aucun ID d'article trouvé dans l'URL.");
    return;
  }

  article = await getPost(postId);

  if (article) {
    articleContainer.innerHTML = `
            <h1 class="article-title">${article.title}</h1>
            <p class="article-author">Auteur : ${article.author.username}</p>
            <p class="article-author">Email : ${article.author.email}</p>
            <p class="article-date">Date : ${new Date(
              article.author.created_at
            ).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</p>
            <section class="article-introduction">
                <h2 class="introduction-title">Introduction</h2>
                <p class="introduction-text">${article.content}</p>
                <img class="article-image" src="${
                  article.image_url
                }" alt="Image de l'article">
            </section>
            <button id="editButton" data-id="${
              article.id
            }">Modifier cet article</button>
          `;

    const editButton = document.getElementById("editButton");
    editButton.addEventListener("click", () => {
      const postId = editButton.getAttribute("data-id");
      window.history.pushState(null, "", `edit-post?postId=${postId}`);
      loadPage(`pages/edit-post.html`);
    });
  }
}

async function getPost(postId) {
  const url = `http://localhost:8001/api/posts/${postId}`;

  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

document.addEventListener("DOMContentLoaded", initArticlePage());

// scripts/edit-post.js
async function initEditPostPage() {
  console.log("init edit post page");

  const postId = getPostIdFromUrl();
  const postData = await fetchPostData(postId);
  populateForm(postData);

  const editForm = document.getElementById("editForm");
  editForm.addEventListener("submit", (event) => updatePost(event, postId));
}

async function fetchPostData(postId) {
  const url = `http://localhost:8001/api/posts/${postId}`;
  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

function populateForm(postData) {
  document.getElementById("newtitle").value = postData.title;
  document.getElementById("newcontent").value = postData.content;
  document.getElementById("newimage").value = postData.image_url;
}

async function updatePost(event, postId) {
  event.preventDefault();

  const editForm = document.getElementById("editForm");
  const dataToSend = new FormData(editForm);
  const accessToken = localStorage.getItem("accessToken");
  const url = `http://localhost:8001/api/posts/${postId}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        title: dataToSend.get("newtitle"),
        content: dataToSend.get("newcontent"),
        image_url: dataToSend.get("newimage"),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    alert("Article modifié avec succès !");
    loadPage("pages/blog.html");
  } catch (error) {
    console.error("Erreur lors de la modification de l'article :", error);
  }
}

document.addEventListener("DOMContentLoaded", initEditPostPage);

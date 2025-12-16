let editingPostId = null; // Для отслеживания редактируемого поста

function loadPosts() {
  $.get("/items", data => {
    $("#posts").empty();

    data.forEach(p => {
      $("#posts").append(`
        <li style="margin-bottom:20px;">
          <b>${p.title}</b><br>
          <i>Author: ${p.author}</i><br>
          <p>${p.content}</p>

          <button onclick="editPost(${p.id}, 
            '${p.title.replace(/'/g, "\\'")}', 
            '${p.author.replace(/'/g, "\\'")}', 
            '${p.content.replace(/'/g, "\\'")}')">
            Edit
          </button>

          <button onclick="deletePost(${p.id})">
            Delete
          </button>
        </li>
      `);
    });
  });
}

function createPost() {

  const postData = {
    title: $("#title").val(),
    author: $("#author").val(),
    content: $("#content").val()
  };

  // UPDATE, если редактируем пост
  if (editingPostId !== null) {
    $.ajax({
      url: "/items/" + editingPostId,
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(postData),
      success: () => {
        editingPostId = null;
        clearForm();
        loadPosts();
      }
    });
  }
  // CREATE, если новый пост
  else {
    $.ajax({
      url: "/items",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(postData),
      success: () => {
        clearForm();
        loadPosts();
      }
    });
  }
}

function editPost(id, title, author, content) {
  $("#title").val(title);
  $("#author").val(author);
  $("#content").val(content);

  editingPostId = id;
}

function deletePost(id) {
  $.ajax({
    url: "/items/" + id,
    type: "DELETE",
    success: loadPosts
  });
}

function clearForm() {
  $("#title").val("");
  $("#author").val("");
  $("#content").val("");
}

// Загрузка постов при старте
$(document).ready(function() {
  loadPosts();
});

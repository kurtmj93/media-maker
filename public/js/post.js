// handler for a new post form
const newPostForm = async function(event) {
    event.preventDefault();

    const newPost = document.querySelector('textarea[name="post-text"]').value;
  
    await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        text: newPost,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    document.location.reload();
  
};
  
  document
    .querySelector('#new-post-form')
    .addEventListener('submit', newPostForm);
  
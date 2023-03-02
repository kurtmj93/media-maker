const postId = document.querySelector('input[name="post-id"]').value;

const deletePost = async function() {
  await fetch(`/api/posts/${postId}`, {
    method: 'DELETE'
  });

  document.location.reload();

};

document
  .querySelector('#delete')
  .addEventListener('click', deletePost);
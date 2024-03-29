 //const commentButton = document.querySelector('#commentButton');

const newCommentHandler = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector('#comment_text').value.trim();
    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
    console.log(comment_text, post_id)
    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment_text: comment_text, post_id: post_id }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            console.log(response)
            document.location.reload();
        } else {
            alert('could not create comment')
        }
    }
};

document.querySelector('#commentButton').addEventListener('click', newCommentHandler);
const editPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim()
    const post_text = document.querySelector('#post-content').value.trim()

    if(title && post_text) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: title,
                post_text: post_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(response.ok) {
            console.log('Response OK!')
            document.location.replace(`/post/${id}`)
        } else {
            alert('could not update post')
        }
    }
};

document.querySelector('#edit-post-form').addEventListener('submit', editPostHandler)
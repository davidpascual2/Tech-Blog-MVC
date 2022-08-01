const newFormHandler = async (event) => {
    event.preventDefault(); 

    const title = document.querySelector('#post-title').value.trim(); //add correct variable
    const post_text = document.querySelector('#post-content').value.trim(); // add correct variable

    if(title && post_text) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                post_text: post_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.btn').addEventListener('submit', newFormHandler)
// Function to add a new comment with response to the list
function addCommentWithResponse(comment, response) {
    var commentList = document.getElementById("commentList");
    var li = document.createElement("li");
    li.textContent = "User: " + comment;
    commentList.appendChild(li);

    var responseLi = document.createElement("li");
    responseLi.textContent = "ChatGPT: " + response;
    responseLi.classList.add("response");
    commentList.appendChild(responseLi);
}

// Function to handle form submission
document.getElementById("commentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var commentInput = document.getElementById("commentInput");
    var commentText = commentInput.value.trim();

    if (commentText !== "") {
        // Add user's query to the list
        var commentList = document.getElementById("commentList");
        var li = document.createElement("li");
        li.textContent = "User: " + commentText;
        commentList.appendChild(li);

        // Call the ChatGPT API to get response
        console.log("Sending request to ChatGPT API...");
        fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo-instruct',
                prompt: commentText,
                max_tokens: 50
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Received response from ChatGPT API:", data);
            if (data && data.choices && data.choices.length > 0 && data.choices[0].text) {
                // Add ChatGPT's response to the list
                var responseLi = document.createElement("li");
                responseLi.textContent = "ChatGPT: " + data.choices[0].text.trim();
                responseLi.classList.add("response");
                commentList.appendChild(responseLi);
            } else {
                console.error("Error: Unable to get valid response from ChatGPT API.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });

        commentInput.value = "";
    }
});

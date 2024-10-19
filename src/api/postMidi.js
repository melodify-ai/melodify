function makeApiCall(url, method) {
  fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: { test: "test" },
  })
    .then((response) => response.json())
    .then((data) => {
      post("API response: " + JSON.stringify(data) + "\n");
    })
    .catch((error) => {
      post("Error: " + error + "\n");
    });
}

// Call this function when the patch sends a message
function bang() {
  // Example URL and method, modify with your API endpoint and method (GET/POST)
  var url = "https://127.0.0.1/midi";
  var method = "GET"; // Change this if needed to "POST", "PUT", etc.

  makeApiCall(url, method);
}

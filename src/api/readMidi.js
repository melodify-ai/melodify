const Max = require("max-api");

Max.addHandler("bang", () => {
  const data = {
    message: "Hello, Flask!",
    user: "Max Kessler",
  };

  fetch("http://127.0.0.1:5000/post-json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      // Send the response back to Max console
      Max.post("Response from server: " + JSON.stringify(json));
    })
    .catch((error) => {
      Max.post("Error: " + error);
    });
});

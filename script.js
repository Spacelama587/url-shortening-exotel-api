const accountSid = "";
const apiKey = "";
const apiToken = "";
const subdomain = "";

function shortenUrl() {
  const longUrl = document.getElementById("longUrl").value;

  const requestBody = {
    links: [
      {
        long_url: longUrl,
        expire_in: 100,
        tracking: true,
        callback_url: longUrl,
      },
    ],
  };

  const url = "http://localhost:3000/shorten-url"; // Update to your server endpoint

  fetch(url, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${apiKey}:${apiToken}`)}`,
    }),
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      const shortUrlData = data.response[0].data;
      displayShortenedUrl(shortUrlData.short_url);
    })
    .catch((error) => {
      console.error("Error:", error.message);
      displayShortenedUrl("Error occurred while shortening URL.");
    });
}

function displayShortenedUrl(shortUrl) {
  const shortenedUrlContainer = document.getElementById("shortenedUrl");
  shortenedUrlContainer.innerHTML = `<p>Shortened URL: <a href="${shortUrl}" target="_blank">${shortUrl}</a></p>`;
}

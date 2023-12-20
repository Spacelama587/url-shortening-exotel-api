const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch").default; // Use .default to access the default export

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.post("/shorten-url", async (req, res) => {
  const apiKey = "bfbdbc6c0b456fd06de0d03c9b69daeae579fa8e6f51e53f";
  const apiToken = "22d3b0bb76b7407fc7da2c6bf14cc39b6fa749e10d070fa9";
  const accountSid = "globaluniversehouseofmoney1";

  const url = `https://api.exotel.com/v2/accounts/${accountSid}/links`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${apiKey}:${apiToken}`).toString(
          "base64"
        )}`,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

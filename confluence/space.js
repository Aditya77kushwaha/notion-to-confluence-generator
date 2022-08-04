import fetch from "node-fetch";
import "dotenv/config";

const token = process.env.CONF_TOKEN;

fetch("https://adityakushwaha.atlassian.net/wiki/rest/api/space", {
  method: "GET",
  headers: {
    Authorization: `Basic ${token}`,
    Accept: "application/json",
  },
})
  .then((response) => {
    console.log(`Response: ${response.status} ${response.statusText}`);
    return response.text();
  })
  .then((text) => console.log(text))
  .catch((err) => console.error(err));

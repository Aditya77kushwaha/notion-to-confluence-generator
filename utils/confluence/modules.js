import fetch from "node-fetch";
import "dotenv/config";

const token = process.env.CONF_TOKEN;

fetch(
  "https://adityakushwaha.atlassian.net/atlassian-connect/1/app/module/dynamic",
  {
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
)
  .then((response) => {
    console.log(`Response: ${response.status} ${response.statusText}`);
    return response.text();
  })
  .then((text) => console.log(text))
  .catch((err) => console.error(err));

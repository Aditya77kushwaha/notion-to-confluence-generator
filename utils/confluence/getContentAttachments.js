import fetch from "node-fetch";
import "dotenv/config";

const token = process.env.CONF_TOKEN;

export const getAttachment = (id) => {
  fetch(
    `https://adityakushwaha.atlassian.net/wiki/rest/api/content/${id}/child/attachment`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${token}`,
        Accept: "application/json",
      },
    }
  )
    .then((response) => {
      console.log(`Response: ${response.status} ${response.statusText}`);
      return response.text();
    })
    .then((text) => console.log(text))
    .catch((err) => console.error(err));
};

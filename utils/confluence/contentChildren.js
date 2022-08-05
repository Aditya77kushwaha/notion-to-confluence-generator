import fetch from "node-fetch";
import "dotenv/config";

const token = process.env.CONF_TOKEN;
const id = process.env.id;

export const getChildrenById = (id) => {
  fetch(
    `https://adityakushwaha.atlassian.net/wiki/rest/api/content/${id}/child`,
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

export const getChildrenByIdAndType = (id,type) => {
  fetch(
    `https://adityakushwaha.atlassian.net/wiki/rest/api/content/${id}/child/${type}`,
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

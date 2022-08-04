import fetch from "node-fetch";
import "dotenv/config";

const token = process.env.CONF_TOKEN;

//get by id
export const getProp = (id) => {
  fetch(
    `https://adityakushwaha.atlassian.net/wiki/rest/api/content/${id}/property`,
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

//post
// const bodyData = `{
//   "key": "new property",
//   "value": [
//     "editor"
//   ]
// }`;

export const createProp = (bodyData,id) => {
  fetch(
    `https://adityakushwaha.atlassian.net/wiki/rest/api/content/${id}/property`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: bodyData,
    }
  )
    .then((response) => {
      console.log(`Response: ${response.status} ${response.statusText}`);
      return response.text();
    })
    .then((text) => console.log(text))
    .catch((err) => console.error(err));
};

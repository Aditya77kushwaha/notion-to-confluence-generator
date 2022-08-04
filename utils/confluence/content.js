import fetch from "node-fetch";
import "dotenv/config";

const token = process.env.CONF_TOKEN;

// get all
export const getAll = () => {
  fetch("https://adityakushwaha.atlassian.net/wiki/rest/api/content", {
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
};

// by ID
export const getById = (id) => {
  fetch(`https://adityakushwaha.atlassian.net/wiki/rest/api/content/${id}`, {
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
};

// convert formats
export const convertFormats = (bodyData) => {
  fetch(
    "https://adityakushwaha.atlassian.net/wiki/rest/api/contentbody/convert/view",
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
// const bodyData = `{
//   "value": "newContent",
//   "representation": "editor"
// }`;



// create
export const createContent = (bodyData) => {
  fetch("https://adityakushwaha.atlassian.net/wiki/rest/api/content", {
    method: "POST",
    headers: {
      Authorization: `Basic ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: bodyData,
  })
    .then((response) => {
      console.log(`Response: ${response.status} ${response.statusText}`);
      return response.text();
    })
    .then((text) => console.log(text))
    .catch((err) => console.error(err));
};

// const bodyData = `{
//   "id": "34565",
//   "title": "New content",
//   "type": "page",
//   "space": {
//     "id": 196612,
//     "name": "notion-to-confluence",
//     "icon": {
//       "path": "",
//       "width": 2154,
//       "height": 2154,
//       "isDefault": true
//     },
//     "identifiers": {
//       "spaceIdentifier": ""
//     },
//     "description": {
//       "plain": {
//         "value": "Hello world",
//         "representation": "plain",
//         "embeddedContent": [
//           {}
//         ]
//       }
//     }
// }`;
import Confluence from "confluence-api";
import "dotenv/config";

const config = {
  username: "adityakushwaha@gmail.com",
  password: process.env.CONF_API,
  baseUrl: `https://adityakushwaha.atlassian.net/wiki`,
  version: 4, // Confluence major version, optional
};

// console.log(process.env.user, process.env.CONF_API, process.env.domain);

const confluence = new Confluence(config);

//  confluence.getContentByPageTitle(
//   "notion-to-confluence",
//   "Weekend Destinations",
//   function (err, data) {
//     // do something interesting with data; for instance,
//     // data.results[0].body.storage.value contains the stored markup for the first
//     // page found in space 'space-name' matching page title 'page-title'
//     console.log(data);
//     // return data;
//   }
// );

export const postContent = (spaceName, title, content, parentId) => {
  let res = null;
  confluence.postContent(
    spaceName,
    title,
    content,
    parentId,
    function (err, data) {
      if (err) res = err;
      // console.log(data);
      res = data;
    }
  );
  console.log(res);
};

// import fetch from "node-fetch";
// import "dotenv/config";

// const token = process.env.CONF_TOKEN;

// // get all
// export const getAll = () => {
//   fetch("https://adityakushwaha.atlassian.net/wiki/rest/api/content", {
//     method: "GET",
//     headers: {
//       Authorization: `Basic ${token}`,
//       Accept: "application/json",
//     },
//   })
//     .then((response) => {
//       console.log(`Response: ${response.status} ${response.statusText}`);
//       return response.text();
//     })
//     .then((text) => console.log(text))
//     .catch((err) => console.error(err));
// };

// // by ID
// export const getById = (id) => {
//   fetch(`https://adityakushwaha.atlassian.net/wiki/rest/api/content/${id}`, {
//     method: "GET",
//     headers: {
//       Authorization: `Basic ${token}`,
//       Accept: "application/json",
//     },
//   })
//     .then((response) => {
//       console.log(`Response: ${response.status} ${response.statusText}`);
//       return response.text();
//     })
//     .then((text) => console.log(text))
//     .catch((err) => console.error(err));
// };

// // convert formats
// export const convertFormats = (bodyData) => {
//   fetch(
//     "https://adityakushwaha.atlassian.net/wiki/rest/api/contentbody/convert/view",
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Basic ${token}`,
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: bodyData,
//     }
//   )
//     .then((response) => {
//       console.log(`Response: ${response.status} ${response.statusText}`);
//       return response.text();
//     })
//     .then((text) => console.log(text))
//     .catch((err) => console.error(err));
// };
// // const bodyData = `{
// //   "value": "newContent",
// //   "representation": "editor"
// // }`;

// // create
// export const createContent = (bodyData) => {
//   fetch("https://adityakushwaha.atlassian.net/wiki/rest/api/content", {
//     method: "POST",
//     headers: {
//       Authorization: `Basic ${token}`,
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: bodyData,
//   })
//     .then((response) => {
//       console.log(`Response: ${response.status} ${response.statusText}`);
//       return response.text();
//     })
//     .then((text) => console.log(text))
//     .catch((err) => console.error(err));
// };

// // const bodyData = `{
// //   "id": "34565",
// //   "title": "New content",
// //   "type": "page",
// //   "space": {
// //     "id": 196612,
// //     "name": "notion-to-confluence",
// //     "icon": {
// //       "path": "",
// //       "width": 2154,
// //       "height": 2154,
// //       "isDefault": true
// //     },
// //     "identifiers": {
// //       "spaceIdentifier": ""
// //     },
// //     "description": {
// //       "plain": {
// //         "value": "Hello world",
// //         "representation": "plain",
// //         "embeddedContent": [
// //           {}
// //         ]
// //       }
// //     }
// // }`;

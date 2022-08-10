import "dotenv/config";
import express from "express";
import { Client } from "@notionhq/client";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const token = process.env.CONF_TOKEN;

const notion = new Client({ auth: process.env.NOTION_KEY });

app.post("/", async (req, res) => {
  try {
    const response = await notion.blocks.children.list({
      block_id: req.body.pageId,
      page_size: 50,
    });
    let myHtml = "",
      firstNL = true,
      myTable = "";

    await Promise.all(
      response.results.map(async (block) => {
        if (block.type === "numbered_list_item") {
          if (firstNL) {
            myHtml += `<ol>`;
            firstNL = false;
          }
          myHtml += `<li>${block.numbered_list_item.rich_text[0]?.plain_text}</li>`;
        } else {
          if (!firstNL) {
            myHtml += `</ol>`;
            firstNL = true;
          }
          if (block.type === "paragraph") {
            if (block.paragraph.rich_text[0]?.plain_text) {
              myHtml += `<p>${block.paragraph.rich_text[0]?.plain_text}</p>`;
            } else {
              myHtml += `<p> </p>`;
            }
          }
          // if( "to_do"){
          //   myHtml += `<li>${block.to_do.rich_text[0]?.plain_text}</li>`;
          //   }
          if (block.type === "bulleted_list_item") {
            myHtml += `<li>${block.bulleted_list_item.rich_text[0]?.plain_text}</li>`;
          }
          if (block.type === "table") {
            // console.log("table is", block);
            const tableResponse = await notion.blocks.children.list({
              block_id: block.id,
              page_size: 50,
            });
            myTable += `<table><tbody>`;
            // console.log(tableResponse.results);

            await Promise.all(
              tableResponse.results.map(async (tableBlock) => {
                // console.log(tableBlock.table_row.cells.flat());
                let i = 0;
                let j = true;
                tableBlock.table_row.cells.flat().forEach((cell) => {
                  // console.log(cell.plain_text);
                  if (i === 0) myTable += `<tr>`;
                  if (j) {
                    // j = false;
                    // myTable += `<th>${cell.plain_text}</th>`;
                    myTable += `<td>${cell.plain_text}</td>`;
                    i++;
                    if (i === block.table.table_width) {
                      i = 0;
                      // j = false;
                      myTable += `</tr>`;
                    }
                  } else {
                    myTable += `<td>${cell.plain_text}</td>`;
                    i++;
                    if (i === block.table.table_width) {
                      i = 0;
                      myTable += `</tr>`;
                    }
                  }
                });
              })
            );
            myTable += `</tbody></table>`;

            // console.log(myTable);
            // console.log(tableResponse.results[0].table_row.cells[0]);
          } else {
            // console.log(block);
          }
        }
      })
    );
    myHtml += myTable;
    // console.log(myHtml);
    // console.log(myTable);
    const bodyData = `{
                "space": {
                  "key": "${req.body.spaceKey}"
                },
                "type": "page",
                "title": "${req.body.title}",
                "body": {
                  "storage": {
                    "value": "${myHtml}",
                    "representation": "storage"
                  }
                  }
              }`;
    fetch("https://adityakushwaha.atlassian.net/wiki/rest/api/content/", {
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
      .then((text) => {
        res.status(200).json(text);
      })
      .catch((err) => res.status(500).json(err));
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(8800, () => {
  console.log("Server running on port 8800");
});

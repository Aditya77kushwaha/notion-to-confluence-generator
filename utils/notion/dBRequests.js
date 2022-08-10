import { Client } from "@notionhq/client";
import "dotenv/config";

const notion = new Client({ auth: process.env.NOTION_KEY });

// console.log(process.env.NOTION_KEY, process.env.NOTION_DATABASE_ID);
//test : new notion add item request
export const addItem = async (text, id) => {
  try {
    const response = await notion.pages.create({
      parent: { database_id: id },
      properties: {
        title: {
          title: [
            {
              text: {
                content: text,
              },
            },
          ],
        },
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.body);
    return error.body;
  }
};

// addItem("new item added", process.env.NOTION_DATABASE_ID);

//test : gets a dB in a page based on filters
export const getdBFilter = async (id) => {
  const response = await notion.databases.query({
    database_id: id,
    filter: {
      or: [
        {
          property: "In stock",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "Cost of next trip",
          number: {
            greater_than_or_equal_to: 2,
          },
        },
      ],
    },
    sorts: [
      {
        property: "Last ordered",
        direction: "ascending",
      },
    ],
  });
  console.log(response);
  return response;
};

//test : retrieve whole dB
export const getdB = async (id) => {
  const response = await notion.databases.retrieve({ database_id: id });
  console.log("dB", response);
  return response;
};

// getdB(process.env.NOTION_DATABASE_ID)

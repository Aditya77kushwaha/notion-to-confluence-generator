import { Client } from "@notionhq/client"
import 'dotenv/config'

const notion = new Client({ auth: process.env.NOTION_KEY })

const databaseId = process.env.NOTION_DATABASE_ID

//test : new notion add item request
async function addItem(text) {
    try {
        const response = await notion.pages.create({
            parent: { database_id: databaseId },
            properties: {
                title: {
                    title: [
                        {
                            "text": {
                                "content": text
                            }
                        }
                    ]
                }
            },
        })
        console.log(response)
        console.log("Success! Entry added.")
    } catch (error) {
        console.error(error.body)
    }
}

// addItem("Yurts in Big Sur, California")


//test : gets a dB in a page based on filters
async function getdB() {
    const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
            or: [
                {
                    property: 'In stock',
                    checkbox: {
                        equals: true,
                    },
                },
                {
                    property: 'Cost of next trip',
                    number: {
                        greater_than_or_equal_to: 2,
                    },
                },
            ],
        },
        sorts: [
            {
                property: 'Last ordered',
                direction: 'ascending',
            },
        ],
    });
    console.log(response);
};


//test : retrieve whole dB 
const response = await notion.databases.retrieve({ database_id: databaseId });
console.log(response);
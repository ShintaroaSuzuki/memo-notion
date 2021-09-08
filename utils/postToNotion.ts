import { PostArgument } from '../types';
import { Client } from '@notionhq/client';
import { Block } from '@notionhq/client/build/src/api-types';
import emojis from './emojis';

export const postToNotion = ({ pageId, token, title, body }: PostArgument) => {
    const notion = new Client({
        auth: token
    });
    notion.pages.create({
        parent: {
            page_id: pageId
        },
        icon: {
            type: 'emoji',
            emoji: emojis.random()
        },
        properties: {
            title: [
                {
                    type: 'text',
                    text: { content: title }
                }
            ] as any
        },
        children: [
            {
                type: 'paragraph',
                paragraph: {
                    text: [
                        {
                            type: 'text',
                            text: {
                                content: body,
                                link: undefined
                            }
                        }
                    ]
                }
            }
        ] as Block[]
    });
};
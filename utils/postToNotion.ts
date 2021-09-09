import { PostArgument } from '../types';
import { Client } from '@notionhq/client';
import { Block } from '@notionhq/client/build/src/api-types';
import emojis from './emojis';

//secret_hCSKm1ChCz2QpH1hEQ7TH01Rdh7ghrv6LTuBE5TY7x
//8067fa92c8ac46a08483bceeb4a1020e

export const postToNotion = async ({
    pageId,
    token,
    title,
    body
}: PostArgument) => {
    const notion = new Client({
        auth: token
    });
    try {
        const responce = await notion.pages.create({
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
    } catch (error: any) {
        if (error.name == 'APIResponseError') {
            return 'APIResponseError';
        }
    }
};

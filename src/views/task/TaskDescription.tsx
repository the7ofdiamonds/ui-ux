import React, { useEffect, useState } from 'react'

import { marked } from 'marked';

import { Task } from '@/model/Task'

import styles from './Task.module.scss';

type TaskDescriptionProps = {
    task: Task;
}

export const TaskDescription: React.FC<TaskDescriptionProps> = ({ task }) => {
    const [html, setHTML] = useState<string | object | null>(null);

    const getHTMLFrom = async (markdown: string) => {
        const cleaned = markdown
            .split("\n")
            .filter(line => !line.trim().match(/^- \[[ xX]\]/))
            .join("\n");
        const htmlContent = await marked.parse(cleaned);

        return htmlContent;
    }

    useEffect(() => {
        if (task?.description) {
            const cleanHTML = async (html: string) => {
                try {
                    const htmlContent = await getHTMLFrom(html);
                    if (typeof htmlContent === "string") {
                        setHTML(htmlContent);
                    }
                } catch (error) {
                    console.error(error)
                }
            }
            cleanHTML(task.description)
        }
    }, [task?.description]);

    return (<>{html && html != "" && (
        <div className={styles['content-html']} dangerouslySetInnerHTML={{ __html: html }}></div>
    )}</>)
}
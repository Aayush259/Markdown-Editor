import React, { useCallback, useEffect, useState } from 'react';
import { useTextContext } from '../context/TextContext.jsx';
import useReg from '../hooks/useReg.js';

export default function Preview() {

    // Getting text from textContext.
    const { text } = useTextContext();

    // State for converted markdown text.
    const [markDown, setMarkDown] = useState('');

    // const newLineReg = useReg(/\r?\n/);  // Regex for new line.
    const headingReg = useReg(/^(#{1,6})\s(.*)$/gm);    // Regex for heading tags.
    const unorderedListReg = useReg(/^-{1}\s/gm);  // Regex for unordered list.
    const boldReg = useReg(/\*{2}(.*?)\*{2}/g);   // Regex for bold/strong.
    const italicReg = useReg(/\*{1}(.*?)\*{1}/g);    // Regex for italic/em.
    const strikeThroughReg = useReg(/~{2}(.*?)~{2}/g);   // Regex for strike through.
    const linkReg = useReg(/\[(.*?)\]\((.*?)\)/g);    // Regex for links.
    const imgReg = useReg(/!\[(.*?)\]\((.*?)\)/g);    // Regex for images.
    const hrReg = useReg(/^(-{3})/gm);    // Regex for horizontal ruler.
    const inLinkCodeReg = useReg(/`([^`]*)`/g);     // Regex for inline code.

    // This function converts the text in the markdown format and returns it.
    const convertToMarkdown = useCallback(() => {

        if (!text) {
            setMarkDown('');
            return;
        };

        let result = text;

        // Tailwind CSS classes for all heading tags.
        const headingSize = {
            1: 'text-4xl',
            2: 'text-3xl',
            3: 'text-2xl',
            4: 'text-xl',
            5: '',
            6: 'text-sm',
        };

        // Heading formatting.
        result = result.replace(headingReg, (match, p1) => {
            const level = p1.length;
            const content = match.slice(level + 1).trim();
            return `<h${level} class="${headingSize[level]} ml-1 mt-5 mb-4 font-bold">${content}</h${level}>`
        });

        // Unordered list formatting.
        result = result.replace(unorderedListReg, '<li class="ml-4 before:mr-[-10px]"$1</li>');
        
        // Bold Formatting.
        result = result.replace(boldReg, '<strong>$1</strong>');

        // Italic Formatting.
        result = result.replace(italicReg, '<em>$1</em>');
        
        // Strike through Formatting.
        result = result.replace(strikeThroughReg, '<del>$1</del>');

        // Image formatting.
        result = result.replace(imgReg, '<img class="max-w-full" src="$2" alt="$1" />');

        // Link formatting.
        result = result.replace(linkReg, '<a class="text-sky-400 hover:underline underline-offset-2" href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

        // Inline code formatting.
        result = result.replace(inLinkCodeReg, '<span class="text-slate-200 bg-slate-800 px-2 py-[2px] rounded-full">$1</span>');
        
        // Horizontal ruler formatting.
        result = result.replace(hrReg, '<hr />');

        // Updating markDown state.
        setMarkDown(result);
    }, [text, setMarkDown]);

    // Convert the text into markdown when actual text changes.
    useEffect(() => {
        convertToMarkdown();
    }, [text]);

    return (
        <div className="flex-1 p-2 h-[100vh] overflow-y-auto whitespace-pre-wrap" dangerouslySetInnerHTML={{__html: markDown}}></div>
    );
};

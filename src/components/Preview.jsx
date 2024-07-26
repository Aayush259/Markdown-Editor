import React, { useCallback, useEffect, useState } from 'react';
import { useTextContext } from '../context/TextContext.jsx';
import useReg from '../hooks/useReg.js';

export default function Preview() {

    // Getting text from textContext.
    const { text } = useTextContext();

    // State for converted markdown text.
    const [markDown, setMarkDown] = useState([]);

    const newLineReg = useReg(/\r?\n/);  // Regex for new line.
    const headingReg = useReg(/^(#{1,6})\s/);    // Regex for heading tags.
    const unorderedListReg = useReg(/^-{1}\s/);  // Regex for unordered list.
    const boldReg = useReg(/\*{2}(.*?)\*{2}/g);   // Regex for bold/strong.
    const italicReg = useReg(/\*{1}(.*?)\*{1}/g);    // Regex for italic/em.
    const strikeThroughReg = useReg(/~{2}(.*?)~{2}/g);   // Regex for strike through.
    const linkReg = useReg(/\[(.*?)\]\((.*?)\)/g);    // Regex for links.
    const imgReg = useReg(/!\[(.*?)\]\((.*?)\)/g);    // Regex for images.
    const hrReg = useReg(/^(-{3})/g);    // Regex for horizontal ruler.
    const inLinkCodeReg = useReg(/`([^`]+)`/g);     // Regex for inline code.

    // This function converts the text in the markdown format and returns it.
    const convertToMarkdown = useCallback(() => {

        // Declaring an array which will hold all the lines in the input text.
        let linesInText = [];
        
        // If text is present and not NULL, then split the input text from newline character and assign it to linesInText.
        if (text) {
            linesInText = text.split(newLineReg).map((string) => string.trim());
        }

        // Updating linesInText with JSX of their respective lines.
        linesInText = linesInText.map((line) => {
            
            // If heading matched, then return the heading JSX.
            if (line.match(headingReg)) {
                const headingMatch = line.match(headingReg);
                const level = headingMatch[1].length;   // Getting heading level.
                const content = line.slice(level + 1).trim();   // Getting actual content.
                const HeadingTag = `h${level}`; // Getting heading tag based on its level.

                // Talwind CSS classes for all heading tags.
                const headingSize = {
                    1: 'text-4xl',
                    2: 'text-3xl',
                    3: 'text-2xl',
                    4: 'text-xl',
                    5: '',
                    6: 'text-sm'
                };

                // Returning respective heading tag with its content.
                return <HeadingTag className={`${headingSize[level]} ml-1 mt-5 mb-4 font-bold`}>{content}</HeadingTag>
            }
            else {
                // Unordered list formatting.
                if (line.match(unorderedListReg)) {
                    line = `<li class="ml-4 before:mr-[-10px]">${line.slice(1).trim()}</li>`
                };

                // Bold formatting.
                const lineWithBoldText = line.replace(boldReg, '<strong>$1</strong>');

                // Italic Foramtting.
                const lineWithItalicText = lineWithBoldText.replace(italicReg, '<em>$1</em>');

                // Strike through Formatting.
                const lineWithStrikeText = lineWithItalicText.replace(strikeThroughReg, '<del>$1</del>');

                // Image formatting.
                const lineWithImage = lineWithStrikeText.replace(imgReg, '<img class="max-w-full" src="$2" alt="$1" />');

                // Link formatting.
                const lineWithLinkText = lineWithImage.replace(linkReg, '<a class="text-sky-400 hover:underline underline-offset-2" href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

                // Inline code formatting.
                const lineWithInlineCode = lineWithLinkText.replace(inLinkCodeReg, '<span class="text-slate-200 bg-slate-800 px-2 py-[2px] rounded-full">$1</span>');

                // Added horizontal ruler.
                const hrRuler = lineWithInlineCode.replace(hrReg, '<hr />');

                // Final result to display.
                const finalResult = hrRuler;

                return <p className='mt-1 mb-1' dangerouslySetInnerHTML={{__html: finalResult}}></p>;
            }
        });
        
        // Updating markDown state.
        text ? setMarkDown(linesInText) : setMarkDown([]);
    }, [text, setMarkDown]);

    // Convert the text into markdown when actual text changes.
    useEffect(() => {
        convertToMarkdown();
    }, [text]);

    return (
        <div className="flex-1 p-2 h-[100vh] overflow-y-auto">
            {
                markDown.map((item, index) => <div key={index} className="text-[1.1rem]" >{item}</div>)
            }
        </div>
    );
};

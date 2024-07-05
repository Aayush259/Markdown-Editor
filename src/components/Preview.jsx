import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTextContext } from '../context/TextContext.jsx';

export default function Preview() {

    // Getting text from textContext.
    const { text } = useTextContext();

    // State for converted markdown text.
    const [markDown, setMarkDown] = useState([]);

    const newLineReg = useMemo(() => /\r?\n/, []);  // Regex for new line.
    const headingReg = useMemo(() => /^(#{1,6})\s/);    // Regex for heading tags.

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
            
            // Checking for heading regex match.
            const headingMatch = line.match(headingReg);
            
            // If heading matched, then return the heading JSX.
            if (headingMatch) {
                const level = headingMatch[1].length;   // Getting heading level.
                const content = line.slice(level + 1).trim();   // Getting actual content.
                const HeadingTag = `h${level}`; // GEtting heading tag based on its level.

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
            } else {
                return <p>{line}</p>
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
                markDown.map((item, index) => <div key={index} >{item}</div>)
            }
        </div>
    );
};

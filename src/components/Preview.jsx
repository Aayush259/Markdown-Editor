import React, { useCallback, useEffect, useState } from 'react';
import { useTextContext } from '../context/TextContext.jsx';

export default function Preview() {

    // Getting text from textContext.
    const { text } = useTextContext();

    // State for converted markdown text.
    const [markDown, setMarkDown] = useState(null);

    // This function converts the text in the markdown format and returns it.
    const convertToMarkdown = useCallback(() => {
        text ? setMarkDown(`${text}`) : setMarkDown('');
    }, [text, setMarkDown]);

    // Convert the text into markdown when actual text changes.
    useEffect(() => {
        convertToMarkdown();
    }, [text]);

    return (
        <div className="flex-1 p-2 h-[100vh] overflow-y-auto">
            <div dangerouslySetInnerHTML={{ __html: markDown }} />
        </div>
    );
};

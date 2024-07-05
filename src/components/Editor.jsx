import React, { useRef } from 'react';
import { useTextContext } from '../context/TextContext.jsx';

export default function Editor() {

    const { setText } = useTextContext();

    // Reference to editor window (text area).
    const editorDivRef = useRef(null);

    // Track current mouse position.
    let mousePosition;
    let editorWidth;

    const mouseMoveHandler = (e) => {

        // Difference of the initial resizer position and mouse position.
        let dx = e.clientX - mousePosition;

        // Update the editor width based on dx.
        const changedEditorWidth = editorWidth + dx;
        editorDivRef.current.style.width = `${changedEditorWidth}px`;
    };
    
    const mouseUpHandler = () => {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    // This function resizes the editor window width on dragging the resizer.
    const resizerMouseDownHandler = (e) => {

        // Getting mouse Position and editor width.
        mousePosition = e.clientX;
        editorWidth = window.getComputedStyle( editorDivRef.current ).width;
        editorWidth = Number(editorWidth.slice(0, editorWidth.length - 2));

        // Adding event listener for mouse move and mouse up.
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const handleTextAreaChange = (e) => {
        setText(e.target.value);
    };

    return (
        <div ref={editorDivRef} className="md:w-1/2 md:h-[100vh] h-1/2 w-[100vw] relative">
            <div
                id="resizer"
                className="w-full h-1 md:h-full md:w-1 absolute bottom-0 md:right-0 bg-slate-500 cursor-col-resize"
                onMouseDown={resizerMouseDownHandler}
            ></div>
            <textarea className="
                w-full h-full p-4 bg-slate-950
                text-xl
                focus:outline-none
                "
                placeholder='Start writing here'
                onChange={handleTextAreaChange}
            >
            </textarea>
        </div>
    );
};

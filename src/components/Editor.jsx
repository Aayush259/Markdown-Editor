import React from 'react';

export default function Editor() {

    return (
        <div className="w-1/2 h-[100vh] relative">
            <div className="h-full w-1 absolute right-0 bg-slate-500 cursor-col-resize"></div>
            <textarea className="
                w-full h-full p-4 bg-slate-950
                text-xl
                focus:outline-none
                ">
                Editor
            </textarea>
        </div>
    );
};

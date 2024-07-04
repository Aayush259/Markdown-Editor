import React, { useState } from 'react';
import Editor from './components/Editor.jsx';
import Preview from './components/Preview.jsx';
import { TextContextProvider } from './context/TextContext.jsx';

export default function App() {

  const [text, setText] = useState(null);

  return (
    <TextContextProvider values={{ text, setText }}>
      <div className="
        w-[100vw] h-[100vh] p-0 overflow-hidden
        flex flex-col md:flex-row
        text-white bg-slate-950
      ">
        <Editor />
        <Preview />
      </div>
    </TextContextProvider>
  );
};

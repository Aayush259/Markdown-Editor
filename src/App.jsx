import React from 'react';
import Editor from './components/Editor.jsx';
import Preview from './components/Preview';

export default function App() {

  return (
    <div className="
      w-[100vw] h-[100vh] p-0 overflow-hidden
      flex flex-col md:flex-row
      text-white bg-slate-950
    ">
      <Editor />
      <Preview />
    </div>
  );
};

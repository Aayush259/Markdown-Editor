import React from 'react';
import Editor from './components/Editor.jsx';
import Preview from './components/Preview';

export default function App() {

  return (
    <div className="w-[100vw] p-0 overflow-hidden flex flex-row text-white bg-slate-950">
      <Editor />
      <Preview />
    </div>
  );
};

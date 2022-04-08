import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'

function App() {

  const [markdown, setMarkdown] = useState('## markdown preview')

  return (
    <section className="markdown">
      <textarea
        className="input"
        value={markdown}
        onChange={(e)=> setMarkdown(e.target.value)}
        >{markdown}
      </textarea>
      <article className="result">
        <ReactMarkdown>
          {markdown}
        </ReactMarkdown>
      </article>
    </section>
  )
}

export default App

import './style.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import SimpleInteractiveBirthday from './components/birthday/SimpleInteractiveBirthday'

// Create a root element for React
const root = ReactDOM.createRoot(document.querySelector<HTMLDivElement>('#app')!)

// Render the SimpleInteractiveBirthday component
root.render(
  <React.StrictMode>
    <SimpleInteractiveBirthday />
  </React.StrictMode>
)

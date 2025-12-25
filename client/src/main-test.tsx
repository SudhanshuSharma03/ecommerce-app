import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Simple test component
function TestApp() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Test Page</h1>
      <p>If you see this, React is working!</p>
    </div>
  )
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <TestApp />
    </StrictMode>,
  )
} else {
  console.error('Root element not found!');
}

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// Mock all the problematic imports first
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div data-testid="motion-div" {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}))

jest.mock('react-icons/fi', () => ({
  FiUser: () => <span data-testid="fi-user" />,
  FiFolderOpen: () => <span data-testid="fi-folder-open" />,
  FiFileText: () => <span data-testid="fi-file-text" />,
  FiMail: () => <span data-testid="fi-mail" />,
  FiGithub: () => <span data-testid="fi-github" />,
  FiLinkedin: () => <span data-testid="fi-linkedin" />,
  FiDownload: () => <span data-testid="fi-download" />,
  FiChevronDown: () => <span data-testid="fi-chevron-down" />,
  FiTerminal: () => <span data-testid="fi-terminal" />,
}))

describe('Terminal Basic Tests', () => {
  it('can import Terminal component without crashing', async () => {
    // Dynamic import to test if the component can be loaded
    const Terminal = await import('../components/Terminal.js')
    expect(Terminal.default).toBeDefined()
  })

  it('Terminal component renders with basic props', async () => {
    const Terminal = await import('../components/Terminal.js')
    const TerminalComponent = Terminal.default
    const mockOnExit = jest.fn()
    
    render(<TerminalComponent onExit={mockOnExit} />)
    
    // Just check if it renders without crashing
    expect(document.body).toBeInTheDocument()
  })
})
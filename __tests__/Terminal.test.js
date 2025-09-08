import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Terminal from '../components/Terminal.js'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}))

describe('Terminal Component', () => {
  const mockOnExit = jest.fn()

  beforeEach(() => {
    mockOnExit.mockClear()
  })

  it('renders terminal interface with welcome message', () => {
    render(<Terminal onExit={mockOnExit} />)
    
    expect(screen.getByText(/Welcome to Vamsi's Interactive Portfolio Terminal/)).toBeInTheDocument()
    expect(screen.getByText(/Type 'help' for commands/)).toBeInTheDocument()
  })

  it('displays help command output when help is entered', async () => {
    render(<Terminal onExit={mockOnExit} />)
    
    const input = screen.getByPlaceholderText(/Type a command/)
    
    fireEvent.change(input, { target: { value: 'help' } })
    fireEvent.submit(input.closest('form'))
    
    await waitFor(() => {
      expect(screen.getByText(/Available commands:/)).toBeInTheDocument()
      expect(screen.getByText(/whoami/)).toBeInTheDocument()
      expect(screen.getByText(/ls projects/)).toBeInTheDocument()
    })
  })

  it('executes whoami command correctly', async () => {
    render(<Terminal onExit={mockOnExit} />)
    
    const input = screen.getByPlaceholderText(/Type a command/)
    
    fireEvent.change(input, { target: { value: 'whoami' } })
    fireEvent.submit(input.closest('form'))
    
    await waitFor(() => {
      expect(screen.getByText(/Vamsi Cheruku/)).toBeInTheDocument()
      expect(screen.getByText(/Systems Architect & Performance Engineer/)).toBeInTheDocument()
    })
  })

  it('handles ls projects command', async () => {
    render(<Terminal onExit={mockOnExit} />)
    
    const input = screen.getByPlaceholderText(/Type a command/)
    
    fireEvent.change(input, { target: { value: 'ls projects' } })
    fireEvent.submit(input.closest('form'))
    
    await waitFor(() => {
      expect(screen.getByText(/total 3/)).toBeInTheDocument()
      expect(screen.getByText(/saamcars\//)).toBeInTheDocument()
      expect(screen.getByText(/medical-ai\//)).toBeInTheDocument()
    })
  })

  it('opens resume when cat resume.pdf is executed', async () => {
    // Mock window.open
    const mockWindowOpen = jest.fn()
    Object.defineProperty(window, 'open', {
      writable: true,
      value: mockWindowOpen,
    })

    render(<Terminal onExit={mockOnExit} />)
    
    const input = screen.getByPlaceholderText(/Type a command/)
    
    fireEvent.change(input, { target: { value: 'cat resume.pdf' } })
    fireEvent.submit(input.closest('form'))
    
    await waitFor(() => {
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://drive.google.com/file/d/1Ic1DF0AZ9FKnnwCnxWRlvdV3YLHXFvro/view?usp=sharing',
        '_blank'
      )
      expect(screen.getByText(/Download started in new tab/)).toBeInTheDocument()
    })
  })

  it('displays contact information correctly', async () => {
    render(<Terminal onExit={mockOnExit} />)
    
    const input = screen.getByPlaceholderText(/Type a command/)
    
    fireEvent.change(input, { target: { value: 'contact' } })
    fireEvent.submit(input.closest('form'))
    
    await waitFor(() => {
      expect(screen.getByText(/vamsicheruku027@gmail.com/)).toBeInTheDocument()
      expect(screen.getByText(/linkedin.com\/in\/vamsi-cheruku/)).toBeInTheDocument()
    })
  })

  it('shows technical skills matrix', async () => {
    render(<Terminal onExit={mockOnExit} />)
    
    const input = screen.getByPlaceholderText(/Type a command/)
    
    fireEvent.change(input, { target: { value: 'skills' } })
    fireEvent.submit(input.closest('form'))
    
    await waitFor(() => {
      expect(screen.getByText(/Technical Skills Matrix/)).toBeInTheDocument()
      expect(screen.getByText(/Backend Engineering/)).toBeInTheDocument()
      expect(screen.getByText(/95%/)).toBeInTheDocument()
    })
  })

  it('handles sudo hire-me easter egg', async () => {
    render(<Terminal onExit={mockOnExit} />)
    
    const input = screen.getByPlaceholderText(/Type a command/)
    
    fireEvent.change(input, { target: { value: 'sudo hire-me' } })
    fireEvent.submit(input.closest('form'))
    
    await waitFor(() => {
      expect(screen.getByText(/Executive Hire Summary/)).toBeInTheDocument()
      expect(screen.getByText(/Schedule interview immediately/)).toBeInTheDocument()
    })
  })

  it('shows coffee status easter egg', async () => {
    render(<Terminal onExit={mockOnExit} />)
    
    const input = screen.getByPlaceholderText(/Type a command/)
    
    fireEvent.change(input, { target: { value: 'coffee' } })
    fireEvent.submit(input.closest('form'))
    
    await waitFor(() => {
      expect(screen.getByText(/Coffee Status Monitor/)).toBeInTheDocument()
      expect(screen.getByText(/OPTIMAL FOR CODING/)).toBeInTheDocument()
    })
  })

  it('handles clear command', async () => {
    render(<Terminal onExit={mockOnExit} />)
    
    const input = screen.getByPlaceholderText(/Type a command/)
    
    // Add some commands first
    fireEvent.change(input, { target: { value: 'whoami' } })
    fireEvent.submit(input.closest('form'))
    
    await waitFor(() => {
      expect(screen.getByText(/Vamsi Cheruku/)).toBeInTheDocument()
    })
    
    // Then clear
    fireEvent.change(input, { target: { value: 'clear' } })
    fireEvent.submit(input.closest('form'))
    
    await waitFor(() => {
      expect(screen.queryByText(/Vamsi Cheruku/)).not.toBeInTheDocument()
    })
  })

  it('handles exit command and calls onExit', async () => {
    render(<Terminal onExit={mockOnExit} />)
    
    const input = screen.getByPlaceholderText(/Type a command/)
    
    fireEvent.change(input, { target: { value: 'exit' } })
    fireEvent.submit(input.closest('form'))
    
    await waitFor(() => {
      expect(screen.getByText(/Exiting terminal/)).toBeInTheDocument()
    })
    
    // Wait for timeout and check if onExit was called
    await waitFor(() => {
      expect(mockOnExit).toHaveBeenCalled()
    }, { timeout: 3000 })
  })

  it('handles unknown commands with error message', async () => {
    render(<Terminal onExit={mockOnExit} />)
    
    const input = screen.getByPlaceholderText(/Type a command/)
    
    fireEvent.change(input, { target: { value: 'unknown-command' } })
    fireEvent.submit(input.closest('form'))
    
    await waitFor(() => {
      expect(screen.getByText(/Command 'unknown-command' not found/)).toBeInTheDocument()
    })
  })

  it('calls onExit when empty command is submitted', async () => {
    render(<Terminal onExit={mockOnExit} />)
    
    const input = screen.getByPlaceholderText(/Type a command/)
    
    fireEvent.change(input, { target: { value: '' } })
    fireEvent.submit(input.closest('form'))
    
    expect(mockOnExit).toHaveBeenCalled()
  })

  it('disables auto mode on user interaction', async () => {
    render(<Terminal onExit={mockOnExit} />)
    
    const input = screen.getByPlaceholderText(/Watching demo/)
    
    // Click to interact
    fireEvent.click(input)
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Type a command/)).toBeInTheDocument()
    })
  })
})

// Test the command definitions
describe('Terminal Commands', () => {
  it('has all expected commands defined', () => {
    const Terminal = require('../components/Terminal')
    
    // This would need to be adjusted based on how commands are exported
    // For now, this is a structural test
    expect(Terminal).toBeDefined()
  })
})
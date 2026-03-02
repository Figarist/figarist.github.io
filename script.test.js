/** @jest-environment jsdom */
const fs = require('fs');
const path = require('path');

// Read the script content
const scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf8');

describe('email copy functionality', () => {
  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = `
      <a href="mailto:test@example.com" id="email-link">Email me</a>
    `;

    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn()
      }
    });

    // Mock secure context
    Object.defineProperty(window, 'isSecureContext', {
      value: true,
      writable: true
    });

    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    // Mock IntersectionObserver
    class IntersectionObserver {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    window.IntersectionObserver = IntersectionObserver;

    // Clear mocks
    jest.clearAllMocks();
  });

  it('handles rejected promise from clipboard API', async () => {
    // Setup rejected promise
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const mockError = new Error('Permission denied');
    navigator.clipboard.writeText.mockRejectedValue(mockError);

    // Execute script logic in the context of our DOM
    // Since it's an IIFE, we just evaluate it
    eval(scriptContent);

    // Trigger click event
    const link = document.getElementById('email-link');
    link.click();

    // Wait for promise rejection to be handled
    await Promise.resolve(); // flush microtasks
    await Promise.resolve(); // one more time for chaining

    // Assert that console.error was called with expected message
    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to copy email: ', mockError);

    // Assert the original text was preserved and not changed to "Copied!"
    expect(link.innerHTML).toBe('Email me');

    consoleErrorSpy.mockRestore();
  });
});

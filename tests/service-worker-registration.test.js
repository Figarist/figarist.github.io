const fs = require('fs');
const path = require('path');

describe('Service Worker Registration', () => {
  let originalConsoleLog;
  let originalConsoleError;

  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';

    // Mock console to avoid cluttering test output and to assert on it
    originalConsoleLog = console.log;
    originalConsoleError = console.error;
    console.log = jest.fn();
    console.error = jest.fn();

    // Mock window.matchMedia
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

    // Mock navigator.serviceWorker
    Object.defineProperty(navigator, 'serviceWorker', {
      value: {
        register: jest.fn()
      },
      configurable: true
    });

    // Create a new window object with clear event listeners for each test
    // To ensure old load event listeners from previous tests don't fire
    jest.restoreAllMocks();
  });

  afterEach(() => {
    // Restore console
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
  });

  function executeScript(supportServiceWorker = true) {
    let scriptContent = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf8');

    // If not testing support, replace the "in navigator" check with false
    // JSDOM has "serviceWorker" in navigator returning true even if we delete navigator.serviceWorker
    if (!supportServiceWorker) {
       scriptContent = scriptContent.replace('"serviceWorker" in navigator', 'false');
    }

    eval(scriptContent);
  }

  test('should not attempt registration if service worker is not supported', () => {
    // Execute script, overriding the support check
    executeScript(false);

    // Simulate window load event
    window.dispatchEvent(new Event('load'));

    // Verify that register was not called
    expect(navigator.serviceWorker.register).not.toHaveBeenCalled();
    expect(console.log).not.toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
  });

  test('should register service worker when supported and load event fires', async () => {
    // Setup successful registration mock
    const mockRegistration = { scope: '/' };
    navigator.serviceWorker.register.mockResolvedValue(mockRegistration);

    // Execute script
    executeScript(true);

    // Simulate window load event
    window.dispatchEvent(new Event('load'));

    // Verify register was called correctly
    expect(navigator.serviceWorker.register).toHaveBeenCalledWith('/sw.js');

    // Wait for promises to resolve
    await new Promise(process.nextTick);

    // Verify success logging
    expect(console.log).toHaveBeenCalledWith('SW registered:', mockRegistration);
  });

  test('should handle service worker registration failure', async () => {
    // Setup failed registration mock
    const mockError = new Error('Registration failed');
    navigator.serviceWorker.register.mockRejectedValue(mockError);

    // Execute script
    executeScript(true);

    // Simulate window load event
    window.dispatchEvent(new Event('load'));

    // Wait for promises to resolve
    await new Promise(process.nextTick);

    // Verify error logging
    expect(console.error).toHaveBeenCalledWith('SW registration failed:', mockError);
  });
});

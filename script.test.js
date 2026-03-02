/**
 * @jest-environment jsdom
 */

describe("CODE COPY BUTTONS", () => {
  beforeEach(() => {
    jest.resetModules();

    // jsdom doesn't fully support innerText, so polyfill it using textContent
    if (!Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'innerText')) {
      Object.defineProperty(HTMLElement.prototype, 'innerText', {
        get() {
          return this.textContent;
        },
        set(value) {
          this.textContent = value;
        },
        configurable: true
      });
    }

    document.body.innerHTML = `
      <div class="highlight">
        <code>console.log('hello world');</code>
      </div>
    `;

    // Mock window.isSecureContext
    Object.defineProperty(window, 'isSecureContext', {
      value: true,
      writable: true,
      configurable: true
    });

    // Mock navigator.clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn()
      }
    });

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
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should handle successful copy", async () => {
    jest.useFakeTimers();

    navigator.clipboard.writeText.mockResolvedValue();

    // Load the script
    require('./script.js');

    const copyButton = document.querySelector('.btn-copy-code');
    expect(copyButton).toBeTruthy();

    // Simulate click
    copyButton.click();

    // Wait for promise to resolve
    await Promise.resolve(); // allow microtasks to process
    await Promise.resolve();

    expect(copyButton.innerText).toBe("Copied! ✔️");
    expect(copyButton.classList.contains("copied")).toBe(true);

    // Fast-forward time
    jest.advanceTimersByTime(2000);

    expect(copyButton.innerText).toBe("Copy");
    expect(copyButton.classList.contains("copied")).toBe(false);

    jest.useRealTimers();
  });

  it("should catch and log error when clipboard writeText fails", async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const mockError = new Error("Mock error");
    navigator.clipboard.writeText.mockRejectedValue(mockError);

    // Load the script
    require('./script.js');

    const copyButton = document.querySelector('.btn-copy-code');
    expect(copyButton).toBeTruthy();

    // Simulate click
    copyButton.click();

    // Wait for the promise to reject
    await Promise.resolve();
    await Promise.resolve();

    expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to copy code: ", mockError);
  });
});

const fs = require('fs');
const path = require('path');

describe('Search Functionality', () => {
  let scriptContent;

  beforeAll(() => {
    scriptContent = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf8');
  });

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="search-modal" hidden data-index-url="/mock-search.json">
        <div class="search-modal-container">
          <input id="search-input" type="text" />
          <div id="search-results" data-no-results="No matches found for"></div>
          <button id="close-search">Close</button>
        </div>
      </div>
      <button id="search-trigger">Search</button>
      <div class="bento-tilt-target"></div>
      <div class="fade-in"></div>
    `;

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    global.IntersectionObserver = class IntersectionObserver {
      constructor(callback) { this.callback = callback; }
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { id: '1', title: 'Test Post 1', tags: 'javascript unity', description: 'Test desc 1', url: '/post1', content: 'test content 1' },
          { id: '2', title: 'C# Guide', tags: 'c# gamedev', description: 'Learn C#', url: '/post2', content: 'test content 2' }
        ]),
      })
    );

    global.console.error = jest.fn();

    global.lunr = jest.fn((configFn) => {
      const mockIndex = {
        search: jest.fn((query) => {
          if (query === 'test*') {
            return [{ ref: '1' }];
          } else if (query === 'c#*') {
            return [{ ref: '2' }];
          } else {
            return [];
          }
        })
      };

      const selfMock = {
        pipeline: { remove: jest.fn() },
        searchPipeline: { remove: jest.fn() },
        ref: jest.fn(),
        field: jest.fn(),
        add: jest.fn()
      };

      if (typeof configFn === 'function') {
        configFn.call(selfMock);
      }

      return mockIndex;
    });

    global.lunr.stemmer = jest.fn();

    eval(scriptContent);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));

  it('initializes search when modal is opened', () => {
    const trigger = document.getElementById('search-trigger');
    const modal = document.getElementById('search-modal');

    trigger.click();

    expect(modal.hasAttribute('hidden')).toBe(false);
    expect(document.body.style.overflow).toBe('hidden');
    expect(global.fetch).toHaveBeenCalledWith('/mock-search.json');
  });

  it('executes search correctly on input change', async () => {
    document.getElementById('search-trigger').click();

    await flushPromises();

    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');

    input.value = 'test';
    input.dispatchEvent(new Event('input'));

    expect(results.innerHTML).toContain('Test Post 1');
    expect(results.innerHTML).toContain('Test desc 1');
    expect(results.innerHTML).toContain('<span class="search-tag">javascript</span>');
    expect(results.innerHTML).toContain('<span class="search-tag">unity</span>');

    input.value = 'empty';
    input.dispatchEvent(new Event('input'));
    expect(results.innerHTML).toContain('No matches found for');
    expect(results.innerHTML).toContain('"empty"');

    input.value = '';
    input.dispatchEvent(new Event('input'));
    expect(results.innerHTML).toBe('');
  });

  it('closes search when close button is clicked', () => {
    const trigger = document.getElementById('search-trigger');
    const modal = document.getElementById('search-modal');
    const closeBtn = document.getElementById('close-search');

    trigger.click();
    expect(modal.hasAttribute('hidden')).toBe(false);

    closeBtn.click();
    expect(modal.hasAttribute('hidden')).toBe(true);
    expect(document.body.style.overflow).toBe('');
  });

  it('toggles search on Cmd/Ctrl+K and closes on Escape', () => {
    const modal = document.getElementById('search-modal');

    const keydownEvent = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      bubbles: true,
      cancelable: true
    });

    jest.spyOn(navigator, 'platform', 'get').mockReturnValue('MacIntel');

    window.dispatchEvent(keydownEvent);
    expect(modal.hasAttribute('hidden')).toBe(false);

    const escEvent = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
    window.dispatchEvent(escEvent);
    expect(modal.hasAttribute('hidden')).toBe(true);
  });

  it('closes search on backdrop click', () => {
    const trigger = document.getElementById('search-trigger');
    const modal = document.getElementById('search-modal');

    trigger.click();
    expect(modal.hasAttribute('hidden')).toBe(false);

    modal.dispatchEvent(new Event('click', { bubbles: true }));
    expect(modal.hasAttribute('hidden')).toBe(true);
  });

  it('handles search index fetch errors gracefully', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

    document.getElementById('search-trigger').click();

    await flushPromises();

    expect(global.console.error).toHaveBeenCalledWith('Search index failed to load:', expect.any(Error));
  });
});

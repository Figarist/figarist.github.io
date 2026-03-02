/**
 * Tests for the Language Switch logic in script.js
 */

const fs = require('fs');
const path = require('path');

describe('Language Switch', () => {
  beforeEach(() => {
    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    // Set up our document body
    document.body.innerHTML = `
      <a href="#" class="lang-switch" data-lang="en">English</a>
      <a href="#" class="lang-switch" data-lang="uk">Ukrainian</a>
      <a href="#" class="lang-switch" data-lang="ru">Russian</a>
    `;

    // Clear localStorage before each test
    localStorage.clear();

    // Read and evaluate script.js to attach event listeners
    const scriptPath = path.resolve(__dirname, '../script.js');
    const scriptContent = fs.readFileSync(scriptPath, 'utf8');

    // Evaluate the IIFE in script.js
    // We execute it in the current Node context which jest-environment-jsdom provides
    eval(scriptContent);
  });

  afterEach(() => {
    // Clean up document body
    document.body.innerHTML = '';
    jest.restoreAllMocks();
  });

  it('should save the preferred language to localStorage when a language link is clicked', () => {
    const ukLink = document.querySelector('.lang-switch[data-lang="uk"]');
    ukLink.click();

    expect(localStorage.getItem('preferred_lang')).toBe('uk');
  });

  it('should save the preferred language in lowercase', () => {
    // Add a new link with uppercase language code
    document.body.innerHTML += '<a href="#" class="lang-switch" id="upper-lang" data-lang="KO">Korean</a>';

    // We need to re-evaluate the script because the new element was added AFTER the first evaluation
    // So we clear and re-setup
    document.body.innerHTML = `
      <a href="#" class="lang-switch" data-lang="en">English</a>
      <a href="#" class="lang-switch" id="upper-lang" data-lang="KO">Korean</a>
    `;
    const scriptPath = path.resolve(__dirname, '../script.js');
    const scriptContent = fs.readFileSync(scriptPath, 'utf8');
    eval(scriptContent);

    const koLink = document.getElementById('upper-lang');

    koLink.click();

    expect(localStorage.getItem('preferred_lang')).toBe('ko');
  });

  it('should not throw or update localStorage if data-lang is missing', () => {
    document.body.innerHTML = `
      <a href="#" class="lang-switch" data-lang="en">English</a>
      <a href="#" class="lang-switch" id="no-lang">Unknown</a>
    `;
    const scriptPath = path.resolve(__dirname, '../script.js');
    const scriptContent = fs.readFileSync(scriptPath, 'utf8');
    eval(scriptContent);

    const noLangLink = document.getElementById('no-lang');

    noLangLink.click();

    expect(localStorage.getItem('preferred_lang')).toBeNull();
  });
});

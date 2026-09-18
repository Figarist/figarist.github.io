(function () {
  'use strict';
  var blocks = document.querySelectorAll('code.language-mermaid');
  blocks.forEach(function (code) {
    var diagram = document.createElement('pre');
    diagram.className = 'mermaid';
    diagram.textContent = code.textContent;
    code.parentElement.replaceWith(diagram);
  });
  if (blocks.length && window.mermaid) {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      layout: 'dagre',
      theme: 'default',
      look: 'classic',
      gantt: { useWidth: 900, useMaxWidth: false, fontSize: 12, sectionFontSize: 12 }
    });
    mermaid.run({ querySelector: '.mermaid' }).catch(function (error) {
      console.error('Diagram rendering failed', error);
    });
  }
}());

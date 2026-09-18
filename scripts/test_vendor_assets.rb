# frozen_string_literal: true

def check(value, message)
  raise message unless value
end

mermaid = File.read('assets/vendor/mermaid.min.js')
mathjax = File.read('assets/vendor/mathjax/tex-mml-chtml.js')
lunr = File.read('assets/vendor/lunr.min.js')
goatcounter = File.read('assets/vendor/count.js')

check(mermaid.include?('version:"12.0.0"'), 'Vendored Mermaid is not 12.0.0')
check(mathjax.include?('4.1.3'), 'Vendored MathJax is not 4.1.3')
check(lunr.include?('e.version="2.3.9"'), 'Vendored Lunr is not 2.3.9')
check(goatcounter.include?('GoatCounter: https://www.goatcounter.com'), 'Vendored GoatCounter source marker is missing')

puts 'PASS: Mermaid 12.0.0, MathJax 4.1.3, Lunr 2.3.9 and GoatCounter vendor markers'

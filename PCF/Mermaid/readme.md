# Mermaid
Mermaid JS is a tool to make ERD's, UML's and other flow charts.
https://mermaid.js.org/

# The PCF

The PCF is a wrapper, built around mermaid.
By providing strings, you get a chart output:

# Samples:

graph TD; A-->B; A-->C;

stateDiagram-v2
    [*] --> Still
    Still --> [*]
    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]
    
  

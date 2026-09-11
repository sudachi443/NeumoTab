# NeumoTab
for your browser

# TODO
- create json file to apply firefox/chromium browser
- change searchform to support links(e.g.http,about,file ...)
- feature of import/export jsonfile

## Overview
change your default newpage better!!!  
show only what you want and enhance your life.  
(TODO:add screenshot)

## Features
- search from your input
- change search engine from button
- shortcut
- edit engine and shortcut

## stacks
- html
- css
- javascript

## Usage
### search
1. focus input form (hits:keydown "Espace" or "/" to focus input form)
1. serect searchmethod from engine list (hints:if you focus input form and press "Enter", you can search on duckduckgo(TODO create change function)
  
### change searchengine
1. press "F12" to open console
1. you can use `add_engine("name","link");` to add and `remove_engine("name");` to remove (hints:you can use `list_engine();` to see engine list)

### shortcut
1. focus or hover right box
1. select shortcut

### change shortcut
1. press "F12" to open console
1. you can use `add_shortcut("title","uri");` to add and `remove_shortcut("title");` to remove (hints:you can use `list_shortcut();` to see engine list)

## credits
- [https://neumorphism.io](https://neumorphism.io) (use to create neumophism css style)

## Licence
MIT License. See LICENSE for details.

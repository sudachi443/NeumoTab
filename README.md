# NeumoTab
A minimal and customizable new-tab page for your browser.
## TODO
- change searchform to support links(e.g.http,about,file ...)
- change json files for public
- create logo

## Overview
change your default newpage better!!!  
show only what you want and enhance your life.  
> (TODO:add screenshot)

## Features
- search from your input
- change search engine from button
- Custom shortcut
- edit engine and shortcut
- import/export your settings(json)
- Console API
- Keyboard-focused navigation
> [!NOTE]
> use google favicon API to get favicon.
## Tech stacks
- html
- css
- javascript

## Usage

> [!NOTE]
> As no validation has been set up, any invalid input will still be saved.
> If the data becomes corrupted, please reset it via the GUI or CLI\(`reset_shortcut();`,`reset_engine();`\).

### search
1. focus input form  
1. select search method from engine list  

> [!TIP]
> keydown `Escape` or `/` to focus input form.
> if you focus input form and press `Enter`, you can search on duckduckgo(TODO create change function.)

### shortcut
1. focus or hover right box
1. select shortcut

### change searchengine/shortcut
> [!IMPORTANT]
> Only complete links (links beginning with http://, etc.) may be used.

#### CLI settings\(suggest\)
1. press `F12` to open console
1. you can use `add_shortcut("title","uri");` \/ `add_engine("name","link");` to add and `remove_shortcut("title");` \/ `remove_engine("name");` to remove  

> [!TIP]
> you can use `list_shortcut();` / `list_engine();` to see engine list

#### GUI settings
1. open NeumoTab settings from addons menu
1. select and enter what you want
1. reload NeumoTab

### import\/export settings
1. open setting menu from popup or addon manager
1. select what you want\(only support `.json` file\)

> [!IMPORTANT]
> Shortcut settings must be a JSON array containing objects with `title` and `uri` properties.
> Engine settings must be a JSON array containing objects with `name` and `link` properties.

> [!CAUTION]
> NeumoTab trusts user-provided configuration. Malicious configuration may execute arbitrary JavaScript code.


### Console API

```
add_shortcut("title", "uri");
add_engine("name", "link");

remove_shortcut("title");
remove_engine("name");

list_shortcut();
list_engine();

reset_shortcut();
reset_engine();
```

## credits
- [https://neumorphism.io](https://neumorphism.io) --use to create neumorphism css style

## License
MIT License. See LICENSE for details.

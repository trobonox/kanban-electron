# kanban-electron
[![license](https://img.shields.io/github/license/trobonox/kanban-electron?style=flat)](https://opensource.org/licenses/MIT)
[![release](https://img.shields.io/github/v/release/trobonox/kanban-electron)](https://github.com/trobonox/kanban-electron/releases)
[![wakatime](https://wakatime.com/badge/user/be365b36-3fc6-4949-a760-a882bf44aad7/project/e222a792-8ba1-4987-97bd-baec10aa63fb.svg)](https://wakatime.com/badge/user/be365b36-3fc6-4949-a760-a882bf44aad7/project/e222a792-8ba1-4987-97bd-baec10aa63fb)

A simple Kanban Board desktop application made with Electron, with a focus on simplicity and user experience. 
This software is intended for offline usage only, and saves all boards under a config.json file. For an online equivalent, you can use [Trello](https://trello.com) or my counterpart [Productivity Suite](https://productivity-suite-three.vercel.app) (Please note that this is currently a work in progress, so some features are still missing and you might encounter bugs).

Open for any contributions or feature requests, though always keep in mind that I am still a student with limited time and I might not be able to process every request immediately.

**Planned Features:**
- Custom themes (curated selection + editor to create your own from scratch)
- UI improvements like a bar for quick actions in the board view
- More card properties like a due date or sub-tasks
- Custom backgrounds in board view
- JSON exporting of boards

## Screenshot of the App
![image](https://user-images.githubusercontent.com/57040351/163267511-6cc8bd27-61c6-4cb9-8eaf-1455cdbe2d9c.png)

## Build Setup

``` bash
# install dependencies
yarn install

# serve app with hot reload
yarn dev

# build electron application for production
yarn build

```

---

This project was generated with [electron-nuxt](https://github.com/michalzaq12/electron-nuxt) v1.8.1 using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://github.com/michalzaq12/electron-nuxt/blob/master/README.md).

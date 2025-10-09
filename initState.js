/**
 * This file is part of Feather Wiki.
 *
 * Feather Wiki is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 *
 * Feather Wiki is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along with Feather Wiki. If not, see https://www.gnu.org/licenses/.
 */
import { pagesView } from "./views/pages";
import { settingsView } from "./views/settings";
import { taggedView } from "./views/tagged";
import { pageView } from "./views/page";
import { missingView } from "./views/missing";

export const initState = (state) => {
  state.root = location.pathname || "/"; // path to file
  state.sb = false; // show sidebar
  state.sbTab = "{{translate:pagesTab}}";
  state.sbx = new Set(); // expanded sidebar menu items
  state.recent = [];
  state.edit = false;
  state.edits = null; // Edit store
  state.keep = false; // Keep Editor, Prevent navigation if editing
  state.src = false; // Show HTML in editor
  state.notis = {}; // Notifications
  state.canPut = false; // Show "Save Wiki to Server" button
  state.modal = { show: false, content: "", title: "" }; // Modal state

  state.events = {
    ...state.events,
    HANDLE_404: "404",
    CREATE_PAGE: "cp",
    START_EDIT: "se",
    CANCEL_EDIT: "ce",
    UPDATE_PAGE: "up",
    DELETE_PAGE: "dp",
    COLLECT_TAGS: "ct",
    CHECK_CHANGED: "cc",
    SAVE_WIKI: "sw",
    NOTIFY: "n",
    REMOVE_NOTI: "rn",
    PUT_SAVE_WIKI: "psw",
    DETECT_PUT_SUPPORT: "dps",
    SUMMARIZE_WIKI: "swi",
    SHOW_MODAL: "sm",
    HIDE_MODAL: "hm",
  };

  state.views = {
    a: pagesView,
    s: settingsView,
    t: taggedView,
    p: pageView,
    m: missingView,
  };

  state.c = document.querySelector("style#c")?.innerHTML ?? "";
  state.j = FW.parseJs(document.querySelector("script#j")?.innerHTML ?? "");
  try {
    state.p = FW.json.decompress(
      JSON.parse(document.querySelector("script#p").innerHTML)
    );
  } catch (e) {
    state.p = { name: "{{translate:newWiki}}", desc: "", pages: [], img: {} };
  }
  
  // Initialize theme data if not present (backward compatibility)
  if (!state.p.themes) {
    state.p.themes = {};
  }
  if (!state.p.activeTheme) {
    state.p.activeTheme = "default";
  }
  
  // Add pre-existing themes if they don't exist (for new wikis)
  if (Object.keys(state.p.themes).length === 0) {
    // Dark Theme (VS Code Dark+ inspired)
    state.p.themes.dark = {
      '--bg-primary': '#1e1e1e',
      '--text-main': '#d4d4d4',
      '--accent-color': '#569cd6',
      '--accent-hover': '#4ec9b0',
      '--sidebar-bg': '#252526',
      '--sidebar-text-color': '#cccccc',
      '--button-bg-active': '#094771',
      '--text-active': '#ffffff',
      '--code-block-bg': '#2d2d30',
      '--bg-secondary': '#2d2d30',
      '--bg-tertiary': '#3e3e42',
      '--border-color': '#3e3e42',
      '--shadow-color': '#000000',
      '--change-delete-bg': '#f44747'
    };
    
    // Light Theme (VS Code Light+ inspired)
    state.p.themes.light = {
      '--bg-primary': '#ffffff',
      '--text-main': '#333333',
      '--accent-color': '#007acc',
      '--accent-hover': '#005a9e',
      '--sidebar-bg': '#f3f3f3',
      '--sidebar-text-color': '#333333',
      '--button-bg-active': '#007acc',
      '--text-active': '#ffffff',
      '--code-block-bg': '#f8f8f8',
      '--bg-secondary': '#f0f0f0',
      '--bg-tertiary': '#e1e1e1',
      '--border-color': '#d4d4d4',
      '--shadow-color': '#cccccc',
      '--change-delete-bg': '#f14c4c'
    };
    
    // Solarized Dark Theme
    state.p.themes.solarized_dark = {
      '--bg-primary': '#002b36',
      '--text-main': '#839496',
      '--accent-color': '#268bd2',
      '--accent-hover': '#2aa198',
      '--sidebar-bg': '#073642',
      '--sidebar-text-color': '#93a1a1',
      '--button-bg-active': '#268bd2',
      '--text-active': '#fdf6e3',
      '--code-block-bg': '#073642',
      '--bg-secondary': '#073642',
      '--bg-tertiary': '#586e75',
      '--border-color': '#586e75',
      '--shadow-color': '#002b36',
      '--change-delete-bg': '#dc322f'
    };
  }
  if (!state.p.themeEditing) {
    state.p.themeEditing = {
      editingTheme: null,
      previewMode: false,
      unsavedChanges: false
    };
  }
  state.pg = FW.getPage();

  // determine last-used editor
  const lastModified = state.p.pages.find((p) => p.id === state.recent[0]?.p);
  state.useMd = lastModified?.editor === "md";

  state.t = []; // all used tags
  state.prev = FW.hash.object(state.p); // Hash of state at last save
  state.now = state.prev; // Hash of current state
  state.changed = false; // Changed since last save?

  return state;
};

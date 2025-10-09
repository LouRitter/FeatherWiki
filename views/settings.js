/**
 * This file is part of Feather Wiki.
 *
 * Feather Wiki is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 *
 * Feather Wiki is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along with Feather Wiki. If not, see https://www.gnu.org/licenses/.
 */
import { gallery } from "./gallery";

export const settingsView = (state, emit) => {
  const { events, p, c, j } = state;
  const o = p.pages.map((pg) => pg.slug).join("\n");
  
  // Theme variable mapping configuration with logical grouping
  const themeVariableMap = [
    // Colors Section
    { type: 'section', key: 'themeSectionColors' },
    { cssVar: '--bg-primary', labelKey: 'themePrimaryBg', descKey: 'themePrimaryBgDesc' },
    { cssVar: '--text-main', labelKey: 'themeTextMain', descKey: 'themeTextMainDesc' },
    { cssVar: '--accent-color', labelKey: 'themeAccent', descKey: 'themeAccentDesc' },
    { cssVar: '--accent-hover', labelKey: 'themeAccentHover', descKey: 'themeAccentHoverDesc' },
    
    // Layout Section
    { type: 'section', key: 'themeSectionLayout' },
    { cssVar: '--sidebar-bg', labelKey: 'themeSidebarBg', descKey: 'themeSidebarBgDesc' },
    { cssVar: '--sidebar-text-color', labelKey: 'themeSidebarText', descKey: 'themeSidebarTextDesc' },
    { cssVar: '--bg-secondary', labelKey: 'themeSecondaryBg', descKey: 'themeSecondaryBgDesc' },
    { cssVar: '--bg-tertiary', labelKey: 'themeTertiaryBg', descKey: 'themeTertiaryBgDesc' },
    
    // Interactive Elements Section
    { type: 'section', key: 'themeSectionInteractive' },
    { cssVar: '--button-bg-active', labelKey: 'themeActiveElementBg', descKey: 'themeActiveElementBgDesc' },
    { cssVar: '--text-active', labelKey: 'themeActiveText', descKey: 'themeActiveTextDesc' },
    { cssVar: '--border-color', labelKey: 'themeBorderColor', descKey: 'themeBorderColorDesc' },
    
    // Content Section
    { type: 'section', key: 'themeSectionContent' },
    { cssVar: '--code-block-bg', labelKey: 'themeCodeBg', descKey: 'themeCodeBgDesc' },
    { cssVar: '--change-delete-bg', labelKey: 'themeChangeDeleteBg', descKey: 'themeChangeDeleteBgDesc' },
    
    // Effects Section
    { type: 'section', key: 'themeSectionEffects' },
    { cssVar: '--shadow-color', labelKey: 'themeShadowColor', descKey: 'themeShadowColorDesc' }
  ];
  
  // Debug logging
  console.log('settingsView called');
  console.log('window.createTheme exists:', typeof window.createTheme);
  console.log('window.setActiveTheme exists:', typeof window.setActiveTheme);
  console.log('window.updateTheme exists:', typeof window.updateTheme);
  console.log('window.deleteTheme exists:', typeof window.deleteTheme);

  // Theme management functions
  function handleActiveThemeChange(themeName) {
    try {
      window.setActiveTheme(themeName);
      emit(events.NOTIFY, j.themeUpdated || 'Theme updated successfully');
    } catch (error) {
      alert(error.message);
    }
  }

  // Legacy function removed - replaced by showCreateThemeWithColorPickers

  // Legacy function removed - now using nanohtml template approach
  
  // Get default color for CSS variable
  function getDefaultColor(cssVar) {
    const defaults = {
      '--bg-primary': '#ffffff',
      '--text-main': '#000000',
      '--accent-color': '#007acc',
      '--accent-hover': '#87C',
      '--sidebar-bg': '#f0f0f0',
      '--sidebar-text-color': '#000000',
      '--button-bg-active': '#87C',
      '--text-active': '#ffffff',
      '--code-block-bg': '#f8f8f8',
      '--bg-secondary': '#eee',
      '--bg-tertiary': '#ddd',
      '--border-color': '#000',
      '--shadow-color': '#555',
      '--change-delete-bg': '#ff0000'
    };
    return defaults[cssVar] || '#000000';
  }
  
  // Handle color change for live preview
  function handleColorChange(cssVar, value) {
    const editingTheme = state.p.themeEditing?.editingTheme;
    if (!editingTheme || !state.p.themes[editingTheme]) return;
    
    // Update theme data
    state.p.themes[editingTheme][cssVar] = value;
    
    // Apply live preview if editing active theme
    if (editingTheme === state.p.activeTheme) {
      window.applyActiveTheme(state);
    }
  }
  
  // Handle color change completion for state tracking
  function handleColorChangeComplete(cssVar, value) {
    // Emit CHECK_CHANGED event to mark wiki as needing save
    emit(events.CHECK_CHANGED);
  }
  
  // Handle theme selection for editing
  function handleThemeSelection(themeName) {
    if (!themeName) {
      // Clear theme editing state
      if (state.p.themeEditing) {
        state.p.themeEditing.editingTheme = null;
      }
      emit(events.RENDER);
      return;
    }
    
    if (themeName === 'create-new') {
      showCreateThemeWithColorPickers();
      return;
    }
    
    // Initialize theme editing state
    if (!state.p.themeEditing) {
      state.p.themeEditing = {};
    }
    state.p.themeEditing.editingTheme = themeName;
    
    // Trigger re-render to show the theme editor
    emit(events.RENDER);
  }
  
  // Show create theme modal with color pickers
  function showCreateThemeWithColorPickers() {
    const themeName = prompt(j.themeName || 'Theme Name');
    if (!themeName) return;
    
    // Show starting point selection
    const startingPoint = prompt(
      `${j.themeStartingPoint || 'Starting Point'}:\n1. ${j.startingPointDefault || 'Default Colors'}\n2. ${j.startingPointCurrent || 'Current Theme'}\n3. ${j.startingPointNeutral || 'Neutral Colors'}`,
      '1'
    );
    
    let baseTheme = {};
    switch (startingPoint) {
      case '2': // Current theme
        baseTheme = state.p.themes[state.p.activeTheme] || {};
        break;
      case '3': // Neutral colors
        baseTheme = {
          '--bg-primary': '#f5f5f5',
          '--text-main': '#333333',
          '--accent-color': '#666666',
          '--accent-hover': '#888888',
          '--sidebar-bg': '#e0e0e0',
          '--button-bg-active': '#888888',
          '--text-active': '#ffffff'
        };
        break;
      default: // Default colors
        baseTheme = {
          '--bg-primary': '#ffffff',
          '--text-main': '#000000',
          '--accent-color': '#007acc',
          '--accent-hover': '#87C',
          '--sidebar-bg': '#f0f0f0',
          '--button-bg-active': '#87C',
          '--text-active': '#ffffff'
        };
    }
    
    // Convert theme object to CSS string format
    let cssString = '';
    for (const [variable, value] of Object.entries(baseTheme)) {
      cssString += `${variable}: ${value};\n`;
    }
    
    // Create theme with base colors
    try {
      window.createTheme(themeName, cssString);
      emit(events.NOTIFY, j.themeCreated || 'Theme created successfully');
      
      // Set as editing theme and show color pickers
      state.p.themeEditing = { editingTheme: themeName };
      
      // Update dropdown to show new theme and render color pickers
      emit(events.RENDER);
    } catch (error) {
      alert(error.message);
    }
  }

  // Legacy function removed - now using nanohtml template approach

  // Make functions globally available for testing
  window.handleColorChange = handleColorChange;
  window.handleColorChangeComplete = handleColorChangeComplete;
  window.handleThemeSelection = handleThemeSelection;
  window.showCreateThemeWithColorPickers = showCreateThemeWithColorPickers;

  // Legacy function removed - replaced by handleThemeSelection with color pickers

  return [
    html`<header>
      <h1>{{translate:wikiSettings}}</h1>
    </header>`,
    html`<article class="mw">
      <form onsubmit=${saveSettings} class="pb">
        <label for="wTitle">{{translate:wikiTitle}}</label>
        <input class="w1" id="wTitle" value=${p.name} minlength="1" required />
        <label for="wDesc">{{translate:wikiDescription}}</label>
        <input class="w1" id="wDesc" value=${p.desc} />
        <label for="home">{{translate:homePage}}</label>
        <select id="home">
          <option value="" selected=${!p.home}>
            {{translate:allPages}} ({{translate:default}})
          </option>
          ${p.pages.map((pg) => {
            return html`<option selected=${pg.id === p.home} value=${pg.id}>
              ${pg.name} (${pg.slug})
            </option>`;
          })}
        </select>
        <label for="wPo">{{translate:pageOrder}}</label>
        <textarea id="wPo" class="notab">${o}</textarea>
        <label for="wCss">{{translate:customCss}}</label>
        <textarea id="wCss">${c}</textarea>
        <label for="wJs">{{translate:customJs}}</label>
        <span class="h">{{translate:customJsHelpText}}</span>
        <textarea id="wJs">${j}</textarea>
        <label for="wHead">{{translate:customHead}}</label>
        <span class="h">{{translate:customHeadHelpText}}</span>
        <textarea id="wHead">${FW.inject.esc(p.head, true)}</textarea>
        <label for="wOut">{{translate:includeStaticHtml}}</label>
        <input id="wOut" type="checkbox" checked=${p.static ?? false} />
        <span class="h">{{translate:includeStaticHtmlHelpText}}</span>
        <label for="wPub">{{translate:publish}}</label>
        <input id="wPub" type="checkbox" checked=${p.published ?? false} />
        <span class="h"
          >{{translate:publishHelpText}} <code>?page=s</code></span
        >

        <!-- Enhanced Theming Section with Color Pickers -->
        <fieldset>
          <legend>{{translate:theming}}</legend>
          
          <div class="tr">
            <label for="activeTheme">{{translate:activeTheme}}</label>
            <select id="activeTheme" onchange=${(e) => handleActiveThemeChange(e.target.value)}>
              <option value="default" selected=${p.activeTheme === 'default'}>
                ${j.defaultTheme || 'Default'}
              </option>
              ${Object.keys(p.themes || {}).map(themeName => {
                // Get translated theme name or fallback to theme name
                const translatedName = j[`theme${themeName.charAt(0).toUpperCase() + themeName.slice(1).replace(/_/g, '')}`] || themeName;
                return html`<option value=${themeName} selected=${p.activeTheme === themeName}>
                  ${translatedName}
                </option>`;
              })}
            </select>
          </div>

          <div class="tr">
            <label for="themeToEdit">{{translate:selectThemeToEdit}}</label>
            <select id="themeToEdit" name="themeToEdit" onchange=${(e) => handleThemeSelection(e.target.value)}>
              <option value="">${j.selectThemeToEdit || 'Select theme to edit'}</option>
              <option value="create-new">${j.createNewTheme || 'Create New Theme'}</option>
              ${Object.keys(p.themes || {}).map(themeName => {
                // Get translated theme name or fallback to theme name
                const translatedName = j[`theme${themeName.charAt(0).toUpperCase() + themeName.slice(1).replace(/_/g, '')}`] || themeName;
                return html`<option value=${themeName}>${translatedName}</option>`;
              })}
            </select>
          </div>

          <div id="themeEditor" class="theme-editor-container">
            ${state.p.themeEditing?.editingTheme && state.p.themes[state.p.themeEditing.editingTheme] ? 
              html`<div class="theme-editor">
                ${themeVariableMap.map((item) => {
                  if (item.type === 'section') {
                    // Render section header
                    const sectionLabel = j[item.key] || item.key;
                    return html`<div class="theme-section-header"><h4>${sectionLabel}</h4></div>`;
                  } else {
                    // Render color picker
                    const currentValue = state.p.themes[state.p.themeEditing.editingTheme][item.cssVar] || getDefaultColor(item.cssVar);
                    const translatedLabel = j[item.labelKey] || item.labelKey;
                    return html`
                      <div class="color-picker-group">
                        <label for="color-${item.cssVar}">
                          ${translatedLabel}
                          ${item.descKey ? html`<span class="theme-help-text">${j[item.descKey] || ''}</span>` : ''}
                        </label>
                        <input 
                          type="color" 
                          class="color-picker-swatch"
                          id="color-${item.cssVar}" 
                          data-css-variable="${item.cssVar}"
                          value="${currentValue}"
                          oninput=${(e) => {
                            const newColor = e.target.value;
                            handleColorChange(item.cssVar, newColor);
                          }}
                          onchange=${(e) => {
                            const newColor = e.target.value;
                            handleColorChangeComplete(item.cssVar, newColor);
                          }}
                        />
                      </div>
                    `;
                  }
                })}
              </div>` : 
              html`<!-- Color picker interface will be rendered here -->`
            }
          </div>
        </fieldset>

        <div class="tr">
          <button type="submit">{{translate:update}}</button>
        </div>
      </form>
      <div class="tr">
        <p class="pb h">
          {{package.json:title}} {{translate:version}}: {{package.json:version}}
          ({{package.json:nickname}})
        </p>
        <p>
          <button class="del" onclick=${() => promptOverwrite()}>
            {{translate:importButton}}
          </button>
        </p>
      </div>
      ${gallery(state, emit, { showDelete: true, showUsed: true })}
    </article>`,
  ];

  function saveSettings(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const title = form.wTitle.value.trim();
    if (title.length < 1) return alert("{{translate:titleRequiredError}}");
    state.p.name = title;
    state.p.desc = form.wDesc.value.trim();
    if (form.home.value.length > 1) {
      state.p.home = form.home.value;
    } else {
      delete state.p.home;
    }
    // Sort pages in the specified order. Missing slugs go to the top.
    const sort = form.wPo.value.split("\n").map((s) => s.trim());
    state.p.pages.sort((a, b) =>
      sort.indexOf(a.slug) < sort.indexOf(b.slug) ? -1 : 1
    );
    handleCustomCss(form.wCss.value);
    handleCustomJs(form.wJs.value);
    if (form.wHead.value.trim()) {
      // Store this with angle braces removed in case users add script tags
      state.p.head = FW.inject.esc(form.wHead.value);
    } else {
      delete state.p.head;
    }
    state.p.static = form.wOut.checked;
    state.p.published = form.wPub.checked;

    emit(events.CHECK_CHANGED);
    emit(events.NOTIFY, "{{translate:settingsUpdated}}");
  }

  function promptOverwrite() {
    FW.upload("text/html", (file) => {
      FW.xtr(file, (result) => {
        if (result) {
          state.p = result[0];
          handleCustomCss(result[1]);
          handleCustomJs(result[2]);
          emit(events.ONLOAD);
          emit(events.CHECK_CHANGED);
          emit(events.NOTIFY, "{{translate:wikiLoaded}}");
        }
      });
    });
  }

  function handleCustomCss(content) {
    const style = document.getElementById("c");
    if (content.trim()) {
      state.c = content;
      if (style) style.innerHTML = content;
      else document.head.innerHTML += `<style id=c>${content}</style>`;
    } else {
      delete state.c;
      if (style) document.head.removeChild(style);
    }
  }

  function handleCustomJs(content) {
    if (content.trim()) {
      if (state.j !== content) alert("{{translate:reloadCustomJsAlert}}");
      state.j = content;
    } else {
      delete state.j;
    }
  }

  // Theme editor now handled by nanohtml template
};

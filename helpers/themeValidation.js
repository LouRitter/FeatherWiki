// Theme validation helper functions for FeatherWiki Theming Engine

/**
 * Validates if a theme name follows CSS identifier format
 * @param {string} themeName - The theme name to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidThemeName(themeName) {
  if (!themeName || typeof themeName !== 'string') {
    return false;
  }
  
  // CSS identifier format: letters, numbers, hyphens, underscores
  // Cannot start with a number or hyphen
  const cssIdentifierRegex = /^[a-zA-Z_][a-zA-Z0-9_-]*$/;
  
  return cssIdentifierRegex.test(themeName) && themeName !== 'default';
}

/**
 * Validates CSS variable syntax
 * @param {string} cssText - The CSS text to validate
 * @returns {object} - { isValid: boolean, errors: string[] }
 */
function validateCssSyntax(cssText) {
  const errors = [];
  
  if (!cssText || typeof cssText !== 'string') {
    return { isValid: false, errors: ['CSS text is required'] };
  }
  
  // Split by lines and validate each line
  const lines = cssText.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (!line) continue;
    
    // Check if line looks like a CSS variable declaration
    if (!line.startsWith('--')) {
      errors.push(`Line ${i + 1}: CSS variables must start with '--'`);
      continue;
    }
    
    // Check for colon separator
    if (!line.includes(':')) {
      errors.push(`Line ${i + 1}: Missing colon separator`);
      continue;
    }
    
    // Basic syntax check: --variable-name: value;
    const parts = line.split(':');
    if (parts.length !== 2) {
      errors.push(`Line ${i + 1}: Invalid CSS variable syntax`);
      continue;
    }
    
    const variableName = parts[0].trim();
    const value = parts[1].trim();
    
    // Validate variable name
    if (!variableName.startsWith('--')) {
      errors.push(`Line ${i + 1}: Variable name must start with '--'`);
    }
    
    // Validate value (basic check)
    if (!value) {
      errors.push(`Line ${i + 1}: Variable value is required`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

/**
 * Parses CSS text into an object of CSS variables
 * @param {string} cssText - The CSS text to parse
 * @returns {object} - Object with CSS variable key-value pairs
 */
function parseCssVariables(cssText) {
  const variables = {};
  
  if (!cssText || typeof cssText !== 'string') {
    return variables;
  }
  
  const lines = cssText.split('\n');
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Skip empty lines
    if (!trimmedLine) continue;
    
    // Check if line looks like a CSS variable declaration
    if (trimmedLine.startsWith('--') && trimmedLine.includes(':')) {
      const colonIndex = trimmedLine.indexOf(':');
      const variableName = trimmedLine.substring(0, colonIndex).trim();
      const value = trimmedLine.substring(colonIndex + 1).trim();
      
      // Remove semicolon if present
      const cleanValue = value.endsWith(';') ? value.slice(0, -1).trim() : value;
      
      variables[variableName] = cleanValue;
    }
  }
  
  return variables;
}

/**
 * Checks if theme limit has been reached
 * @param {object} themes - The themes object from state.p.themes
 * @returns {boolean} - True if limit reached (10 themes), false otherwise
 */
function isThemeLimitReached(themes) {
  if (!themes || typeof themes !== 'object') {
    return false;
  }
  
  const themeCount = Object.keys(themes).length;
  return themeCount >= 10;
}

/**
 * Validates if a theme can be deleted (not the active theme)
 * @param {string} themeName - The theme name to check
 * @param {string} activeTheme - The currently active theme
 * @returns {boolean} - True if can be deleted, false otherwise
 */
function canDeleteTheme(themeName, activeTheme) {
  return themeName !== activeTheme;
}

// Export functions for use in other modules
export {
  isValidThemeName,
  validateCssSyntax,
  parseCssVariables,
  isThemeLimitReached,
  canDeleteTheme
};

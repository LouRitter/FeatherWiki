# Contract Tests for FeatherWiki Theming Engine

## T004: Contract Test for Theme Application Function

**Test Scenario**: Verify applyActiveTheme function exists and behaves correctly

**Expected Behavior**:
1. Function `applyActiveTheme(state)` should exist in global scope
2. Function should accept state object with `state.p.activeTheme` and `state.p.themes`
3. Function should inject `<style id="fw-theme">` element into document head
4. Function should remove existing theme style element before adding new one

**Test Code** (to be run in browser console):
```javascript
// This test should FAIL until implementation is complete
console.log('=== T004: Theme Application Contract Test ===');

// Test 1: Function exists
if (typeof applyActiveTheme === 'function') {
  console.log('✅ applyActiveTheme function exists');
} else {
  console.log('❌ applyActiveTheme function does not exist');
}

// Test 2: Function accepts state parameter
try {
  const testState = {
    p: {
      activeTheme: 'test-theme',
      themes: {
        'test-theme': {
          '--bg-primary': '#ff0000',
          '--text-main': '#ffffff'
        }
      }
    }
  };
  
  applyActiveTheme(testState);
  console.log('✅ Function accepts state parameter');
} catch (error) {
  console.log('❌ Function does not accept state parameter:', error.message);
}

// Test 3: Style element is injected
const styleElement = document.getElementById('fw-theme');
if (styleElement) {
  console.log('✅ Style element fw-theme exists in DOM');
  console.log('Style content:', styleElement.textContent);
} else {
  console.log('❌ Style element fw-theme not found in DOM');
}

console.log('=== T004 Test Complete ===');
```

## T005: Contract Test for Theme State Management Operations

**Test Scenario**: Verify theme state management functions exist and work correctly

**Expected Behavior**:
1. Theme creation, update, deletion functions should exist
2. Functions should modify `state.p.themes` object correctly
3. Functions should emit `events.CHECK_CHANGED` event
4. Validation should prevent invalid operations

**Test Code** (to be run in browser console):
```javascript
// This test should FAIL until implementation is complete
console.log('=== T005: Theme State Management Contract Test ===');

// Test 1: Theme creation function exists
if (typeof createTheme === 'function') {
  console.log('✅ createTheme function exists');
} else {
  console.log('❌ createTheme function does not exist');
}

// Test 2: Theme update function exists
if (typeof updateTheme === 'function') {
  console.log('✅ updateTheme function exists');
} else {
  console.log('❌ updateTheme function does not exist');
}

// Test 3: Theme deletion function exists
if (typeof deleteTheme === 'function') {
  console.log('✅ deleteTheme function exists');
} else {
  console.log('❌ deleteTheme function does not exist');
}

// Test 4: Set active theme function exists
if (typeof setActiveTheme === 'function') {
  console.log('✅ setActiveTheme function exists');
} else {
  console.log('❌ setActiveTheme function does not exist');
}

console.log('=== T005 Test Complete ===');
```

## T006: Integration Test for Theme Creation and Application Workflow

**Test Scenario**: End-to-end test of creating a theme and applying it

**Expected Behavior**:
1. Create a new theme with valid CSS variables
2. Theme should be added to `state.p.themes`
3. Setting theme as active should apply the styles
4. Visual changes should be visible in the UI

**Test Code** (to be run in browser console):
```javascript
// This test should FAIL until implementation is complete
console.log('=== T006: Theme Creation and Application Integration Test ===');

// Test 1: Check if state.p.themes exists
if (window.state && window.state.p && typeof window.state.p.themes === 'object') {
  console.log('✅ state.p.themes exists');
} else {
  console.log('❌ state.p.themes does not exist');
}

// Test 2: Check if state.p.activeTheme exists
if (window.state && window.state.p && typeof window.state.p.activeTheme === 'string') {
  console.log('✅ state.p.activeTheme exists, current value:', window.state.p.activeTheme);
} else {
  console.log('❌ state.p.activeTheme does not exist');
}

// Test 3: Try to create a test theme (should fail until implementation)
try {
  const testTheme = {
    '--bg-primary': '#123456',
    '--text-main': '#abcdef'
  };
  
  // This should work after implementation
  createTheme('test-integration-theme', testTheme);
  console.log('✅ Theme creation attempted');
} catch (error) {
  console.log('❌ Theme creation failed:', error.message);
}

console.log('=== T006 Test Complete ===');
```

## T007: Integration Test for Theme Persistence Across Save/Load Cycles

**Test Scenario**: Verify themes persist when wiki is saved and reloaded

**Expected Behavior**:
1. Create themes and save wiki
2. Reload wiki file
3. Themes should still exist in `state.p.themes`
4. Active theme should still be applied

**Test Code** (to be run in browser console):
```javascript
// This test should FAIL until implementation is complete
console.log('=== T007: Theme Persistence Integration Test ===');

// Test 1: Check if themes are included in save data
if (typeof window.state !== 'undefined') {
  const saveData = JSON.stringify(window.state.p);
  if (saveData.includes('themes') && saveData.includes('activeTheme')) {
    console.log('✅ Theme data is included in state for saving');
  } else {
    console.log('❌ Theme data not found in state for saving');
  }
} else {
  console.log('❌ State object not available');
}

console.log('=== T007 Test Complete ===');
```

## T008: Integration Test for Theme Validation and Error Handling

**Test Scenario**: Verify validation functions work correctly and show appropriate errors

**Expected Behavior**:
1. Invalid theme names should be rejected
2. Invalid CSS syntax should be rejected with error messages
3. Theme limit should be enforced
4. Active theme deletion should be prevented

**Test Code** (to be run in browser console):
```javascript
// This test should FAIL until implementation is complete
console.log('=== T008: Theme Validation and Error Handling Integration Test ===');

// Test 1: Check if validation functions exist
if (typeof isValidThemeName === 'function') {
  console.log('✅ isValidThemeName function exists');
} else {
  console.log('❌ isValidThemeName function does not exist');
}

if (typeof validateCssSyntax === 'function') {
  console.log('✅ validateCssSyntax function exists');
} else {
  console.log('❌ validateCssSyntax function does not exist');
}

// Test 2: Test theme name validation
const validNames = ['dark-theme', 'light_theme', 'theme1'];
const invalidNames = ['123theme', '-invalid', 'theme with spaces', 'default'];

validNames.forEach(name => {
  if (isValidThemeName(name)) {
    console.log(`✅ Valid name "${name}" accepted`);
  } else {
    console.log(`❌ Valid name "${name}" rejected`);
  }
});

invalidNames.forEach(name => {
  if (!isValidThemeName(name)) {
    console.log(`✅ Invalid name "${name}" rejected`);
  } else {
    console.log(`❌ Invalid name "${name}" accepted`);
  }
});

console.log('=== T008 Test Complete ===');
```

## T009: Integration Test for Theme Limit Enforcement

**Test Scenario**: Verify maximum 10 themes limit is enforced

**Expected Behavior**:
1. Creating 11th theme should be rejected
2. Error message should be displayed
3. Theme count should not exceed 10

**Test Code** (to be run in browser console):
```javascript
// This test should FAIL until implementation is complete
console.log('=== T009: Theme Limit Enforcement Integration Test ===');

// Test 1: Check if theme limit function exists
if (typeof isThemeLimitReached === 'function') {
  console.log('✅ isThemeLimitReached function exists');
} else {
  console.log('❌ isThemeLimitReached function does not exist');
}

// Test 2: Test limit enforcement
const testThemes = {};
for (let i = 0; i < 10; i++) {
  testThemes[`theme-${i}`] = { '--bg-primary': '#ffffff' };
}

if (isThemeLimitReached(testThemes)) {
  console.log('✅ Theme limit correctly detected at 10 themes');
} else {
  console.log('❌ Theme limit not detected at 10 themes');
}

const underLimitThemes = { 'theme1': { '--bg-primary': '#ffffff' } };
if (!isThemeLimitReached(underLimitThemes)) {
  console.log('✅ Theme limit correctly not detected under 10 themes');
} else {
  console.log('❌ Theme limit incorrectly detected under 10 themes');
}

console.log('=== T009 Test Complete ===');
```

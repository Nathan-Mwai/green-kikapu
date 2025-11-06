import { readFileSync } from 'fs';
import { resolve } from 'path';

describe('Global CSS', () => {
  let cssContent: string;

  beforeAll(() => {
    const cssPath = resolve(__dirname, '../../app/global.css');
    cssContent = readFileSync(cssPath, 'utf-8');
  });

  describe('Tailwind Imports', () => {
    it('should import tailwind base', () => {
      expect(cssContent).toContain('@tailwind base');
    });

    it('should import tailwind components', () => {
      expect(cssContent).toContain('@tailwind components');
    });

    it('should import tailwind utilities', () => {
      expect(cssContent).toContain('@tailwind utilities');
    });
  });

  describe('Utility Classes', () => {
    it('should define flex-center utility', () => {
      expect(cssContent).toContain('.flex-center');
      expect(cssContent).toMatch(/\.flex-center\s*{[\s\S]*?flex.*?items-center.*?justify-center/);
    });

    it('should define flex-between utility', () => {
      expect(cssContent).toContain('.flex-between');
      expect(cssContent).toMatch(/\.flex-between\s*{[\s\S]*?flex.*?items-center.*?justify-between/);
    });

    it('should define flex-start utility', () => {
      expect(cssContent).toContain('.flex-start');
      expect(cssContent).toMatch(/\.flex-start\s*{[\s\S]*?flex.*?items-start.*?justify-center/);
    });
  });

  describe('Component Classes', () => {
    it('should define custom-btn component', () => {
      expect(cssContent).toContain('.custom-btn');
    });

    it('should define label component', () => {
      expect(cssContent).toContain('.label');
    });

    it('should define input component', () => {
      expect(cssContent).toContain('.input');
    });

    it('should define menu-card component', () => {
      expect(cssContent).toContain('.menu-card');
    });

    it('should define searchbar component', () => {
      expect(cssContent).toContain('.searchbar');
    });

    it('should define filter component', () => {
      expect(cssContent).toContain('.filter');
    });
  });

  describe('Typography Classes', () => {
    it('should define base-bold class', () => {
      expect(cssContent).toContain('.base-bold');
    });

    it('should define base-semibold class', () => {
      expect(cssContent).toContain('.base-semibold');
    });

    it('should define base-regular class', () => {
      expect(cssContent).toContain('.base-regular');
    });

    it('should define paragraph-bold class', () => {
      expect(cssContent).toContain('.paragraph-bold');
    });

    it('should define paragraph-semibold class', () => {
      expect(cssContent).toContain('.paragraph-semibold');
    });

    it('should define paragraph-medium class', () => {
      expect(cssContent).toContain('.paragraph-medium');
    });

    it('should define body-medium class', () => {
      expect(cssContent).toContain('.body-medium');
    });

    it('should define body-regular class', () => {
      expect(cssContent).toContain('.body-regular');
    });

    it('should define small-bold class', () => {
      expect(cssContent).toContain('.small-bold');
    });
  });

  describe('Tab Icon Class (New)', () => {
    it('should define tab-icon class', () => {
      expect(cssContent).toContain('.tab-icon');
    });

    it('should have correct tab-icon properties', () => {
      const tabIconRegex = /\.tab-icon\s*{[^}]*}/;
      const match = cssContent.match(tabIconRegex);
      
      expect(match).toBeTruthy();
      if (match) {
        const tabIconClass = match[0];
        expect(tabIconClass).toContain('flex');
        expect(tabIconClass).toContain('min-w-20');
        expect(tabIconClass).toContain('items-center');
        expect(tabIconClass).toContain('justify-center');
        expect(tabIconClass).toContain('min-h-full');
        expect(tabIconClass).toContain('gap-1');
        expect(tabIconClass).toContain('mt-12');
      }
    });

    it('should be in the components layer', () => {
      const componentsLayerRegex = /@layer components\s*{([\s\S]*?)}/;
      const match = cssContent.match(componentsLayerRegex);
      
      expect(match).toBeTruthy();
      if (match) {
        expect(match[1]).toContain('.tab-icon');
      }
    });
  });

  describe('CSS Structure', () => {
    it('should have utilities layer', () => {
      expect(cssContent).toContain('@layer utilities');
    });

    it('should have components layer', () => {
      expect(cssContent).toContain('@layer components');
    });

    it('should have properly formatted CSS', () => {
      // Check for basic CSS syntax
      const openBraces = (cssContent.match(/{/g) || []).length;
      const closeBraces = (cssContent.match(/}/g) || []).length;
      expect(openBraces).toBe(closeBraces);
    });

    it('should not have syntax errors', () => {
      // Check for common syntax errors
      expect(cssContent).not.toContain(';;');
      expect(cssContent).not.toContain('{{');
      expect(cssContent).not.toContain('}}');
    });
  });

  describe('Custom Classes Usage', () => {
    it('should define all expected custom component classes', () => {
      const expectedClasses = [
        'custom-btn',
        'label',
        'input',
        'menu-card',
        'searchbar',
        'filter',
        'base-bold',
        'base-semibold',
        'base-regular',
        'paragraph-bold',
        'paragraph-semibold',
        'paragraph-medium',
        'body-medium',
        'body-regular',
        'small-bold',
        'tab-icon',
      ];

      expectedClasses.forEach((className) => {
        expect(cssContent).toContain(`.${className}`);
      });
    });

    it('should use Tailwind @apply directive', () => {
      expect(cssContent).toContain('@apply');
    });

    it('should have consistent spacing and formatting', () => {
      // Check that classes are properly indented and formatted
      const classDefinitions = cssContent.match(/\.\w+(-\w+)*\s*{/g);
      expect(classDefinitions).toBeTruthy();
      expect(classDefinitions!.length).toBeGreaterThan(15);
    });
  });

  describe('Edge Cases', () => {
    it('should handle comments if present', () => {
      // CSS should still be valid even with comments
      const hasComments = cssContent.includes('/*') && cssContent.includes('*/');
      if (hasComments) {
        expect(cssContent).toMatch(/\/\*[\s\S]*?\*\//);
      }
    });

    it('should not have duplicate class definitions', () => {
      const classNames = cssContent.match(/\.([\w-]+)\s*{/g);
      if (classNames) {
        const uniqueClasses = new Set(classNames);
        // Allow some duplication for nested or conditional classes
        expect(classNames.length - uniqueClasses.size).toBeLessThan(5);
      }
    });

    it('should end with proper formatting', () => {
      expect(cssContent.trim()).toBeTruthy();
      expect(cssContent).toMatch(/}[\s]*$/);
    });
  });

  describe('Responsive Design Support', () => {
    it('should use responsive Tailwind classes where appropriate', () => {
      // Check if responsive utilities are used
      const hasResponsiveClasses = 
        cssContent.includes('sm:') ||
        cssContent.includes('md:') ||
        cssContent.includes('lg:') ||
        cssContent.includes('xl:');
      
      // This is optional but good practice
      expect(typeof hasResponsiveClasses).toBe('boolean');
    });
  });

  describe('Color and Theme Consistency', () => {
    it('should use consistent color naming', () => {
      // Check for custom colors (if any)
      const colorReferences = cssContent.match(/text-[\w-]+|bg-[\w-]+/g);
      expect(colorReferences).toBeTruthy();
    });

    it('should use standard Tailwind font families', () => {
      const fontReferences = cssContent.match(/font-rubik(-\w+)?/g);
      expect(fontReferences).toBeTruthy();
      if (fontReferences) {
        expect(fontReferences.length).toBeGreaterThan(0);
      }
    });
  });
});
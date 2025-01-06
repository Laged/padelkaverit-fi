#!/usr/bin/env bun
import { join, dirname } from "path";
import { JSDOM } from "jsdom";
import { PathConfig, SVGConfig } from "../components/types";

interface ExtractedComponent {
  name: string;
  paths: PathConfig[];
  viewBox: {
    width: number;
    height: number;
  };
  baseTransform?: string;
}

function extractSvgComponents(svgContent: string): ExtractedComponent[] {
  const dom = new JSDOM(svgContent);
  const doc = dom.window.document;
  const components: ExtractedComponent[] = [];

  // Get base viewBox
  const svgElement = doc.querySelector("svg");
  const [, , width, height] =
    svgElement?.getAttribute("viewBox")?.split(" ") || [];

  // Get all paths
  const allPaths = Array.from(doc.querySelectorAll("path"));
  let currentComponent: ExtractedComponent | null = null;

  // Process all paths in order
  allPaths.forEach((path) => {
    const filename = path.getAttribute("inkscape:export-filename");

    if (filename) {
      // This is a named component - create new component
      const name = filename
        .replace(".svg", "")
        .split(/[-_]/)
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join("");

      currentComponent = {
        name,
        paths: [],
        viewBox: {
          width: parseFloat(width),
          height: parseFloat(height),
        },
      };
      components.push(currentComponent);
    }

    // If we have a current component, add the path to it
    if (currentComponent) {
      const getParentTransforms = (el: Element): string[] => {
        const transforms: string[] = [];
        let current = el.parentElement;
        while (current && current.tagName !== "svg") {
          const transform = current.getAttribute("transform");
          if (transform) transforms.unshift(transform);
          current = current.parentElement;
        }
        return transforms;
      };

      const parentTransforms = getParentTransforms(path);
      const pathTransform = path.getAttribute("transform") || "";
      const combinedTransform = [...parentTransforms, pathTransform]
        .filter(Boolean)
        .join(" ");

      currentComponent.paths.push({
        d: path.getAttribute("d") || "",
        transform: combinedTransform || undefined,
      });
    }
  });

  return components;
}

const COMPONENTS_DIR = join(import.meta.dir, "..", "components", "generated");
const SVG_DIR = join(import.meta.dir, "..", "assets");

function generateMaskFile(component: ExtractedComponent) {
  return `
import { SVGConfig } from '../types';

export const config: SVGConfig = {
  viewBox: {
    width: ${component.viewBox.width},
    height: ${component.viewBox.height},
  },
  paths: ${JSON.stringify(component.paths, null, 2)},
  baseTransform: ${JSON.stringify(component.baseTransform)}
};
`;
}

function generateComponentFile(component: ExtractedComponent) {
  return `
import { PathConfig } from '../types';
import { config } from './${component.name}Mask';

export interface ${component.name}Props {
  className?: string;
}

export function ${component.name}({ className }: ${component.name}Props) {
  return (
    <svg 
      viewBox="0 0 ${component.viewBox.width} ${component.viewBox.height}"
      className={className}
    >
      {config.paths.map((path: PathConfig, i: number) => (
        <path
          key={i}
          d={path.d}
          transform={path.transform}
          clipPath={path.clipPath}
        />
      ))}
    </svg>
  );
}
`;
}

async function main() {
  try {
    // Read illustration.svg using Bun's file API
    const file = Bun.file(join(SVG_DIR, "illustration.svg"));
    const svgContent = await file.text();

    // Extract components
    const components = extractSvgComponents(svgContent);

    // Generate files for each component
    for (const component of components) {
      const maskContent = generateMaskFile(component);
      const componentContent = generateComponentFile(component);

      await Bun.write(
        join(COMPONENTS_DIR, `${component.name}Mask.tsx`),
        maskContent
      );
      await Bun.write(
        join(COMPONENTS_DIR, `${component.name}.tsx`),
        componentContent
      );
    }

    console.log("✨ SVG components generated successfully!");
  } catch (error) {
    console.error("Error generating SVG components:", error);
    process.exit(1);
  }
}

main();

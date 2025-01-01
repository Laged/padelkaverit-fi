export interface ExtractedComponent {
  name: string;
  paths: Array<{
    d: string;
    transform: string;
    clipPath?: string;
  }>;
  viewBox: {
    width: number;
    height: number;
  };
}

export function extractSvgComponents(svgContent: string): ExtractedComponent[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgContent, "image/svg+xml");
  const components: ExtractedComponent[] = [];

  // Get base viewBox
  const svgElement = doc.querySelector("svg");
  const [, , width, height] =
    svgElement?.getAttribute("viewBox")?.split(" ") || [];

  // Find all elements with inkscape:export-filename
  const exportElements = doc.querySelectorAll("[inkscape\\:export-filename]");

  exportElements.forEach((element) => {
    const filename = element.getAttribute("inkscape:export-filename");
    const name = filename?.replace(".svg", "") || "";

    // Get all paths within this element
    const paths = Array.from(element.querySelectorAll("path")).map((path) => ({
      d: path.getAttribute("d") || "",
      transform: path.getAttribute("transform") || "",
      clipPath: path.getAttribute("clip-path") || undefined,
    }));

    components.push({
      name,
      paths,
      viewBox: {
        width: parseFloat(width),
        height: parseFloat(height),
      },
    });
  });

  return components;
}

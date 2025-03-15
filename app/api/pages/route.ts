import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Define interface for page structure
interface PageStructure {
  name: string;
  path: string;
  children?: PageStructure[];
}

// Function to check if a directory is a page (contains page.tsx)
function isPage(dirPath: string): boolean {
  return fs.existsSync(path.join(dirPath, "page.tsx"));
}

// Function to get the route name from directory path
function getRouteName(dirPath: string): string {
  const dirName = path.basename(dirPath);
  // Handle special Next.js folder patterns
  if (dirName.startsWith("(") && dirName.endsWith(")")) {
    return "";
  }
  return dirName;
}

// Function to recursively scan directory for pages
function scanPages(
  dir: string,
  basePath = "",
  ignoreList = ["api"],
  maxDepth = 3 // Add a max depth parameter to prevent infinite recursion
): PageStructure[] {
  // If we've reached the maximum depth, return an empty array
  if (maxDepth <= 0) {
    return [];
  }

  const pages: PageStructure[] = [];

  try {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      if (ignoreList.includes(item)) continue;

      const itemPath = path.join(dir, item);

      try {
        const stat = fs.statSync(itemPath);

        if (stat.isDirectory()) {
          const routeName = getRouteName(itemPath);
          const fullPath = routeName
            ? path.join(basePath, routeName)
            : basePath;

          let isPageDir = false;
          try {
            isPageDir = isPage(itemPath);
          } catch {
            // Skip if we can't check if it's a page
            continue;
          }

          if (isPageDir) {
            // If the directory contains a page.tsx
            if (routeName) {
              const displayName = routeName
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

              pages.push({
                name: displayName,
                path: `/${fullPath}`,
              });
            }
          }

          // Recursive call to scan subdirectories with decreased depth
          const children = scanPages(
            itemPath,
            fullPath,
            ignoreList,
            maxDepth - 1
          );
          if (children.length > 0) {
            // Handle parent directory with children
            if (routeName) {
              // Find if we already added this directory
              const existingPage = pages.find((p) => p.path === `/${fullPath}`);
              if (existingPage) {
                existingPage.children = children;
              } else {
                const displayName = routeName
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");

                pages.push({
                  name: displayName,
                  path: `/${fullPath}`,
                  children,
                });
              }
            } else {
              // For grouping folders (e.g., (foundational)), just add children
              pages.push(...children);
            }
          }
        }
      } catch (e) {
        // Skip any files/folders that cause errors
        console.error(`Error processing item ${itemPath}:`, e);
        continue;
      }
    }
  } catch (e) {
    console.error(`Error reading directory ${dir}:`, e);
    return [];
  }

  return pages;
}

// Hardcoded page structure for production
const hardcodedPages: PageStructure[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Foundational",
    path: "/foundational",
    children: [
      { name: "Blog Card", path: "/blog-card" },
      { name: "Testimonial", path: "/testimonial" },
    ],
  },
];

export async function GET() {
  // Check if we're in production (like Vercel)
  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction) {
    // In production, return the hardcoded pages structure
    console.log("Using hardcoded pages structure in production environment");
    return NextResponse.json({
      pages: hardcodedPages,
      success: true,
    });
  }

  // Only in development, try to scan the file system
  try {
    console.log("Scanning pages in development environment...");
    const appDirectory = path.join(process.cwd(), "app");

    if (!fs.existsSync(appDirectory)) {
      console.error(`App directory not found at: ${appDirectory}`);
      return NextResponse.json({
        pages: [],
        success: true,
        message: "App directory not found, returning empty pages array",
      });
    }

    // Set a timeout to prevent hanging
    const timeoutPromise = new Promise<PageStructure[]>((_, reject) => {
      setTimeout(() => {
        reject(new Error("Scanning pages timed out after 5 seconds"));
      }, 5000);
    });

    const scanPromise = new Promise<PageStructure[]>((resolve) => {
      resolve(scanPages(appDirectory));
    });

    // Use Promise.race to implement a timeout
    const pages = await Promise.race([scanPromise, timeoutPromise]);

    return NextResponse.json({
      pages,
      success: true,
    });
  } catch (error) {
    console.error("Error generating pages structure:", error);

    // Return hardcoded structure as fallback even in development
    return NextResponse.json({
      pages: hardcodedPages,
      success: true,
      message: "Using fallback page structure due to an error",
    });
  }
}

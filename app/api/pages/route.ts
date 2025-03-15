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
  ignoreList = ["api"]
): PageStructure[] {
  const pages: PageStructure[] = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    if (ignoreList.includes(item)) continue;

    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      const routeName = getRouteName(itemPath);
      const fullPath = routeName ? path.join(basePath, routeName) : basePath;

      if (isPage(itemPath)) {
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

      // Recursive call to scan subdirectories
      const children = scanPages(itemPath, fullPath);
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
  }

  return pages;
}

export async function GET() {
  try {
    // Get the app directory path
    const appDirectory = path.join(process.cwd(), "app");

    // Check if the directory exists
    if (!fs.existsSync(appDirectory)) {
      console.error(`App directory not found at: ${appDirectory}`);
      console.error(`Current working directory: ${process.cwd()}`);
      console.error(
        `Directory contents of cwd:`,
        fs.readdirSync(process.cwd())
      );

      // In production (Vercel), try the .next directory structure
      const altDirectories = [
        // Try these alternative paths in Vercel environment
        path.join(process.cwd(), ".next", "server", "app"),
        path.join(process.cwd(), "src", "app"),
        path.join(process.cwd(), ".vercel", "output", "functions", "app"),
      ];

      let foundAltPath = false;
      for (const altPath of altDirectories) {
        if (fs.existsSync(altPath)) {
          console.log(`Found alternative app directory at: ${altPath}`);
          const pages = scanPages(altPath);
          foundAltPath = true;
          return NextResponse.json({
            pages,
            success: true,
          });
        }
      }

      if (!foundAltPath) {
        return NextResponse.json({
          pages: [],
          success: true,
          message: "App directory not found, returning empty pages array",
        });
      }
    }

    const pages = scanPages(appDirectory);

    return NextResponse.json({
      pages,
      success: true,
    });
  } catch (error) {
    console.error("Error generating pages structure:", error);
    console.error(
      "Stack trace:",
      error instanceof Error ? error.stack : "No stack trace"
    );
    console.error("Current working directory:", process.cwd());

    try {
      console.error("Root directory contents:", fs.readdirSync(process.cwd()));
    } catch (e) {
      console.error("Could not read root directory:", e);
    }

    return NextResponse.json(
      {
        error: "Failed to generate pages structure: " + error,
        success: false,
        pages: [], // Return empty pages array to prevent frontend errors
      },
      { status: 500 }
    );
  }
}

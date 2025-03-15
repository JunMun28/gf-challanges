"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiFolder, FiChevronRight, FiLayout } from "react-icons/fi";

export interface PageStructure {
  name: string;
  path: string;
  children?: PageStructure[];
}

interface NavigationProps {
  pages: PageStructure[];
}

export default function Navigation({ pages }: NavigationProps) {
  const pathname = usePathname();

  const renderPageLinks = (pages: PageStructure[], level = 0) => {
    return (
      <ul className={`space-y-1 pl-${level > 0 ? 5 : 0}`}>
        {pages.map((page) => {
          const isActive = pathname === page.path;
          return (
            <li key={page.path} className="py-1">
              <Link
                href={page.path}
                className={`
                  flex items-center px-3 py-2 rounded-lg transition-all duration-300
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500/80 to-cyan-500/80 text-white font-medium"
                      : "hover:bg-white/10 text-gray-300 hover:text-white"
                  }
                `}
              >
                <span className="mr-3">
                  {page.children && page.children.length > 0 ? (
                    <FiFolder
                      className={`${isActive ? "text-white" : "text-gray-400"}`}
                    />
                  ) : (
                    <FiLayout
                      className={`${isActive ? "text-white" : "text-gray-400"}`}
                    />
                  )}
                </span>
                <span>{page.name}</span>
                {isActive && (
                  <span className="ml-2 inline-flex items-center justify-center rounded-full w-1.5 h-1.5 bg-white"></span>
                )}
              </Link>

              {page.children && page.children.length > 0 && (
                <div
                  className={`mt-1 ml-4 pl-2 border-l border-white/10 ${
                    isActive ? "border-white/30" : ""
                  }`}
                >
                  {renderPageLinks(page.children, level + 1)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <nav className="p-4">
      <div className="flex items-center mb-6">
        <span className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mr-3">
          <FiLayout className="text-white" />
        </span>
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          Components
        </h2>
      </div>

      {pages.length === 0 ? (
        <div className="text-gray-400 text-sm py-3 px-4 rounded-lg bg-white/5 animate-pulse">
          <div className="flex items-center">
            <FiChevronRight className="mr-2" size={14} />
            Scanning components...
          </div>
        </div>
      ) : (
        <div className="space-y-4">{renderPageLinks(pages)}</div>
      )}
    </nav>
  );
}

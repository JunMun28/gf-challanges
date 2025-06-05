import clsx from "clsx";
import NextLink from "next/link";
import { AnchorHTMLAttributes, ReactNode } from "react";

const linkVariantClasses = {
  primary: clsx(
    "text-indigo-700",
    "hover:text-indigo-800 focus:text-indigo-800",
    "rounded focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/[.12]"
  ),
  gray: clsx(
    "text-neutral-600",
    "hover:text-neutral-900 focus:text-neutral-900",
    "rounded focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/[.12]"
  ),
};

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  variant?: keyof typeof linkVariantClasses;
}

const Link = ({
  children,
  disabled,
  className,
  variant = "primary",
  href,
  ...props
}: LinkProps) => {
  if (!href) {
    throw new Error("The `href` prop is required for Link component.");
  }
  return (
    <NextLink
      href={href}
      className={clsx(
        "rounded px-0.5 font-medium",
        linkVariantClasses[variant],
        {
          "pointer-events-none text-neutral-400": disabled,
        },
        className
      )}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      {...props}
    >
      {children}
    </NextLink>
  );
};

export default Link;

import { clsx } from "clsx";
import Link from "next/link";

type ButtonBaseProps = {
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonBaseProps & {
  href?: undefined;
};

type ButtonAsLink = React.AnchorHTMLAttributes<HTMLAnchorElement> & ButtonBaseProps & {
  href: string;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { className, variant = "primary", children, ...rest } = props as any;
  const base = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50";
  const variants: Record<NonNullable<ButtonBaseProps["variant"]>, string> = {
    primary: "bg-sky-600 text-white hover:bg-sky-700",
    secondary:
      "border border-black/10 bg-white/70 text-black hover:bg-white/90 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20",
    ghost: "text-sky-700 hover:text-sky-900 dark:text-sky-300 dark:hover:text-sky-200",
  };
  const v = (variant ?? "primary") as "primary" | "secondary" | "ghost";
  const cls = clsx(base, variants[v], className);

  if ("href" in props && props.href) {
    const { href, ...anchorRest } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link href={href as string} className={cls} {...(anchorRest as any)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}

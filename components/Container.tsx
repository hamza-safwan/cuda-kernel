import { clsx } from "clsx";

export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={clsx("container-base", className)} {...props} />;
}


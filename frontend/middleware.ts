export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/admin", "/log", "/dashboard", "/analytics", "/home"],
};

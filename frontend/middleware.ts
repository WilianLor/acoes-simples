export { default } from "next-auth/middleware"

export const config = {
    matcher: [
        "/admin",
        "/log",
        "/dashboard",
        "/analytics",
        "/home"
        // "/admin/:path((?!login).*)",
        // "/admin/site",
        // "/university/:path*"
    ]
}
import { NextResponse } from "next/server"
import { USER_DASHBOARD, WEBSITE_LOGIN } from "./routes/WebsiteRoutes"
import { ADMIN_DASHBOARD } from "./routes/AdminPannelRoute"
import { jwtVerify } from "jose"

export async function middleware(request) {
    const pathname = request.nextUrl.pathname

    const token = request.cookies.get("access_token")?.value

    // 🟡 1. If NO token
    if (!token) {
        // allow auth routes
        if (pathname.startsWith("/auth")) {
            return NextResponse.next()
        }

        // block protected routes
        if (
            pathname.startsWith("/admin") ||
            pathname.startsWith("/my-account")
        ) {
            return NextResponse.redirect(
                new URL(WEBSITE_LOGIN, request.nextUrl)
            )
        }

        return NextResponse.next()
    }

    // 🟡 2. If token exists → VERIFY safely
    let payload

    try {
        const secret = process.env.SECRET_KEY

        if (!secret) {
            throw new Error("SECRET_KEY missing in middleware")
        }

        const verified = await jwtVerify(
            token,
            new TextEncoder().encode(secret)
        )

        payload = verified.payload
    } catch (error) {
        // ❌ invalid / expired token
        return NextResponse.redirect(
            new URL(WEBSITE_LOGIN, request.nextUrl)
        )
    }

    const role = payload.role

    // 🟡 3. Prevent logged-in users from accessing auth pages
    if (pathname.startsWith("/auth")) {
        return NextResponse.redirect(
            new URL(
                role === "admin" ? ADMIN_DASHBOARD : USER_DASHBOARD,
                request.nextUrl
            )
        )
    }

    // 🟡 4. Protect admin routes
    if (pathname.startsWith("/admin") && role !== "admin") {
        return NextResponse.redirect(
            new URL(WEBSITE_LOGIN, request.nextUrl)
        )
    }

    // 🟡 5. (optional) protect user routes
    if (pathname.startsWith("/my-account") && role !== "user") {
        return NextResponse.redirect(
            new URL(WEBSITE_LOGIN, request.nextUrl)
        )
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*', '/my-account/:path*', '/auth/:path*']
}
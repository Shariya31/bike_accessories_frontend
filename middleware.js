import { NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { USER_DASHBOARD, WEBSITE_LOGIN } from "./routes/WebsiteRoutes"
import { ADMIN_DASHBOARD } from "./routes/AdminPannelRoute"

export async function middleware(request) {
    const pathname = request.nextUrl.pathname
    const token = request.cookies.get("access_token")?.value

    // 🔴 No token
    if (!token) {
        if (pathname.startsWith("/auth")) {
            return NextResponse.next()
        }

        if (pathname.startsWith("/admin") || pathname.startsWith("/my-account")) {
            return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl))
        }

        return NextResponse.next()
    }

    // 🔵 Verify token
    let payload

    try {
        const secret = process.env.SECRET_KEY

        const verified = await jwtVerify(
            token,
            new TextEncoder().encode(secret)
        )

        payload = verified.payload
    } catch (err) {
        return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl))
    }

    const role = payload?.role

    // prevent auth access
    if (pathname.startsWith("/auth")) {
        return NextResponse.redirect(
            new URL(role === "admin" ? ADMIN_DASHBOARD : USER_DASHBOARD, request.nextUrl)
        )
    }

    // protect admin
    if (pathname.startsWith("/admin") && role !== "admin") {
        return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*', '/my-account/:path*', '/auth/:path*']
}
import { NextResponse } from "next/server"
import { USER_DASHBOARD, WEBSITE_LOGIN } from "./routes/WebsiteRoutes"
import { jwtVerify } from "jose"
import { ADMIN_DASHBOARD } from "./routes/AdminPannelRoute"

export async function middleware(request) {
    try {
        const pathname = request.nextUrl.pathname
        const hasToken = request.cookies.has('access_token')

        if (!hasToken) {
            // if user not logged in and trying to access protected routes redirect to login
            if (!pathname.startsWith('/auth')) {
                return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl))
            }

            return NextResponse.next() // allow access to auth routes if not logged in
        }

        //  verify token
        const access_token = request.cookies.get('access_token')?.value
        const { payload } = await jwtVerify(access_token, new TextEncoder().encode(process.env.SECRET_KEY))

        const role = payload.role
        // prevent logged in users form accessing auth routes

        if (pathname.startsWith('/auth')) {
            return NextResponse.redirect(new URL(role === 'admin' ? ADMIN_DASHBOARD : USER_DASHBOARD, request.nextUrl))
        }

        // protect admin router
        if (pathname.startsWith('/admin') && role !== 'admin') {
            return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl))
        }

        // protect usser route
        // if (pathname.startsWith('/my-account') && role !== 'user') {
        //     return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl))
        // }

        return NextResponse.next();

    } catch (error) {
        console.log(error)
        return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl))
    }
}

export const config = {
    matcher: ['/admin/:path*', '/my-account/:path*', '/auth/:path*']
}
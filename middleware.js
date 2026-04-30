import { NextResponse } from "next/server"
import { USER_DASHBOARD, WEBSITE_LOGIN } from "./routes/WebsiteRoutes"
import { jwtVerify } from "jose"
import { ADMIN_DASHBOARD } from "./routes/AdminPannelRoute"
import { showToast } from "./lib/showToast"

export async function middleware(request) {
    try {

        const secret = process.env.SECRET_KEY

        // ✅ Catch missing env var explicitly
        if (!secret) {
            showToast('error',"SECRET_KEY is not defined in environment variables")
            console.log("SECRET_KEY is not defined in environment variables")
            return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl))
        }
        const pathname = request.nextUrl.pathname
        const accessToken = request.cookies.get('access_token')?.value
        const refreshToken = request.cookies.get('refresh_token')?.value

        // No tokens at all
        if (!accessToken && !refreshToken) {
            if (!pathname.startsWith('/auth')) {
                return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl))
            }
            return NextResponse.next()
        }

        // Try to verify access token
        if (accessToken) {
            try {
                const { payload } = await jwtVerify(
                    accessToken,
                    new TextEncoder().encode(secret)
                )

                const role = payload.role

                if (pathname.startsWith('/auth')) {
                    return NextResponse.redirect(
                        new URL(role === 'admin' ? ADMIN_DASHBOARD : USER_DASHBOARD, request.nextUrl)
                    )
                }

                if (pathname.startsWith('/admin') && role !== 'admin') {
                    return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl))
                }

                return NextResponse.next()

            } catch (err) {
                // access_token is expired/invalid — fall through to refresh attempt
            }
        }

        // Access token missing or expired — try refreshing
        if (refreshToken) {
            try {
                const refreshResponse = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/refresh`,
                    {
                        method: 'POST',
                        headers: {
                            Cookie: `refresh_token=${refreshToken}`
                        },
                        credentials: 'include'
                    }
                )

                if (refreshResponse.ok) {
                    // Forward the new access_token cookie from backend to the response
                    const setCookieHeader = refreshResponse.headers.get('set-cookie')
                    const response = NextResponse.next()

                    if (setCookieHeader) {
                        response.headers.set('set-cookie', setCookieHeader)
                    }

                    if (pathname.startsWith('/auth')) {
                        return NextResponse.redirect(new URL(USER_DASHBOARD, request.nextUrl))
                    }

                    return response
                }
            } catch (err) {
                // refresh failed, fall through to redirect
            }
        }

        // All token attempts failed
        if (!pathname.startsWith('/auth')) {
            return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl))
        }

        return NextResponse.next()

    } catch (error) {
        console.log(error)
        return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.nextUrl))
    }
}

export const config = {
    matcher: ['/admin/:path*', '/my-account/:path*', '/auth/:path*']
}
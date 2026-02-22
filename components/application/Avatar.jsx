"use client"

import dynamic from "next/dynamic"

const Spline = dynamic(
  () => import("@splinetool/react-spline"),
  { ssr: false, loading: () => <div className="h-full w-full animate-pulse bg-muted rounded-xl" /> }
)

export default function Avatar() {
  return (
    <div className="h-[420px] w-full">
      <Spline scene="https://prod.spline.design/xONqEiJgQiemZD9p/scene.splinecode" />
    </div>
  )
}
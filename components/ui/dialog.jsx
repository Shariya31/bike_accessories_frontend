"use client"

import * as React from "react"
import { XIcon } from "lucide-react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { cn } from "@/lib/utils"


function Dialog({ ...props }) {
    return (
        <DialogPrimitive.Root {...props} />
    )
}


function DialogTrigger({ ...props }) {
    return (
        <DialogPrimitive.Trigger {...props} />
    )
}


function DialogPortal({ children, ...props }) {
    return (
        <DialogPrimitive.Portal {...props}>
            {children}
        </DialogPrimitive.Portal>
    )
}


function DialogClose({ ...props }) {
    return (
        <DialogPrimitive.Close {...props} />
    )
}


function DialogOverlay({ className, ...props }) {
    return (
        <DialogPrimitive.Overlay
            className={cn(
                `
                fixed
                inset-0

                z-[999999]

                w-screen
                h-screen

                bg-black/50
                `,
                className
            )}
            {...props}
        />
    )
}


function DialogContent({
    className,
    children,
    showCloseButton = true,
    ...props
}) {
    return (
        <DialogPortal>

            <DialogOverlay />

            <DialogPrimitive.Content
                {...props}
                className={cn(
                    `
                    fixed
                    left-1/2
                    top-1/2

                    z-[1000000]

                    -translate-x-1/2
                    -translate-y-1/2

                    max-w-none

                    rounded-lg
                    border
                    bg-white

                    p-6

                    shadow-2xl
                    outline-none
                    `,
                    className
                )}
                style={{
                    width: "80vw",
                    height: "80vh",
                }}
            >
                {children}

                {showCloseButton && (
                    <DialogPrimitive.Close
                        className="
                            absolute
                            right-4
                            top-4
                            z-[1000001]
                        "
                    >
                        <XIcon className="h-5 w-5" />

                        <span className="sr-only">
                            Close
                        </span>
                    </DialogPrimitive.Close>
                )}

            </DialogPrimitive.Content>

        </DialogPortal>
    )
}


function DialogHeader({ className, ...props }) {
    return (
        <div
            className={cn(
                "flex flex-col gap-2 text-left",
                className
            )}
            {...props}
        />
    )
}


function DialogFooter({ className, ...props }) {
    return (
        <div
            className={cn(
                "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
                className
            )}
            {...props}
        />
    )
}


function DialogTitle({ className, ...props }) {
    return (
        <DialogPrimitive.Title
            className={cn(
                "text-lg font-semibold",
                className
            )}
            {...props}
        />
    )
}


function DialogDescription({ className, ...props }) {
    return (
        <DialogPrimitive.Description
            className={cn(
                "text-sm text-muted-foreground",
                className
            )}
            {...props}
        />
    )
}


export {
    Dialog,
    DialogTrigger,
    DialogPortal,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
}
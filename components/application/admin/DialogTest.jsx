"use client"

import React from "react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"


const DialogTest = () => {

    return (
        <Dialog>

            <DialogTrigger asChild>
                <Button type="button">
                    Open Dialog
                </Button>
            </DialogTrigger>


            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Test Dialog
                    </DialogTitle>

                    <DialogDescription>
                        This is just a test.
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-4">
                    Hello
                </div>
            </DialogContent>

        </Dialog>
    )
}


export default DialogTest
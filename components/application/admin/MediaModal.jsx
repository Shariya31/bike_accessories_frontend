import React, { useState } from "react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { useGetMedia } from "@/hooks/media/useGetMedia";
import ModalMediaBlock from "./ModalMediaBlock";
import { showToast } from "@/lib/showToast";

const MediaModal = ({
    open,
    setOpen,
    selectedMedia,
    setSelectedMedia,
    isMultiple,
}) => {
    const [previouslySelected, setPreviouslySelected] = useState([])
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isPending,
        isError,
        status
    } = useGetMedia({
        limit: 18,
        deleteType: "SD",
    });



    const handleClear = () => {
        setSelectedMedia([])
        setPreviouslySelected([])
        showToast('success', 'Media selection cleared')
        setOpen(false)
    }

    const handleClose = () => {
        setSelectedMedia(previouslySelected)
        setOpen(false)
    }

    const handleSelect = () => {
      if(selectedMedia.length <= 0){
        return showToast('error', 'Please select a media.')
      }

      setPreviouslySelected(selectedMedia)
      setOpen(false)
    }

    return (
        <Dialog
            open={open}
            onOpenChange={() => setOpen(!open)}
        >

            <DialogContent
                className="w-[60vw] h-[80vh] max-w-none p-0 overflow-hidden bg-white"
            >

                <DialogDescription className="hidden"></DialogDescription>


                {/* ================================
                    MAIN CONTAINER
                ================================= */}

                <div className="h-full flex flex-col">


                    {/* ================================
                        HEADER
                    ================================= */}

                    <DialogHeader
                        className="shrink-0 h-14 px-4 flex flex-row items-center justify-between border-b "
                    >

                        <DialogTitle>
                            Media Selection
                        </DialogTitle>

                    </DialogHeader>


                    {/* ================================
                        MEDIA CONTENT
                    ================================= */}

                    <div
                        className="flex-1 min-h-0 overflow-y-auto p-4"
                    >
                        {isPending ?
                            (<>
                                <div className="size-full flex justify-center items-center">
                                    {/* Add a loading svg here */}

                                    <div className="">
                                        Loading...
                                    </div>
                                </div>
                            </>)
                            :
                            isError ?
                                <div className="size-full flex justify-center items-center">
                                    <span className="text-red-500">{error.message}</span>
                                </div>
                                :
                                <>
                                    <div className="grid lg:grid-cols-6 grid-cols-3 gap-2">
                                        {data?.pages?.map((page, index) => (
                                            <React.Fragment key={index}>
                                                {
                                                    page?.media?.map((item) => (

                                                        <ModalMediaBlock
                                                            key={item._id}
                                                            media={item}
                                                            selectedMedia={selectedMedia}
                                                            setSelectedMedia={setSelectedMedia}
                                                            isMultiple={isMultiple}

                                                        />
                                                    ))
                                                }
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </>
                        }

                        {/* Media grid will go here */}

                    </div>


                    {/* ================================
                        FOOTER
                    ================================= */}

                    <div
                        className="shrink-0 h-16 p-4 mb-4 flex items-center justify-between border-t"
                    >

                        {/* Clear */}

                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleClear}
                        >
                            Clear All
                        </Button>


                        {/* Right buttons */}

                        <div className="flex items-center gap-4">

                            <Button
                                type="button"
                                variant="secondary"
                                onClick={handleClose}
                            >
                                Close
                            </Button>

                            <Button
                                type="button"
                                onClick={handleSelect}
                            >
                                Select
                            </Button>

                        </div>

                    </div>

                </div>

            </DialogContent>

        </Dialog>
    )
}

export default MediaModal
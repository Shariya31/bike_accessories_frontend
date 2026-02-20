import React from 'react'
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
const ButtonLoading = ({type, text, loading, onClick, ...props}) => {
  return (
    <div className="flex gap-2">
      <Button type={type} variant="secondary" disabled={loading} onClick={onClick} {...props}>
        {text}
        {loading && <Spinner data-icon="inline-start" />}
      </Button>
    </div>
  )
}

export default ButtonLoading

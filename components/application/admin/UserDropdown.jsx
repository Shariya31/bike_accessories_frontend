import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import { IoIosBasket } from 'react-icons/io'
import { MdOutlineShoppingBag } from 'react-icons/md'
import LogoutButton from './LogoutButton'


const UserDropdown = () => {
  const {auth:user} = useSelector(state => state.authStore)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user?.avatar?.url} />
          <AvatarFallback>{user?.name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='me-5 w-44'>
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <p className='font-semibold'>{user?.name}</p>
          </DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link className='cursor-pointer' href=""><IoIosBasket/>New Product</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link className='cursor-pointer' href=""><MdOutlineShoppingBag/>Orders</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>

          <LogoutButton/>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown

import { useLogout } from '@/hooks/auth/useLogout';
import React from 'react'
import { useDispatch } from 'react-redux';
import { logout as reduxLogout } from '../../../store/slices/authSlice'
import {AiOutlineLogout} from 'react-icons/ai'
import { showToast } from '@/lib/showToast';
import { useRouter } from 'next/navigation';
import { WEBSITE_LOGIN } from '@/routes/WebsiteRoutes';
const LogoutButton = () => {
    const { mutateAsync: logout, isPending } = useLogout();
    const dispatch = useDispatch();
    const router = useRouter()
    const handleLogout = async () => {
         if (isPending) return;
        try {
            const res = await logout();
            console.log(res.status, 'res')
            if (res?.status === 200) {
                showToast('success', res.message)
                dispatch(reduxLogout())
                router.push(WEBSITE_LOGIN)
            }
        } catch (error) {
            console.error("Logout failed", error);
        }
    };
    return (
        <span disabled={isPending} onClick={handleLogout} className='flex justify-center items-center gap-2 cursor-pointer'>
            <AiOutlineLogout color='red'/>
             {isPending ? 'Logging out...' : 'Logout'}
        </span>
    )
}

export default LogoutButton

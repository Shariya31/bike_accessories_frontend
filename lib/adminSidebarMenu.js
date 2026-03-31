import { ADMIN_DASHBOARD, ADMIN_MEDIA_SHOW } from "@/routes/AdminPannelRoute";
import { AiOutlineDashboard } from 'react-icons/ai'
import { BiCategory } from 'react-icons/bi'
// import { } from 'react-icons/ios'
import { MdOutlinePermMedia, MdOutlineShoppingBag } from 'react-icons/md'
// import { } from 'react-icons/lw'
import { IoIosBasket, IoMdStarOutline } from 'react-icons/io'
import { RiCouponLine } from 'react-icons/ri'
import { LuUserRound } from "react-icons/lu";
export const adminAppSidebarMenu = [
    {
        title: 'Dashboard',
        url: ADMIN_DASHBOARD,
        icon: AiOutlineDashboard
    },
    {
        title: 'Category',
        url: '#',
        icon: BiCategory,
        submenu: [
            {
                title: 'Add Category',
                url: '#'
            },
            {
                title: 'All Category',
                url: '#'
            },
        ]
    },
    {
        title: 'Products',
        url: '#',
        icon: IoIosBasket,
        submenu: [
            {
                title: 'Add Product',
                url: '#'
            },
            {
                title: 'Add Variant',
                url: '#'
            },
            {
                title: 'All Products',
                url: '#'
            },
            {
                title: 'Product Variants',
                url: '#'
            },
        ]
    },
    {
        title: 'Coupons',
        url: '#',
        icon: RiCouponLine,
        submenu: [
            {
                title: 'Add Coupon',
                url: '#'
            },
            {
                title: 'All Coupons',
                url: '#'
            },
        ]
    },
    {
        title: 'Orders',
        url: '#',
        icon: MdOutlineShoppingBag,
    },
    {
        title: 'Customers',
        url: '#',
        icon: LuUserRound,
    },
    {
        title: 'Rating & Review',
        url: '#',
        icon: IoMdStarOutline,
    },
    {
        title: 'Media',
        url: ADMIN_MEDIA_SHOW,
        icon: MdOutlinePermMedia,
    },
    
]
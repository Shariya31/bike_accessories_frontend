import { ADMIN_CATEGORY_ADD, ADMIN_CATEGORY_SHOW, ADMIN_COUPON_ADD, ADMIN_COUPON_SHOW, ADMIN_CUSTOMERS_SHOW, ADMIN_DASHBOARD, ADMIN_MEDIA_SHOW, ADMIN_PRODUCT_ADD, ADMIN_PRODUCT_SHOW, ADMIN_PRODUCT_VARIANT_ADD, ADMIN_PRODUCT_VARIANT_SHOW } from "@/routes/AdminPannelRoute";
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
                url: ADMIN_CATEGORY_ADD
            },
            {
                title: 'All Category',
                url: ADMIN_CATEGORY_SHOW
            },
        ]
    },
    {
        title: 'Products',
        url: '#',
        icon: IoIosBasket,
        submenu: [
            {
                title: 'All Products',
                url: ADMIN_PRODUCT_SHOW
            },
            {
                title: 'Add Product',
                url: ADMIN_PRODUCT_ADD
            },
            {
                title: 'All Variants',
                url: ADMIN_PRODUCT_VARIANT_SHOW
            },
            {
                title: 'Add Variant',
                url: ADMIN_PRODUCT_VARIANT_ADD
            },
        ]
    },
    {
        title: 'Coupons',
        url: '#',
        icon: RiCouponLine,
        submenu: [
            {
                title: 'All Coupons',
                url: ADMIN_COUPON_SHOW
            },
            {
                title: 'Add Coupon',
                url: ADMIN_COUPON_ADD
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
        url: ADMIN_CUSTOMERS_SHOW,
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
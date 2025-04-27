import React from 'react';
const objs = [

    { title: "Products", link: "/products" },
    { title: "What we do", link: "/services" },
    { title: "Contact Us", link: "/contact" },
    { title: "ISO Certification", link: "/certificate" }
];

const Navbar = () => {
    return (
        <nav className='flex items-center justify-around'>
            <img src="/logo.svg" alt="" className='mt-2.5' />
            <ul className='flex  items-center gap-10 self-end text-base font-medium'>
                {objs.map((li, index) => (
                    <li key={index} className="cursor-pointer">
                        {li.title}
                    </li>
                ))}
                <li>
                    <button text="Get a Quote" />
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
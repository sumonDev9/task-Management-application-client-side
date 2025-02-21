import React from 'react';

const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
        <p>Copyright © {new Date().getFullYear()} - All right reserved by <span className="font-semibold text-[#111111]">TaskHive</span> | Created with ❤️ by <span className="font-semibold text-[#111111]">Sumon Mitra</span></p>        </aside>
      </footer>
    );
};

export default Footer;
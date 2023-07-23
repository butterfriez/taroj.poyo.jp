import React, { useState } from 'react';
import { FaHome, FaInfoCircle, FaComments, FaAngleDown } from 'react-icons/fa';
import LanguageSwitch from './LanguageSwitch';
import Announcement from './Announcement';
import Profile from './Profile';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);

    const handleLink = (url: string) => {
        router.push(url);
    };

    const toggleDropdown = () => {
        setIsExpanded(!isExpanded);
    };

    const isActive = (path: string) => {
        return router.pathname === path;
    };

    return (
        <header className="sticky top-0 left-0 z-100 whitespace-nowrap w-full bg-white dark:bg-slate-900 shadow-xl transition-all duration-350 ease">
            <Announcement />
            <nav className="w-full flex items-center justify-between px-0 py-1 md:py-2">
                <div className="flex xl:absolute left-1 xl:left-64 items-center justify-start font-medium w-full md:w-auto">
                    {/* Move the LanguageSwitch to the left side */}
                    <div className="flex items-center ml-2 xl:ml-0 relative">
                        <LanguageSwitch isHeader={true} />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center font-medium text-black dark:text-white space-x-0 md:space-x-2.5 flex-grow justify-center">
                    <div
                        className={`md:flex ${isExpanded ? 'flex' : 'hidden'
                            } flex-col md:flex-row items-center gap-1 font-medium text-black dark:text-white`}
                    >
                        <button
                            aria-label="home"
                            onClick={() => handleLink('/')}
                            className={`flex items-center text-center hover:text-blue-600 px-2 ${isActive('/') ? 'border-b-2 border-blue-600 text-blue-600' : 'border-b-2 border-transparent text-black dark:text-white'
                                } transition-all duration-300`}
                        >
                            <FaHome className="mr-1 text-xl mb-1 md:mb-0" />
                            <span className="text-base">{t('header.home')}</span>
                        </button>
                        <button
                            aria-label="about"
                            onClick={() => handleLink('/about')}
                            className={`flex items-center text-center hover:text-blue-600 px-2 ${isActive('/about') ? 'border-b-2 border-blue-600 text-blue-600' : 'border-b-2 border-transparent text-black dark:text-white'
                                } transition-all duration-300`}
                        >
                            <FaInfoCircle className="mr-1 text-xl mb-1 md:mb-0" />
                            <span className="text-base">{t('header.about')}</span>
                        </button>
                        <button
                            aria-label="chat"
                            onClick={() => handleLink('/chat')}
                            className={`flex items-center text-center hover:text-blue-600 px-2 ${isActive('/chat') ? 'border-b-2 border-blue-600 text-blue-600' : 'border-b-2 border-transparent text-black dark:text-white'
                                } transition-all duration-300`}
                        >
                            <FaComments className="mr-1 text-xl mb-1 md:mb-0" />
                            <span className="text-base">{t('header.chat')}</span>
                        </button>
                    </div>
                    <div className={`md:hidden flex justify-center w-full flex-grow ${isExpanded ? 'pt-2' : 'pt-0'}`}>
                        {/* Container for the arrow, hidden on laptop */}
                        <button
                            aria-label="dropdown"
                            onClick={toggleDropdown}
                            className={`flex items-center ${isExpanded ? 'transform rotate-180' : 'text-gray-500'} transition-all duration-300`}
                        >
                            <FaAngleDown className="text-xl" />
                        </button>
                    </div>
                </div>
                <div className="flex xl:absolute right-1 xl:right-64 items-center justify-end font-medium w-full md:w-auto">
                    <div className="flex items-center relative">
                        <Profile />
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
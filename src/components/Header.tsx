import React, { useState, useEffect } from 'react';
import { FaHome, FaComments, FaAngleDown, FaUser } from 'react-icons/fa';
import LanguageSwitch from './LanguageSwitch';
import Profile from './Profile';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { UnmountClosed } from 'react-collapse';
import Link from 'next/link';
import ThemeSwitch from './ThemeSwitch';

const Header = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activeLink, setActiveLink] = useState(router.pathname);

    const toggleDropdown = () => {
        setIsExpanded(!isExpanded);
    };

    const handleLinkClick = (path: string) => {
        setActiveLink(path);
        toggleDropdown();
    };

    const isActive = (path: string) => {
        return activeLink === path;
    };

    const isChatPage = router.pathname === '/chat';
    const headerPosition = isChatPage ? 'relative' : 'fixed  top-0 left-0';

    useEffect(() => {
        const handleStart = () => setIsLoading(true);
        const handleComplete = () => setIsLoading(false);

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        };
    }, [router]);

    return (
        <header className={`${headerPosition} z-[2] whitespace-nowrap w-full bg-white dark:bg-slate-900 shadow-xl transition-all duration-350 ease`}>
            {isExpanded && (
                <div
                    className="fixed inset-0 z-10"
                    onClick={toggleDropdown}
                />
            )}
            <div className="relative w-full flex items-center z-[100] justify-between px-0 py-1 md:py-2">
                <div className="flex xl:absolute left-1 xl:left-64 items-center justify-start font-medium w-full md:w-auto">
                    <div className="flex items-center ml-2 xl:ml-0 relative">
                        <LanguageSwitch isHeader={true} />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center font-medium text-black dark:text-white space-x-0 md:space-x-2.5 flex-grow justify-center">
                    <UnmountClosed isOpened={true || false}>
                        <nav
                            className={`flex ${isExpanded ? 'flex' : 'hidden duration-300 md:flex'
                                } flex-col md:flex-row items-center gap-1 font-medium text-black dark:text-white`}
                        >
                            <Link href="/"
                                className={`flex items-center text-center hover:text-blue-600 px-2 ${isActive('/') ? 'border-b-2 border-blue-600 text-blue-600' : 'border-b-2 border-transparent text-black dark:text-white'
                                    } transition-all duration-300`}
                                onClick={() => handleLinkClick('/')}
                            >
                                <FaHome className="mr-1 text-xl mb-1 md:mb-0" />
                                <span className="text-base">{t('header.home')}</span>
                            </Link>
                            <Link href="/about"
                                className={`flex items-center text-center hover:text-blue-600 px-2 ${isActive('/about')
                                    ? 'border-b-2 border-blue-600 text-blue-600'
                                    : 'border-b-2 border-transparent text-black dark:text-white'
                                    } transition-all duration-300`}
                                onClick={() => handleLinkClick('/about')}
                            >
                                <FaUser className="mr-1 text-lg mb-1 md:mb-0" />
                                <span className="text-base">{t('header.about')}</span>
                            </Link>
                            <Link href="/chat"
                                className={`flex items-center text-center hover:text-blue-600 px-2 ${isActive('/chat')
                                    ? 'border-b-2 border-blue-600 text-blue-600'
                                    : 'border-b-2 border-transparent text-black dark:text-white'
                                    } transition-all duration-300`}
                                onClick={() => handleLinkClick('/chat')}
                            >
                                <FaComments className="mr-1 text-xl mb-1 md:mb-0" />
                                <span className="text-base">{t('header.chat')}</span>
                            </Link>
                        </nav>
                    </UnmountClosed>
                    <div className={`md:hidden flex justify-center w-full flex-grow ${isExpanded ? 'pt-2' : 'pt-0'}`}>
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
                        <ThemeSwitch />
                        <Profile />
                    </div>
                </div>
            </div>
            {isLoading && (
                <div className="absolute bottom-0 left-0 w-full h-full opacity-25 bg-blue-600 transition-all duration-500 ease-in-out loading-bar" />
            )}
            <div className='progress'></div>
        </header >
    );
};

export default Header;
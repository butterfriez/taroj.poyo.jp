import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Head from 'next/head';
import { FaChartBar, FaComments } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const RouteLink = ({ path, label, icon: Icon }: { path: string; label: string; icon: IconType }) => (
    <Link href={path}
        className="group flex flex-col items-center justify-center p-5 rounded-lg hover:bg-opacity-70 transition-colors shadow-md bg-white dark:bg-zinc-950 text-black dark:text-white">
        {Icon && (
            <span
                className="flex justify-center md:group-hover:opacity-10 opacity-100 text-4xl dark:text-white text-black transition-opacity duration-500">
                <Icon />
            </span>
        )}
        <div
            className="flex justify-center md:group-hover:opacity-100 md:opacity-0 md:absolute transition-opacity duration-500"
        >
            <span className="text-lg font-bold dark:text-white text-black">{label}</span>
        </div>
    </Link>
);

const Apps = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const [githubStatsImage, setGithubStatsImage] = useState('');
    const [githubLanguagesImage, setGithubLanguagesImage] = useState('');

    useEffect(() => {
        setGithubStatsImage(`https://github-readme-stats.vercel.app/api?username=taroj1205&show_icons=true&hide_border=true&&count_private=true&include_all_commits=true&theme=${theme}`);
        setGithubLanguagesImage(`https://github-readme-stats.vercel.app/api/top-langs/?username=taroj1205&show_icons=true&hide_border=true&layout=compact&langs_count=10&theme=${theme}`);
    }, [theme]);

    const routes = [
        { path: '/apps/chat', label: 'Chat', icon: FaComments },
        { path: 'https://analytics.umami.is/share/gbBddDRRyRvseyAP/taroj.poyo.jp', label: 'Analytics', icon: FaChartBar },
    ];

    const sceneRef = React.useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     const handleResize = () => {
    //         const height = window.innerHeight;
    //         if (sceneRef.current) {
    //             sceneRef.current.style.height = `${height - 40}px`;
    //         }
    //     };

    //     window.addEventListener('resize', handleResize);

    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     }
    // }, [sceneRef]);

    const [height, setHeight] = useState('calc(100vh-40px)');
    useEffect(() => {
        const setVisualViewport = () => {
            setHeight(`${window.innerHeight - 40}px`);
        }
        setVisualViewport();

        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', setVisualViewport);
        }

        return () => {
            if (window.visualViewport) {
                window.visualViewport.removeEventListener(
                    'resize',
                    setVisualViewport
                );
            }
        };
    }, []);

    return (
        <>
            <Head>
                <meta name='title' content='Apps - taroj.poyo.jp' />
                <meta name='description' content='Index page for taroj.poyo.jp' />
                <meta property="og:title" content="Apps - taroj.poyo.jp" />
                <meta
                    property="og:description"
                    content="Index page for taroj.poyo.jp"
                />
                <meta name="twitter:title" content="Apps - taroj.poyo.jp" />
                <meta
                    name="twitter:description"
                    content="Apps page for taroj.poyo.jp"
                />
                <link rel="preload" href="/image/thumbnail/thumbnail.webp" as="image" />
                <link rel="preload" href={githubStatsImage} as="image" />
                <link rel="preload" href={githubLanguagesImage} as="image" />
                <title>{t('title.apps')}</title>
            </Head>
            <div className='fixed inset-0 z-[-10]'>
                <Image alt='thumbnail image' src="/image/thumbnail/thumbnail.webp" fill={true} objectFit="cover" />
            </div>
            <div ref={sceneRef} style={{ height }}
                className="flex flex-col justify-center items-center text-black dark:text-white dark:bg-zinc-950 bg-white bg-opacity-60 dark:bg-opacity-60">
                <h1 className="text-4xl md:text-6xl font-bold">
                    {t('apps.list')}
                </h1>
                <div className="grid grid-flow-row grid-cols-2 gap-4 my-6">
                    {routes.map((route, index) => (
                        <RouteLink
                            key={index}
                            path={route.path}
                            label={t(`index.${route.label.toLowerCase()}`)}
                            icon={route.icon}
                        />
                    ))}
                </div>
                <div className="flex flex-col items-center gap-2">
                    <img
                        height="180"
                        width="auto"
                        src={githubStatsImage}
                        alt={'GitHub Stats'}
                        loading='lazy'
                    />
                    <img
                        height="180"
                        width="auto"
                        src={githubLanguagesImage}
                        alt={'GitHub Languages Stats'}
                        loading='lazy'
                    />
                </div>
            </div>
        </>
    );
};

export default Apps;
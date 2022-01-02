import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider'
import Loading from './Loading';
import ReactPlayer from 'react-player';

const Results = () => {
    const { getResults, results, searchedTerm, setSearchedTerm, loading } = useStateContext();
    const location = useLocation();

    useEffect(() => {
        if (searchedTerm != '') {
            if (location.pathname == '/videos') {
                getResults(`/search/q=${searchedTerm} videos`)
            } else {
                getResults(`${location.pathname}/q=${searchedTerm}&num=40`)
            }
        }
    }, [searchedTerm, location.pathname])

    if (loading) return <Loading />

    switch (location.pathname) {
        case '/search':
            return (
                <div className='sm:px-56 flex flex-wrap justify-between space-y-6'>
                    {results?.results?.map(({link, title}, index) => (
                        <div key={index} className='md:w-2/5 w-full'>
                            <a href={link} target='_blank' rel='noreferrer'>
                                <p className='text-sm'>{link.legth>30 ? link.substring(0,30) : link}</p>
                                <p className='text-lg hover:underline dark:text-blue-300 text-blue-700'>{title}</p>
                            </a>
                        </div>
                    ))}
                </div>
            )

        case '/images':
            return (
                <div className='flex flex-wrap justify-center items-center'>
                    {results?.image_results?.map(({link: {href, title}, image}, index) => (
                        <a href={href} className='sm:p-3 p-5' key={index} target='_blank' rel='noreferrer'>
                        <img src={image?.src} alt={title} loading='lazy' />
                        <p className='sm:w-36 w-36 break-words text-sm mt-2'>{title}</p>
                    </a>
                    ))}
                </div>
            )

        case '/news':
            return (
                <div className='sm:px-56 flex flex-wrap justify-between items-center space-y-6'>
                    {results?.entries?.map(({ id, links ,source, title }, index) => (
                        <div key={index} className='md:w-2/5 w-full'>
                            <a key={id} href={links?.[0].href} target='_blank' rel='nonreferrer' className='hover:underline'>
                                <p className='text-lg dark:text-blue-300 text-blue-700'>
                                    {title}
                                </p>
                            </a>
                            <div className='flex gap-4'>
                                <a href={source?.href} target='_blank' rel='nonreferrer' className='hover:underline hover:text-blue-300'>
                                    {source?.href}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )

        case '/videos':
            return (
                <div className='flex flex-wrap justify-center items-center'>
                    {results?.results?.map((video, index) => (
                        <div key={index} className='p-2'>
                            <ReactPlayer 
                                url={video.additional_links?.[0].href} 
                                controls 
                                width='355px' 
                                height='200px' />
                        </div>
                    ))}
                </div>
            )
    
        default:
            return 'error';
    }

}

export default Results;
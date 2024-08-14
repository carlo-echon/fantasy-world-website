"use client"

import { useRouter } from 'next/navigation';

const LocationsWidget = ({name, climate, locationsid}) => {
    const router = useRouter();
    const openNewPage = () => {
        router.push(`locations/${locationsid}`);
    }

    return(
        <div className='group hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 duration-300 border rounded border-md content-center p-4'
        onClick={openNewPage}>
           <div className="text-2xl text-white mb-3">{name}</div>
           <div className='text-xl text-white italic mb-4'>{climate}</div>
           <div className="text-base text-black group-hover:text-white">Learn More</div>
        </div>
    )
}

export default LocationsWidget
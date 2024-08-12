"use client"

import { useRouter } from 'next/navigation';

const CharacterWidget = ({name, species, standing, characterid}) => {
    const router = useRouter();
    const openNewPage = () => {
        router.push(`characters/${characterid}`);
    }

    return(
        <div className="group hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 duration-300 border rounded border-md content-center p-4"
        onClick={openNewPage}>
           <div className="text-2xl text-white">{name}</div>
           <div className="text-xl text-white">{standing}</div>
           <div className="text-base italic text-white mb-4">{species}</div>
           <div className="text-base text-black group-hover:text-white">Learn More</div>
        </div>
    )
}

export default CharacterWidget
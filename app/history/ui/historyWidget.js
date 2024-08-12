"use client"

  import { useRouter } from 'next/navigation';

const HistoryWidget = ({historyid, date, event, description}) => {
    const router = useRouter();
    const openNewPage = () => {
        router.push(`history/${historyid}`);
    }

    return(
        <div className="group hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 duration-300 border rounded border-md content-center p-4"
             onClick={openNewPage}>
                <div className="text-xl text-white">{event}</div>
                <div className="text-base text-white mb-4">{date}</div>
                <div className="text-base text-black group-hover:text-white">Learn More</div>
        </div>
    );
};

export default HistoryWidget
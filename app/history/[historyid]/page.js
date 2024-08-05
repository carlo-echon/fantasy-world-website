"use client"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getOneHistory } from "../services/historyService"

export default function HistoryDetail() {
    const { historyid } = useParams();
    const [currentHistory, setCurrentHistory] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(historyid);
        if (historyid) {
          getOneHistory(historyid)
            .then(response => setCurrentHistory(response.data))
            .catch(error => setError(error));
        }
      }, [historyid]);

    console.log(currentHistory);

    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="text-white text-lg">{currentHistory.historyevent}</div>
        </main>
    )
}
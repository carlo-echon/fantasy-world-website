import HistoryWidget from "./ui/historyWidget";

export default function History() {
    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="w-full">
                <div className="flex justify-center">
                    <h1 className="text-2xl">Chronus Grimoire: History of the Known World</h1>
                </div>
                <div className="flex justify-end">
                    <div className="border rounded-lg border-white text-center bg-green-700 hover:bg-green-800 px-4 py-2">Add</div>
                </div>
            </div>

            <div className="grid text-center grid-cols-4 col-span-4 gap-3">
                <HistoryWidget 
                    date = {"17th of Evermoor"}
                    event = {"Founding of the Sorcerer Kingdom of Thayen"}
                />
                <HistoryWidget 
                    date = {"Beginning of Time"}
                    event = {"The Conflux of Stars"}
                />
            </div>
            
            <div className="border rounded-lg border-white text-center text-md p-6">
                <div>
                    Blessed are the legend-makers with their rhyme of things not found within recorded time.
                </div>
                <div className="italic text-base">
                    - J.R.R Tolkien
                </div>
            </div>
        </main>
    );
}
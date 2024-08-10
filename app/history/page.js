"use client"

import HistoryWidget from "./ui/historyWidget";
import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
  } from "@nextui-org/modal";
import {Input, Textarea} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import {useDisclosure} from '@nextui-org/use-disclosure';

import { getAllHistory, postHistory } from "./services/historyService";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { checkIsAdmin } from "../utils/auth";



export default function History() {
    const router = useRouter();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [history, setHistory] = useState([]);
    const [error, setError] = useState(null);
    const [historyDate, setHistoryDate] = useState("");
    const [historyEvent, setHistoryEvent] = useState("");
    const [historyDescription, setHistoryDesc] = useState("");
    const [isAdmin, setIsAdmin] = useState(checkIsAdmin());

    const handlePost = async () => {
      try{
        console.log("In handlePost");
        const newHistoryEntry = {historyDate, historyEvent, historyDescription};
        console.log(newHistoryEntry);
        await postHistory(newHistoryEntry);
        location.reload() //Not pretty and does a hard reload but works for now. Might need to make a custom refresh function since router.refresh works serverside. 
      } catch(err){
        setError(err.message);
      }
      
    }

    useEffect(() => {
      const getHistory = async () => {
        try {
          const result = await getAllHistory();
          console.log(result.data);
          setHistory(result.data);
        } catch (err) {
          setError(err.message);
          console.log(error)
        }
      };
  
      getHistory();
    }, []);

    useEffect(() => {
      console.log('History state updated:', history); // Log the updated history state
    }, [history]);
    

    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            
            <div className="w-full">
                <div className="flex justify-center">
                    <h1 className="text-2xl">Chronus Grimoire: History of the Known World</h1>
                </div>
                { isAdmin &&
                  <div className="flex justify-end">
                  <>
                  <Button className="border rounded-lg border-white text-center bg-green-700 hover:bg-green-800 px-4 py-2"
                    onClick={onOpen}>
                        Add
                  </Button>
            
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="border-white border rounded bg-black text-white" backdrop={"blur"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add History Entry</ModalHeader>
              <ModalBody>
              <Input 
                type="text" 
                label="Date" 
                labelPlacement="outside" 
                placeholder="Enter the Date"
                onChange={(e) => {
                  setHistoryDate(e.target.value);
                }}
                classNames={{
                  label: "!text-white",
                  input: [
                    "!text-white",
                    
                  ],
                  innerWrapper: "bg-black",
                  inputWrapper: [
                    "bg-black",
                    "border", // Add border
                    "border-white",
                    "border-md", // Specify border color
                    "hover:bg-black",
                    "dark:hover:bg-black",
                    "group-data-[focus=true]:bg-black",
                    "dark:group-data-[focus=true]:bg-black",
                    "!cursor-text",
                  ],
                }}
              />
                <Input 
                type="text" 
                label="Event" 
                labelPlacement={"outside"} 
                placeholder="Enter the Event"
                onChange={(e) => {
                  setHistoryEvent(e.target.value);
                }}
                classNames={{
                  label: "!text-white",
                  input: [
                    "!text-white",
                    
                  ],
                  innerWrapper: "bg-black",
                  inputWrapper: [
                    "bg-black",
                    "border", // Add border
                    "border-white",
                    "border-md", // Specify border color
                    "hover:bg-black",
                    "dark:hover:bg-black",
                    "group-data-[focus=true]:bg-black",
                    "dark:group-data-[focus=true]:bg-black",
                    "!cursor-text",
                  ],
                }}/>
                <Textarea 
                label="Description"
                placeholder="Enter your description" 
                classNames={{
                  label: "!text-white",
                  input: [
                    "!text-white",
                    
                  ],
                  innerWrapper: "bg-black",
                  inputWrapper: [
                    "bg-black",
                    "w-full",
                    "border", // Add border
                    "border-white",
                    "border-md", // Specify border color
                    "hover:bg-black",
                    "dark:hover:bg-black",
                    "group-data-[focus=true]:bg-black",
                    "dark:group-data-[focus=true]:bg-black",
                    "!cursor-text",
                  ],
                }}
                onChange={(e) => {
                  setHistoryDesc(e.target.value);
                }}/>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={handlePost}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>    
                  </>
                      
                </div>
                }
                
            </div>

            <div className="grid text-center grid-cols-4 col-span-4 gap-3">
                {history.map((entry) => 
                (
                  <HistoryWidget 
                  date={entry.historydate}
                  event={entry.historyevent}
                  description={entry.historydescription}
                  historyid = {entry.historyid}
                  key={entry.historyid || index} 
                  />
                )
                )}
            </div>
            
            <div className="border rounded-lg border-white text-center text-md p-6">
                <div>
                    Blessed are the legend-makers with their rhyme of things not found within recorded time.
                </div>
                <div className="italic text-base">
                    - J.R.R Tolkien
                </div>
                {
              isAdmin && <div className="text-white">Admin Mode On</div>
            }
            </div>
        </main>
    );
}
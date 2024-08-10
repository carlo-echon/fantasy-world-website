"use client"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {Button} from "@nextui-org/button";
import {useDisclosure} from '@nextui-org/use-disclosure';
import {
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
} from "@nextui-org/modal";
import {Input, Textarea} from "@nextui-org/input";
import { getOneHistory, deleteOneHistory, updateOneHistory } from "../services/historyService"
import { checkIsAdmin } from "@/app/utils/auth";

export default function HistoryDetail() {
    const { historyid } = useParams();
    const [currentHistory, setCurrentHistory] = useState([]);
    const [error, setError] = useState(null);
    const modalEditDisclosure = useDisclosure()
    const modalDeleteDisclosure = useDisclosure()
    const [historyDate, setHistoryDate] = useState("");
    const [historyEvent, setHistoryEvent] = useState("");
    const [historyDescription, setHistoryDesc] = useState("");
    const [isAdmin, setIsAdmin] = useState(checkIsAdmin());


    useEffect(() => {
        console.log(historyid);
        if (historyid) {
          getOneHistory(historyid)
            .then(response => setCurrentHistory(response.data))
            .catch(error => setError(error));
        }
      }, [historyid]);

    const handleDelete = async() => {
      try{
        deleteOneHistory(historyid);
        console.log("History Deleted");
      } catch(err){
        setError(err);
      }
    }

    const handleEdit = async() => {
      try{
        // Construct editedHistoryEntry using current values or fallback to currentHistory
        const editedHistoryEntry = {
          historyDate: historyDate || currentHistory.historydate,
          historyEvent: historyEvent || currentHistory.historyevent,
          historyDescription: historyDescription || currentHistory.historydescription,
          };
          console.log(editedHistoryEntry);
        updateOneHistory(historyid, editedHistoryEntry);
        console.log("Req sent")
        
      } catch(err){
        setError(err);
      }
    }

    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="flex flex-row justify-between items-center w-full">
            <div className="group">
              <a href="/history">
              <h2 className={`mb-3 text-xl font-semibold`}>
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                &lt;-
                </span>
              {"    "}Back
              </h2>
              </a>
            </div>
            <div className="text-white text-3xl">{currentHistory.historyevent}</div>
            { !isAdmin && 
            <div className="text-black">
              Secret 2
            </div>
            }
              { isAdmin &&
                <div className="table table-row gap-5">
                <>
                  <button className="border-gray rounded transition-colors bg-black hover:bg-green-900 text-white p-3"
                  onClick={modalEditDisclosure.onOpen}>Edit</button>
                  <Modal isOpen={modalEditDisclosure.isOpen} onOpenChange={modalEditDisclosure.onOpenChange} className="border-white border rounded bg-black text-white" backdrop={"blur"}>
                  
                  <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Edit History Entry?</ModalHeader>
                    <ModalBody>
                      <Input
                      type="text"
                      label="Edit Date"
                      defaultValue={currentHistory.historydate}
                      onValueChange={setHistoryDate}
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
                      label="Edit Event"
                      defaultValue={currentHistory.historyevent}
                      onValueChange={setHistoryEvent}
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
                       <Textarea 
                        label="Description"
                        defaultValue={currentHistory.historydescription}
                        onValueChange={setHistoryDesc}
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
                      />
                    </ModalBody>
                    
                    <ModalFooter>
                    <Button color="danger" variant="light" onClick={modalEditDisclosure.onClose}>
                       Cancel
                     </Button>
                    <Button color="primary" onClick={handleEdit}>
                      Confirm
                    </Button>
                  </ModalFooter>
                  </ModalContent>
                  
                  </Modal>

                </>
                 
                 
                 
                 <>
                  <button className="border-gray rounded transition-colors bg-black hover:bg-red-900 text-white p-3"
                  onClick={modalDeleteDisclosure.onOpen}>Delete</button>
                   <Modal isOpen={modalDeleteDisclosure.isOpen} onOpenChange={modalDeleteDisclosure.onOpenChange} className="border-white border rounded bg-black text-white" backdrop={"blur"}>
                  
                    <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Delete History Entry?</ModalHeader>
                      <p className="text-xl text-white text-center">Are you sure you want to delete this entry?</p>
                      <ModalFooter>
                      <Button color="danger" variant="light" onClick={modalDeleteDisclosure.onClose}>
                         Cancel
                       </Button>
                      <Button color="primary" onClick={handleDelete}>
                        Confirm
                      </Button>
                    </ModalFooter>
                    </ModalContent>
                    
                    </Modal>
                 </>
                
              </div>
              }
          </div>

          <div className="border border-white rounded border-md">
              <div className="flex flex-col items-center justify-around p-16">
                <div className="text-white text-2xl mb-12">Date: {currentHistory.historydate}</div>
                <div className="text-white text-xl">Description: {currentHistory.historydescription}</div>
              </div>
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
    )
}
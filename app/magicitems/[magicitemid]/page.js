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
import { deleteOneMagicItem, updateOneMagicItem, getOneMagicItem } from "../services/magicItemService";
import { checkIsAdmin } from "@/app/utils/auth";

export default function MagicItemDetail() {
    const { magicitemid } = useParams();
    const [currentMagicItem, setCurrentMagicItem] = useState([]);
    const [error, setError] = useState(null);
    const modalEditDisclosure = useDisclosure()
    const modalDeleteDisclosure = useDisclosure()
    const [magicitemName, setMagicItemName] = useState("");
    const [magicitemType, setMagicItemType] = useState("");
    const [magicitemDescription, setMagicItemDesc] = useState("");
    const [isAdmin, setIsAdmin] = useState(checkIsAdmin());

    useEffect(() => {
        console.log(magicitemid);
        if (magicitemid) {
          getOneMagicItem(magicitemid)
            .then(response => setCurrentMagicItem(response.data))
            .catch(error => setError(error));
        }
      }, [magicitemid]);

      const handleDelete = async() => {
        try{
          deleteOneMagicItem(magicitemid);
          console.log("Magic Item Deleted");
        } catch(err){
          setError(err);
        }
      }
    
    const handleEdit = async() => {
        try{
          // Construct editedMagicItemEntry using current values or fallback to currentHistory
          const editedMagicItemEntry = {
            magicitemName: magicitemName || currentMagicItem.magicitemname,
            magicitemType: magicitemType || currentMagicItem.magicitemtype,
            magicitemDescription: magicitemDescription || currentMagicItem.magicitemdescription,
            };
          console.log(editedMagicItemEntry);
          updateOneMagicItem(magicitemid, editedMagicItemEntry);
          console.log("Req sent")
          
        } catch(err){
          setError(err);
        }
      }


    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex flex-row justify-between items-center w-full">
            <div className="group">
              <a href="/magicitems">
              <h2 className={`mb-3 text-xl font-semibold`}>
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                &lt;-
                </span>
              {"    "}Back
              </h2>
              </a>
            </div>

            <div className="text-white text-3xl">{currentMagicItem.magicitemname}</div>
            
            <div className="table table-row gap-5">
                <>
                <button className="border rounded-lg border-white text-center bg-green-700 hover:bg-green-800 px-4 py-2"
                onClick={modalEditDisclosure.onOpen}>
                  Edit
                </button>

                <Modal isOpen={modalEditDisclosure.isOpen} onOpenChange={modalEditDisclosure.onOpenChange} className="border-white border rounded bg-black text-white" backdrop={"blur"}>
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">Edit Magic Item Entry?</ModalHeader>
                        <ModalBody>
                          <Input
                            type="text" 
                            label="Name" 
                            labelPlacement="outside" 
                            defaultValue={currentMagicItem.magicitemname}
                            onChange={(e) => {
                              setMagicItemName(e.target.value);
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
                            label="Type" 
                            labelPlacement="outside" 
                            defaultValue={currentMagicItem.magicitemtype}
                            onChange={(e) => {
                              setMagicItemType(e.target.value);
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
                          <Textarea 
                            label="Description"
                            defaultValue={currentMagicItem.magicitemdescription}
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
                            setMagicItemDesc(e.target.value);
                          }}/>
                        </ModalBody>
                        <ModalFooter>
                          <Button color="danger" variant="light" onClick={modalEditDisclosure.onClose}>Close</Button>
                          <Button color="primary" onClick={handleEdit}>Confirm</Button>
                        </ModalFooter>
                      </>
                    )}
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
            </div>

            <div className="border border-white rounded border-md">
              <div className="flex flex-col items-center justify-around p-16">
                <div className="text-white italic text-2xl mb-12">Type: {currentMagicItem.magicitemtype}</div>
                <div className="text-white text-xl">Powers: {currentMagicItem.magicitemdescription}</div>
              </div>
            </div>

            <div className="border rounded-lg border-white text-center text-md p-6">
              <div>
                The World is full of magical things patiently waiting for our wits to grow sharper.
              </div>
              <div className="italic text-base">
                - Bertrand Russell
              </div>
            </div>

        </main>
    )
}
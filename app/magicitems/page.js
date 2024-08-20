"use client"

import MagicItemWidget from "./ui/magicItemWidget";
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

import { getAllMagicItems, postMagicItem } from "./services/magicItemService";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { checkIsAdmin } from "../utils/auth";

export default function MagicItems() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [magicitems, setMagicItems] = useState([]);
  const [error, setError] = useState(null);
  const [magicitemName, setMagicItemName] = useState("");
  const [magicitemType, setMagicItemType] = useState("");
  const [magicitemDescription, setMagicItemDesc] = useState("");
  const [isAdmin, setIsAdmin] = useState(checkIsAdmin());

  useEffect(() => {
    const getMagicItems = async () => {
      try {
        const result = await getAllMagicItems();
        console.log(result.data);
        setMagicItems(result.data);
      } catch (err) {
        setError(err.message);
        console.log(error)
      }
    };

    getMagicItems();
  }, [error]);

  const handlePost = async() => {
    try{
      console.log("inHandlePost");
      const newItemEntry = {magicitemName, magicitemType, magicitemDescription};
      console.log(newItemEntry);
      await postMagicItem(newItemEntry);
      location.reload() //Not pretty and does a hard reload but works for now. Might need to make a custom refresh function since router.refresh works serverside. 
    } catch(err){
      setError(err.message);
    }
  }


    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="w-full">
                <div className="flex justify-center">
                    <h1 className="text-2xl">Arcane Armory: Relics of Power</h1>
                </div>

                {isAdmin && 
                <div className="flex justify-end">
                    <>
                    <button className="border rounded-lg border-white text-center bg-green-700 hover:bg-green-800 px-4 py-2"
                    onClick={onOpen}>
                        Add
                    </button>

                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="border-white border rounded bg-black text-white" backdrop={"blur"}>
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">Add Magic Item Entry</ModalHeader>
                        <ModalBody>
                          <Input
                            type="text" 
                            label="Name" 
                            labelPlacement="outside" 
                            placeholder="Enter Magic Item's Name"
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
                            placeholder="Enter Type"
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
                            label="Goals"
                            placeholder="Enter Magic Item's Powers and Abilities" 
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
                          <Button color="danger" variant="light" onClick={onClose}>Close</Button>
                          <Button color="primary" onClick={handlePost}>Confirm</Button>
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
                {magicitems.map((entry) => (
                    <MagicItemWidget    
                        name={entry.magicitemname}
                        magicitemid={entry.magicitemid}
                        key={entry.magicitemid || index}
                    />
                )
                )}
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
    );
}
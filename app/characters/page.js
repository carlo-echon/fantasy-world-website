"use client"

import CharacterWidget from "./ui/characterWidget";
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

import { getAllCharacters, postCharacter } from "./services/characterService";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { checkIsAdmin } from "../utils/auth";

export default function Characters() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [characterName, setCharacterName] = useState("");
  const [characterSpecies, setCharacterSpecies] = useState("");
  const [characterAlignment, setCharacterAlignment] = useState("");
  const [characterStanding, setCharacterStanding] = useState("");
  const [characterGoals, setCharacterGoals] = useState("");
  const [isAdmin, setIsAdmin] = useState(checkIsAdmin());

  const handlePost = async() => {
    try{
      console.log("inHandlePost");
      const newCharacterEntry = {characterName, characterSpecies, characterAlignment, characterStanding, characterGoals};
      console.log(newCharacterEntry);
      await postCharacter(newCharacterEntry);
      location.reload() //Not pretty and does a hard reload but works for now. Might need to make a custom refresh function since router.refresh works serverside. 
    } catch(err){
      setError(err.message);
    }
  }

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const result = await getAllCharacters();
        console.log(result.data);
        setCharacters(result.data);
      } catch (err) {
        setError(err.message);
        console.log(error)
      }
    };

    getCharacters();
  }, [error]);

    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="w-full">
            <div className="flex justify-center">
              <h1 className="text-2xl">Warden's Scroll: Lives and Lineages</h1>
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
                        <ModalHeader className="flex flex-col gap-1">Add Character Entry</ModalHeader>
                        <ModalBody>
                          <Input
                            type="text" 
                            label="Name" 
                            labelPlacement="outside" 
                            placeholder="Enter Character's Name"
                            onChange={(e) => {
                              setCharacterName(e.target.value);
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
                            label="Species" 
                            labelPlacement="outside" 
                            placeholder="Enter Character's Species"
                            onChange={(e) => {
                              setCharacterSpecies(e.target.value);
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
                            label="Alignment" 
                            labelPlacement="outside" 
                            placeholder="Enter Character's Alignment"
                            onChange={(e) => {
                              setCharacterAlignment(e.target.value);
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
                            label="Standing" 
                            labelPlacement="outside" 
                            placeholder="Enter Character's Standing"
                            onChange={(e) => {
                              setCharacterStanding(e.target.value);
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
                            placeholder="Enter Character's Goals" 
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
                            setCharacterGoals(e.target.value);
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
                {characters.map((entry) => 
                (
                  <CharacterWidget
                    name={entry.charactername}
                    species={entry.characterspecies}
                    standing={entry.characterstanding}
                    characterid={entry.characterid || index}
                    key={entry.characterid || index}
                  />
                )
                )}
            </div>

            <div className="border rounded-lg border-white text-center text-md p-6">
              <div>
                When characters are really alive, before their author, the latter does nothing but follow them in their action.
              </div>
              <div className="italic text-base">
                - Luigi Pirandello
              </div>
            </div>
        </main>
    );
}
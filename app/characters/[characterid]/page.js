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
import { deleteOneCharacter, updateOneCharacter, getOneCharacter } from "../services/characterService";
import { checkIsAdmin } from "@/app/utils/auth";

export default function CharacterDetail() {
    const { characterid } = useParams();
    const [currentCharacter, setCurrentCharacter] = useState([]);
    const [error, setError] = useState(null);
    const modalEditDisclosure = useDisclosure()
    const modalDeleteDisclosure = useDisclosure()
    const [characterName, setCharacterName] = useState("");
    const [characterSpecies, setCharacterSpecies] = useState("");
    const [characterAlignment, setCharacterAlignment] = useState("");
    const [characterStanding, setCharacterStanding] = useState("");
    const [characterGoals, setCharacterGoals] = useState("");
    const [isAdmin, setIsAdmin] = useState(checkIsAdmin());

    useEffect(() => {
        console.log(characterid);
        if (characterid) {
          getOneCharacter(characterid)
            .then(response => setCurrentCharacter(response.data))
            .catch(error => setError(error));
        }
      }, [characterid]);

    const handleDelete = async() => {
        try{
          deleteOneCharacter(characterid);
          console.log("Character Deleted");
        } catch(err){
          setError(err);
        }
      }
    
    const handleEdit = async() => {
        try{
          // Construct editedCharacterEntry using current values or fallback to currentHistory
          const editedCharacterEntry = {
            characterName: characterName || currentCharacter.charactername,
            characterSpecies: characterSpecies || currentCharacter.characterspecies,
            characterAlignment: characterAlignment || currentCharacter.characteralignment,
            characterStanding: characterStanding || currentCharacter.characterstanding,
            characterGoals: characterGoals || currentCharacter.charactergoals,
            };
          console.log(editedCharacterEntry);
          updateOneCharacter(characterid, editedCharacterEntry);
          console.log("Req sent")
          
        } catch(err){
          setError(err);
        }
      }

    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex flex-row justify-between items-center w-full">
            <div className="group">
              <a href="/characters">
              <h2 className={`mb-3 text-xl font-semibold`}>
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                &lt;-
                </span>
              {"    "}Back
              </h2>
              </a>
            </div>
            <div className="text-white text-3xl">{currentCharacter.charactername}</div>
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
                        <ModalHeader className="flex flex-col gap-1">Edit Character Entry?</ModalHeader>
                        <ModalBody>
                          <Input
                            type="text" 
                            label="Name" 
                            labelPlacement="outside" 
                            defaultValue={currentCharacter.charactername}
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
                            defaultValue={currentCharacter.characterspecies}
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
                            defaultValue={currentCharacter.characteralignment}
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
                            defaultValue={currentCharacter.characterstanding}
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
                            defaultValue={currentCharacter.charactergoals}
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
                    <ModalHeader className="flex flex-col gap-1">Delete Character Entry?</ModalHeader>
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
              <div className="text-white italic text-2xl mb-12">Standing: {currentCharacter.characterstanding}</div>
                <div className="text-white text-xl mb-12">Species: {currentCharacter.characterspecies}</div>
                <div className="text-white text-xl mb-12">Alignment: {currentCharacter.characteralignment}</div>
                <div className="text-white text-xl">Goals: {currentCharacter.charactergoals}</div>
              </div>
            </div>
            
            <div className="border rounded-lg border-white text-center text-md p-6">
              <div>
                When characters are really alive, before their author, the latter does nothing but follow them in their action..
              </div>
              <div className="italic text-base">
                - Luigi Pirandello
              </div>
            </div>
        </main>
    )
}
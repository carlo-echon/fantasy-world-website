"use client"

import LocationsWidget from "./ui/locationWidget";
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

import { getAllLocations, postLocation } from "./services/locationService";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { checkIsAdmin } from "../utils/auth";

export default function Locations() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [locations, setLocations] = useState([]);
    const [error, setError] = useState(null);
    const [locationsName, setLocationsName] = useState("");
    const [locationsClimate, setLocationsClimate] = useState("");
    const [locationsDescription, setLocationsDesc] = useState("");
    const [isAdmin, setIsAdmin] = useState(checkIsAdmin());

    useEffect(() => {
        const getLocations = async () => {
          try {
            const result = await getAllLocations();
            console.log(result.data);
            setLocations(result.data);
          } catch (err) {
            setError(err.message);
            console.log(error)
          }
        };
    
        getLocations();
      }, [error]);

    const handlePost = async() => {
        try{
          console.log("inHandlePost");
          const newLocationEntry = {locationsName, locationsClimate, locationsDescription};
          console.log(newLocationEntry);
          await postLocation(newLocationEntry);
          location.reload() //Not pretty and does a hard reload but works for now. Might need to make a custom refresh function since router.refresh works serverside. 
        } catch(err){
          setError(err.message);
        }
      }

    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="w-full">
                <div className="flex justify-center">
                    <h1 className="text-2xl">Cartographer's Codex: Realms and Regions</h1>
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
                        <ModalHeader className="flex flex-col gap-1">Add Location Entry</ModalHeader>
                        <ModalBody>
                          <Input
                            type="text" 
                            label="Name" 
                            labelPlacement="outside" 
                            placeholder="Enter Location Name"
                            onChange={(e) => {
                              setLocationsName(e.target.value);
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
                            label="Climate" 
                            labelPlacement="outside" 
                            placeholder="Enter Climate of Location/Region"
                            onChange={(e) => {
                              setLocationsClimate(e.target.value);
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
                            placeholder="Enter brief description of the location." 
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
                            setLocationsDesc(e.target.value);
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
                {locations.map((entry) => (
                    <LocationsWidget 
                    name={entry.locationsname}
                    climate={entry.locationsclimate}
                    locationsid={entry.locationsid}
                    key={entry.locationsid || index}
                    />
                )
                )}
            </div>

            <div className="border rounded-lg border-white text-center text-md p-6">
              <div>
                We don't create a fantasy world to escape reality. We create it to be able to stay.
              </div>
              <div className="italic text-base">
                - Lynda Barry
              </div>
            </div>
        </main>
    );
}
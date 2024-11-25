import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly p-16">
      <div className="">
        <h1 className="text-white text-5xl">FantasyLand: A World of Sword and Sorcery</h1>
        <div className="flex flex-row justify-center">
          <p className="text-white object-center text-lg">A collaborative worldbuilding project for use in OSE/5e games.</p>       
        </div>
      </div>
      <div>
        <h3 className="text-white text-2xl py-10">Are you ready to enter a world ruled by might and magic?</h3>
        <div className="flex flex-row justify-center">
          <a href="/landing" className="px-2 py-1 border border-transparent transition-colors hover:border-white hover:bg-gray-100 hover:dark:border-white hover:dark:bg-neutral-800/30 text-2xl">Enter</a>
        </div>
      </div>
      <div>

      </div>
    </main>
  );
}

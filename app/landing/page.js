export default function Landing() {
    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-16">

      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-black">Secret 1</h1>
        <h1 className="text-2xl">FantasyLand: A TableTop Worldbuilding Project</h1>
        <a className="bg-black text-black transition-colors border rounded border-black hover:border-white hover:bg-gray-700 hover:text-white" href="/login">Login</a>
      </div>
      

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="/history"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white hover:bg-gray-100 hover:dark:border-white hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            History{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm text-black opacity-50 group-hover:text-white`}>
            Find in-depth information about the history of the world.
          </p>
        </a>

        <a
          href="/locations"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-white hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Locations{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm text-black opacity-50 group-hover:text-white`}>
            Learn about the different locations and cultures in the world. 
          </p>
        </a>

        <a
          href="/characters"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-white hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Characters{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm text-black opacity-50  duration-300 group-hover:text-white`}>
            Explore the different NPCs your characters can meet on their adventures.
          </p>
        </a>

        <a
          href="/magicitems"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-white hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Magic Items{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm text-black opacity-50 text-balance group-hover:text-white`}>
            Deep in dungeons or high in mage's towers these magical items grant power to mortal men.
          </p>
        </a>
      </div>
      <div className="border rounded-lg border-white text-center text-md p-6"> A coding and worldbuilding project by Carlo E.</div>
    </main>
    );
}
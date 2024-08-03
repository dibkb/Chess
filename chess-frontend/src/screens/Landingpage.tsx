import { Link } from "react-router-dom";

export default function Landingpage() {
  return (
    <main className="min-h-[600px] flex justify-center">
      <div className="text-center my-auto flex flex-col gap-6">
        <h1 className="text-8xl elsie-black ">Chessmate 👋</h1>
        <p className="text-default-400 mt-6">Play the Game of the Royals</p>
        <Link
          to={"/join"}
          className="mt-6 border border-dashed border-default-200 px-8 py-3 rounded-full hover:bg-foreground-200 text-lg"
        >
          Join now
        </Link>
      </div>
    </main>
  );
}

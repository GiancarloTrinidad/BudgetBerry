import BottomBar from "../bottomBar";

export default function homePage() {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <h1 className="text-3xl font-bold p-4">Home</h1>
      {/* Content */}
      <BottomBar />
    </div>
  );
}

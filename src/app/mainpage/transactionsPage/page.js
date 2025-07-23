import BottomBar from "../bottomBar";

export default function transactionsPage() {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <h1 className="text-3xl font-bold p-4">Transactions</h1>
      {/* Content */}
      <BottomBar />
    </div>
  );
}
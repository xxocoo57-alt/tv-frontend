import ShowTracker from "./components/ShowTracker";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0b0d12] bg-[radial-gradient(52rem_26rem_at_50%_-9rem,rgba(233,180,76,0.13),transparent_72%)] bg-no-repeat text-[15px] leading-[1.45] text-[#eef0f4] [font-family:Inter,system-ui,-apple-system,'Segoe_UI',sans-serif]">
      <ShowTracker />
    </div>
  );
}

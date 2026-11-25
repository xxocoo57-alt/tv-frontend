export function ShowHeader({ shows }) {
  const watching = shows.filter((show) => show.status === "watching").length;
  const episodes = shows.reduce((total, show) => total + show.episode, 0);

  return (
    <header className="flex flex-col gap-2">
      <p className="m-0 font-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[#f0c067]">
        Watch log
      </p>
      <h1 className="m-0 text-[clamp(2.3rem,7vw,3.4rem)] font-extrabold leading-none tracking-[-0.035em] text-[#eef0f4] [font-family:'Bricolage_Grotesque',_'Segoe_UI',_system-ui,_sans-serif]">
        Show Tracker
      </h1>
      <p className="m-0 min-h-[1.4em] tabular-nums text-[#8b93a3]">
        {shows.length} {shows.length === 1 ? "show" : "shows"} · {watching}{" "}
        watching · {episodes} {episodes === 1 ? "episode" : "episodes"} logged
      </p>
    </header>
  );
}

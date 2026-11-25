"use client";

import { useEffect, useMemo, useState } from "react";
import { ShowHeader } from "./ShowHeader";
import { ShowForm } from "./ShowForm";
import { StatusFilters } from "./StatusFilters";
import { EmptyState, ShowCard } from "./ShowCard";

const STORAGE_KEY = "show-tracker.v1";
const VALID_STATUSES = [
  "watching",
  "planned",
  "paused",
  "completed",
  "dropped",
];

function createId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `s${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

function sortShows(items) {
  return [...items].sort(
    (a, b) => b.createdAt - a.createdAt || a.title.localeCompare(b.title),
  );
}

export default function ShowTracker() {
  const [shows, setShows] = useState([]);
  const [filter, setFilter] = useState("all");
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) {
        const normalized = parsed.map((item) => ({
          id: String(item?.id || createId()),
          title: String(item?.title || "Untitled").slice(0, 120),
          status: VALID_STATUSES.includes(item?.status)
            ? item.status
            : "watching",
          episode: Math.max(
            0,
            Number.parseInt(String(item?.episode ?? 0), 10) || 0,
          ),
          createdAt: Number(item?.createdAt) || 0,
        }));
        setShows(sortShows(normalized));
      }
    } catch {
      setMessage("Saved shows could not be read from this browser.");
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(shows));
    } catch {
      setMessage("Could not save shows. Check your browser storage settings.");
    }
  }, [shows, ready]);

  const visibleShows = useMemo(
    () => shows.filter((show) => filter === "all" || show.status === filter),
    [shows, filter],
  );

  function addShow(title, status, episode) {
    setMessage("");
    setShows((current) =>
      sortShows([
        ...current,
        { id: createId(), title, status, episode, createdAt: Date.now() },
      ]),
    );
  }

  function updateEpisode(id, delta) {
    setShows((current) =>
      current.map((show) =>
        show.id === id
          ? { ...show, episode: Math.max(0, show.episode + delta) }
          : show,
      ),
    );
  }

  function saveShow(id, title, status, episode) {
    setShows((current) =>
      sortShows(
        current.map((show) =>
          show.id === id ? { ...show, title, status, episode } : show,
        ),
      ),
    );
  }

  function deleteShow(id) {
    setShows((current) => current.filter((show) => show.id !== id));
  }

  return (
    <main className="relative z-[1] mx-auto flex w-full max-w-[720px] flex-col gap-6 px-4 py-12 pb-20 sm:px-6">
      <ShowHeader shows={shows} />
      <ShowForm onAdd={addShow} />
      <StatusFilters shows={shows} active={filter} onChange={setFilter} />
      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        {!ready ? (
          <EmptyState>Loading your shows…</EmptyState>
        ) : visibleShows.length ? (
          visibleShows.map((show) => (
            <ShowCard
              key={show.id}
              show={show}
              onEpisodeChange={updateEpisode}
              onSave={saveShow}
              onDelete={deleteShow}
            />
          ))
        ) : (
          <EmptyState>
            {shows.length
              ? "Nothing under this status."
              : "No shows yet. Add the first one above."}
          </EmptyState>
        )}
      </ul>
      <p
        role="status"
        aria-live="polite"
        className="m-0 min-h-[1.2em] text-[0.85rem] text-[#ff7a6e]"
      >
        {message}
      </p>
      <p className="m-0 font-mono text-[0.7rem] tracking-[0.06em] text-[#8b93a3]">
        SAVED IN THIS BROWSER ONLY
      </p>
    </main>
  );
}

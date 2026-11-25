"use client";

import { useState } from "react";
import { Pencil, Trash2, Tv } from "lucide-react";
import {
  STATUSES,
  STATUS_LABEL,
  normalizeEpisode,
  titleHue,
} from "../lib/showUtils";

const fieldClass =
  "w-full min-w-0 rounded-[10px] border border-[#262b36] bg-[#1a1e27] px-3 py-2.5 text-[15px] text-[#eef0f4] outline-none focus:border-[#e9b44c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e9b44c]";
const labelClass =
  "flex min-w-0 flex-col gap-1 [&>span]:font-mono [&>span]:text-[0.66rem] [&>span]:font-medium [&>span]:uppercase [&>span]:tracking-[0.12em] [&>span]:text-[#8b93a3]";
const neutralButton =
  "cursor-pointer rounded-[10px] border border-[#262b36] bg-[#1a1e27] px-3 py-1.5 text-[0.85rem] font-semibold text-[#eef0f4] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e9b44c]";

export function ShowCard({ show, onEpisodeChange, onSave, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [title, setTitle] = useState(show.title);
  const [status, setStatus] = useState(show.status);
  const [episode, setEpisode] = useState(String(show.episode));
  const hue = titleHue(show.title);
  const statusColor = {
    watching: "#7fa2ff",
    planned: "#9aa1ad",
    paused: "#e0a93b",
    completed: "#5ccf93",
    dropped: "#ff7a6e",
  };

  function save(event) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) return;
    onSave(show.id, cleanTitle, status, normalizeEpisode(episode));
    setEditing(false);
  }

  if (editing) {
    return (
      <li className="rounded-[18px] border border-[#262b36] bg-[#13161d] p-4 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_10px_28px_-12px_rgba(0,0,0,0.6)]">
        <form
          onSubmit={save}
          autoComplete="off"
          className="flex flex-wrap items-end gap-3"
        >
          <label className={`${labelClass} flex-[1_1_210px]`}>
            <span>Title</span>
            <input
              className={fieldClass}
              required
              maxLength={120}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
          <label className={`${labelClass} flex-[0_1_10rem]`}>
            <span>Status</span>
            <select
              className={fieldClass}
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              {STATUSES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <label className={`${labelClass} w-[5.5rem]`}>
            <span>Episode</span>
            <input
              className={fieldClass}
              type="number"
              min="0"
              step="1"
              value={episode}
              onChange={(event) => setEpisode(event.target.value)}
            />
          </label>
          <button
            type="submit"
            className="cursor-pointer rounded-[10px] bg-[#e9b44c] px-4 py-2.5 font-bold text-[#1a1305] hover:brightness-110"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className={neutralButton}
          >
            Cancel
          </button>
        </form>
      </li>
    );
  }

  return (
    <li className="grid grid-cols-[48px_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 rounded-[18px] border border-[#262b36] bg-[#13161d] px-3 py-3 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_10px_28px_-12px_rgba(0,0,0,0.6)] transition-colors hover:border-[#e9b44c]/40 sm:grid-cols-[54px_minmax(0,1fr)_auto_auto] sm:gap-x-4">
      <div
        aria-hidden="true"
        className="grid size-12 place-items-center rounded-[13px] text-2xl font-extrabold uppercase text-white shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_8px_18px_-8px_rgba(0,0,0,0.55)] sm:size-[54px] sm:rounded-[15px]"
        style={{
          background: `linear-gradient(140deg, hsl(${hue} 66% 55%), hsl(${(hue + 48) % 360} 64% 34%))`,
        }}
      >
        {Array.from(show.title.trim())[0] || "?"}
      </div>
      <div className="min-w-0">
        <div className="break-words text-[1.12rem] font-semibold leading-tight tracking-[-0.01em] text-[#eef0f4] [font-family:'Bricolage_Grotesque',_'Segoe_UI',_system-ui,_sans-serif]">
          {show.title}
        </div>
        <span
          className="mt-1 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[0.76rem] font-medium"
          style={{
            color: statusColor[show.status],
            backgroundColor: `${statusColor[show.status]}22`,
          }}
        >
          <span
            className="size-1.5 rounded-full"
            style={{ backgroundColor: statusColor[show.status] }}
          />
          {STATUS_LABEL[show.status]}
        </span>
      </div>
      <div className="col-start-1 col-end-3 row-start-2 inline-flex w-fit items-center gap-1 rounded-full border border-[#262b36] bg-[#1a1e27] p-1 sm:col-auto sm:row-auto">
        <button
          type="button"
          aria-label={`Previous episode of ${show.title}`}
          onClick={() => onEpisodeChange(show.id, -1)}
          className="grid size-8 cursor-pointer place-items-center rounded-full text-xl text-[#8b93a3] hover:bg-[#13161d] hover:text-[#f0c067]"
        >
          −
        </button>
        <span className="flex min-w-12 flex-col items-center leading-none">
          <small className="font-mono text-[0.56rem] font-medium tracking-[0.18em] text-[#8b93a3]">
            EP
          </small>
          <b className="mt-1 font-mono text-[1.15rem] font-semibold tabular-nums text-[#eef0f4]">
            {show.episode}
          </b>
        </span>
        <button
          type="button"
          aria-label={`Next episode of ${show.title}`}
          onClick={() => onEpisodeChange(show.id, 1)}
          className="grid size-8 cursor-pointer place-items-center rounded-full bg-[#e9b44c] text-xl font-bold text-[#1a1305] hover:brightness-110"
        >
          +
        </button>
      </div>
      <div className="col-start-3 row-start-1 flex flex-wrap items-center justify-end gap-1 sm:col-auto sm:row-auto">
        {confirming ? (
          <>
            <span className="mr-1 text-[0.85rem] text-[#8b93a3]">Delete?</span>
            <button
              type="button"
              onClick={() => onDelete(show.id)}
              className="rounded-[10px] bg-[#ff7a6e] px-3 py-1.5 text-[0.85rem] font-semibold text-white"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className={neutralButton}
            >
              Keep
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              aria-label={`Edit ${show.title}`}
              title="Edit"
              onClick={() => {
                setTitle(show.title);
                setStatus(show.status);
                setEpisode(String(show.episode));
                setEditing(true);
              }}
              className="grid size-[34px] cursor-pointer place-items-center rounded-[10px] text-[#8b93a3] hover:bg-[#1a1e27] hover:text-[#eef0f4]"
            >
              <Pencil size={18} />
            </button>
            <button
              type="button"
              aria-label={`Delete ${show.title}`}
              title="Delete"
              onClick={() => setConfirming(true)}
              className="grid size-[34px] cursor-pointer place-items-center rounded-[10px] text-[#8b93a3] hover:bg-[#1a1e27] hover:text-[#ff7a6e]"
            >
              <Trash2 size={18} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export function EmptyState({ children }) {
  return (
    <li className="flex flex-col items-center gap-2.5 rounded-[18px] border border-dashed border-[#262b36] px-4 py-10 text-center text-[#8b93a3]">
      <Tv size={44} strokeWidth={1.4} className="opacity-80" />
      <p className="m-0">{children}</p>
    </li>
  );
}

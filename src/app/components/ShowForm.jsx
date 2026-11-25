"use client";

import { useState } from "react";
import { STATUSES, normalizeEpisode } from "../lib/showUtils";

const inputClass =
  "w-full min-w-0 rounded-[10px] border border-[#262b36] bg-[#1a1e27] px-3 py-2.5 text-[15px] text-[#eef0f4] outline-none placeholder:text-[#8b93a3]/75 focus:border-[#e9b44c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e9b44c]";
const labelClass =
  "flex min-w-0 flex-col gap-1 [&>span]:font-mono [&>span]:text-[0.66rem] [&>span]:font-medium [&>span]:uppercase [&>span]:tracking-[0.12em] [&>span]:text-[#8b93a3]";

export function ShowForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("watching");
  const [episode, setEpisode] = useState("0");

  function handleSubmit(event) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) return;
    onAdd(cleanTitle, status, normalizeEpisode(episode));
    setTitle("");
    setEpisode("0");
  }

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="flex flex-wrap items-end gap-3 rounded-[18px] border border-[#262b36] bg-[#13161d] p-4 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_10px_28px_-12px_rgba(0,0,0,0.6)]"
    >
      <label className={`${labelClass} flex-[1_1_210px]`}>
        <span>Title</span>
        <input
          className={inputClass}
          required
          maxLength={120}
          placeholder="What are you watching?"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <label className={`${labelClass} flex-[0_1_10rem]`}>
        <span>Status</span>
        <select
          className={inputClass}
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
          className={inputClass}
          type="number"
          min="0"
          step="1"
          inputMode="numeric"
          value={episode}
          onChange={(event) => setEpisode(event.target.value)}
        />
      </label>
      <button
        type="submit"
        className="cursor-pointer rounded-[10px] border border-transparent bg-[#e9b44c] px-[1.1rem] py-2.5 font-bold text-[#1a1305] shadow-[0_8px_20px_-8px_rgba(233,180,76,0.7)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e9b44c]"
      >
        Add show
      </button>
    </form>
  );
}

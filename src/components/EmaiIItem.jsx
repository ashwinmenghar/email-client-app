import React from "react";
import { generateDate } from "../helper/helper";

const EmailItem = ({ email, handleReadEmail, selected }) => {
  if (email?.hidden == true) return;

  return (
    <section
      className={`border ${
        selected?.id === email.id
          ? "border-[var(--accent)]"
          : "border-[var(--border)]"
      } w-full rounded-lg grid grid-cols-[auto,1fr] items-start px-10 py-3 mt-10 cursor-pointer ${
        email.isFavorite ? "bg-[var(--real-background)]" : "bg-white"
      }`}
      onClick={() => handleReadEmail(email)}
    >
      {/* Left: Avatar */}
      <div className="border text-3xl w-14 h-14 rounded-full flex justify-center items-center text-white bg-[var(--accent)]">
        {email.from.name.charAt(0)}
      </div>

      {/* Right: Email Details */}
      <aside className="ml-5">
        <div className="flex gap-2">
          <span className="font-light text-gray-500">From:</span>
          <p className="font-medium text-gray-600">
            {email.from.name}
            <span className="ml-2">
              {"<"}
              {email.from.email}
              {">"}
            </span>
          </p>
        </div>

        <div className="flex gap-2">
          <span className="font-light text-gray-500">Subject:</span>
          <p className="font-medium text-gray-600">{email.subject}</p>
        </div>

        <div className="my-3 font-light text-gray-500">
          {email.short_description}...
        </div>

        {/* Date & Favorite */}
        <div className="">
          <span className="font-light text-gray-500 text-sm">
            {generateDate(email.date)}
          </span>
          {email?.isFavorite && (
            <span className="text-red-500 font-medium text-md ml-10">
              Favorite
            </span>
          )}
        </div>
      </aside>
    </section>
  );
};

export default EmailItem;

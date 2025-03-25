import React from "react";
import { generateDate } from "../helper/helper";
import HtmlContent from "./HtmlContent";

const EmailViewer = ({ selectedEmail, toggleFavorite }) => {
  if (!selectedEmail) return;

  return (
    <article className="bg-white border border-[var(--border)] mt-10 rounded-lg">
      <div className="grid grid-flow-col gap-4 mx-14 mt-10">
        <div className="row-span-3 border text-3xl w-14 h-14 rounded-full flex justify-center items-center text-white bg-[var(--accent)]">
          {selectedEmail?.from?.name?.charAt(0)}
        </div>

        <div className="">
          <header className="flex justify-between">
            <h1 className="text-2xl font-semibold text-gray-500">
              {selectedEmail?.subject}
            </h1>
            <button
              className="bg-[var(--accent)] px-4 rounded-full text-white text-sm"
              onClick={() => toggleFavorite(selectedEmail.id)}
            >
              Mark as Favorite
            </button>
          </header>
          <p className="my-6 text-gray-500 text-sm">
            {generateDate(selectedEmail?.date)}
          </p>

          <div className="col-span-2 text-gray-500">
            <HtmlContent content={selectedEmail?.body} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default EmailViewer;

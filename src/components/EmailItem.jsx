import React from "react";

const EmailItem = ({ bgColor, email }) => {
  return (
    <section
      className={`border border-[var(--border)] w-full rounded-lg flex flex-row items-start px-10 py-3 mt-10 cursor-pointer ${bgColor}`}
    >
      <div className="border text-3xl bg-gray-200 w-14 h-14 rounded-full flex justify-center items-center text-white bg-[var(--accent)]">
        {email.from.name.charAt(0)}
      </div>
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
          {email.short_description}
        </div>

        {/* Date */}
        <div className="">
          <span className="mr-8 font-light text-gray-500 text-sm">
            {/* 26/02/2020 10:30am */}
            {email.date}
          </span>
          <span className="text-red-500 font-normal">Favorite</span>
        </div>
      </aside>
    </section>
  );
};

export default EmailItem;

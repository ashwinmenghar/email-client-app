const Header = ({ selectNav, setSelectNav }) => {
  const buttons = ["Unread", "Read", "Favorites"];

  return (
    <header>
      <nav className="flex gap-4">
        <span className="mr-8">Filter By:</span>
        {buttons.map((button, index) => (
          <button
            key={index}
            className={`rounded-full px-3 text-md ${
              selectNav === button
                ? "bg-[var(--filter-btn)] border border-gray-300  font-light"
                : ""
            }`}
            onClick={() => setSelectNav(button)}
          >
            {button}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Header;

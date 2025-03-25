import { buttons } from "../constants/constants";

const Header = ({ filterType, setFilterType }) => {
  return (
    <header>
      <nav className="flex gap-4">
        <span className="mr-8">Filter By:</span>
        {buttons.map((button, index) => (
          <button
            key={index}
            className={`rounded-full px-3 text-md ${
              filterType === button
                ? "bg-[var(--filter-btn)] border border-gray-300  font-light"
                : ""
            }`}
            onClick={() => setFilterType(button)}
          >
            {button}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Header;

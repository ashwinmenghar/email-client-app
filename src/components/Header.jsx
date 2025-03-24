const Header = () => {
  return (
    <header>
      <nav className="flex gap-4">
        <span className="">Filter By:</span>
        <button>Unread</button>
        <button className="border rounded-full px-3 text-md border-gray-300 bg-[var(--filter-btn)] font-light">
          Read
        </button>
        <button>Favorites</button>
      </nav>
    </header>
  );
};

export default Header;

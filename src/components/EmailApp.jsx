import { useEffect, useState } from "react";
import EmailItem from "./EmailItem";
import Header from "./Header";
import EmailViewer from "./EmailViewer";
import Loading from "./Loading";
import { API_BASE_URL } from "../api/APIUtils";
import Error from "./Error";

const EmailApp = () => {
  const [emailList, setEmailList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [filterType, setFilterType] = useState("Unread");
  const [error, setError] = useState(null);

  // Fetch emails
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_BASE_URL);
        const data = await res.json();

        const newEmails = data.list.map((email) => ({
          ...email,
          isRead: false,
          isFavorite: false,
        }));

        setEmailList(newEmails);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError(error.message || "Something went wrong");
      }
    };

    fetchData();
  }, []);

  // Fetch email by id
  const fetchSelectedData = async (email) => {
    try {
      const res = await fetch(`${API_BASE_URL}?id=${email?.id}`);
      const data = await res.json();

      setSelectedEmail({ ...email, body: data.body });
    } catch (error) {
      console.error("Failed to fetch email body:", error);
    }
  };

  // Function to mark an email as read
  const markEmailAsRead = (email) => {
    setEmailList((prevEmails) =>
      prevEmails.map((prevEmail) =>
        prevEmail.id === email.id ? { ...prevEmail, isRead: true } : prevEmail
      )
    );
    // setSelectedEmail(email);
    fetchSelectedData(email);
  };

  // Function to toggle favorite status
  const toggleFavorite = (emailId) => {
    setEmailList((prevEmails) =>
      prevEmails.map((email) =>
        email.id === emailId
          ? { ...email, isFavorite: !email.isFavorite }
          : email
      )
    );

    setSelectedEmail((prev) =>
      prev && prev.id === emailId
        ? { ...prev, isFavorite: !prev.isFavorite }
        : prev
    );
  };

  // Apply filtering using hidden property
  const handleFilterChange = (filter) => {
    const filteredEmails = emailList.map((email) => {
      if (filter === "Read") return { ...email, hidden: !email.isRead };
      if (filter === "Unread") return { ...email, hidden: email.isRead };
      if (filter === "Favorites")
        return { ...email, hidden: !email.isFavorite };
      return { ...email, hidden: false };
    });

    setEmailList(filteredEmails);
    setFilterType(filter);
    setSelectedEmail(null);
  };

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="container mt-10 mx-auto">
      {/* Header */}
      <Header filterType={filterType} handleFilterChange={handleFilterChange} />

      {/* Main Content */}
      <main
        className={`flex gap-10 w-full ${
          selectedEmail ? "" : "justify-center"
        }`}
      >
        {/* Email List */}
        <div className={`${selectedEmail ? "w-2/5" : "w-full"} mb-24`}>
          {emailList
            .filter((email) => !email.hidden) // Only render visible emails
            .map((email) => (
              <EmailItem
                key={email.id}
                email={email}
                markEmailAsRead={markEmailAsRead}
                selectedEmail={selectedEmail}
              />
            ))}
        </div>

        {/* Loading Indicator */}
        {loading && <Loading loading={loading} />}

        {/* Email Viewer */}
        {!loading && selectedEmail && (
          <div className="w-3/5">
            <EmailViewer
              selectedEmail={selectedEmail}
              toggleFavorite={toggleFavorite}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default EmailApp;

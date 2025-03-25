import { useEffect, useState } from "react";
import EmailItem from "./EmailItem";
import Header from "./Header";
import EmailViewer from "./EmailViewer";
import Loading from "./Loading";
import { API_BASE_URL } from "../api/APIUtils";

const EmailApp = () => {
  const [emailList, setEmailList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [filterType, setFilterType] = useState("Unread");

  useEffect(() => {
    if (!selectedEmail) {
      return;
    }

    const fetchSelectedData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}?id=${selectedEmail?.id}`);
        const data = await res.json();
        setSelectedEmail((prev) => ({ ...prev, body: data.body }));
      } catch (error) {
        console.error("Failed to fetch email body:", error);
      }
    };

    fetchSelectedData();
  }, [selectedEmail]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_BASE_URL);
        const data = await res.json();
        console.log(data);

        const newEmails = data.list.map((email) => ({
          ...email,
          isRead: false,
          isFavorite: false,
        }));

        setEmailList(newEmails);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch emails:", error);
      }
    };

    fetchData();
  }, []);

  // Function to mark an email as read
  const markEmailAsRead = (email) => {
    setEmailList((prevEmails) =>
      prevEmails.map((prevEmail) =>
        prevEmail.id === email.id ? { ...prevEmail, isRead: true } : prevEmail
      )
    );
    setSelectedEmail(email);
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
  useEffect(() => {
    const filteredEmails = emailList.map((email) => {
      if (filterType === "Read") return { ...email, hidden: !email.isRead };
      if (filterType === "Unread") return { ...email, hidden: email.isRead };
      if (filterType === "Favorites")
        return { ...email, hidden: !email.isFavorite };
      return { ...email, hidden: false };
    });

    setEmailList(filteredEmails);
    setSelectedEmail(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterType]);

  return (
    <div className="container mt-10 mx-auto">
      {/* Header */}
      <Header filterType={filterType} setFilterType={setFilterType} />

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

        {/* Email Viewer (60% width) */}
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

import { useEffect, useState } from "react";
import EmailItem from "./EmaiIItem";
import Header from "./Header";
import EmailViewer from "./EmailViewer";
import Loading from "./Loading";

const EmailApp = () => {
  const [emailList, setEmailList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState();
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectNav, setSelectNav] = useState("Unread");

  useEffect(() => {
    if (!selected) return;

    const fetchSelectedData = async (email) => {
      const res = await fetch(
        `https://flipkart-email-mock.now.sh/?id=${email?.id}`
      );
      const data = await res.json();
      setSelectedEmail({ ...email, body: data.body });
    };

    fetchSelectedData(selected);
  }, [selected]);

  useEffect(() => {
    const fetchData = async (page) => {
      try {
        const res = await fetch(
          `https://flipkart-email-mock.now.sh/?page=${page}`
        );
        const data = await res.json();
        const newRes = data?.list?.map((res) => {
          return { ...res, ...{ isRead: false, isFavorite: false } };
        });

        setEmailList(newRes);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(1);
  }, []);

  useEffect(() => {
    if (!selectNav) return;

    setSelectedEmail(null);
    setSelected(null);

    setEmailList((prevEmails) => {
      return prevEmails.map((email) => {
        if (selectNav === "Read") {
          return { ...email, hidden: !email.isRead };
        } else if (selectNav === "Unread") {
          return { ...email, hidden: email.isRead };
        } else if (selectNav === "Favorites") {
          return { ...email, hidden: !email.isFavorite };
        } else {
          return { ...email, hidden: false };
        }
      });
    });
  }, [selectNav]);

  // Function to toggle favorite status
  const toggleFavorite = (emailId) => {
    setEmailList((prevEmails) =>
      prevEmails.map((email) =>
        email.id === emailId
          ? { ...email, isFavorite: !email.isFavorite }
          : email
      )
    );

    if (selectedEmail?.id === emailId) {
      setSelectedEmail((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
    }
  };

  //
  const handleReadEmail = (email) => {
    setEmailList((prevEmails) =>
      prevEmails.map((prevEmail) =>
        prevEmail.id === email.id ? { ...prevEmail, isRead: true } : prevEmail
      )
    );
    setSelected(email);
  };

  return (
    <div className="container mt-10 mx-auto">
      {/* Headers */}
      <Header selectNav={selectNav} setSelectNav={setSelectNav} />
      {/* List of email */}
      <main
        className={`flex gap-10 w-full ${selected ? "" : "justify-center"}`}
      >
        {/* Email List (40% width) */}
        <div className={`${selected ? "w-2/5" : "w-full"} mb-24`}>
          {emailList?.map((email) => (
            <EmailItem
              key={email.id}
              email={email}
              handleReadEmail={handleReadEmail}
              selected={selected}
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

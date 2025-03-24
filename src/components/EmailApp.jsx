import { useEffect, useState } from "react";
import EmailItem from "./EmailItem";
import Header from "./Header";

const EmailApp = () => {
  const [emailList, setEmailList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://flipkart-email-mock.now.sh");
        const data = await res.json();
        setEmailList(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mt-10 mx-auto">
      {/* Headers */}
      <Header />
      {/* List of email */}
      <main>
        {emailList?.list?.map((email) => (
          <EmailItem
            bgColor="bg-[var(--real-background)]"
            key={email.id}
            email={email}
          />
        ))}
        {/* <EmailItem bgColor="bg-white" />
        <EmailItem bgColor="bg-white" />
        <EmailItem bgColor="bg-white" />
        <EmailItem bgColor="bg-white" />
        <EmailItem bgColor="bg-white" />
        <EmailItem bgColor="bg-white" /> */}
      </main>
    </div>
  );
};

export default EmailApp;

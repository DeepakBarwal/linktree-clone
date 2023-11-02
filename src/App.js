import "./App.css";
import { useState, useEffect } from "react";
import profilePic from "./assets/34p.jpg";
import { createClient } from "@supabase/supabase-js";
import Icon from "./components/Icon";

function App() {
  const supabase = createClient(
    process.env.REACT_APP_SUPABASE_CLIENT_URL,
    process.env.REACT_APP_SUPABASE_PASSWORD
  );
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    async function getLinks() {
      setLoading(true);
      try {
        const { data } = await supabase.from("links").select();
        setLinks(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getLinks();
  }, []);

  return (
    <div className="App">
      <header className="App-header container mx-auto">
        <img
          src={profilePic}
          className="profile-pic w-20 h-20 mb-4 rounded-full"
          alt="logo"
        />
        {loading ? (
          <p>Getting your links ready...</p>
        ) : (
          <ul className="flex flex-col w-full">
            {links.length > 0 &&
              links.map((link, index) => (
                <li
                  key={index}
                  className="cursor-pointer m-2 py-3 px-10 border-2 border-black text-slate-900 text-sm md:text-lg flex justify-center items-center"
                >
                  <a
                    href={link.url}
                    className="flex items-center"
                    title={link.title}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon iconName={link.icon} />{" "}
                    <p className="ml-3">{link.title}</p>
                  </a>
                </li>
              ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;

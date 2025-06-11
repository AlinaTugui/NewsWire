import React, { useState } from "react";
import Headline from "../../components/Headline";
import { useLocation } from "react-router-dom";

const Bookmark = () => {
  const [newsList, setNewsList] = useState(
    JSON.parse(localStorage.getItem("newsList")) || []
  );
  const location = useLocation();
  if (newsList.length === 0) {
    return (
      <div className="h-screen bg-[#bd2035]">
        <section className="h-full md:h-72 w-full py-6 px-8 md:px-20 text-center flex flex-col items-center justify-center gap-4 bg-#bd2035">
          <h1 className="text-2xl font-bold">
            No Bookmarked News
          </h1>
          {/* <h1
            className={`text-2xl font-bold ${
              loading ? "text-blue-500" : "text-red-500"
            }`}
          >
            {loading
              ? `Loading
          ${
            search
              ? `top news related to ${search}`
              : `${topic === "breaking-news" ? "breaking" : topic} news`
          }
          , please wait...`
              : `Whoops, an error occurred!`}
          </h1>
          {!loading && error && <span className="text-red-400">{error}</span>}
          {!loading && error && (
            <span className="text-sm text-red-300 flex flex-col gap-1">
              <p>P.S: This error is intended for the owner of this website.</p>
              <p>
                {" "}
                If this error says daily request limit reached.
              </p>
            </span>
          )} */}
        </section>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#bd2035]">
      <ul className="flex flex-col gap-4 md:gap-2">
        {newsList?.map((news) => (
          <li key={news.url} className="mx-2 mt-4">
            <Headline
              news={news}
              bookmarkPath={location.pathname == "/bookmark"}
              setState={setNewsList}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bookmark;

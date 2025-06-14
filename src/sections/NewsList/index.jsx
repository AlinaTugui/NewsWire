import React from "react";
import Headline from "../../components/Headline";
import { useSearchContext } from "../../contexts/useSearchContext";
import { useDebounce } from "../../hooks/useDebounce";
import { useFetch } from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";

const token = process.env.REACT_APP_GNEWS_API_TOKEN;

const baseUrl = `https://gnews.io/api/v4/`;
const suffixUrl = `&lang=en&sortby=publishedAt&token=b3544c5c03c269f85254068843a0d9a9`;

const baseUrl2 = "https://newsapi.org/api/v4/";
const suffixUrl2 ="5a5714bd71e4496890a29fc89515ea42";


const NewsList = () => {
  const [url, setUrl] = React.useState("");

  const { data: newsList, error, loading } = useFetch(url);

  const {
    state: { search, topic },
  } = useSearchContext();

  const debouncedSearchValue = useDebounce(search, 500);

  const debouncedTopicValue = useDebounce(topic, 500);

  React.useEffect(() => {
    if (debouncedSearchValue && debouncedTopicValue) {
      setUrl(
        `${baseUrl}search?&topic=${debouncedTopicValue}&q=${debouncedSearchValue}${suffixUrl}`
      );
    } else {
      setUrl(
        `${baseUrl}top-headlines?&topic=${debouncedTopicValue}${suffixUrl}`
      );
    }
  }, [debouncedSearchValue, debouncedTopicValue]);
  const location = useLocation();
  // console.log(location.pathname); // logs the current path
  if (loading || error) {
    return (
      <section className="h-full md:h-72 w-full py-6 px-8 md:px-20 text-center flex flex-col items-center justify-center gap-4">
        <h1
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
            <p> If this error says daily request limit reached.</p>
          </span>
        )}
      </section>
    );
  }

  return (
    <ul className="flex flex-col gap-4 md:gap-2 mx-2 my-4">
      {newsList?.map((news) => (
        <li key={news.url}>
          <Headline news={news} bookmarkPath={location.pathname == "/bookmark"} />
        </li>
      ))}
    </ul>
  );
};

export default NewsList;

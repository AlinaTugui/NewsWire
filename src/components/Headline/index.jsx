import React from "react";
import { ExternalLink } from "react-external-link";
import { motion } from "framer-motion";
import "./Headline.css";
import { saveArticle, deleteArticle, getSummary } from "../../network/newsApi"
import { IconButton, Modal } from "@mui/material";

function Headline({ news, bookmarkPath, setState }) {

  const [summary, setSummary] = React.useState("");
  const apiKey = 'a1fdf1ac97msh05fc94c2fe85239p1b77d0jsnb772eab2deb5';
  const [open, setOpen] = React.useState(0);


  const handleSummarize = () => {
    getSummary(apiKey, news.url)
      .then(response => {
        const responseData = response.data
        if (response.hasOwnProperty("sm_api_error")) {
          swal("Uh oh!", data.sm_api_message, "error");
          console.log("haii mesajule",data.sm_api_message)
          setSummary(data.sm_api_message);
          console.log("summary",summary)
          setOpen(!open);
        } else {
          console.log('Summary:', responseData.sm_api_content);
          console.log('Keywords:', responseData.sm_api_keyword_array);
          console.log('Character Count:', responseData.sm_api_character_count);
          setSummary(responseData.summary);
          setOpen(!open);
        }
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error.message);
        console.error("mesajul lor",error.sm_api_message)
        setSummary("THE REQUESTED PAGE IS IN AN UNRECOGNISABLE FORMAT. COULD NOT SUMMARIZE CONTENT")
        setOpen(!open)
      });
  }

  const bookmarkNews = (newItem) => {
    console.log("image", newItem.image)
    let items = JSON.parse(localStorage.getItem("newsList")) || [];

    let itemExists = items.some((item) => item.title === newItem.title);

    if (!itemExists) {
      items.push(newItem);
      localStorage.setItem("newsList", JSON.stringify(items));

      news = {
        sourceName: newItem.source.name,
        sourceUrl: newItem.source.url,
        author: newItem.url,
        title: newItem.title,
        description: newItem.description,
        url: newItem.url,
        image: newItem.image,
        publishedAt: newItem.publishedAt,
        content: newItem.content,
        userId: localStorage.getItem("id")

      }

      console.log("news", JSON.stringify(news))
      try {
        saveArticle(news).then(res => {
          console.log("acestea sunt articolele salvate\n");
          console.log(res);
        });
      } catch (error) {
        console.log("error", error.message)
      }
    }
  };

  const deletebookmarkNews = (newItem) => {
    const storedArray = JSON.parse(localStorage.getItem("newsList"));
    const updatedArray = storedArray.filter(
      (item) => item.title !== newItem.title
    );
    let a = localStorage.setItem("newsList", JSON.stringify(updatedArray))
    try {
      deleteArticle(localStorage.getItem("id"), newItem.url)

    } catch (error) {
      console.log("error", error.message);
    }
    setState(updatedArray);


  };


  return (


    <motion.section
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", delay: 0, duration: 0.2 }}
      className="flex flex-col md:flex-row relative bg-slate-50 p-2 mb-4 rounded-md transition duration-700 shadow-[0_35px_60px_-15px_red-500]"
    >
      {news.image ? (
        <img
          className="headline__image rounded-t-lg rounded-sm md:rounded-l-lg md:rounded-t-sm shadow-lg object-cover h-48 w-full md:w-48"
          src={news.image}
          alt={news.title}
        />
      ) : (
        <div className="headline__image-placeholder shadow-lg rounded-t-lg rounded-sm md:rounded-l-lg md:rounded-t-sm flex items-center justify-center font-bold bg-blue-500 text-xl text-white h-48 w-full md:w-48">
          TOP NEWS
        </div>
      )}
      <section className="headline__content">
        <div className="flex justify-between">
          <ExternalLink href={news.url}>
            <h2
              className={`text-2xl font-bold mb-2 transition duration-700 hover:text-blue-500`}
            >
              {news.title}
            </h2>
          </ExternalLink>
          {!bookmarkPath ? (
            <div
              onClick={() => bookmarkNews(news)}
              className="inline h-10 w-10 z-50"
            >
              <img
                width="45"
                height="45"
                src="https://img.icons8.com/cute-clipart/64/bookmark-ribbon.png"
                alt="bookmark-ribbon"
              />
            </div>
          ) : (
            <div
              onClick={() => deletebookmarkNews(news)}
              className="inline h-10 w-10 z-50"
            >
              <img
                width="45"
                height="45"
                src="https://img.icons8.com/plasticine/100/filled-trash.png"
                alt="filled-trash"
              />
            </div>
          )}
        </div>
        <p className={`news__author`}>
          {" "}
          - By {news.author ? news.author : news.source.name} at{" "}
          {new Date(news.publishedAt).toLocaleString()}
        </p>
        <p className={`mt-4 px-2`}>{news.description}</p>
      </section>
      <img
        className="hidden md:inline absolute top-5 right-0 object-contain h-40 z-1 opacity-25"
        src="/images/headline-bg.png"
        alt="Headliner"
      />
      <IconButton onClick={() => handleSummarize(news.url)}>
        <span>Summarize</span>
      </IconButton>
      <Modal open={open} onClose={() => setOpen(!open)}>
        <div className="modal-container">
          <div className="modal-content">
            <h2 id="modal-title">Summary</h2>
            <p id="modal-description">{summary}</p>
            <IconButton onClick={() => setOpen(!open)}>
              Close
            </IconButton>
          </div>
        </div>
      </Modal>

    </motion.section>
  );
}

export default Headline;


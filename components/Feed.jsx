"use client";

import { useState, useEffect } from "react";
import PromptCardList from "./PromptCardList";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  const filterPosts = (searchedText) => {
    const regex = new RegExp(searchedText, "i");
    return posts.filter((item) => {
      return regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt);
    });
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(()=>{
        const searchResult = filterPosts(e.target.value);
        setSearchResults(searchResult);
      },500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const searchResult = filterPosts(tagName);
    setSearchResults(searchResult);
  }

  return (
    <section className="feed">
      <form className=" relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tag or a username "
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={searchResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;

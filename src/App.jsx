import { useEffect, useState } from "react";
import React from "react";
import PostList from "./components/PostList";
import "./scss/style.scss";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import Modal from "./components/UI/Modal/Modal";
import Button from "./components/UI/Button/Button";
import { usePosts } from "./hooks/usePosts";
import PostService from "./API/PostService";
import PostPage from "./components/PostPage";
import Loader from "./components/UI/Loader/Loader";
import useFetching from "./hooks/useFetching";

const App = () => {
  const [totalServerPosts, setTotalServerPosts] = useState(0);
  const [totalLocalPosts, setTotalLocalPosts] = useState(0);
  const [maxPageCount, setMaxPageCount] = useState(1);
  useEffect(
    () => setMaxPageCount(Math.ceil((totalServerPosts + totalLocalPosts) / 10)),
    [totalServerPosts, totalLocalPosts]
  );
  const [posts, setPosts] = useState({});
  const [postsPage, setPostsPage] = useState(10);
  const [filter, setFilter] = useState({
    selectedSort: "",
    searchQuery: "",
  });
  const pageCheck = posts[postsPage] || [];
  const currentPostsList = pageCheck;
  const sortedAndSearchedPosts = usePosts(
    pageCheck,
    filter.selectedSort,
    filter.searchQuery
  );
  const [formModalVisibility, setFormModalVisibility] = useState(false);
  useEffect(() => {
    for (let i = 1; i <= 10; i++) {
      setPosts((prev) => {
        return {
          ...prev,
          [i]: [],
        };
      });
    }
  }, []);
  const [fetchPosts, postsLoading, postsError] = useFetching(async () => {
    const resp = await PostService.getAll(10, postsPage);
    const data = await resp.data;
    setPosts((prev) => {
      return {
        ...prev,
        [postsPage]: [...prev[postsPage], ...data],
      };
    });
    setTotalServerPosts(+resp.headers["x-total-count"]);
  });
  useEffect(() => {
    fetchPosts();
  }, [postsPage]);

  function sortPosts(sort) {
    setFilter({ ...filter, selectedSort: sort });
  }

  function createPost(newPost) {
    setPosts((prev) => {
      return {
        ...prev,
        [maxPageCount]: [...prev[maxPageCount], newPost],
      };
    });
    setFormModalVisibility(false);
  }
  function removePost(post) {
    const data = posts[postsPage].filter((item) => item.id !== post.id);
    setPosts(prev => {
      return {
        ...prev,
        [postsPage]: [
          ...data,
        ]
      }
    })
  }

  return (
    <div className="app">
      <Button onClick={() => setFormModalVisibility(!formModalVisibility)}>
        Добавить пост
      </Button>
      <Modal
        visibility={formModalVisibility}
        setVisibility={setFormModalVisibility}
      >
        <PostForm createPost={createPost} />
      </Modal>
      <hr style={{ margin: "5px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} sortPosts={sortPosts} />
      <hr style={{ margin: "5px 0" }} />
      {((sortedAndSearchedPosts.length == 0 || !sortedAndSearchedPosts) &&
        ((postsLoading && <Loader />) || (postsError && <h1>Error</h1>) || (
          <h1>Посты не найдены</h1>
        ))) || (
          <div>
            <PostPage
              page={postsPage}
              setPage={setPostsPage}
              max={maxPageCount}
            />
            <PostList posts={sortedAndSearchedPosts} removePost={removePost} />
          </div>
        )}
    </div>
  );
};
export default App;
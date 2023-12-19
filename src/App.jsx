import React, {useEffect, useMemo, useState} from "react";
import PostList from "./components/PostList";
import "./scss/style.scss";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import Modal from "./components/UI/Modal/Modal";
import Button from "./components/UI/Button/Button";
import {usePosts} from "./hooks/usePosts";
import PostService from "./API/PostService";
import PostPagination from "./components/PostPagination";
import Loader from "./components/UI/Loader/Loader";
import useFetching from "./hooks/useFetching";

const App = () => {
  const [posts, setPosts] = useState({});
  const [totalServerPosts, setTotalServerPosts] = useState(0);
  const [totalLocalPosts, setTotalLocalPosts] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [maxPageCount, setMaxPageCount] = useState(1);
  const [postsPage, setPostsPage] = useState(1);
  const [filter, setFilter] = useState({
    selectedSort: "",
    searchQuery: "",
  });
  const pageCheck = useMemo(()=> posts[postsPage] || [], [postsPage, posts]);
  const sortedAndSearchedPosts = usePosts(
      posts,
      pageCheck,
      filter.selectedSort,
      filter.searchQuery
  );
  const [formModalVisibility, setFormModalVisibility] = useState(false);
  const [fetchPosts, postsLoading, postsError] = useFetching(async () => {
    if (!posts[postsPage] || posts[postsPage].length === 0) {
      const resp = await PostService.getAll(10, postsPage);
      const data = await resp.data;
      setPosts((prev) => {
        return {
          ...prev,
          [postsPage]: [
            ...data,
          ],
        };
      });
      setTotalServerPosts(+resp.headers["x-total-count"]);
    } else {
      return postsPage[postsPage]
    }
  });

  useEffect(() => {
    setMaxPageCount(Math.ceil((totalServerPosts + totalLocalPosts) / 10));
    setTotalPosts(totalServerPosts + totalLocalPosts);
  }, [totalServerPosts, totalLocalPosts]);

  useEffect(() => {
    fetchPosts();
  }, [postsPage]);

  function sortPosts(sort) {
    setFilter({...filter, selectedSort: sort});
  }

  function createPost(newPost) {
    setPosts((prev) => {
      const check = Array.isArray(prev[maxPageCount]) ? [...prev[maxPageCount]] : [];
      return {
        ...prev,
        [maxPageCount]: [...check, {...newPost}],
      };
    });
    setFormModalVisibility(false);
  }

  function removePost(post) {
    const data = posts[postsPage].filter((item) => item.id !== post.id);
    setPosts(prev => {
      return {
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
          <PostForm createPost={createPost}/>
        </Modal>
        <hr style={{margin: "5px 0"}}/>
        <PostFilter filter={filter} setFilter={setFilter} sortPosts={sortPosts}/>
        <hr style={{margin: "5px 0"}}/>
        {((sortedAndSearchedPosts.length === 0 || !sortedAndSearchedPosts) &&
            ((postsLoading && <Loader/>) || (postsError && <h1>Error</h1>) || (
                <h1>Посты не найдены</h1>
            ))) || (
            <div>
              <PostPagination
                  page={postsPage}
                  setPage={setPostsPage}
                  max={maxPageCount}
              />
              <PostList
                  posts={sortedAndSearchedPosts}
                  removePost={removePost}/>
            </div>
        )}
      </div>
  );
};
export default App;
import { useEffect, useState } from "react";
import React from "react";
import PostList from "./components/PostList";
import './scss/style.scss';
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

  const [totalPosts, setTotalPosts] = useState(0);
  const [posts, setPosts] = useState([]);
  const [postsPage, setPostsPage] = useState(1);
  const [filter, setFilter] = useState({
    selectedSort: '',
    searchQuery: '',
  });
  const id = 1;
  const sortedAndSearchedPosts = usePosts(posts, filter.selectedSort, filter.searchQuery);
  const [formModalVisibility, setFormModalVisibility] = useState(false);

  const [fetchPosts, postsLoading, postsError] = useFetching(
    async () => {
      const response = await PostService.getAll(10, postsPage);
      setPosts(response.data);
      setTotalPosts(response.headers['x-total-count']);
    });

  useEffect(() => {
    fetchPosts();
  }, [postsPage]);
  function sortPosts(sort) {
    setFilter({ ...filter, selectedSort: sort });
  }
  7
  function createPost(newPost) {
    setPosts([...posts, newPost])
    setFormModalVisibility(false)
  }
  function removePost(post) {
    setPosts(posts.filter((item) => item.id !== post.id))
  }

  return (
    <div className="app">
      <Button
        onClick={() => setFormModalVisibility(!formModalVisibility)}>
        Добавить пост
      </Button>
      <Modal
        visibility={formModalVisibility}
        setVisibility={setFormModalVisibility}>
        <PostForm createPost={createPost} />

      </Modal >
      <hr style={{ margin: '5px 0' }} />
      <PostFilter
        filter={filter}
        setFilter={setFilter}
        sortPosts={sortPosts} />
      <hr style={{ margin: '5px 0' }} />
      {(sortedAndSearchedPosts.length == 0 || !sortedAndSearchedPosts)
        && ((postsLoading && <Loader />)
          || (postsError && <h1>Error</h1>)
          || <h1>Посты не найдены</h1>)
        ||
        <div>
          <PostPage page={postsPage} setPage={setPostsPage} max={(totalPosts / 10).toFixed(0)} />
          <PostList posts={sortedAndSearchedPosts} removePost={removePost} />
        </div>
      }
    </div>
  );
};
export default App;
import React, {useEffect, useMemo, useState} from "react";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import Modal from "../components/UI/Modal/Modal";
import Button from "../components/UI/Button/Button";
import {usePosts} from "../hooks/usePosts";
import PostService from "../API/PostService";
import PostPagination from "../components/PostPagination";
import useFetching from "../hooks/useFetching";
import FetchStatus from "../components/FetchStatus";

const Posts = () => {
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
    const [loadedPages, setLoadedPages] = useState(0);
    const [formModalVisibility, setFormModalVisibility] = useState(false);
    const [fetchPosts, postsLoading, postsError] = useFetching(async () => {
        if (postsPage > loadedPages) {
            const resp = await PostService.getAll(10, postsPage);
            const data = await resp.data;
            setPosts((prev) => {
                const check = (posts[postsPage] && posts[postsPage].length !== 0
                        && [...posts[postsPage]])
                    || [...[]]
                return {
                    ...prev,
                    [postsPage]: [
                        ...data,
                        ...check,
                    ],
                };
            });
            setTotalServerPosts(+resp.headers["x-total-count"]);
            setLoadedPages(loadedPages + 1);
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
        setPosts(prev => {
            const check = Array.isArray(prev[maxPageCount]) ? [...prev[maxPageCount]] : [...[]];
            return {
                ...prev,
                [maxPageCount]: [
                    ...check,
                    {...newPost, id: Date.now()}],
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
        <div className="container">
            <Button onClick={() => setFormModalVisibility(!formModalVisibility)}>
                Добавить пост
            </Button>
            <Modal
                visibility={formModalVisibility}
                setVisibility={setFormModalVisibility}>
                <PostForm createPost={createPost}/>
            </Modal>
            <hr style={{margin: "5px 0"}}/>
            <PostFilter filter={filter} setFilter={setFilter} sortPosts={sortPosts}/>
            <hr style={{margin: "5px 0"}}/>
            <FetchStatus
                condition={sortedAndSearchedPosts.length === 0 || !sortedAndSearchedPosts}
                loading={postsLoading}
                error={postsError}>
                <PostPagination
                    page={postsPage}
                    setPage={setPostsPage}
                    max={maxPageCount}/>
                <PostList
                    posts={sortedAndSearchedPosts}
                    removePost={removePost}/>
            </FetchStatus>
        </div>
    );
};
export default Posts;
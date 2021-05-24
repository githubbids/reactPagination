import Posts from './components/Posts';
import Pagination from './components/Pagination';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoding] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  useEffect(() => {
    const fetchPost = async () => {
      setLoding(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoding(false);
    }
    fetchPost();
  },[]);

  // console.log(posts);

  //get   Current Post
  const indexOfLastPost = currentPage *  postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost,indexOfLastPost)

  //paginate function change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  return (
    <div className='container mt-5'>
        <h1 className="text-primary mb-3">Pagination Example</h1>
        <Posts posts={currentPosts} loading={loading} />
        <Pagination postPerPage={postPerPage} totalPosts={posts.length} paginate={paginate} />
    </div>
  );
}

export default App;

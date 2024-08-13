import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import useWindowWidth from '../hooks/useWindowWidth';
import WindowWidthContext from '../hooks/useWindowWidth';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));


const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [LodeMore, setLodeMore] = useState([])
  const { isSmallerDevice } = useContext(WindowWidthContext);
 const [button, setButton] = useState(true)
 const [count , setCount] = useState(1)
  useEffect(() => {
    const fetchPost = async () => {
      try{
        const { data: posts } = await axios.get('/api/v1/posts', {
          params: { start: 0, limit: isSmallerDevice ? 5 : 10 },
        });
        setPosts(posts);
         const details = posts.filter((item) => item.userId == `${count}`)
          console.log(details)
          setLodeMore([...LodeMore, ...details])
      }catch (err){
         console.log('Error while fetching the data', err)
      }
    
      
    
    };

    fetchPost();
  }, [button, count, isSmallerDevice]);

  console.log(LodeMore)
  const handleClick = () => {
    setIsLoading(true);
     setButton(false)
     setCount(count + 1)
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };
  console.log(count)
  console.log(button)
  return (
    <Container>
      <PostListContainer>
        {LodeMore?.map(post => (
          <Post post={post} />
        ))}
      </PostListContainer>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {count > 9 ? '':   <LoadMoreButton onClick={handleClick} disabled={isLoading}>
          {!isLoading  && count > 9 ? ' ' : 'Load more'}
        </LoadMoreButton> }
     
      </div>
    </Container>
  );
}



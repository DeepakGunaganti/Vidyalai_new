

import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import useUseFetch from '../UserList/UseFetch';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  position: 'relative',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '300px',
  padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const UserOverlay = styled.div(() => ({
  left: '10px',
  color: 'black',
  padding: '5px',
  borderRadius: '5px',
  // zIndex: 1,
}));

const Button = styled.button(() => ({
  position: 'absolute',
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
}));

const PrevButton = styled(Button)`
  left: 10px;
  margin-bottom: 130px;
`;

const NextButton = styled(Button)`
  right: 10px;
   margin-bottom: 130px;
`;

const Post = ({ post }) => {
  const [Name, setName] = useState([]);
  const [users] = useUseFetch();
  const carouselRef = useRef(null);

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  const Api = () => {
    try{
      if (users.length > 0) {
        const details = users.map((item) => {
          return {title:[item.name.split(' ')[0].split('')[0]],title2:[item.name.split(' ')[1].split('')[0]]}
        });
        setName(details);
      }
    } catch (err){
       console.log("Error while getting the data", err)
    }
   
  };

  useEffect(() => {
    Api();
  }, [users]);

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <PostContainer>
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
              {Name[index] && users[index] && (
                <UserOverlay style={{display:"flex"}}>
                  
                  <strong style={{backgroundColor:"gray", width:"fit-content", padding:"10px", borderRadius:"50px", fontSize:"20px", color:"white"}}>{Name[index].title}{Name[index].title2}</strong>
                  <div style={{display:"flex", flexDirection:"column", marginLeft:"3%"}}>
                  <strong>{users[index].name}</strong>
                  <div>{users[index].email}</div>
                  </div>
                 
                </UserOverlay>
              )}
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    content: PropTypes.any,
    images: PropTypes.shape({
      map: PropTypes.func,
    }),
    title: PropTypes.any,
  }),
};

export default Post;




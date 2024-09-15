import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled, Typography } from '@mui/material';

import { DataContext } from '../../../context/DataProvider';

import { API } from '../../../service/api';

import Comment from './Comment';

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    margin: 0 20px;
`;

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

const StyledTypography = styled(Typography)`
    color: #878787;
    display: flex;
    margin: 20px 0;
`

const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png'

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    const { account } = useContext(DataContext);
    
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await API.getAllComments(post._id);
                setComments(response.data);
            } catch(error) {
                console.error(error);
            }
        }
        getData();
    }, [toggle, post]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    }

    const addComment = async() => {
        try {
            await API.newComment(comment);
            setComment(initialValue);
            setToggle(prev => !prev);
        } catch(error) {
            console.error(error);
        }
    }
    
    return (
        <Box>
            <Container>
                <Image src={url} alt="dp" />   
                <StyledTextArea
                    placeholder="what's on your mind?"
                    onChange={(e) => handleChange(e)} 
                    value={comment.comments}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="medium" 
                    style={{ height: 40 }}
                    onClick={(e) => addComment(e)}
                >Post</Button>             
            </Container>
            <Box>
                {
                    comments && comments.length > 0 ? comments.map(comment => (
                        <Comment key={comment._id} comment={comment} setToggle={setToggle} />
                    )) : <StyledTypography>No comments yet for this blog</StyledTypography>
                }
            </Box>
        </Box>
    )
}

export default Comments;
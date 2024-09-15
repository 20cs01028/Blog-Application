import React, { useState, useEffect } from 'react';

import { Box, styled, TextareaAutosize, Button, FormControl, InputBase } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

import { API } from '../../service/api';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const TextArea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}

const Update = () => {
    const navigate = useNavigate();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');

    const { id } = useParams();

    const url = 'https://executivecareerbrand.com/wp-content/uploads/2011/04/blog-49006_640.png';
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await API.getPostById(id);
                setPost(response.data);
            } catch(error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const getImage = async () => { 
            if(file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                
                try {
                    let response = await API.uploadFile(data);
                    setPost(prevPost => ({ ...prevPost, picture: response.data}));
                } catch(error) {
                    console.error(error);
                }
            }
        }
        getImage();
    }, [file])

    const updateBlogPost = async () => {
        try {
            await API.updatePost(post);
            navigate(`/details/${id}`);
        } catch(error) {
            console.error(error);
        }
    }

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    return (
        <Container>
            <Image src={post.picture || url} alt="post" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add style={{ cursor: 'pointer' }} fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    accept='.jpeg, .png, .jpg'
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField onChange={(e) => handleChange(e)} value={post.title} name='title' placeholder="Title" />
                <Button onClick={() => updateBlogPost()} variant="contained" color="primary">Update</Button>
            </StyledFormControl>

            <TextArea
                placeholder="Tell your story..."
                name='description'
                onChange={(e) => handleChange(e)} 
                value={post.description}
            />
        </Container>
    )
}

export default Update;
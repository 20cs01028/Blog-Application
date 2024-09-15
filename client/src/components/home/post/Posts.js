import { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link, useSearchParams } from 'react-router-dom';


import { API } from '../../../service/api';

import Post from './Post';

const Posts = () => {
    const [posts, getPosts] = useState([]);
    
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => { 
            try {
                let response = await API.getAllPosts({ category : category || ''});
                getPosts(response.data);
            } catch(error) {
                console.error(error);
            }
        }
        fetchData();
    }, [category]);

    return (
        <>
            {
                posts && posts.length > 0 ? posts.map(post => (
                    <Grid key={post._id} size={{md: 3, xs: 12, sm: 4}}>
                        <Link style={{textDecoration: 'none', color: 'inherit'}} to={`details/${post._id}`}>
                            <Post post={post} />
                        </Link>
                    </Grid>
                )) : <Box style={{color: '878787', margin: '30px 80px', fontSize: 18}}>
                        No data is available for selected category
                    </Box>
            }
        </>
    )
}

export default Posts;
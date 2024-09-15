import Grid from '@mui/material/Grid2';


import Banner from '../banner/banner';
import Categories from './Categories';
import Posts from './post/Posts';

const Home = () => {
    return (
        <>
            <Banner />
            <Grid container spacing={1}>
                <Grid size={{md: 2, xs: 12, sm: 2}}>
                    <Categories />
                </Grid>
                <Grid container size={{xs: 12, sm: 10, md: 10}}>
                    <Posts />
                </Grid>
            </Grid>
        </>
    )
}

export default Home;
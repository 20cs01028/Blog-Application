
import { styled, Box, Typography } from '@mui/material';

const Image = styled(Box)`
    width: 100%;
    background: url(https://img.freepik.com/premium-photo/black-desk-with-laptop-palm-leaf-it_1077535-30924.jpg?size=626&ext=jpg&ga=GA1.1.782123362.1725974709&semt=ais_hybrid) left/50% repeat-x #000;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Heading = styled(Typography)`
    font-size: 70px;
    color: #FFFFFF;
    line-height: 1
`;

const SubHeading = styled(Typography)`
    font-size: 20px;
    background: #FFFFFF;
`;

const Banner = () => {
    
    return (
        <Image>
            <Heading>BLOG</Heading>
            <SubHeading>Explore ideas, stories, and insights</SubHeading>
        </Image>
    )
}

export default Banner;
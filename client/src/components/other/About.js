import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub} from '@mui/icons-material';
// import "../../images/about.png"
import about from "../../images/about.png";

// const Banner = styled(Box)`
//     background-image: url(../../images/about.png);
//     width: 100%;
//     height: 50vh;
//     background-position: left 0px bottom 0px;
//     background-size: cover;
// `;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;

const About = () => {

    return (
        <Box>
            {/* <Banner/> */}
            <img style={{
                height : "40vh",
                width : "100vw"
            }} src={about} alt="not found" />
            <Wrapper>
                <Typography variant="h3">EliteBazzar</Typography>
                <Typography variant="h5">About Author </Typography>
                <Text variant="h5">My name is pradip ram , I am from chatra, Jharkhand. I am pursuin g bachelor of technology in computer science and engineering from IIT(ISM) Dhanbad<br />
                    If you are interested, you can view some of my favorite projects here
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/Pradipram" color="inherit" target="_blank"><GitHub /></Link>
                    </Box>
                </Text>
                {/* <Text variant="h5">
                    Need something built or simply want to have chat? Reach out to me on
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.instagram.com/codeforinterview/" color="inherit" target="_blank">
                            <Instagram />
                        </Link>
                    </Box>  
                        or send me an Email 
                        <Link href="mailto:codeforinterview@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                            <Email />
                        </Link>.
                </Text> */}
            </Wrapper>
        </Box>
    )
}

export default About;
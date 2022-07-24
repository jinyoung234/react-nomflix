import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { url } from "inspector";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import getMovieInfo from "../utils/api";
import { IGetMovieInfo } from "../utils/api";
import { makeImagePath } from "../utils/utils";

/* Styled-Components */
const Wrapper = styled.div`
    height: 130vh;
`;

const Loader = styled.div`
    width: 50%;
    height: 20vh;
    color: white;
    background-color: rgba(255,255,255,0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

const Banner = styled.div<{bgPhoto: string}>`
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.4)), url(${props => props.bgPhoto}) ;
    background-size: cover;
`;

const Title = styled.h2`
    font-size: 68px;
    margin-bottom: 10px;
`;

const Overview = styled.p`
    font-size: 25px;
    width: 70%;
`;

const Slider = styled(motion.div)`
    position: relative;
    top: -40px;
    height: 180px;
`;

const MovieList = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 5px;
    border: 1px solid black;
    width: 100%;
    height: 100%;
    background-color: black;
    position: absolute;
`;

const Movie = styled(motion.div)<{bgImage:string}>`
    width: 100%;
    height: 100%;
    border: 1px solid black;
    background-color: white;
    color:black;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size : cover;
    &:first-child {
        transform-origin: center left;
    }
    &:last-child {
        transform-origin: center right;
    }
`;

const Info = styled(motion.div)`
    padding: 10px;
    background-color: ${(props) => props.theme.black.lighter};
    opacity: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    h4 {
        color:white;
        text-align: center;
        font-size: 18px;
    }
`;

const Modal = styled(motion.div)`
  background-color : rgba(0,0,0,0.8);
  width: 40vw;
  height: 80vh;
  position: absolute;
  top: 50%;
  left: 30%;
  right: 0px;
  display: flex;
  flex-direction: column;
`;

const SliderButtonLeft = styled.button`
    width: 3%;
    height: 100%;
    background-color: rgba(0,0,0,0.7);
    position: absolute;
    top: 0%;
    right: 97%;
    z-index: 99;
    border:0px solid white;
    color:white;
    span{
        font-size: 20px;
    }
`;

const SliderButtonRight = styled.button`
    background-color: rgba(0,0,0,0.7);
    border:0px solid white;
    color:white;
    width: 3%;
    height: 100%;
    position: absolute;
    top: 0%;
    right: 0%;
    z-index: 99;
    font-size: 20px;
`;

const Overlay = styled(motion.div)`
    width: 100%;
    height: 130vh;
    background-color: rgba(0,0,0,0.5);
    position: absolute;
    top: 10%;
`

const ModalImg = styled.div`
    width: 100%;
    height: 40vh;
    overflow: hidden;
    background-size: cover;
    background-position: center center;
`;

const ModalTitle = styled.h2`
    font-size: 30px;
    position: absolute;
    top: 40%;
    margin-left: 6%;
    color:whitesmoke;
`

const ModalContent = styled.p`
    width: 80%;
    margin-left: 6%;
    margin-top:3%;
`;
/* end Styled-Components */

/* variants */
const sliderVar = {
    start : {
        x : window.innerWidth - 10
    },
    end : {
        x : 0
    },
    exit : {
        x : -window.innerWidth + 10
    }
}

const movieVariants = {
      normal: {
        scale: 1,
      },
      hover: {
        scale: 1.3,
        y: -80,
        transition: {
          delay: 0.5,
          duaration: 0.1,
          type: "tween",
        },
      },
    };

const infoVariants = {
    hover: {
        opacity:1,
        transition:{
            type:"tween",
            delay: 0.5,
            duaration:0.1,
        }
    },
}
/* and variants */

function Home() {

    /* slider data */
    const [sliderIndex, setSliderIndex] = useState(0);

    const [leavingSlider, setLeavingSlider] = useState(false);


    const moveSlider = () => {
        if(leavingSlider) return;
        setLeavingSlider(true);
        if(sliderIndex === LAST_PAGE) {
            setSliderIndex(0);
        } else {
            setSliderIndex((prev) => prev + 1);
        }
    }

    const restartSlider = () => {
        setLeavingSlider((prev) => !prev);
    }
    /* end slider data */

    /* API data */
    const {isLoading, data} = useQuery<IGetMovieInfo>(["movie", "movieInfo"] , getMovieInfo);
    const offset = 6;
    const movieListNum = data?.results.length;
    const LAST_PAGE = Math.floor(movieListNum as number / offset) - 1;
    /* end API data */

    /* modal data */
    const [modalState, setModalState] = useState(false);
    const modalURLPush = useNavigate();

    const goToModal = (movieId:number) => {
        setModalState(true);
        modalURLPush(`/movies/${movieId}`);
    }
    
    const goToHome = () => {
        setModalState((prev) => !prev);
        modalURLPush("/");
    }
    const modalURLMatch = useMatch("/movies/:movieId");
    const {scrollY} = useScroll();
    const modalInfo = modalURLMatch?.params.movieId &&
        data?.results.find((movie) => String(movie.id) === modalURLMatch?.params.movieId)

    /* end modal data */
    return (
        <Wrapper>
            {   
                isLoading ? (<Loader>is Loading ... </Loader>) : 
                (   
                    <>  {/* Banner Component */}
                        <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
                            <Title>{data?.results[0].title}</Title>
                            <Overview>{data?.results[0].overview}</Overview>
                        </Banner>
                        {/* end Banner Component */}
                        {/* Slider Component */}
                        <Slider>
                            <SliderButtonLeft onClick={moveSlider}><span>{"<"}</span></SliderButtonLeft>
                            <AnimatePresence 
                                onExitComplete={restartSlider}
                                initial={false}
                            >
                                <MovieList 
                                    variants={sliderVar}
                                    initial = {"start"}
                                    animate = {"end"}
                                    exit = {"exit"}
                                    transition = {{type:"tween", duration: 1 }}
                                    key={sliderIndex}
                                >

                                        {data?.results.slice(1).slice(offset*sliderIndex, offset*sliderIndex+offset).map(
                                            movie => (
                                                    <Movie 
                                                        key={movie.id}
                                                        variants={movieVariants}
                                                        whileHover="hover"
                                                        transition={{type:"tween"}}
                                                        bgImage={makeImagePath(movie.backdrop_path,"w500")}
                                                        onClick={()=>{goToModal(movie.id)}}
                                                        layoutId={movie.id + ""}
                                                        >
                                                            <Info variants={infoVariants}><h4>{movie.title}</h4></Info>
                                                    </Movie>
                                                     )
                                        )}
                                </MovieList>
                            </AnimatePresence>
                            <SliderButtonRight onClick={moveSlider}>{">"}</SliderButtonRight>
                        </Slider>
                        {/* end Slider Component */}

                        {/* Modal Component */}
                        { modalURLMatch && modalState ? (
                            <AnimatePresence>
                                <Overlay 
                                    onClick={goToHome}
                                />
                                <Modal
                                    style={{ top : scrollY.get() + 100}} 
                                    layoutId={modalURLMatch.params.movieId}
                                    onClick={goToHome}   
                                >
                                    { modalInfo && 
                                    <>
                                        <ModalImg style={{backgroundImage:`linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.1)), url(${makeImagePath(modalInfo.backdrop_path,"w500")})`}}/>
                                        <ModalTitle>{modalInfo.title}</ModalTitle>
                                        <ModalContent>{modalInfo.overview}</ModalContent>
                                    </>}
                                </Modal>
                            </AnimatePresence>
                        ): '' }
                        {/* end Modal Component */}
                    </>
                )
            }
        </Wrapper>
    )
}

export default Home;
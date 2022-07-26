import { motion, useAnimation, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components"

const Nav = styled(motion.nav)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${props => props.theme.black.darker};
    width: 100%;
    height: 80px;
    position: fixed;
    top:0;
`;

const Col = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0px 40px;
`;

const Col2 = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0px 40px;
`;

const Logo = styled(motion.svg)`
    width: 100px;
    height: 40px;
    margin-right: 40px;
`;

const Items = styled.ul`
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 14px;
`;

const ListItem = styled.li`
    display: flex;
    padding: 10px 0px;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
    color: ${(props) => props.theme.white.darker};
    transition: color 0.3s ease-in-out;
    &:hover {
        color: ${(props) => props.theme.white.lighter}
    }
    position: relative;
`

const Circle = styled(motion.div)`
    width: 8px;
    height : 8px;
    border-radius: 50%;
    background-color: ${props => props.theme.red};
    position: absolute;
    top: 26px;
`

const logoVar = {
    normal : {
        fillOpacity: 1,
    },
    active: {
        fillOpacity: [0,1,0],
        transition : {
            repeat: Infinity,
        },
    },
    end: {
        fillOpacity: 1,
    }
}

const Search = styled.span`
    display: flex;
    align-items: center;
    position: relative;
    svg {
        height: 25px;
    }
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  height: 44px;
  left: -150px;
  right: 0px;
  padding: 5px 10px;
  padding-left: 40px;
  z-index: -1;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
`;

const navVariants = {
    top: {
      backgroundColor: "rgba(0, 0, 0, 0)",
    },
    scroll: {
      backgroundColor: "rgba(0, 0, 0, 1)",
    },
};


function NavBar() {
    const tvURLMatch = useMatch("/tv");
    const homeURLMatch = useMatch("/");
    const [moveSearchBar, setMoveSearchBar] = useState(false);
    const navAnimation = useAnimation();
    const {scrollY} = useScroll();
    const startSearch = () => {
        setMoveSearchBar((prev) => !prev);
    };

    useEffect(()=> {
        scrollY.onChange(() => {
            if(scrollY.get() > 80) {
                navAnimation.start("scroll");
            } else {
                navAnimation.start("top");
            }
        })
    },[scrollY, navAnimation]);

    return (
        <Nav
            variants={navVariants}
            initial="top"
            animate={navAnimation}
        >
            <Col>           
                <Logo
                    variants={logoVar}
                    initial= {"normal"}
                    animate={"end"}
                    whileHover="active" 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="100" 
                    height="30" 
                    viewBox="0 0 1024 276.742">
                    <motion.path 
                        stroke="white"
                        strokeWidth="3"
                        d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" fill="#d81f26"/>
                </Logo>
                
                <Items>
                    <Link to={"/"}>
                        <ListItem>home{homeURLMatch?.pattern.path === "/" ? <Circle layoutId="circle"/> : ''}</ListItem>
                    </Link>
                    <Link to={"/tv"}>
                        <ListItem>Tv shows{tvURLMatch?.pattern.path === "/tv" ? <Circle layoutId="circle"/> : ''}</ListItem>
                    </Link>
                </Items>
            </Col>
            <Col2>
                <Search>
                    <motion.svg
                        onClick={startSearch}
                        animate={{x : moveSearchBar ? -142 : 0 }}
                        transition={{type:"linear"}}
                        fill="#fff"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        ></path>
                    </motion.svg>
                    {moveSearchBar? <Input
                        animate={{scaleX:1}}                    
                        initial={{scaleX:0}}
                        transition={{type:"linear"}}
                        placeholder="Go To Search"
                    /> : ''}
                </Search>
            </Col2>
        </Nav>
    )
}

export default NavBar
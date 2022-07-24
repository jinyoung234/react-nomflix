import axios from "axios";

const API_KEY = "978d00ad19fea41367c2a61eb74ff880";
const baseURL = "https://api.themoviedb.org/3";

export interface IMovie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
}

export interface IGetMovieInfo {
    dates: {
        maximum:string;
        minimum:string;
    },
    page: string;
    results: IMovie[];
    total_pages:number;
    total_results:number;
}

const getMovieInfo = async () => {
    const res = await axios.get(`${baseURL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`);
    return res.data; 
}

export default getMovieInfo;
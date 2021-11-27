import React from "react";
import { Movies } from "../components/Movies";
import { Preloader } from "../components/Proloader";
import { Search } from "../components/Search";

const API_KEY = process.env.REACT_APP_APY_KEY;

class Main extends React.Component {
    state = {
        movies: [],
        stanMovie: "matrix",
        loading: true,
    };

    componentDidMount = () => {
        fetch(
            `http://www.omdbapi.com/?apikey=${API_KEY}&s=` +
                this.state.stanMovie
        )
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    movies: data.Search,
                    loading: false,
                });
            });
    };

    searchMovies = (str, type = "all") => {
        this.setState({ loading: true });
        fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${str}${
                type !== "all" ? `&type=${type}` : ""
            }`
        )
            .then((response) => response.json())
            .then((data) =>
                this.setState({ movies: data.Search, loading: false })
            );
    };

    render() {
        const { movies, loading } = this.state;

        return (
            <main className="container content">
                <Search searchMovies={this.searchMovies.bind(this)} />
                {loading ? <Preloader /> : <Movies movies={movies} />}
            </main>
        );
    }
}

export { Main };

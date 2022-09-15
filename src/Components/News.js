import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [search, setSearch] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState([]);

    const capitalizeFirstLetter = (str) => {
        // converting first letter to uppercase
        const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
        return capitalized;
    };

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - News `;
        updateNews();
    }, []);

    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(50);
        let parsedData = await data.json();
        setArticles(parsedData.articles);
        setSearch(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    };

    const handlePrevClick = async () => {
        setPage(page - 1);
        updateNews();
    };

    const handleNextClick = async () => {
        setPage(page + 1);
        updateNews();
    };

    //Search the News By their Title
    const searchHandler = (e) => {
        if (e.target.value === "") {
            setArticles(search);
            return;
        }
        const filterData = search.filter((item) =>
            item.title.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setArticles(filterData);
    };
    return (
        <>
            <div>
                <div className="container pt-5 mt-5">
                    <div className="row">
                        <div className="col-md-6 d-flex align-items-center my-3"><h1 className="text-center">{props.heading}</h1></div>
                        <div className="col-md-6 d-flex align-self-center justify-content-end  my-3">
                            <div className="w-100">
                                <label htmlFor="" className="mb-2">Search News: </label>
                                <input className="form-control" type="search" placeholder="Search" aria-label="Search" onChange={(e) => searchHandler(e)} style={{ maxWidth: "80%" }} />
                            </div>
                        </div>
                        <div className="col-12"><div className="text-center my-5">{loading && <Spinner />}</div></div>
                    </div>


                    {/* //Search Bar */}
                    <div className="row">
                        {!loading &&
                            articles.map((element) => {
                                return (
                                    <div className="col-md-4" key={element.url}>
                                        <NewsItem
                                            title={element.title ? element.title.slice(0, 44) : ""}
                                            description={
                                                element.description
                                                    ? element.description.slice(0, 58)
                                                    : ""
                                            }
                                            imageUrl={element.urlToImage}
                                            newUrl={element.url}
                                            publishedAt={element.publishedAt}
                                            source={element.source.name}
                                        />
                                    </div>
                                );
                            })}
                    </div>
                </div>
                <div className="container d-flex justify-content-between my-5">
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}> &larr; Previous </button>
                    <button
                        disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}
                        type="button"
                        className="btn btn-dark"
                        onClick={handleNextClick}>Next &rarr;
                    </button>
                </div>
            </div>
        </>
    );
};

News.defaultProps = {
    country: "us",
    category: "entertainment",
};
News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
};
export default News;

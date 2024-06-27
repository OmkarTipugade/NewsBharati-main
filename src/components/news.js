import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `NewsBharati - ${this.capitalizeFirstLetter(
      this.props.category
    )}`;
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  static defaltProps = {
    country: "in",
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  };

  async componentDidMount() {
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2dd06070c80f405e9e74470b26a58e0b&page=1`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=2dd06070c80f405e9e74470b26a58e0b&page=${this.state.page + 1} `;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      page: this.state.page + 1,
      loading: false,
    });
  };
  // handle previous and next buttons

  // handlePrevClick = async () => {
  //   console.log("handlePrevClick");
  //   const url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apiKey=2dd06070c80f405e9e74470b26a58e0b&page=${this.state.page - 1} `;
  //   this.setState({
  //     loading: true,
  //   });
  //   let data = await fetch(url);
  //   this.setState({ loading: true });
  //   let parseData = await data.json();
  //   this.setState({
  //     loading: false,
  //   });
  //   this.setState({
  //     articles: parseData.articles,
  //     page: this.state.page - 1,
  //     loading: false,
  //   });
  // };

  // handleNextClick = async () => {
  //   if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / 20))) {
  //     console.log("handleNextClick");
  //     const url = `https://newsapi.org/v2/top-headlines?country=${
  //       this.props.country
  //     }&category=${
  //       this.props.category
  //     }&apiKey=2dd06070c80f405e9e74470b26a58e0b&page=${this.state.page + 1} `;
  //     this.setState({
  //       loading: true,
  //     });
  //     let data = await fetch(url);
  //     let parseData = await data.json();
  //     this.setState({
  //       articles: parseData.articles,
  //       page: this.state.page + 1,
  //       loading: false,
  //     });
  //   }
  // };
  render() {
    return (
      <>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row my-2 ">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-3" key={element.url}>
                    <NewsItem
                      source={element.source.name}
                      author={element.author}
                      title={element.title != null ? element.title : ""}
                      description={
                        element.description != null ? element.description : ""
                      }
                      publishedAt={element.publishedAt}
                      urlToImage={element.urlToImage}
                      url={element.url}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* previsous and next buttons */}
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            onClick={this.handlePrevClick}
            type="button"
            className="btn btn-primary btn-sm"
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / 20)
            }
            onClick={this.handleNextClick}
            type="button"
            className="btn btn-primary btn-sm"
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { author, title, description, url, urlToImage, publishedAt } =
      this.props;
    return (
      <div>
        <div className="card" style={{ width: "17rem" }}>
          <img src={urlToImage} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title} ... </h5>
            <div className="d-flex justify-content-start">
              <p className="mx-3 card-text">{author}</p>
              <p className="mx-3 card-text">{publishedAt} </p>
            </div>
            <p className="card-text">{description} ...</p>
            <a href={url} target="_blank" className="btn btn-primary btn-sm">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

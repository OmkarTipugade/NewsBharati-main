import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { source, author, title, description, url, urlToImage, publishedAt } =
      this.props;
    let unknown = "unknown";
    let defImgUrl =
      "data:image/png;base64,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";
    return (
      <div>
        <div className="card my-3">
          <span
            className="badge rounded-pill text-bg-info"
            style={{ left: "90%", zIndex: "1" }}
          >
            {source}
          </span>

          <img
            src={!urlToImage ? defImgUrl : urlToImage}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <p className="card-text">
              <small className="text-body-secondary">
                Author: {author ? author : unknown}
              </small>
            </p>
            <h5 className="card-title">{title}</h5>
            <div className="d-flex justify-content-start"></div>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-body-secondary">
                {new Date(publishedAt).toGMTString()}
              </small>
            </p>

            <a
              href={url}
              rel="noreferrer"
              target="_blank"
              className="btn btn-primary btn-sm"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react'

export class newsItem extends Component {
    render() {
        let { newsData } = this.props;
        return (
            <div className="card news-card" style={{ width: "18rem" }}>
                <div className="source-badge">
                    <span className="badge bg-danger">{newsData.source.name}</span>
                </div>
                <img src={newsData.urlToImage} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{newsData.title ? newsData.title.slice(0, 45) : ''}...</h5>
                    <p className="card-text">{newsData.description ? newsData.description.slice(0, 75) : ''}...</p>
                    <p className="card-text text-muted">
                        <small>by {newsData.author ? newsData.author : 'Unknown'} on {newsData.publishedAt}</small>
                    </p>
                    <a href={newsData.url} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Read more..</a>
                </div>
            </div>
        )
    }
}

export default newsItem
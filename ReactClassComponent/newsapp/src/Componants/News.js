import NewsItem from "./NewsItem"
import React, { Component } from 'react'
import Spinner from "./Spinner"
import PropTypes from "prop-types"
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 10,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    constructor(props) {
        super(props)
        console.log('I am constructor')
        this.state = {
            articles: [],
            page: 1,
            loading: false,
            totalResults: 0
        }
        document.title = `${this.props.category}- NewsFire`;
    }

    updateNews = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        this.props.setProgress(30);
        const data = await fetch(url);
        this.props.setProgress(60);
        const parsedData = await data.json();
        this.props.setProgress(100);
        this.setState({
            articles: parsedData.articles,
            totalPage: Math.ceil(parsedData.totalResults / this.props.pageSize),
            loading: false
        })
    }

    async componentDidMount() {
        this.updateNews();
    }
    handlePrev = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }
    handleNext = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }
    fetchMoreData = () => {
        this.setState({ page: this.state.page + 1 }, async () => {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
            const data = await fetch(url);
            const parsedData = await data.json();
            this.setState({
                articles: this.state.articles.concat(parsedData.articles),
                totalResults: parsedData.totalResults
            })
        });
    }
    render() {
        console.log(this.state.articles)
        return (
            <div>
                <h1 className="text-center top-headlines">NewsFire - Top {this.props.category} Headlines</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((ele, idx) => {
                                return <div className="col-md-4 center my-3" key={ele.url + idx}>
                                    <NewsItem newsData={ele} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>

                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark page-prev" onClick={this.handlePrev}>&larr; previous</button>
                    <button disabled={this.state.page === this.state.totalPage} type="button" className="btn btn-dark page-next" onClick={this.handleNext}>next &rarr;</button>
                </div> */}
            </div>
        )
    }
}

export default News
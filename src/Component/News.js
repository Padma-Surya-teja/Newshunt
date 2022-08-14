import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country : 'in',
        pageSize: 8,
        category : 'general'
    }

    static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string
    }
    constructor() {
        super();
        console.log("Hello Im a constructor of newsHunt");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0

        }
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=be3de7e66eed42208c298176aadeb6da&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading : true})
        let data = await fetch(url);
        let parsedData = await data.json()

        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading:false })
    }
    handleNext = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=be3de7e66eed42208c298176aadeb6da&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading : true})
            let data = await fetch(url);
            let parsedData = await data.json()
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
        }
    }
    handlePrevious = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=be3de7e66eed42208c298176aadeb6da&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading : true})
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading:false
        })
    }
    render() {
        return (
            <div className='container my-3' style={{margin : '10px 0px;'}}>
                <h1 className="text-center">News - Hunt Headlines</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div key={element.url} className="col-md-4">
                            <NewsItem title={element.title ? element.title.slice(0, 30) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://www.zdnet.com/a/img/2014/09/18/a05c6cbb-3f07-11e4-b6a0-d4ae52e95e57/download.jpg"} newsUrl={element.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between ">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-info" onClick={this.handlePrevious}> &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-info" onClick={this.handleNext}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News

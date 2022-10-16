import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
export class News extends Component {
    static defaultProps = {
      country: 'in',
      pageSize:5,
      category:'general'
    }

    static propTypes = {
      country: PropTypes.string,
      pageSize: PropTypes.number,
      category: PropTypes.string
    }

    capti = (string)=>{
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props){
        super(props);
        this.state = {
          articles:[],
          loading:false,
          page:1
        }
        document.title = `KhabardarTak | ${this.capti(this.props.category)}`;
    }
    
    async componentDidMount(){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=67e4be36a1224595973b8ea47cbf87e9&page=1&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({articles: parsedData.articles,totalResults: parsedData.totalResults})
    }
    handeleNextClick = async ()=>{

      if(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

      }
      else{
        let url =`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=67e4be36a1224595973b8ea47cbf87e9&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
          page: this.state.page+1,
          articles: parsedData.articles
        })
    }
    }
    handelePrevClick = async ()=>{
      let url =`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=67e4be36a1224595973b8ea47cbf87e9&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        page: this.state.page-1,
        articles: parsedData.articles
      })
    }

  render() {
      
    return (
      <div className="container ">
          <h1 className="text-center my-3">KhabardarTak - Top {this.capti(this.props.category)} Headlines</h1>
          <div className="row">
          {this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
          })}  
            
          </div>
          <div className="container d-flex justify-content-between my-2">
              <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handelePrevClick}> &larr; Previous</button>
              <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handeleNextClick}>Next &rarr; </button>
          </div>
      </div>
    )
  }
}

export default News
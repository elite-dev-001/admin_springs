import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../Header'


function Home() {
    const {id} = useParams()
    const [myPost, setMyPost] = useState([])
    console.log(id)

    useEffect(() => {
        window.localStorage.setItem('id', id)
        axios.get(`https://africanspringsapi.herokuapp.com/api/post/get/all/news?posterId=${id}`).then((res) => {
        console.log(res.data['results'])
        const post = Array.from(res.data['results']);
        setMyPost(post)
        }).catch((err) => {
            console.log(err)
        })
    }, [id])

  return (
    <>
        <Header />
        <div className='container'>
            <div className="row">
                    <div className="col-md-12">
                        {/* <!-- Breadcrumb --> */}
                        <ul className="breadcrumbs bg-light mb-4">
                            <li className="breadcrumbs__item">
                                <Link to={`/${id}`} className="breadcrumbs__url">
                                    <i className="fa fa-home"></i> Home</Link>
                            </li>
                            <li className="breadcrumbs__item">
                                <Link to={`/${id}`} className="breadcrumbs__url">News</Link>
                            </li>
                            <li className="breadcrumbs__item breadcrumbs__item--current">
                                My Posts
                            </li>
                        </ul>
                    </div>
            </div>
            <div className='col-md-8'>
                <aside className='wrapper__list__article'>
                    <h4 className='border_section'>My News Upload</h4>
                    {
                        myPost.length === 0 ? <h2>No Current Uploads from you</h2> : myPost.map((post, index) => <ArticleEntry key={index} img={post['thumbnail']} category={post['category']} author={post['author']} date={post['date']} title={post['title']} news={post['news']} id={post['_id']} />)
                    }
                </aside>
            </div>
        </div>
    </>
  )
}

export default Home

function ArticleEntry(props) {
    const {img, category, author, date, title, news, id} = props
    return (
      <div className="article__entry">
        <div className="article__image">
            <Link to={`/single/${id} `}>
                <img src={img} alt="" className="img-fluid" />
            </Link>
        </div>
        <div className="article__content">
            <div className="article__category">
                {category}
            </div>
            <ul className="list-inline">
                <li className="list-inline-item">
                    <span className="text-primary">
                        {author}
                    </span>
                </li>
                <li className="list-inline-item">
                    <span className="text-dark text-capitalize">
                        {date}
                    </span>
                </li>
  
            </ul>
            <h5>
                <Link to={`/single/${id} `}>
                    {title}
                </Link>
            </h5>
            <p>
                {news.slice(0, 100)}
            </p>
            <Link to={`/single/${id} `} className="btn btn-outline-primary mb-4 text-capitalize"> Update Post</Link>
        </div>
    </div>
    );
  }
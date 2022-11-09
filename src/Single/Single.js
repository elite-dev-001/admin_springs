import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Header from '../Header'
import { SpinnerRoundFilled } from 'spinners-react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
// import '../../public/css/styles3875.css'

function Single() {

    const altPic = "https://res.cloudinary.com/dhejdjq9l/image/upload/v1656278153/Group_2_1_spt4rf.png"
    const { register, handleSubmit, reset } = useForm();
    const [secureUrl, setSecureUrl] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const navigate = useNavigate()

    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [news, setNews] = useState('')
    const [author, setAuthor] = useState('')

    const{postId} = useParams()

    const id = window.localStorage.getItem('id')

    const categories = ['Sports', 'Health', 'Lifestyle', 'Business', 'Healthy Living', 'Entertainment', 'Politics', 'Article', 'Travel', 'Food', 'News Update']

    useEffect(() => {
        axios.get(`https://vast-ruby-cheetah-cape.cyclic.app/api/post/get/single/post/${postId}`).then((res) => {
            console.log(res.data[0])
            reset(res.data[0])
            const data = res.data[0]
            setAuthor(data['author'])
            setTitle(data['title'])
            setCategory(data['category'])
            setNews(data['news'])
        }).catch((err) => {
            console.log(err)
        })
    }, [reset, postId])

    const onSubmit = (data) => {
        setLoading(true)
        secureUrl === '' ? data.thumbnail = altPic : data.thumbnail = secureUrl
        data.date = new Date().toLocaleDateString()
        data.posterImage = altPic;
        // data.posterId = id;
        console.log(data)
        axios.patch(`https://vast-ruby-cheetah-cape.cyclic.app/api/post/update/news/${postId}`, data).then((res) => {
            console.log(res.data)
            setLoading(false)
            window.alert('Post updated successfully');
            navigate(`/${id}`)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
            setError('Could not update Post')
        })
        
    }

    const uploadImage = (file) => {
        setDisabled(true)
        setLoading(true)
        const data = new FormData();
        data.append('file', file[0])
        data.append('upload_preset', 't04ny6oh')
        axios.post('https://api.cloudinary.com/v1_1/dhejdjq9l/image/upload', data).then((res) => {
            console.log(res.data['secure_url'])
            setSecureUrl(res.data['secure_url'])
            setDisabled(false)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
            setDisabled(false)
            setError('Somethin went wrong. Could not upload image')
        })
    }

    const deletePost = () => {
        window.alert(' You are about to delete this Post')
        setLoading1(true)
        axios.delete(`https://vast-ruby-cheetah-cape.cyclic.app/api/post/delete/single/post/${postId}`).then((res) => {
            setLoading1(false)
            window.alert('Post Deleted successfully')
            navigate(`/${id}`)
        }).catch((err) => {
            console.log(err)
            setLoading1(false)
        })
    }


  return (
    <>
        <Header />
        <div className='col-md-8' style={{margin: '2em 0'}}>
            <aside className='wrapper__list__article'>
                <h4 className='border_section'>Update Post</h4>
            </aside>
            <div className="card mx-auto" style={{maxWidth:'520px'}}>
                <article className="card-body">
                    <header className="mb-4">
                        <h4 className="card-title">Update your Post</h4>
                    </header>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-row">
                            <div className="col form-group">
                                <label>Title</label>
                                <input {...register('title')} defaultValue={title} required type="text" className="form-control" placeholder="" />
                            </div> 
                            <div className="col form-group">
                                <label>Author</label>
                                <input {...register('author')} defaultValue={author} required type="text" className="form-control" placeholder="" />
                            </div> 
                        </div> 
                        <div className="form-group">
                            <label>Category</label>
                            <select {...register('category')} defaultValue={category} required className="form-control">
                            <option> Choose Category...</option>
                                {
                                    categories.map((category, index) => <option key={index}> {category} </option>)
                                }
                            </select>
                        </div> 
                        <div className="form-group">
                            <label>Thumbnail</label>
                            <input onChange={(e) => uploadImage(e.target.files)} type="file" className="form-control" placeholder="" />
                            <small className="form-text text-muted">Choose your profile in either JPEG, JPG or PNG format</small>
                        </div> 
                        <div className="form-group">
                            <label>News</label>
                            <textarea style={{width: "100%"}} defaultValue={news} cols="20" rows="10" {...register('news')} placeholder="Update your News" ></textarea>
                        </div>
                        <div className="form-group">
                            <button disabled={disabled} type="submit" className="btn btn-primary btn-block"> {
                                loading ? <SpinnerRoundFilled color='#ffffff' enabled={loading} /> : 'Update Post'
                            } </button>
                            <p style={{color: 'red', textAlign: 'center', paddingTop: '.5em'}}> {error} </p>
                        </div> 
                    </form>
                        <div className="form-group">
                            <button onClick={() => deletePost()} disabled={disabled} className="btn btn-primary btn-block"> {
                                loading1 ? <SpinnerRoundFilled color='#ffffff' enabled={loading1} /> : 'Delete Post'
                            } </button>
                        </div> 
                </article>
            </div>
        </div>
    </>
  )
}

export default Single
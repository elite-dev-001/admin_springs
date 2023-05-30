import axios from 'axios';
import React, { useState } from 'react'
import Header from '../Header'
import { SpinnerRoundFilled } from 'spinners-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';




function NewPost() {

    const altPic = "https://res.cloudinary.com/dhejdjq9l/image/upload/v1656278153/Group_2_1_spt4rf.png"
    const { register, handleSubmit } = useForm();
    const [secureUrl, setSecureUrl] = useState('')
    const [secureUrl2, setSecureUrl2] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const id = window.localStorage.getItem('id')

    const categories = ['Sports', 'Health', 'Lifestyle', 'Business', 'Healthy Living', 'Entertainment', 'Politics', 'Article', 'Travel', 'Food', 'News Update', "Education", "News", "Science", "Documentary", "Culture", "Motivation", "Newspaper headline", "Technology", "Trends", "World", "Cinema box office", "Markets", "Property", "Business leaders", "Medical research", "Music News", "Celebrity News", "Religion", "Global Economy", "Conflicts", "Cryptocurrency", "Vlog", "African tradition"]

    const onSubmit = (data) => {
        setLoading(true)
        secureUrl === '' ? data.thumbnail = altPic : data.thumbnail = secureUrl
        secureUrl2 === '' ? data.thumbnail2 = null : data.thumbnail2 = secureUrl2
        data.date = new Date().toLocaleDateString()
        data.posterImage = altPic;
        data.posterId = id;
        console.log(data)
        axios.post('https://vast-ruby-cheetah-cape.cyclic.app/api/post/create/news', data).then((res) => {
            console.log(res.data)
            setLoading(false)
            window.alert('Post created successfully');
            navigate(`/${id}`)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
            setError('Could not create Post')
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
    const uploadImage2 = (file) => {
        setDisabled(true)
        setLoading(true)
        const data = new FormData();
        data.append('file', file[0])
        data.append('upload_preset', 't04ny6oh')
        axios.post('https://api.cloudinary.com/v1_1/dhejdjq9l/image/upload', data).then((res) => {
            console.log(res.data['secure_url'])
            setSecureUrl2(res.data['secure_url'])
            setDisabled(false)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
            setDisabled(false)
            setError('Somethin went wrong. Could not upload image')
        })
    }


  return (
    <>
        <Header />
        <div className='col-md-8' style={{margin: '2em 0'}}>
            <aside className='wrapper__list__article'>
                <h4 className='border_section'>Upload your own News</h4>
            </aside>
            <div className="card mx-auto" style={{maxWidth:'520px'}}>
                <article className="card-body">
                    <header className="mb-4">
                        <h4 className="card-title">Make a Post</h4>
                    </header>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-row">
                            <div className="col form-group">
                                <label>Title</label>
                                <input {...register('title')} required type="text" className="form-control" placeholder="" />
                            </div> 
                            <div className="col form-group">
                                <label>Author</label>
                                <input {...register('author')} required type="text" className="form-control" placeholder="" />
                            </div> 
                        </div> 
                        <div className="form-group">
                            <label>Category</label>
                            <select {...register('category')} required className="form-control">
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
                                <label>YouTube Link (Optional)</label>
                                <input {...register('link')} type="text" className="form-control" placeholder="Enter Only YouTube Link" />
                        </div>
                        <div className="form-group">
                                <label>Other Links (Optional)</label>
                                <input {...register('videoLink')} type="text" className="form-control" placeholder="Enter Any Other Link" />
                        </div>
                        <div className="form-group">
                            <label>Optional Image</label>
                            <input onChange={(e) => uploadImage2(e.target.files)} type="file" className="form-control" placeholder="" />
                            <small className="form-text text-muted">Choose your profile in either JPEG, JPG or PNG format</small>
                        </div> 
                        <div className="form-group">
                            <label>News</label>
                            <textarea style={{width: "100%"}} cols="20" rows="10" {...register('news')} placeholder="Enter your News" ></textarea>
                        </div>
                        <div className="form-group">
                            <button disabled={disabled} type="submit" className="btn btn-primary btn-block"> {
                                loading ? <SpinnerRoundFilled color='#ffffff' enabled={loading} /> : 'Upload'
                            } </button>
                            <p style={{color: 'red', textAlign: 'center', paddingTop: '.5em'}}> {error} </p>
                        </div> 
                    </form>
                </article>
            </div>
        </div>
    </>
  )
}

export default NewPost
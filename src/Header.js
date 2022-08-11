import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Header() {
    const [show, setShow] = useState('')
    const [display, setDisplay] = useState('none')
    const [id, setId] = useState('')
    
  
    const openNav = () => {
      setShow('show')
      setDisplay('block')
    }
    const closeNav = () => {
      setShow('')
      setDisplay('none')
    }
  
    useEffect(() => {
        setId(window.localStorage.getItem('id'))
    }, [])
   
      
    return (
      <header className='bg-light'>
          {/* <TopBar /> */}
          <div className='navigation-wrap navigation-shadow bg-white'>
          <nav className='navbar navbar-hover navbar-expand-lg navbar-soft'>
              <div className='container'>
                  <div onClick={() => openNav()} className='offcanvas-header'>
                      <div data-toggle="modal" data-target="#modal_aside_right" className='btn-md'>
                          <span className='navbar-toggler-icon'></span>
                      </div>
                  </div>
                  <figure className='mb-0 mx-auto'>
                      <Link to='/'>
                          <img src='/assets/logo.png' alt='' className='img-fluid logo' />
                      </Link>
                  </figure>
                  <div className="collapse navbar-collapse justify-content-between" id='main_nav99'>
          <ul className='navbar-nav ml-auto'>
              <li className="nav-item"><Link className="nav-link" to={`/${id}`}> My Posts </Link></li>
              <li className="nav-item"><Link className="nav-link" to="/create"> Add New Post </Link></li>
              <li className="nav-item"><a className="nav-link" href='https://www.africansprings.org/general'> General Posts </a></li>
              <li onClick={() => closeNav()} className="nav-item"><a className="nav-link" href="https://www.africansprings.org"> Home </a></li>
          </ul>
          <div className='top-search navigation-shadow'>
              <div className='container'>
                  <div className='input-group'>
                    <form action='#'>
                        <div className='row no-gutters mt-3'>
                            <div className='col'>
                                <input className='form-control border-secondary border-right-0 rounded-0' type='search' placeholder='Search' id='example-search-input4' />
                            </div>
                            <div className='col-auto'>
                                <Link className='btn btn-outline-secondary border-left-0 rounded-0 rounded-right' to='/'>
                                  <i className='fa fa-search'></i>
                                </Link>
                            </div>
                        </div>
                    </form>
                  </div>
              </div>
          </div>
      </div>
              </div>
          </nav>
      </div>
      <div className={`modal fixed-left fade ${show} `} id='modal_aside_right' style={{display: `${display}`}} tabIndex='-1' aria-modal="true" role='dialog' >
          <div className='modal-dialog modal-dialog-aside' role='document' >
              <div className='modal-content'>
              <div className='modal-header'>
          <div className='widget__form-search-bar'>
              <div className='row no-gutters'>
                  <div className='col'>
                      <input className='form-control border-secondary border-right-0 rounded-0' placeholder='Search' />
                  </div>
                  <div className='col-auto'>
                      <button className='btn btn-outline-secondary border-left-0 rounded-0 rounded-right'>
                          <i className='fa fa-search'></i>
                      </button>
                  </div>
              </div>
          </div>
          <button onClick={() => closeNav()} type='button' className='close' data-dismiss='modal' aria-label='Close' >
              <span style={{color: 'black'}} aria-hidden='true'>&times;</span>
          </button>
      </div>
      <div className='modal-body'>
          <nav className='list-group list-group-flush'>
              <ul className='navbar-nav'>
                 <li onClick={() => closeNav()} className="nav-item"><Link className="nav-link" to={`/${id}`}> My Posts </Link></li>
                 <li onClick={() => closeNav()} className="nav-item"><Link className="nav-link" to="/create"> Add New Post </Link></li>
                 <li onClick={() => closeNav()} className="nav-item"><a className="nav-link" href='https://www.africansprings.org/general'> General Posts </a></li>
                 <li onClick={() => closeNav()} className="nav-item"><a className="nav-link" href="https://www.africansprings.org"> Home </a></li>
                 {/* <li className="nav-item nav-link" onClick={() => logOut()}> Logouts </li>   */}
              </ul>
          </nav>
      </div>
              </div>
          </div>
      </div>
          {/* <Trending /> */}
      </header>
    )
  }

export default Header
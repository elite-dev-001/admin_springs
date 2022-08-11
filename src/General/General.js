import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header'
import GeneralNews from './components/GeneralNews'

function General() {
  return (
    <>
        <Header />
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        {/* <!-- Breadcrumb --> */}
                        <ul className="breadcrumbs bg-light mb-4">
                            <li className="breadcrumbs__item">
                                <Link to="/" className="breadcrumbs__url">
                                    <i className="fa fa-home"></i> Home</Link>
                            </li>
                            <li className="breadcrumbs__item">
                                <Link to="/" className="breadcrumbs__url">News</Link>
                            </li>
                            <li className="breadcrumbs__item breadcrumbs__item--current">
                                General
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
            <GeneralNews />
        </section>
    </>
  )
}

export default General 
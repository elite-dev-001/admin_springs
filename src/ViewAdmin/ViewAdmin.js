import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../Header";

//Update

function ViewAdmin() {
  const { id } = useParams();
  const [admins, setAdmin] = useState([]);
  console.log(id);

  useEffect(() => {
    window.localStorage.setItem("id", id);
    axios
      .get(`https://vast-ruby-cheetah-cape.cyclic.app/api/admins/get/all`)
      .then((res) => {
        console.log(res.data["results"]);
        const admins = Array.from(res.data["results"]);
        setAdmin(admins);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {/* <!-- Breadcrumb --> */}
            <ul className="breadcrumbs bg-light mb-4">
              <li className="breadcrumbs__item">
                <Link to={`/${id}`} className="breadcrumbs__url">
                  <i className="fa fa-home"></i> Home
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={`/${id}`} className="breadcrumbs__url">
                  News
                </Link>
              </li>
              <li className="breadcrumbs__item breadcrumbs__item--current">
                Admins
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-8">
          <aside className="wrapper__list__article">
            <h4 className="border_section">View All Admins</h4>
            {admins.length === 0 ? (
              <h2>Loading...</h2>
            ) : (
              admins.map((admin, index) => (
                <ArticleEntry
                  key={index}
                  img={admin["profile"]}
                  suspend={admin["suspend"]}
                  email={admin["email"]}
                  country={admin["country"]}
                  firstName={admin["firstName"]}
                  lastName={admin["lastName"]}
                  //   news={admin["news"]}
                  id={admin["_id"]}
                />
              ))
            )}
          </aside>
        </div>
      </div>
    </>
  );
}

export default ViewAdmin;

function ArticleEntry(props) {
  const { img, suspend, email, country, firstName, lastName, id } = props;
  const name = `${firstName} ${lastName}`;
  return (
    <div className="article__entry">
      <div className="article__image">
        <Link to={`/single/admin/${id} `}>
          <img src={img} alt="" className="img-fluid" />
        </Link>
      </div>
      <div className="article__content">
        <div className="article__category">
          {suspend ? "InActive" : "Active"}
        </div>
        <ul className="list-inline">
          <li className="list-inline-item">
            <span className="text-primary">{email}</span>
          </li>
          <li className="list-inline-item">
            <span className="text-dark text-capitalize">{`Country: ${country}`}</span>
          </li>
        </ul>
        <h5>{name}</h5>
        {/* <p>{news.slice(0, 100)}</p> */}
        <Link
          to={`/single/admin/${id} `}
          className="btn btn-outline-primary mb-4 text-capitalize"
        >
          {" "}
          View Admin
        </Link>
      </div>
    </div>
  );
}

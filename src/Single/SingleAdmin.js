import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header";
import { SpinnerRoundFilled } from "spinners-react";

function SingleAdmin() {
  const { adminId } = useParams();
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const navigate = useNavigate();

  const id = window.localStorage.getItem("id");
  const [admin, setAdmin] = useState({});
  console.log(admin["gender"] === "Gender.male");
  useEffect(() => {
    axios
      .get(
        `https://vast-ruby-cheetah-cape.cyclic.app/api/admins/get/one/${adminId}`
      )
      .then((res) => {
        console.log(res.data[0]);
        setAdmin(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [adminId]);

  const deactivateAdmin = () => {
    setLoading(true);
    axios
      .patch(
        `https://vast-ruby-cheetah-cape.cyclic.app/api/admins/update/suspension/${adminId}`,
        {
          suspend: !admin.suspend,
        }
      )
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        console.log("Admin " + admin);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const deleteAdmin = () => {
    setLoading1(true);
    var message = "Are you sure you want to delete this Admin?";

    // eslint-disable-next-line no-restricted-globals
    var result = confirm(message);

    if (!result) return;
    axios
      .delete(
        `https://vast-ruby-cheetah-cape.cyclic.app/api/admins/delete/admin/${adminId}`
      )
      .then((res) => {
        setLoading1(false);
        navigate(`/view/admin/${id}`);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setLoading1(false);
      });
  };

  return (
    <>
      <Header />
      <div className="col-md-8" style={{ margin: "2em 0" }}>
        <aside className="wrapper__list__article">
          <h4 className="border_section">Admin</h4>
        </aside>
        <div className="card mx-auto" style={{ maxWidth: "520px" }}>
          <article className="card-body">
            <header className="mb-4">
              <h4 className="card-title">View Admin Details</h4>
            </header>
            <form>
              <div className="form-row">
                <div className="col form-group">
                  <label>First Name</label>
                  <input
                    defaultValue={admin["firstName"]}
                    readOnly={true}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col form-group">
                  <label>Last Name</label>
                  <input
                    defaultValue={admin["lastName"]}
                    readOnly={true}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col form-group">
                  <label>Country</label>
                  <input
                    defaultValue={admin["country"]}
                    readOnly={true}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col form-group">
                  <label>City</label>
                  <input
                    defaultValue={admin["city"]}
                    readOnly={true}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col form-group">
                  <label>Email</label>
                  <input
                    defaultValue={admin["email"]}
                    readOnly={true}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col form-group">
                  <label>Gender</label>
                  <input
                    defaultValue={admin["gender"]}
                    readOnly={true}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group">
                <button
                  onClick={deactivateAdmin}
                  type="submit"
                  className="btn btn-primary btn-block"
                >
                  {" "}
                  {loading ? (
                    <SpinnerRoundFilled
                      size={10}
                      color="#ffffff"
                      enabled={loading}
                    />
                  ) : admin["suspend"] ? (
                    "Activate Admin"
                  ) : (
                    "Deactivate Admin"
                  )}{" "}
                </button>
              </div>
            </form>
            <div className="form-group">
              <button
                onClick={deleteAdmin}
                className="btn btn-primary btn-block"
              >
                {" "}
                {loading1 ? (
                  <SpinnerRoundFilled
                    size={10}
                    color="#ffffff"
                    enabled={loading}
                  />
                ) : (
                  "Delete Admin"
                )}{" "}
              </button>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}

export default SingleAdmin;

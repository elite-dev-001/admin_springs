import axios from "axios";
import React, { useState } from "react";
import Header from "../Header";
import { SpinnerRoundFilled } from "spinners-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function AddAdmin() {
  const altPic =
    "https://res.cloudinary.com/dhejdjq9l/image/upload/v1656278153/Group_2_1_spt4rf.png";
  const { register, handleSubmit } = useForm();
  const [secureUrl, setSecureUrl] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const id = window.localStorage.getItem("id");

  const onSubmit = (data) => {
    setLoading(true);
    setError("");
    secureUrl === "" ? (data.profile = altPic) : (data.profile = secureUrl);
    console.log(data);
    axios
      .post(
        "https://vast-ruby-cheetah-cape.cyclic.app/api/admins/register",
        data
      )
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data["status"] === "error") {
          setError(res.data["error"]);
        } else {
          window.alert("Admin created successfully");
          navigate(`/view/admin/${id}`);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError("Could not create Admin");
      });
  };

  const uploadImage = (file) => {
    setDisabled(true);
    setLoading(true);
    const data = new FormData();
    data.append("file", file[0]);
    data.append("upload_preset", "t04ny6oh");
    axios
      .post("https://api.cloudinary.com/v1_1/dhejdjq9l/image/upload", data)
      .then((res) => {
        console.log(res.data["secure_url"]);
        setSecureUrl(res.data["secure_url"]);
        setDisabled(false);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setDisabled(false);
        setError("Something went wrong. Could not upload image");
      });
  };

  return (
    <>
      <Header />
      <div className="col-md-8" style={{ margin: "2em 0" }}>
        <aside className="wrapper__list__article">
          <h4 className="border_section">Add New Admin</h4>
        </aside>
        <div className="card mx-auto" style={{ maxWidth: "520px" }}>
          <article className="card-body">
            <header className="mb-4">
              <h4 className="card-title">New Admin</h4>
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-row">
                <div className="col form-group">
                  <label>First name</label>
                  <input
                    {...register("firstName")}
                    required
                    type="text"
                    className="form-control"
                    placeholder=""
                  />
                </div>
                <div className="col form-group">
                  <label>Last Name</label>
                  <input
                    {...register("lastName")}
                    required
                    type="text"
                    className="form-control"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col form-group">
                  <label>Email</label>
                  <input
                    {...register("email")}
                    required
                    type="email"
                    className="form-control"
                    placeholder=""
                  />
                </div>
                <div className="col form-group">
                  <label htmlFor="gender">Gender</label>
                  <select
                    required
                    {...register("gender")}
                    id="gender"
                    name="gender"
                    type="text"
                    className="form-control"
                    placeholder=""
                  >
                    <option value="Gender.male">Male</option>
                    <option value="Gender.female">Female</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="col form-group">
                  <label>Country</label>
                  <input
                    {...register("country")}
                    required
                    type="text"
                    className="form-control"
                    placeholder=""
                  />
                </div>
                <div className="col form-group">
                  <label>City</label>
                  <input
                    {...register("city")}
                    required
                    type="text"
                    className="form-control"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Profile Pic</label>
                <input
                  onChange={(e) => uploadImage(e.target.files)}
                  type="file"
                  className="form-control"
                  placeholder=""
                />
                <small className="form-text text-muted">
                  Choose your profile in either JPEG, JPG or PNG format
                </small>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  {...register("password")}
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  {...register("confirmPassword")}
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                />
              </div>
              <div className="form-group">
                <button
                  disabled={disabled}
                  type="submit"
                  className="btn btn-primary btn-block"
                >
                  {" "}
                  {loading ? (
                    <SpinnerRoundFilled color="#ffffff" enabled={loading} />
                  ) : (
                    "Create Admin"
                  )}{" "}
                </button>
                <p
                  style={{
                    color: "red",
                    textAlign: "center",
                    paddingTop: ".5em",
                  }}
                >
                  {" "}
                  {error}{" "}
                </p>
              </div>
            </form>
          </article>
        </div>
      </div>
    </>
  );
}

export default AddAdmin;

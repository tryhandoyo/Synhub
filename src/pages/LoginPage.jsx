import { Container, Row, Col, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import toast from "react-hot-toast";

import Api from "../api";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validation, setValidation] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    // console.log

    await Api.post("login", formData)
      .then((res) => {
        // console.log(res.data);
        Cookies.set("token", res.data.token);
        Cookies.set("name", res.data.name);
        Cookies.set("role", res.data.role);
        Cookies.set("phone", res.data.phone);

        toast.success("Login Berhasil !", {
          duration: 3000,
          position: "top-center",
        });

        if (res.data.role == "customer") {
          navigate("/");
        }

        if (res.data.role == "admin") {
          navigate("/admin/dashboard")
        }
      })

      .catch((error) => {
        // console.log(error.response.status)
        if (error.response.data.status == 401) {
          toast.error(error.response.data.message, {
            duration: 3000,
            position: "top-center",
          });
        } else {
          setValidation(error.response.data);
        }
      });
  };

  return (
    <>
      <div id="login">
        <Container className="d-flex justify-content-center">
          <Row>
            <Col>
              <div className="wrapper">
                <div className="top text-center">
                  <img src={logo} alt="" className="mt-5 mb-5" />
                  <h1>Login</h1>
                  <p>Masuk untuk mulai reservasi ruangan.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="cth. ahmad@gmail.com"
                />
                {validation.email && (
                  <div class="text-danger" role="alert">
                    <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                    {validation.email}
                  </div>
                )}

                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan Password"
                />
                {validation.password && (
                  <div class="text-danger" role="alert">
                    <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                    {validation.password}
                  </div>
                )}

                <Link className="d-flex justify-content-end mt-2">
                  Lupa Password?
                </Link>

                <button className="btn btn-teal w-100 mt-5" type="submit">
                  Masuk
                </button>
              </form>

              <p className="mt-5 text-center">
                Belum punya akun? <Link to="/register">Daftar</Link>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default LoginPage;

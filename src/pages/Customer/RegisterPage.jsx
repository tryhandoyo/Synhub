import { Container, Row, Col, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";
import { useState } from "react";
import Api from "../../api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import toast from "react-hot-toast";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [validation, setValidation] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // append fungsinya untuk menyelipkan data
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", passwordConfirmation);
    // console.log(name);
    // console.log(phone);
    // console.log(email);
    // console.log(password);
    // console.log(passwordConfirmation);

    await Api.post("customer/register", formData)
      .then((res) => {
        // console.log(res.data);
        toast.success(res.data, {
          duration: 3000,
          position: "top-center",
        });

        navigate("/login");
      })
      .catch((error) => {
        // console.log(error.response.data);
        setValidation(error.response.data);
      });
  };

  return (
    <>
      <div id="register">
        <Container className="d-flex justify-content-center">
          <Row>
            <Col>
              <div className="wrapper">
                <div className="top text-center">
                  <img src={logo} alt="" className="mt-5 mb-5" />
                  <h1>Daftar Akun</h1>
                  <p>Buat akun untuk eksplorasi ruangan.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <Form.Label>Nama Lengkap</Form.Label>
                <Form.Control
                  type="text"
                  name="nama-lengkap"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="cth. Ahmad Fulan"
                />
                {validation.name && (
                  <div class="text-danger" role="alert">
                    <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                    {validation.name}
                  </div>
                )}

                <Form.Label>Nomor Telepon</Form.Label>
                <Form.Control
                  type="text"
                  name="telpon"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="081234567890"
                />
                {validation.phone && (
                  <div class="text-danger" role="alert">
                    <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                    {validation.phone}
                  </div>
                )}

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

                <Form.Label>Konfirmasi Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  placeholder="Masukkan Password"
                />
                {validation.password && (
                  <div class="text-danger" role="alert">
                    <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                    {validation.password}
                  </div>
                )}

                <button className="btn btn-teal w-100 mt-4" type="submit">
                  Daftar Akun
                </button>
              </form>

              <p className="mt-4 text-center">
                Sudah punya akun? <Link to="/login">Login Akun</Link>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default RegisterPage;

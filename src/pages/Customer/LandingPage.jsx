//import komponen
import { useEffect, useState } from "react";
import FooterComponent from "../../components/Customer/FooterComponent";
import KontakComponent from "../../components/Customer/KontakComponent";
import NavbarComponent from "../../components/Customer/NavbarComponent";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Api from "../../api";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const LandingPage = () => {
  const [produk, setProduk] = useState([]);

  const cookies = Cookies.get('token')

  const [banner_1, setBanner_1] = useState({});
  const [banner_2, setBanner_2] = useState({});
  const [banner_3, setBanner_3] = useState({});
  const [banner_4, setBanner_4] = useState({});

  const getDataBanner = async () => {
    await Api.get("/customer/banner").then((res) => {
      // console.log(res.data);
      setBanner_1(res.data.find((item) => item.posisi == "1"));
      setBanner_2(res.data.find((item) => item.posisi == "2"));
      setBanner_3(res.data.find((item) => item.posisi == "3"));
      setBanner_4(res.data.find((item) => item.posisi == "4"));
    });
  };

  const getDataProduk = async () => {
    await Api.get("/customer/produk").then((res) => {
      // console.log(response.data);
      setProduk(res.data);
    });
  };

  useEffect(() => {
    getDataProduk();
    getDataBanner();
    // console.log(cookies);
  }, []);

  return (
    <>
      <NavbarComponent isLoggedIn={cookies} />
      <div id="banner">
        <Container>
          <Row>
            <Col lg={8}>
              <h1>
                Elegansi dan Produktivitas <br /> dalam satu Ruangan.
              </h1>
            </Col>
            <Col lg={4}>
              <p className="banner-teks">
                Ruang tumbuh untuk bisnis meningkatkan kreatifitas dan
                kenyamanan saat bekerja.
              </p>
            </Col>
          </Row>
          <Row className="banner-image d-none d-lg-flex align-item-center mt-5">
            <Col lg={5}>
              <img
                src={banner_1.foto}
                // "../../src/assets/img-hero1.png"
                alt={banner_1.judul}
              />
            </Col>
            <Col lg={7}>
              <Row>
                <Col>
                  <img
                    src={banner_2.foto}
                    // "../../src/assets/img-hero2.png"
                    alt={banner_2.judul}
                  />
                </Col>
              </Row>
              <Row className="mt-4">
                <Col lg={6}>
                  <img
                    src={banner_3.foto}
                    // "../../src/assets/img-hero3.png"
                    alt={banner_3.judul}
                  />
                </Col>
                <Col lg={6}>
                  <img
                    src={banner_4.foto}
                    // "../../src/assets/img-hero4.png"
                    alt={banner_4.judul}
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="banner-image mt-3 d-lg-none d-block align-items-center">
            <Col>
              <img
                src={banner_1.foto}
                // "../../src/assets/img-hero1.png"
                alt={banner_1.judul}
              />
            </Col>
          </Row>
        </Container>
      </div>

      <div id="ruangan" className="mt-5">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center">
                Temukan Ruangan yang <br /> cocok untuk Anda
              </h1>
            </Col>
          </Row>
          <Row>
            {produk.length > 0 ? (
              produk.map((item) => (
                <Col lg={4}>
                  <Link to={`/ruangan/${item.slug}`} className="text-decoration-none">
                    <Card>
                      <Card.Img
                        variant="top"
                        // src="../../src/assets/img-rmeeting.png"
                        src={item.foto}
                      />
                      <Card.Body>
                        <Row>
                          <Col>
                            <Card.Title>
                              {/*Ruang Meeting */}
                              {item.judul_pendek}
                            </Card.Title>
                          </Col>
                          <Col>
                            <p className="text-end">
                              IDR {item.harga / 1000}K / {item.satuan}
                            </p>
                          </Col>
                        </Row>
                        <Card.Text>{item.deskripsi}</Card.Text>
                        {item.fasilitas.slice(0, 2).map((isi) => (
                          <Button variant="outline-dark">
                            {isi.keterangan}
                          </Button>
                        ))}
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))
            ) : (
              <h5>Data Tidak Ditemukan</h5>
            )}
          </Row>
        </Container>
      </div>

      <KontakComponent />
      <FooterComponent />
    </>
  );
};

export default LandingPage;

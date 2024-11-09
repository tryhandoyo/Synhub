import { useState, useEffect } from "react";
import NavbarComponent from "../../components/Customer/NavbarComponent";
import { Container, Row, Col, Card } from "react-bootstrap";
import Cookies from "js-cookie";
import Api from "../../api";

const OrderPage = () => {
  const [pesanan, setPesanan] = useState([]);

  const token = Cookies.get("token");

  const getDataPesanan = async () => {
    await Api.get("/customer/pesanan", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setPesanan(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    getDataPesanan();
  }, []);

  return (
    <>
      <NavbarComponent isLoggedIn={true} />
      <div id="order">
        <Container>
          <h1>Pesanan Anda</h1>
          <Row>
            {pesanan?.map((item, index) => (
              <Col key={index} lg={6}>
                <Card>
                  <Card.Body>
                    <Row>
                      <Col md={4}>
                        <label htmlFor="nama-pemesan">Nama Pemesan</label>
                        <h5>{item.user?.name}</h5>
                      </Col>
                      <Col md={4}>
                        <label htmlFor="nama-pemesan">Tanggal Pemesan</label>
                        <h5>{item.created_at.substring(0, 10)}</h5>
                      </Col>
                      <Col md={4}>
                        <label htmlFor="waktu">Total Waktu</label>
                        <h5>{item.durasi + " " + item.produk.satuan}</h5>
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col md={4}>
                        <label htmlFor="ruangan">Ruangan</label>
                        <h5>{item.produk?.judul_pendek}</h5>
                      </Col>
                      <Col md={4}>
                        <label htmlFor="status">Status</label>
                        <h5>{item.status}</h5>
                      </Col>
                      <Col md={4}>
                        <label htmlFor="waktu">Kode Reservasi</label>
                        <div className="kode-reservasi">
                          <h5>{item.kode_pesanan}</h5>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default OrderPage;

import NavbarComponent from "../../components/Customer/NavbarComponent";
import { Container, Row, Col, Card } from "react-bootstrap";

const OrderPage = () => {
  return (
    <>
      <NavbarComponent isLoggedIn={true} />
      <div id="order">
        <Container>
          <h1>Pesanan Anda</h1>
          <Row>
            <Col lg={6}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col md={4}>
                      <label htmlFor="nama-pemesan">Nama Pemesan</label>
                      <h5>Ahmad Fulan</h5>
                    </Col>
                    <Col md={4}>
                      <label htmlFor="nama-pemesan">Tanggal Pemesan</label>
                      <h5>01/08/2024</h5>
                    </Col>
                    <Col md={4}>
                      <label htmlFor="waktu">Waktu/Total jam</label>
                      <h5>09 : 00 / 3 Jam</h5>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                  <Col md={4}>
                      <label htmlFor="ruangan">Ruangan</label>
                      <h5>Ruangan Meeting</h5>
                    </Col>
                    <Col md={4}>
                      <label htmlFor="status">Status</label>
                      <h5>Lunas</h5>
                    </Col>
                    <Col md={4}>
                      <label htmlFor="waktu">Kode Reservasi</label>
                      <div className="kode-reservasi">
                      <h5>SYB1234567</h5>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default OrderPage;

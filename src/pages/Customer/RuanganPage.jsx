// import Navbar
import { useEffect, useState } from "react";
import NavbarComponent from "../../components/Customer/NavbarComponent";

import { Container, Row, Col, Button, Form } from "react-bootstrap";
import FooterComponent from "../../components/Customer/FooterComponent";
import KontakComponent from "../../components/Customer/KontakComponent";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../../api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const RuanganPage = () => {
  //   handle jumlah orang
  // const [jumlah, setJumlah] = useState(2);
  // // const handleJumlahChange = (event) => {
  // //   setJumlah(parseInt(event.target.value));
  // // };

  // handle waktu mulai dan selesai
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const times = [
    "09.00",
    "10.00",
    "11.00",
    "12.00",
    "13.00",
    "14.00",
    "15.00",
    "16.00",
    "17.00",
  ];

  // ruangan-acara
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    calculateDuration(e.target.value, endDate);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    calculateDuration(startDate, e.target.value);
  };

  // const calculateDuration = (start, end) => {
  //   if (start && end) {
  //     const startDateObj = new Date(start);
  //     const endDateObj = new Date(end);

  //     // Pastikan tanggal valid
  //     if (
  //       startDateObj instanceof Date &&
  //       !isNaN(startDateObj) &&
  //       endDateObj instanceof Date &&
  //       !isNaN(endDateObj)
  //     ) {
  //       let daysDifference =
  //         Math.ceil(
  //           (endDateObj.getTime() - startDateObj.getTime()) / (1000 * 3600 * 24)
  //         ) + 1;

  //       // Jika tanggal mulai dan selesai sama, setel hari menjadi 1
  //       if (daysDifference === 0) {
  //         daysDifference = 1;
  //       }

  //       setDurationDays(daysDifference);

  //       // Hitung total biaya berdasarkan hari saja
  //       const cost = daysDifference * 150000; // biaya per hari
  //       setTotalCost(cost);
  //     } else {
  //       setDurationDays(0);
  //       setTotalCost(0);
  //     }
  //   } else {
  //     setDurationDays(0);
  //     setTotalCost(0);
  //   }
  // };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
    setEndTime(""); //reset endTime saat waktu mulai berubah
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const availableEndTimes = times.filter((time) => time > startTime);

  //handle metode pembayaran
  const [paymentMethod, setPaymentMethod] = useState("");
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // menghitung total waktu dan biaya
  const calculateDuration = () => {
    if (!startTime || !endTime) return 0;
    const startHour = parseInt(startTime.split(":")[0]);
    const endHour = parseInt(endTime.split(":")[0]);
    return endHour - startHour;
  };

  const duration = calculateDuration();
  const totalCost = duration * 80000;

  const { slug } = useParams();
  const [produk, setProduk] = useState({});

  const namaPemesan = Cookies.get("name");
  const telpon = Cookies.get("phone");
  const token = Cookies.get("token");

  const [bayar, setBayar] = useState([]);
  const [pembayaran, setPembayaran] = useState("");
  const [selectPembayaran, setSelectPembayaran] = useState({});
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalSelesai, setTanggalSelesai] = useState("");
  const [waktuMulai, setWaktuMulai] = useState("");
  const [waktuSelesai, setWaktuSelesai] = useState("");
  const [perusahaan, setPerusahaan] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [jumlahOrang, setJumlahOrang] = useState("");

  const handleJumlahChange = (e) => {
    setJumlahOrang(parseInt(e.target.value));
  };

  const [validation, setValidation] = useState({});

  const navigate = useNavigate();

  const getDetailDataProduk = async () => {
    await Api.get(`/customer/produk/${slug}`).then((res) => {
      // console.log(res.data);
      setProduk(res.data);
    });
  };

  const getDataPembayaran = async () => {
    await Api.get("/customer/bayar").then((res) => {
      // console.log(res.data);
      setBayar(res.data);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("produk", produk.id);
    formData.append("tanggal_1", tanggalMulai);
    formData.append("tanggal_2", tanggalSelesai);
    formData.append("jam_1", waktuMulai);
    formData.append("jam_2", waktuSelesai);
    formData.append("bayar", pembayaran);
    formData.append("perusahaan", perusahaan);
    formData.append("keterangan", keterangan);
    formData.append("jumlah_orang", jumlahOrang);

    await Api.post("/customer/pesanan", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        // console.log(response.data);
        if (response.status == 201) {
          toast.success(response.data.message, {
            duration: 3000,
            position: "top-center",
          });

          navigate(`/payment/${response.data.data}`);
        }
      })

      .catch((error) => {
        // console.log(error.response.data);
        setValidation(error.response.data);
      });
  };

  const handleFormProduk = () => {
    switch (slug) {
      case "ruang-meeting":
        // pernyataan
        return (
          <>
            <div className="info-pemesan">
              <Row>
                <Col lg={4}>
                  <Form.Group>
                    <Form.Label>Nama Perusahaan</Form.Label>
                    <Form.Control
                      type="text"
                      name="nama-perusahaan"
                      placeholder="cth. PT. ABC"
                      onChange={(e) => setPerusahaan(e.target.value)}
                    />
                    {validation.perusahaan && (
                      <div className="text-danger" role="alert">
                        <FontAwesomeIcon icon={faCircleExclamation} />
                        {validation.perusahaan}
                      </div>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group>
                    <Form.Label>Jumlah Orang</Form.Label>
                    <Form.Control
                      type="number"
                      name="jumlah-orang"
                      min={4}
                      value={jumlahOrang}
                      max={10}
                      onChange={handleJumlahChange}
                    />
                    {validation.jumlah_orang && (
                      <div className="text-danger" role="alert">
                        <FontAwesomeIcon icon={faCircleExclamation} />
                        {validation.jumlah_orang}
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>
            </div>

            <div className="info-meeting mt-5">
              <h5 className="title">Informasi Meeting</h5>
              <Row>
                <Col lg={4}>
                  <Form.Group>
                    <Form.Label>Pilih Tanggal</Form.Label>
                    <Form.Control
                      type="date"
                      name="tanggal"
                      onChange={(e) => setTanggalMulai(e.target.value)}
                    />
                    {validation.tanggal_1 && (
                      <div className="text-danger" role="alert">
                        <FontAwesomeIcon icon={faCircleExclamation} />
                        {validation.tanggal_1}
                      </div>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={2}>
                  <Form.Group>
                    <Form.Label>Waktu Mulai</Form.Label>
                    <Form.Select
                      aria-label="waktu-mulai"
                      onChange={(e) => setWaktuMulai(e.target.value)}
                    >
                      <option>--</option>
                      {times.map((time, index) => (
                        <option value={time} key={index}>
                          {time}
                        </option>
                      ))}
                    </Form.Select>
                    {validation.jam_1 && (
                      <div className="text-danger" role="alert">
                        <FontAwesomeIcon icon={faCircleExclamation} />
                        {validation.jam_1}
                      </div>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={2}>
                  <Form.Group>
                    <Form.Label>Sampai</Form.Label>
                    <Form.Select
                      aria-label="sampai"
                      disabled={!waktuMulai}
                      onChange={(e) => setWaktuSelesai(e.target.value)}
                    >
                      <option>--</option>
                      {availableEndTimes.map((time, index) => (
                        <option value={time} key={index}>
                          {time}
                        </option>
                      ))}
                    </Form.Select>
                    {validation.jam_2 && (
                      <div className="text-danger" role="alert">
                        <FontAwesomeIcon icon={faCircleExclamation} />
                        {validation.jam_2}
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col lg={8}>
                  <Form.Group>
                    <Form.Label>Ada Kebutuhan Lain</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="deskripsi"
                      onChange={(e) => setKeterangan(e.target.value)}
                    />
                    {validation.keterangan && (
                      <div className="text-danger" role="alert">
                        <FontAwesomeIcon icon={faCircleExclamation} />
                        {validation.keterangan}
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </>
        );

      case "ruang-acara":
        // pernyataan
        return (
          <>
            <div className="info-pemesan">
              <Row>
                <Col lg={4}>
                  <Form.Group>
                    <Form.Label>Nama Perusahaan</Form.Label>
                    <Form.Control
                      type="text"
                      name="nama-perusahaan"
                      placeholder="cth. PT. ABC"
                      onChange={(e) => setPerusahaan(e.target.value)}
                    />
                    {validation.perusahaan && (
                      <div className="text-danger" role="alert">
                        <FontAwesomeIcon icon={faCircleExclamation} />
                        {validation.perusahaan}
                      </div>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group>
                    <Form.Label>Jumlah Orang</Form.Label>
                    <Form.Control
                      type="number"
                      name="jumlah-orang"
                      min={30}
                      value={jumlahOrang}
                      max={200}
                      onChange={handleJumlahChange}
                    />
                    {validation.jumlah_orang && (
                      <div className="text-danger" role="alert">
                        <FontAwesomeIcon icon={faCircleExclamation} />
                        {validation.jumlah_orang}
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>
            </div>
            <div className="info-acara mt-5">
              <h5 className="title">Informasi Acara</h5>
              <Row>
                <Col lg={4}>
                  <Form.Group>
                    <Form.Label>Tanggal Mulai</Form.Label>
                    <Form.Control
                      type="date"
                      name="tanggalMulai"
                      onChange={(e) => setTanggalMulai(e.target.value)}
                    />
                    {validation.tanggal_1 && (
                      <div className="text-danger" role="alert">
                        <FontAwesomeIcon icon={faCircleExclamation} />
                        {validation.tanggal_1}
                      </div>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group>
                    <Form.Label>Tanggal Selesai</Form.Label>
                    <Form.Control
                      type="date"
                      name="tanggalSelesai"
                      onChange={(e) => setTanggalSelesai(e.target.value)}
                    />
                    {validation.tanggal_2 && (
                      <div className="text-danger" role="alert">
                        <FontAwesomeIcon icon={faCircleExclamation} />
                        {validation.tanggal_2}
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={8}>
                  <Form.Group>
                    <Form.Label>Penjelasan Singkat Tentang Acara</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="deskripsi"
                      rows={3}
                      onChange={(e) => setKeterangan(e.target.value)}
                    />
                    {validation.keterangan && (
                      <div className="text-danger" role="alert">
                        <FontAwesomeIcon icon={faCircleExclamation} />
                        {validation.keterangan}
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </>
        );

      case "ruang-coworking":
        // pernyataan
        return (
          <>
            <div className="info-cospace mt-5">
              <h5 className="title">Informasi Coworking Space</h5>
              <Row>
                <Col lg={4}>
                  <Form.Group>
                    <Form.Label>Pilih Tanggal</Form.Label>
                    <Form.Control
                      type="date"
                      name="tanggal"
                      onChange={(e) => setTanggalMulai(e.target.value)}
                    />
                    {validation.tanggal_1 && (
                      <div className="text-danger" role="alert">
                        <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                        {validation.tanggal_1}
                      </div>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={2}>
                  <Form.Group>
                    <Form.Label>Waktu Mulai</Form.Label>
                    <Form.Select
                      aria-label="waktu-mulai"
                      onChange={(e) => setWaktuMulai(e.target.value)}
                    >
                      <option>--</option>
                      {times.map((time, index) => (
                        <option key={index} value={time}>
                          {time}
                        </option>
                      ))}
                    </Form.Select>
                    {validation.jam_1 && (
                      <div className="text-danger" role="alert">
                        <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                        {validation.jam_1}
                      </div>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={2}>
                  <Form.Group>
                    <Form.Label>Sampai</Form.Label>
                    <Form.Select
                      aria-label="sampai"
                      disabled={!waktuMulai}
                      onChange={(e) => setWaktuSelesai(e.target.value)}
                    >
                      <option>--</option>
                      {availableEndTimes.map((time, index) => (
                        <option key={index} value={time}>
                          {time}
                        </option>
                      ))}
                    </Form.Select>
                    {validation.jam_2 && (
                      <div className="text-danger" role="alert">
                        <FontAwesomeIcon icon={faCircleExclamation} />
                        {validation.jam_2}
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </>
        );

      default:
        return <></>;
    }
  };

  const handlePembayaran = (e) => {
    if (e.target.value) {
      setSelectPembayaran(JSON.parse(e.target.value));
      setPembayaran(JSON.parse(e.target.value).id);
    } else {
      setPembayaran("");
    }
  };

  useEffect(() => {
    getDetailDataProduk();
    getDataPembayaran();
  }, [slug]);

  return (
    <>
      <NavbarComponent isLoggedIn={Cookies} />
      <div id="banner">
        <Container>
          <Row>
            <Col lg={8}>
              <h1>
                {produk.judul_pendek} <br /> {produk.judul_panjang}
              </h1>
            </Col>
            <Col lg={4}>
              <p className="banner-teks">{produk.subjudul}</p>
            </Col>
          </Row>

          <Row className="banner-image mt-3">
            <Col>
              <img src={produk.foto} alt={produk.judul_pendek} />
            </Col>
          </Row>
        </Container>
      </div>

      <div id="fasilitas" className="mt-5">
        <Container>
          <Row>
            <Col className="d-lg-flex align-item-center">
              <h3 className="me-5">Fasilitas</h3>
              {produk.fasilitas?.map((item) => (
                <Button variant="outline-dark me-3">{item.keterangan}</Button>
              ))}
            </Col>
          </Row>
        </Container>
      </div>

      <div id="form-pesan" className="mt-5">
        <Container>
          <Row>
            <Col>
              <h1>Pesan {produk.judul_pendek}</h1>
              <p>Beritahu kami kebutuhan {produk.judul_pendek} Anda.</p>
            </Col>
          </Row>

          <form onSubmit={handleSubmit}>
            <div className="info-pemesan">
              <Row>
                <Col lg={4}>
                  <Form.Group>
                    <Form.Label>Nama Pemesan</Form.Label>
                    <Form.Control
                      type="text"
                      name="nama-pemesan"
                      value={namaPemesan}
                      placeholder="cth. ahmad fulan"
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group>
                    <Form.Label>Nomor Telepon</Form.Label>
                    <Form.Control
                      type="text"
                      name="telpon"
                      value={telpon}
                      placeholder="cth. 081234567890"
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>

            {/* memanggil return sebuah elemen yang dari case */}
            {handleFormProduk()}

            <div className="info-pembayaran mt-5">
              <h5 className="title">Informasi Pembayaran</h5>
              <Row>
                <Col lg={4}>
                  <Form.Group>
                    <Form.Label>Metode Pembayaran</Form.Label>
                    <Form.Select
                      aria-label="pembayaran"
                      onChange={handlePembayaran}
                    >
                      <option value="">--Pilih Metode Bayar--</option>
                      {bayar.map((item, index) => (
                        <option key={index} value={JSON.stringify(item)}>
                          {item.nama_pembayaran}
                        </option>
                      ))}
                    </Form.Select>
                    {validation.bayar && (
                      <div className="text-danger" role="alert">
                        <FontAwesomeIcon icon={faCircleExclamation} />
                        {validation.bayar}
                      </div>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  {pembayaran ? (
                    <>
                      <img
                        src={selectPembayaran.logo}
                        alt="Logo Bank"
                        className="mb-2 mt-3"
                        width={120}
                      />
                      <h6>
                        Nomor Rekening :{" "}
                        <b>{selectPembayaran.nomor_rekening}</b>
                      </h6>
                      <h5>
                        <b>a.n {selectPembayaran.nama_orang}</b>
                      </h5>
                    </>
                  ) : (
                    <></>
                  )}
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Label>Ringkasan Pembayaran</Form.Label>
                  <p>
                    Metode Pembayaran yang dipilih : <b>{paymentMethod}</b>
                  </p>
                  <p>
                    Total Waktu : <b>Durasi</b> Jam <b>(IDR 10000)</b>
                  </p>
                </Col>
              </Row>

              <Row>
                <Col lg={8}>
                  <button type="submit" className="btn btn-teal mt-5 w-100">
                    Reservasi
                  </button>
                </Col>
              </Row>
            </div>
          </form>
        </Container>
      </div>

      <KontakComponent />
      <FooterComponent />
    </>
  );
};

export default RuanganPage;

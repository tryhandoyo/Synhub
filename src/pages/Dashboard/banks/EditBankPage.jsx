import { useNavigate, useParams } from "react-router";
import DefaultLayout from "../../../components/Dashboard/DefaultLayout";
import { Card, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Api from "../../../api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import toast from "react-hot-toast";

const EditBankPage = () => {
  const navigate = useNavigate();
  const { id }= useParams();
  const token = Cookies.get("token");

  const [logo, setLogo] = useState("");
  const [sourceLogo, setSourceLogo] = useState("");
  const [namaPembayaran, setNamaPembayaran] = useState("");
  const [nomorRekening, setNomorRekening] = useState("");
  const [pemilikRekening, setPemilikRekening] = useState("");
  const [status, setStatus] = useState("");

  const [validation, setValidation] = useState({});

  const getDataBayar = async () => {
    // console.log(id);
    await Api.get(`/dashboard/bayar/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      // console.log(res.data);
      setLogo(res.data.logo);
      setNamaPembayaran(res.data.nama_pembayaran);
      setNomorRekening(res.data.nomor_rekening);
      setPemilikRekening(res.data.nama_orang);
      setStatus(res.data.status);
    })
    .catch((err) => {
      console.log(err.response);
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(status);

    const formData = new FormData();

    // formData.append("logo", logo);
    formData.append("nama_pembayaran", namaPembayaran);
    formData.append("nama_orang", pemilikRekening);
    formData.append("nomor_rekening", nomorRekening);
    formData.append("status", status);
    formData.append("_method", "PATCH");

    await Api.post(`/dashboard/bayar/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        // console.log(res.data);
        if (res.status == 202) {
          toast.success(res.data.message, {
            duration: 3000,
            position: "top-center",
          });

          navigate("/admin/bank");
        }
      })
      .catch((err) => {
        // console.log(err.response);
        setValidation(err.response.data);
      });
  };

  const handleFileImage = (e) => {
    const imageData = e.target.files[0];

    if (!imageData.type.match("image.*")) {
      setLogo("");
      toast.error("Maaf, Format Tidak Sesuai !", {
        duration: 3000,
        position: "top-center",
      });

      return;
    }
    //ini adalah useState variable image yang akan digunakan untuk form data
    setLogo(e.target.files[0]);
    //ini adalah useState untuk variable sourceImage yang akan digunakan untuk src menampilkan file
    setSourceLogo(URL.createObjectURL(e.target.files[0]));
  };
  
  useEffect(() => {
    getDataBayar();
  }, []);

  return (
    <DefaultLayout>
      <h3>Edit Bank</h3>
      <Card className="p-3">
      <Form onSubmit={handleSubmit}>
          { sourceLogo ? <img src={sourceLogo} width={100} /> : (<img src={logo} width={100}/>)}
          <Form.Group className="mb-2">
            <Form.Label>Upload Logo</Form.Label>
            <Form.Control 
            type="file"
            onChange={handleFileImage} />
            {validation.logo && (
              <p className="text-danger">
                <FontAwesomeIcon icon={faCircleExclamation} />
                {validation.logo}
              </p>
            )}
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Nama Pembayaran</Form.Label>
            <Form.Control
              type="text"
              value={namaPembayaran}
              placeholder="Masukkan Nama Pembayaran"
              onChange={(e) => setNamaPembayaran(e.target.value)}
            />
            {validation.nama_pembayaran && (
              <div className="text-danger" role="alert">
                <FontAwesomeIcon icon={faCircleExclamation} />
                {validation.nama_pembayaran}
              </div>
            )}
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Nomor Rekening</Form.Label>
            <Form.Control
              type="number"
              value={nomorRekening}
              placeholder="Masukkan Nomor Rekening Bank"
              onChange={(e) => setNomorRekening(e.target.value)}
            />
            {validation.nomor_rekening && (
              <div className="text-danger" role="alert">
                <FontAwesomeIcon icon={faCircleExclamation} />
                {validation.nomor_rekening}
              </div>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Nama Pemilik Rekening</Form.Label>
            <Form.Control
              type="text"
              value={pemilikRekening}
              placeholder="Masukkan Nama Pemilik Rekening"
              onChange={(e) => setPemilikRekening(e.target.value)}
            />
            {validation.nama_orang && (
              <div className="text-danger" role="alert">
                <FontAwesomeIcon icon={faCircleExclamation} />
                {validation.nama_orang}
              </div>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select
            value={status}
            aria-label="Default select example"
            onChange={(e) => setStatus(e.target.value)}
          >
            
            <option>Pilih Status</option>
            <option value='y'>Show</option>
            <option value='n'>Hide</option>

            {validation.status && (
              <div className="text-danger" role="alert">
                <FontAwesomeIcon icon={faCircleExclamation} />
                {validation.status}
              </div>
            )}
          </Form.Select>
          </Form.Group>

          <Button
            type="submit"
            className="btn btn-info text-white btn-sm mt-3 me-2"
          >
            Save
          </Button>
          <Button
            className="btn-warning text-white btn-sm mt-3"
            onClick={() => navigate("/admin/bank")}
          >
            Close
          </Button>
        </Form>
      </Card>
    </DefaultLayout>
  );
};

export default EditBankPage;

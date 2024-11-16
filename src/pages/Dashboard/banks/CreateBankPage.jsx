import { Card, Button, Form } from "react-bootstrap";
import DefaultLayout from "../../../components/Dashboard/DefaultLayout";
import { useNavigate } from "react-router";

import Api from "../../../api";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import toast from "react-hot-toast";
import Cookies from "js-cookie";

const CreateBankPage = () => {
  const [logo, setLogo] = useState("");
  const [sourceLogo, setSourceLogo] = useState("");
  const [namaPembayaran, setNamaPembayaran] = useState("");
  const [nomorRekening, setNomorRekening] = useState("");
  const [pemilikRekening, setPemilikRekening] = useState("");
  const [status, setStatus] = useState("");

  const [validation, setValidation] = useState({});

  const token = Cookies.get("token");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(status);

    const formData = new FormData();

    formData.append("logo", logo);
    formData.append("nama_pembayaran", namaPembayaran);
    formData.append("nama_orang", pemilikRekening);
    formData.append("nomor_rekening", nomorRekening);
    formData.append("status", status);

    await Api.post("/dashboard/bayar", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        // console.log(res.data);
        if (res.status == 201) {
          toast.success(res.data.message, {
            duration: 3000,
            position: "top-center",
          });

          navigate("/admin/bank");
        }
      })
      .catch((err) => {
        console.log(err.response);
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

  return (
    <DefaultLayout>
      <h3>Tambah Bank</h3>
      <Card className="p-3">
        <Form onSubmit={handleSubmit}>
          { logo ? <img src={sourceLogo} width={100} /> : <></>}
          <Form.Group className="mb-2">
            <Form.Label>Upload Logo</Form.Label>
            <Form.Control type="file" onChange={handleFileImage} />
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

export default CreateBankPage;

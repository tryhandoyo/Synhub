import DefaultLayout from "../../../components/Dashboard/DefaultLayout";
import { Card, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import Api from "../../../api";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const EditBannerPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = Cookies.get("token");

  const [foto, setFoto] = useState("");
  const [sourceFoto, setSourceFoto] = useState("");
  const [judul, setJudul] = useState("");
  const [subJudul, setSubJudul] = useState("");
  const [posisi, setPosisi] = useState("");
  const [status, setStatus] = useState("");

  const [validation, setValidation] = useState({});

  const getDataBayar = async () => {
    // console.log(id);
    await Api.get(`/dashboard/banner/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        // console.log(res.data);
        setFoto(res.data.foto);
        setJudul(res.data.judul);
        setSubJudul(res.data.subjudul);
        setPosisi(res.data.posisi);
        setStatus(res.data.status);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(status);

    const formData = new FormData();

    // formData.append("foto", foto);
    formData.append("judul", judul);
    formData.append("subjudul", subJudul);
    formData.append("posisi", posisi);
    formData.append("status", status);
    formData.append("_method", "PATCH");

    await Api.post(`/dashboard/banner/${id}`, formData, {
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

          navigate("/admin/banner");
        }
      })
      .catch((err) => {
        if (err.status == 400) {
          toast.error(err.response.message, {
            duration: 3000,
            position: "top-center",
          });
        }
        if (err.status == 422) {
          // console.log(err.response);
          setValidation(err.response.data);
        }
      });
  };

  const handleFileImage = (e) => {
    const imageData = e.target.files[0];

    if (!imageData.type.match("image.*")) {
      setFoto("");
      toast.error("Maaf, Format Tidak Sesuai !", {
        duration: 3000,
        position: "top-center",
      });

      return;
    }
    //ini adalah useState variable image yang akan digunakan untuk form data
    setFoto(e.target.files[0]);
    //ini adalah useState untuk variable sourceImage yang akan digunakan untuk src menampilkan file
    setSourceFoto(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    getDataBayar();
  }, []);

  return (
    <DefaultLayout>
      <h3>Edit Banner</h3>
      <Card className="p-3">
        <Form onSubmit={handleSubmit}>
          {sourceFoto ? (
            <img src={sourceFoto} width={100} />
          ) : (
            <img src={foto} width={100} />
          )}
          <Form.Group className="mb-2">
            <Form.Label>Upload Banner</Form.Label>
            <Form.Control type="file" onChange={handleFileImage} />
            {validation.foto && (
              <p className="text-danger">
                <FontAwesomeIcon icon={faCircleExclamation} />
                {validation.foto}
              </p>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Judul</Form.Label>
            <Form.Control
              type="text"
              value={judul}
              placeholder="Masukkan Judul Banner"
              onChange={(e) => setJudul(e.target.value)}
            />
            {validation.judul && (
              <p className="text-danger">
                <FontAwesomeIcon icon={faCircleExclamation} />
                {validation.judul}
              </p>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Sub Judul</Form.Label>
            <Form.Control
              type="text"
              value={subJudul}
              placeholder="Masukkan Sub Judul Banner"
              onChange={(e) => setSubJudul(e.target.value)}
            />
            {validation.subjudul && (
              <p className="text-danger">
                <FontAwesomeIcon icon={faCircleExclamation} />
                {validation.subjudul}
              </p>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Posisi</Form.Label>
            <Form.Select
            value={posisi}
              aria-label="Default select example"
              onChange={(e) => setPosisi(e.target.value)}
            >
              <option>Pilih Posisi</option>
              <option value="1">Kiri</option>
              <option value="2">Atas</option>
              <option value="3">Bawah Kiri</option>
              <option value="4">Bawah Kanan</option>
            </Form.Select>
            {validation.posisi && (
              <p className="text-danger">
                <FontAwesomeIcon icon={faCircleExclamation} />
                {validation.posisi}
              </p>
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
              <option value="y">Show</option>
              <option value="n">Hide</option>
            </Form.Select>
            {validation.status && (
              <p className="text-danger">
                <FontAwesomeIcon icon={faCircleExclamation} />
                {validation.status}
              </p>
            )}
          </Form.Group>

          <Button
            type="submit"
            className="btn btn-info text-white btn-sm mt-3 me-2"
          >
            Save
          </Button>
          <Button
            className="btn-warning text-white btn-sm mt-3"
            onClick={() => navigate("/admin/banner")}
          >
            Close
          </Button>
        </Form>
      </Card>
    </DefaultLayout>
  );
};

export default EditBannerPage;

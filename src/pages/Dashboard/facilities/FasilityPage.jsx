import DefaultLayout from "../../../components/Dashboard/DefaultLayout";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import Api from "../../../api";
import Cookies from "js-cookie";
import PaginationComponent from "../PaginationComponent";

const FasilityPage = () => {
  const [produk, setProduk] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const token = Cookies.get("token");

  const getDataProduk = async (pageNumber) => {
    const page = pageNumber ? pageNumber : currentPage;

    await Api.get("/dashboard/produk", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        setProduk(res.data);
      })

      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getDataProduk();
  }, []);

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Produk</h3>
        <Link to="/admin/facility/new" className="btn btn-teal">
          Tambah
        </Link>
      </div>
      <div className="bg-white border rounded p-3">
        <Table bordered>
          <thead className="table-light border">
            <tr>
              <th>No</th>
              <th>Foto</th>
              <th>Judul Pendek</th>
              <th>Judul Panjang</th>
              <th>Sub Judul</th>
              <th>Deskripsi</th>
              <th>Harga</th>
              <th>Satuan</th>
              <th>Fasilitas</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {produk.map((item, index) => (
              <tr key={index}>
                <td>{++index}</td>
                <td>
                  <img src={item.foto} width={100} alt="" />
                </td>
                <td>{item.judul_pendek}</td>
                <td>{item.judul_panjang}</td>
                <td>{item.subjudul}</td>
                <td>{item.deskripsi}</td>
                <td>{item.harga}</td>
                <td>{item.satuan}</td>
                <td>
                  <ul>
                    {item?.fasilitas.map((items) => (
                      <li>{items.keterangan}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <Link
                    to="/admin/facility/:id"
                    className="btn btn-info text-white btn-sm mb-1 me-1"
                  >
                    Edit
                  </Link>
                  <Button className="btn-warning text-white btn-sm mb-1">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </DefaultLayout>
  );
};

export default FasilityPage;

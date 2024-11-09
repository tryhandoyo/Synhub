import DefaultLayout from "../../../components/Dashboard/DefaultLayout";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import Api from "../../../api";
import Cookies from "js-cookie";

const BankPage = () => {
  const [bayar, setBayar] = useState([]);
  const token = Cookies.get('token');

  const getDataBayar = async () => {
    await Api.get("/dashboard/bayar", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  useEffect(() => {
    getDataBayar();
  }, []);

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Pembayaran</h3>
        <Link to="/admin/bank/new" className="btn btn-teal">
          Tambah
        </Link>
      </div>
      <div className="bg-white border rounded p-3">
        <Table bordered>
          <thead className="table-light border">
            <tr>
              <th>No</th>
              <th>Logo</th>
              <th>Nama Pembayaran</th>
              <th>No. Rekening</th>
              <th>Pemilik Rekening</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Loading...</td>
              <td>Loading...</td>
              <td>Loading...</td>
              <td>Loading...</td>
              <td>Loading...</td>
              <td>
                <Link
                  to="/admin/bank/:id"
                  className="btn btn-info text-white btn-sm mb-1 me-1"
                >
                  Edit
                </Link>
                <Button className="btn-warning text-white btn-sm mb-1">
                  Delete
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </DefaultLayout>
  );
};

export default BankPage;

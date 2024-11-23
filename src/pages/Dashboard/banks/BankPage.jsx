import DefaultLayout from "../../../components/Dashboard/DefaultLayout";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { useEffect, useState, } from "react";
import { useNavigate } from "react-router";
import Api from "../../../api";
import Cookies from "js-cookie";
import PaginationComponent from "../PaginationComponent";
import toast from "react-hot-toast";

const BankPage = () => {
  const [bayar, setBayar] = useState([]);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();
  const token = Cookies.get("token");

  const getDataBayar = async (pageNumber) => {
    const page = pageNumber ? pageNumber : currentPage;

    await Api.get(`/dashboard/bayar?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        // console.log(res.data);
        setBayar(res.data.data);
        setCurrentPage(res.data.current_page);
        setPerPage(res.data.per_page);
        setTotal(res.data.total);
      })

      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleDelete = async (id) => {
    await Api.delete(`/dashboard/bayar/${id}`, {
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
          // console.log("1")
          // navigate("/admin/bank");
          getDataBayar();
        }
      })
      .catch((err) => {
        // console.log(err);
        if (err.status == 400) {
          toast.error(err.response.message, {
            duration: 3000,
            position: "top-center",
          });
        }
        if (err.status == 422) {
          setValidation(err.response.data);
        }
      });
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
            {bayar.map((item, index) => (
              <tr key={index}>
                <td>{++index + perPage * (currentPage - 1)}</td>
                <td>
                  <img src={item.logo} width={100} alt="" />
                </td>
                <td>{item.nama_pembayaran}</td>
                <td>{item.nomor_rekening}</td>
                <td>{item.nama_orang}</td>
                <td>
                  <Link
                    to={`/admin/bank/${item.id}`}
                    className="btn btn-info text-white btn-sm mb-1 me-1"
                  >
                    Edit
                  </Link>
                  <Button
                    onClick={() => handleDelete(item.id)}
                    className="btn-warning text-white btn-sm mb-1"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <PaginationComponent
          currentPage={currentPage}
          perPage={perPage}
          total={total}
          onChange={(pageNumber) => getDataBayar(pageNumber)}
          position="end"
        />
      </div>
    </DefaultLayout>
  );
};

export default BankPage;

import DefaultLayout from "../../../components/Dashboard/DefaultLayout";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Api from "../../../api";
import PaginationComponent from "../PaginationComponent";

const BannerPage = () => {
  const [banner, setBanner] = useState([]);
  const [perPage, setPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);

  const token = Cookies.get("token");

  const getDataBanner = async (pageNumber) => {
    const page = pageNumber ? pageNumber : currentPage;

    await Api.get(`/dashboard/banner?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        // console.log(res.data);
        setBanner(res.data.data);
        setCurrentPage(res.data.current_page);
        setPerPage(res.data.per_page);
        setTotal(res.data.total);
      })

      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getDataBanner();
  }, []);

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Banner</h3>
        <Link to="/admin/banner/new" className="btn btn-teal">
          Tambah
        </Link>
      </div>
      <div className="bg-white border rounded p-3">
        <Table bordered>
          <thead className="table-light border">
            <tr>
              <th>No</th>
              <th>Gambar</th>
              <th>Judul</th>
              <th>Sub Judul</th>
              <th>Posisi</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {banner.map((item, index) => (
              <tr key={index}>
                <td>{++index + perPage * (currentPage - 1)}</td>
                <td>
                  <img src={item.foto} width={100} alt="" />
                </td>
                <td>{item.judul}</td>
                <td>{item.subjudul}</td>
                <td>{item.posisi}</td>
                <td>
                  <Link
                    to={`/admin/banner/${item.id}`}
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
        <PaginationComponent
          currentPage={currentPage}
          perPage={perPage}
          total={total}
          onChange={(pageNumber) => getDataBanner(pageNumber)}
          position="end"
        />
      </div>
    </DefaultLayout>
  );
};

export default BannerPage;

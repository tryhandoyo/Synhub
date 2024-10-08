import DefaultLayout from "../../../components/Dashboard/DefaultLayout";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";

const BannerPage = () => {
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>BannerPage</h3>
        <Link to="/admin/banner/new" className="btn btn-teal">
          Add New
        </Link>
      </div>
      <div className="bg-white border rounded p-3">
        <Table bordered>
          <thead className="table-light border">
            <tr>
              <th>No</th>
              <th>Gambar</th>
              <th>Keterangan</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Loading...</td>
              <td>Loading...</td>
              <td>Loading...</td>
              <td>
                <Link
                  to="/admin/banner/:id"
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

export default BannerPage;

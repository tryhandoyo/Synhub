import DefaultLayout from "../../../components/Dashboard/DefaultLayout";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";

const FasilityPage = () => {
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>FacilityPage</h3>
        <Link to="/admin/facility/new" className="btn btn-teal">
          Add New
        </Link>
      </div>
      <div className="bg-white border rounded p-3">
        <Table bordered>
          <thead className="table-light border">
            <tr>
              <th>No</th>
              <th>Nama Fasilitas</th>
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
          </tbody>
        </Table>
      </div>
    </DefaultLayout>
  )
}

export default FasilityPage
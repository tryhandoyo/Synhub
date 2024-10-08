import { useNavigate } from "react-router";
import DefaultLayout from "../../../components/Dashboard/DefaultLayout";
import { Card, Button, Form} from "react-bootstrap"

const EditUserPage = () => {
  const navigate = useNavigate ();

    return (
    <DefaultLayout>
      <h3>Edit User</h3>
      <Card className="p-3">
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Masukkan Nama" />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Masukkan Email" />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="number" placeholder="Masukkan Nomor Telepon" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Role</Form.Label>
            <Form.Control type="text" placeholder="Masukkan Role" />
          </Form.Group>

          <Button
            type="submit"
            className="btn btn-info text-white btn-sm mt-3 me-2"
          >
            Save
          </Button>
          <Button
            className="btn-warning text-white btn-sm mt-3"
            onClick={() => navigate("/admin/user")}
          >
            Close
          </Button>
        </Form>
      </Card>
    </DefaultLayout>
  );
};

export default EditUserPage;

import { Card, Button, Form } from "react-bootstrap";
import DefaultLayout from "../../../components/Dashboard/DefaultLayout";
import { useNavigate } from "react-router";

const CreateBankPage = () => {
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <h3>New Bank</h3>
      <Card className="p-3">
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Upload Foto</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Nama Bank</Form.Label>
            <Form.Control type="text" placeholder="Masukkan Nama Bank" />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Nomor Rekening</Form.Label>
            <Form.Control type="number" placeholder="Masukkan Nomor Rekening Bank" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Nama Pemilik Bank</Form.Label>
            <Form.Control type="text" placeholder="Masukkan Nama Pemilik Bank" />
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

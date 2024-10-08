import DefaultLayout from "../../../components/Dashboard/DefaultLayout";
import { Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const EditBannerPage = () => {
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <h3>Edit Banner</h3>
      <Card className="p-3">
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Upload Foto</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Keterangan</Form.Label>
            <Form.Control as="textarea" rows={3} name="deskripsi" />
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

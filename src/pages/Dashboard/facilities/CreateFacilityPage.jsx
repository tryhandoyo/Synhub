import { useNavigate } from "react-router";
import DefaultLayout from "../../../components/Dashboard/DefaultLayout";
import { Form, Button, Card } from "react-bootstrap";

const CreateFacilityPage = () => {
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <h3>New Facility</h3>
      <Card className="p-3">
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Nama Fasilitas</Form.Label>
            <Form.Control type="text" />
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
            onClick={() => navigate("/admin/facility")}
          >
            Close
          </Button>
        </Form>
      </Card>
    </DefaultLayout>
  );
};

export default CreateFacilityPage;

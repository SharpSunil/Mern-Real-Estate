import React from "react";
import './addproperty.scss'
import {
  Form,
  Input,
  InputNumber,
  Select,
  Checkbox,
  Upload,
  Button,
  Card,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const AddProperty = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <>
      <h2 style={{ marginBottom: 20 }}>Add Property</h2>
      <div className="add-property-form">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >

          {/* ================= Basic Information ================= */}

          <Card title="Basic Information" style={{ marginBottom: 20 }}>
            <Row gutter={20}>
              <Col span={24}>
                <Form.Item
                  label="Property Title"
                  name="title"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Enter property title" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[{ required: true }]}
                >
                  <TextArea rows={5} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Property Type"
                  name="propertyType"
                >
                  <Select
                    options={[
                      { label: "Flat", value: "flat" },
                      { label: "Apartment", value: "apartment" },
                      { label: "Villa", value: "villa" },
                      { label: "House", value: "house" },
                      { label: "Studio", value: "studio" },
                      { label: "Penthouse", value: "penthouse" },
                      { label: "Bungalow", value: "bungalow" },
                      { label: "Duplex", value: "duplex" },
                      { label: "Loft", value: "loft" },
                      { label: "Cottage", value: "cottage" },
                      { label: "Farmhouse", value: "farmhouse" },
                      { label: "Townhouse", value: "townhouse" },
                      { label: "Condo", value: "condo" },
                      { label: "Land", value: "land" },
                      { label: "Commercial", value: "commercial" },
                      { label: "Industrial", value: "industrial" },
                      { label: "Mixed Use", value: "mixed-use" },
                      { label: "Office", value: "office" },
                      { label: "Shop", value: "shop" },
                      { label: "Warehouse", value: "warehouse" },
                      { label: "Other", value: "other" },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Status"
                  name="status"
                >
                  <Select
                    options={[
                      {
                        label: "Available",
                        value: "available",
                      },
                      {
                        label: "Sold",
                        value: "sold",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          {/* ================= Price & Location ================= */}

          <Card title="Price & Location" style={{ marginBottom: 20 }}>
            <Row gutter={20}>
              <Col span={8}>
                <Form.Item
                  label="Price"
                  name="price"
                >
                  <InputNumber
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label="City"
                  name="city"
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label="Area"
                  name="area"
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label="Pincode"
                  name="pincode"
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          {/* ================= Property Details ================= */}

          <Card title="Property Details" style={{ marginBottom: 20 }}>
            <Row gutter={20}>
              <Col span={6}>
                <Form.Item
                  label="BHK"
                  name="bhk"
                >
                  <Select
                    options={[
                      { label: "1 BHK", value: "1" },
                      { label: "2 BHK", value: "2" },
                      { label: "3 BHK", value: "3" },
                      { label: "4 BHK", value: "4" },
                      { label: "5 BHK", value: "5" },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  label="Bathrooms"
                  name="bathrooms"
                >
                  <InputNumber
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  label="Area Size"
                  name="areaSize"
                >
                  <InputNumber
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  label="Furnishing"
                  name="furnishing"
                >
                  <Select
                    options={[
                      {
                        label: "Unfurnished",
                        value: "unfurnished",
                      },
                      {
                        label: "Semi Furnished",
                        value: "semi-furnished",
                      },
                      {
                        label: "Fully Furnished",
                        value: "fully-furnished",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          {/* ================= Amenities ================= */}

          <Card title="Amenities" style={{ marginBottom: 20 }}>
            <Form.Item name="amenities">
              <Checkbox.Group>
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Checkbox value="Garden">
                      Garden
                    </Checkbox>
                  </Col>

                  <Col span={8}>
                    <Checkbox value="Swimming Pool">
                      Swimming Pool
                    </Checkbox>
                  </Col>

                  <Col span={8}>
                    <Checkbox value="Parking">
                      Parking
                    </Checkbox>
                  </Col>

                  <Col span={8}>
                    <Checkbox value="Security">
                      Security
                    </Checkbox>
                  </Col>

                  <Col span={8}>
                    <Checkbox value="Power Backup">
                      Power Backup
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </Card>

          {/* ================= Images ================= */}

          <Card title="Property Images" style={{ marginBottom: 20 }}>
            <Form.Item name="images">
              <Upload
                listType="picture-card"
                multiple
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>
                  Upload Images
                </Button>
              </Upload>
            </Form.Item>
          </Card>

          {/* ================= Buttons ================= */}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 15,
            }}
          >
            <Button htmlType="reset">
              Reset
            </Button>

            <Button
              htmlType="submit"
              style={{
                background: "var(--accent)",
                borderColor: "var(--accent)",
                color: "#fff",
              }}
            >
              Add Property
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddProperty;
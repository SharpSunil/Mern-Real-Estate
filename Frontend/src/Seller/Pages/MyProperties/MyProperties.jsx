import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  Table,
  Tag,
  Button,
  Image,
  Popconfirm,
  message,
  Drawer,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Space,
  Card,
  Typography,
  Descriptions,
} from "antd";

import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import API_URL from "../../../Config";

const { TextArea } = Input;

const MyProperties = () => {

  const token = localStorage.getItem("token");

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(true);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [selectedProperty, setSelectedProperty] = useState(null);

  const [properties, setProperties] = useState([]);

  //=========================================
  // Fetch Properties
  //=========================================

  const fetchProperties = async () => {

    try {

      setLoading(true);

      const res = await axios.get(

        `${API_URL}/api/property/my`,

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );

      setProperties(res.data.properties);

    }

    catch (error) {

      console.log(error);

      message.error("Unable to fetch properties.");

    }

    finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchProperties();

  }, []);

  //=========================================
  // View Property
  //=========================================

  const handleView = (record) => {

    setSelectedProperty(record);

    form.setFieldsValue(record);

    setEditMode(false);

    setDrawerOpen(true);

  };

  //=========================================
  // Edit Property
  //=========================================

  const handleEdit = (record) => {

    setSelectedProperty(record);

    form.setFieldsValue(record);

    setEditMode(true);

    setDrawerOpen(true);

  };

  //=========================================
  // Delete Property
  //=========================================

  const handleDelete = async (record) => {

    try {

      await axios.delete(

        `${API_URL}/api/property/${record._id}`,

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );

      message.success("Property deleted successfully.");

      fetchProperties();

    }

    catch (error) {

      console.log(error);

      message.error("Unable to delete property.");

    }

  };

  //=========================================
  // Update Property
  //=========================================

  const handleSave = async () => {

    try {

      const values = await form.validateFields();

      const formData = new FormData();

      Object.keys(values).forEach((key) => {

        if (

          key !== "images"

          &&

          values[key] !== undefined

        ) {

          formData.append(

            key,

            values[key]

          );

        }

      });

      if (values.images) {

        values.images.forEach((file) => {

          formData.append(

            "images",

            file.originFileObj

          );

        });

      }

      await axios.put(

        `${API_URL}/api/property/${selectedProperty._id}`,

        formData,

        {

          headers: {

            Authorization: `Bearer ${token}`,

            "Content-Type": "multipart/form-data",

          },

        }

      );

      message.success(

        "Property updated successfully."

      );

      fetchProperties();

      setDrawerOpen(false);

      setEditMode(false);

    }

    catch (error) {

      console.log(error);

      message.error("Unable to update property.");

    }

  };
  //=========================================
  // Table Columns
  //=========================================

  const columns = [

    {

      title: "#",

      width: 60,

      render: (_, __, index) => index + 1,

    },

    {

      title: "Image",

      dataIndex: "images",

      width: 110,

      render: (images) => (

        <Image

          src={
            images?.length > 0
              ? images[0].url
              : "https://placehold.co/100x70?text=No+Image"
          }

          width={80}

          height={60}

          preview={false}

          style={{

            objectFit: "cover",

            borderRadius: 8,

          }}

        />

      ),

    },

    {

      title: "Property",

      dataIndex: "title",

      sorter: (a, b) =>

        a.title.localeCompare(b.title),

    },

    {

      title: "City",

      dataIndex: "city",

      sorter: (a, b) =>

        a.city.localeCompare(b.city),

    },

    {

      title: "Price",

      dataIndex: "price",

      render: (price) =>

        `₹ ${price.toLocaleString("en-IN")}`,

    },

    {

      title: "Status",

      dataIndex: "status",

      render: (status) => (

        <Tag

          color={
            status === "available"
              ? "green"
              : "red"
          }

        >

          {status.toUpperCase()}

        </Tag>

      ),

    },

    {

      title: "Created",

      dataIndex: "createdAt",

      render: (date) =>

        new Date(date).toLocaleDateString(

          "en-IN",

          {

            day: "2-digit",

            month: "short",

            year: "numeric",

          }

        ),

    },

    {

      title: "Actions",

      width: 180,

      render: (_, record) => (

        <Space>

          <Button

            type="primary"

            shape="circle"

            icon={<EyeOutlined />}

            onClick={() =>

              handleView(record)

            }

          />

          <Button

            shape="circle"

            icon={<EditOutlined />}

            onClick={() =>

              handleEdit(record)

            }

          />

          <Popconfirm

            title="Delete Property"

            description="Are you sure?"

            okText="Yes"

            cancelText="No"

            okType="danger"

            onConfirm={() =>

              handleDelete(record)

            }

          >

            <Button

              danger

              shape="circle"

              icon={<DeleteOutlined />}

            />

          </Popconfirm>

        </Space>

      ),

    },

  ];

  return (

    <>

      <h2

        style={{

          marginBottom: 20,

        }}

      >

        My Properties

      </h2>

      <Table

        bordered

        loading={loading}

        columns={columns}

        dataSource={properties}

        rowKey="_id"

        pagination={{

          pageSize: 10,

        }}

      />

      <Drawer

        title={

          editMode

            ? "Edit Property"

            : "Property Details"

        }

        open={drawerOpen}

        width={700}

        onClose={() => {

          setDrawerOpen(false);

          setEditMode(false);

        }}

      >

        {!selectedProperty && (

          <p>

            No Property Selected

          </p>

        )}

        {selectedProperty && (

          <>
            {/* ==============================
                            Property Images
                        ============================== */}

            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                marginBottom: 20,
              }}
            >

              {selectedProperty.images?.length > 0 ? (

                selectedProperty.images.map((img) => (

                  <Image
                    key={img._id}
                    src={img.url}
                    width={120}
                    height={90}
                    style={{
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />

                ))

              ) : (

                <Image
                  src="https://placehold.co/120x90?text=No+Image"
                  width={120}
                  height={90}
                />

              )}

            </div>

            {/* ==============================
                            VIEW MODE
                        ============================== */}

            {!editMode && (

              <Card>

                <Typography.Title level={3}>

                  {selectedProperty.title}

                </Typography.Title>

                <Tag
                  color={
                    selectedProperty.status === "available"
                      ? "green"
                      : "red"
                  }
                >

                  {selectedProperty.status.toUpperCase()}

                </Tag>

                <Descriptions
                  bordered
                  column={1}
                  style={{
                    marginTop: 20,
                  }}
                >

                  <Descriptions.Item label="City">

                    {selectedProperty.city}

                  </Descriptions.Item>

                  <Descriptions.Item label="Area">

                    {selectedProperty.area}

                  </Descriptions.Item>

                  <Descriptions.Item label="Pincode">

                    {selectedProperty.pincode}

                  </Descriptions.Item>

                  <Descriptions.Item label="Property Type">

                    {selectedProperty.propertyType}

                  </Descriptions.Item>

                  <Descriptions.Item label="BHK">

                    {selectedProperty.bhk}

                  </Descriptions.Item>

                  <Descriptions.Item label="Bathrooms">

                    {selectedProperty.bathrooms}

                  </Descriptions.Item>

                  <Descriptions.Item label="Area Size">

                    {selectedProperty.areaSize}

                  </Descriptions.Item>

                  <Descriptions.Item label="Furnishing">

                    {selectedProperty.furnishing}

                  </Descriptions.Item>

                  <Descriptions.Item label="Price">

                    ₹ {selectedProperty.price?.toLocaleString("en-IN")}

                  </Descriptions.Item>

                  <Descriptions.Item label="Amenities">

                    {selectedProperty.amenities?.join(", ")}

                  </Descriptions.Item>

                  <Descriptions.Item label="Description">

                    {selectedProperty.description}

                  </Descriptions.Item>

                </Descriptions>

                <Button

                  type="primary"

                  size="large"

                  block

                  icon={<EditOutlined />}

                  style={{
                    marginTop: 20,
                  }}

                  onClick={() =>
                    setEditMode(true)
                  }

                >

                  Edit Property

                </Button>

              </Card>

            )}
            {/* ==============================
                            EDIT MODE
                        ============================== */}

            {editMode && (

              <Form
                form={form}
                layout="vertical"
              >

                <Form.Item
                  label="Property Title"
                  name="title"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Description"
                  name="description"
                >
                  <TextArea rows={4} />
                </Form.Item>

                <Form.Item
                  label="Price"
                  name="price"
                >
                  <InputNumber
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label="City"
                  name="city"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Area"
                  name="area"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Pincode"
                  name="pincode"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Property Type"
                  name="propertyType"
                >
                  <Select>

                    <Select.Option value="flat">
                      Flat
                    </Select.Option>

                    <Select.Option value="apartment">
                      Apartment
                    </Select.Option>

                    <Select.Option value="villa">
                      Villa
                    </Select.Option>

                    <Select.Option value="house">
                      House
                    </Select.Option>

                  </Select>
                </Form.Item>

                <Form.Item
                  label="Status"
                  name="status"
                >
                  <Select>

                    <Select.Option value="available">
                      Available
                    </Select.Option>

                    <Select.Option value="sold">
                      Sold
                    </Select.Option>

                  </Select>
                </Form.Item>

                <Form.Item
                  label="Property Images"
                  name="images"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => {

                    if (Array.isArray(e)) {

                      return e;

                    }

                    return e?.fileList;

                  }}
                >

                  <Upload
                    multiple
                    beforeUpload={() => false}
                    listType="picture-card"
                  >

                    <Button
                      icon={<UploadOutlined />}
                    >

                      Upload Images

                    </Button>

                  </Upload>

                </Form.Item>

                <Space
                  style={{
                    width: "100%",
                    justifyContent: "flex-end",
                  }}
                >

                  <Button

                    onClick={() => {

                      setEditMode(false);

                    }}

                  >

                    Cancel

                  </Button>

                  <Button

                    type="primary"

                    onClick={handleSave}

                  >

                    Save Changes

                  </Button>

                </Space>

              </Form>

            )}

          </>

        )}

      </Drawer>

    </>

  );

};

export default MyProperties;

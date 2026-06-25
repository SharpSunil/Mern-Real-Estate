import React, { useState } from "react";
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
} from "antd";
import {
  Card,
  Typography,
  Divider,
  Descriptions,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

const MyProperties = () => {
  // ==============================
  // Form Instance
  // ==============================
  const [form] = Form.useForm();

  // ==============================
  // Drawer State
  // ==============================
  const [drawerOpen, setDrawerOpen] = useState(false);

  // ==============================
  // View or Edit Mode
  // false = View
  // true = Edit
  // ==============================
  const [editMode, setEditMode] = useState(false);

  // ==============================
  // Selected Property
  // ==============================
  const [selectedProperty, setSelectedProperty] = useState(null);

  // ==============================
  // Property Data
  // ==============================
  const [properties, setProperties] = useState([
    {
      _id: "1",
      image: "https://picsum.photos/300/200?random=1",
      title: "Luxury Villa",
      city: "Pune",
      price: 18000000,
      status: "available",
      description: "Beautiful luxury villa with swimming pool.",
      createdAt: "2026-06-24T10:30:00.000Z",
    },
    {
      _id: "2",
      image: "https://picsum.photos/300/200?random=2",
      title: "Penthouse",
      city: "Mumbai",
      price: 35000000,
      status: "available",
      description: "Premium sea-facing penthouse.",
      createdAt: "2026-06-20T08:15:00.000Z",
    },
    {
      _id: "3",
      image: "https://picsum.photos/300/200?random=3",
      title: "2 BHK Flat",
      city: "Nashik",
      price: 5500000,
      status: "sold",
      description: "Affordable family apartment.",
      createdAt: "2026-06-15T14:45:00.000Z",
    },
  ]);

  // ==============================
  // Open Drawer
  // ==============================
  const handleView = (record) => {
    setSelectedProperty(record);

    form.setFieldsValue(record);

    setEditMode(false);

    setDrawerOpen(true);
  };

  // ==============================
  // Edit Directly From Table
  // ==============================
  const handleEdit = (record) => {
    setSelectedProperty(record);

    form.setFieldsValue(record);

    setEditMode(true);

    setDrawerOpen(true);
  };

  // ==============================
  // Delete Property
  // ==============================
  const handleDelete = (record) => {
    const updated = properties.filter(
      (item) => item._id !== record._id
    );

    setProperties(updated);

    message.success("Property deleted successfully.");
  };

  // ==============================
  // Save Property
  // ==============================
  const handleSave = async () => {
    const values = await form.validateFields();

    const updated = properties.map((item) =>
      item._id === selectedProperty._id
        ? { ...item, ...values }
        : item
    );

    setProperties(updated);

    message.success("Property updated successfully.");

    setDrawerOpen(false);

    setEditMode(false);
  };

  // ==============================
  // Table Columns
  // ==============================
  const columns = [
    {
      title: "ID",
      width: 70,
      render: (_, __, index) => index + 1,
    },

    {
      title: "Image",
      dataIndex: "image",
      width: 90,
      render: (image) => (
        <Image
          src={image}
          width={70}
          height={50}
          preview={false}
          style={{
            objectFit: "cover",
            borderRadius: 6,
          }}
        />
      ),
    },

    {
      title: "Property Name",
      dataIndex: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },

    {
      title: "City",
      dataIndex: "city",
      sorter: (a, b) => a.city.localeCompare(b.city),
    },

    {
      title: "Price",
      dataIndex: "price",
      render: (price) => `₹${price.toLocaleString("en-IN")}`,
      sorter: (a, b) => a.price - b.price,
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === "available" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },

    {
      title: "Created",
      dataIndex: "createdAt",
      render: (date) =>
        new Date(date).toLocaleDateString("en-IN"),
    },

    {
      title: "Actions",
      width: 170,

      render: (_, record) => (
        <Space>

          {/* View Button */}
          <Button
            type="primary"
            shape="circle"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          />

          {/* Edit Button */}
          <Button
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />

          {/* Delete Button */}
          <Popconfirm
            title="Delete Property"
            description="Are you sure you want to delete this property?"
            okText="Yes"
            cancelText="No"
            okType="danger"
            onConfirm={() => handleDelete(record)}
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
      <h2 style={{ marginBottom: 20 }}>
        My Properties
      </h2>

      <Table
        bordered
        columns={columns}
        dataSource={properties}
        rowKey="_id"
        pagination={{
          pageSize: 10,
        }}
      />

      {/* ======================================
    Property Details Drawer
====================================== */}

      <Drawer
        title={editMode ? "Edit Property" : "Property Details"}
        open={drawerOpen}
        width={550}
        onClose={() => {
          setDrawerOpen(false);
          setEditMode(false);
        }}
      >

        {/* If no property selected */}
        {!selectedProperty && <p>No Property Selected.</p>}

        {/* Property Details */}
        {selectedProperty && (

          <>

            {/* ===========================
          Property Image
      =========================== */}

            <Image
              src={selectedProperty.image}
              width="100%"
              height={250}
              style={{
                objectFit: "cover",
                borderRadius: 10,
                marginBottom: 20,
              }}
            />

            {/* ===========================
          VIEW MODE
      =========================== */}

            {!editMode && (
              <Card bordered={false}>
                <Typography.Title level={3} style={{ marginBottom: 10 }}>
                  {selectedProperty.title}
                </Typography.Title>

                <Tag
                  color={selectedProperty.status === "available" ? "green" : "red"}
                  style={{ marginBottom: 20 }}
                >
                  {selectedProperty.status.toUpperCase()}
                </Tag>

                <Descriptions column={1} bordered size="small">
                  <Descriptions.Item label="City">
                    {selectedProperty.city}
                  </Descriptions.Item>

                  <Descriptions.Item label="Price">
                    ₹{selectedProperty.price.toLocaleString("en-IN")}
                  </Descriptions.Item>

                  <Descriptions.Item label="Created">
                    {new Date(selectedProperty.createdAt).toLocaleDateString("en-IN")}
                  </Descriptions.Item>

                  <Descriptions.Item label="Description">
                    {selectedProperty.description}
                  </Descriptions.Item>
                </Descriptions>

                <Button
                  type="primary"
                  block
                  size="large"
                  icon={<EditOutlined />}
                  style={{ marginTop: 20 }}
                  onClick={() => setEditMode(true)}
                >
                  Edit Property
                </Button>
              </Card>
            )}

            {/* ===========================
          EDIT MODE
      =========================== */}

            {editMode && (

              <Form
                form={form}
                layout="vertical"
              >

                <Form.Item
                  label="Property Name"
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
                  label="City"
                  name="city"
                >
                  <Input />
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
                  label="Description"
                  name="description"
                >
                  <TextArea rows={5} />
                </Form.Item>

                {/* Upload */}

                <Form.Item label="Property Image">

                  <Upload
                    beforeUpload={() => false}
                    maxCount={1}
                  >
                    <Button
                      icon={<UploadOutlined />}
                    >
                      Upload Image
                    </Button>
                  </Upload>

                </Form.Item>

                <Space
                  style={{
                    width: "100%",
                    justifyContent: "end",
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
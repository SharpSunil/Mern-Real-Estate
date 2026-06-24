const MyProperties = () => {
  return (
    <>
      <h2>My Properties</h2>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default MyProperties;
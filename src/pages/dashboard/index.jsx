import { useGetUserQuery } from "../../services/apis/authApi";
const Dashboard = () => {
  const { data, isLoading } = useGetUserQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Dashboard
      <p>
        {data?.data?.name} - {data?.data?.email}
      </p>
    </div>
  );
};
export default Dashboard;

import ContentLayout from "../../components/layout/ContentLayout";

import { useGetUserQuery } from "../../services/apis/authApi";
const Home = () => {
  const { data: user, isLoading } = useGetUserQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ContentLayout>
      <div className="">
        <h1>COMING SOON</h1>
        <p>Ini halaman Home</p>
        <p>{user?.data?.name}</p>
        <p>{user?.data?.email}</p>
        <p>{user?.data?.role}</p>
      </div>
    </ContentLayout>
  );
};
export default Home;

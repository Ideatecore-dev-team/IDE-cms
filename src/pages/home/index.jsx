import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import Chart from "react-apexcharts";

import ContentLayout from "../../components/layout/ContentLayout";

import { useGetUserQuery } from "../../services/apis/authApi";
import { useGetAllMetricQuery } from "../../services/apis/metricVisitorApi";

const Home = () => {
  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useGetUserQuery();
  const {
    data: dataMetric,
    isLoading: isLoadingMetric,
    isError: isErrorMetric,
  } = useGetAllMetricQuery();

  // Show a spinner if either query is loading
  if (isLoadingUser || isLoadingMetric) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  // Show error message if any query fails
  if (isErrorUser || isErrorMetric) {
    return <div>Error loading data.</div>;
  }

  // Prepare chart configuration if metric data is available
  let chartOptions = {};
  let chartSeries = [];

  if (dataMetric && dataMetric.dailyMetrics30Days) {
    // Sort the daily metrics by date (ascending)
    const dailyMetrics = [...dataMetric.dailyMetrics30Days].sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    );

    // Extract chart categories and data
    const dates = dailyMetrics.map((item) => item.date);
    const totalRequestsData = dailyMetrics.map((item) => item.totalRequests);
    const uniqueVisitorsData = dailyMetrics.map(
      (item) => item.totalUniqueVisitors,
    );

    chartOptions = {
      chart: {
        type: "area",
        height: 350,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth", // Spline (smooth) curve
      },
      xaxis: {
        categories: dates,
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Count",
        },
      },
      tooltip: {
        x: {
          format: "yyyy-MM-dd",
        },
      },
    };

    chartSeries = [
      {
        name: "Total Requests",
        data: totalRequestsData,
      },
      {
        name: "Unique Visitors",
        data: uniqueVisitorsData,
      },
    ];
  }

  return (
    <ContentLayout>
      <Container className="py-4">
        <Row className="mb-4">
          <Col>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Welcome To Content Management System</Card.Title>
                <Card.Body>
                  <h3>{user?.data?.name}</h3>
                  <h5>{user?.data?.email}</h5>
                  <h6>{user?.data?.role}</h6>
                </Card.Body>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {dataMetric && (
          <Row className="mb-4">
            <Col md={6} sm={12} className="mb-3">
              <Card bg="success" text="white">
                <Card.Body>
                  <Card.Title className="text-center fs-3 fw-bold">
                    Total Unique Visitor
                  </Card.Title>
                  <Card.Text className="text-center fs-3 fw-bold">
                    {dataMetric.totalUniqueVisitorsToday}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} sm={12}>
              <Card bg="info" text="white">
                <Card.Body>
                  <Card.Title className="text-center fs-3 fw-bold">
                    Total Request
                  </Card.Title>
                  <Card.Text className="text-center fs-3 fw-bold">
                    {dataMetric.totalRequestsToday}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        <Row>
          <Col>
            {dataMetric && dataMetric.dailyMetrics30Days && (
              <Card>
                <Card.Body>
                  <Card.Title className="text-center fs-3 fw-bold mb-4">
                    Daily Metrics (Last 30 Days)
                  </Card.Title>
                  <Chart
                    options={chartOptions}
                    series={chartSeries}
                    type="area"
                    height={350}
                  />
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </ContentLayout>
  );
};

export default Home;

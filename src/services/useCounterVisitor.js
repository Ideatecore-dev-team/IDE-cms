// import { useEffect } from "react";

// const useCounterVisitor = () => {
//   useEffect(() => {
//     const fetchIPAndSend = async () => {
//       try {
//         // Fetch public IP
//         const response = await fetch("https://api64.ipify.org?format=json");
//         const data = await response.json();
//         const ip = data.ip;
//         const userInfo = localStorage.getItem("userInfo");
//         if (!userInfo) return;
//         const { token } = JSON.parse(userInfo);
//         if (!token) return;

//         // Send IP to backend
//         // await fetch("https://server-ideindonesia.ideatecore.com/metric/visit", {
//         await fetch("http://localhost:3001/metric/visit", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ ip }),
//         });
//       } catch (error) {
//         console.error("Error tracking IP:", error);
//       }
//     };

//     fetchIPAndSend();
//   }, []);
// };

// export default useCounterVisitor;

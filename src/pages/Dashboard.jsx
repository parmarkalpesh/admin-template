import React from "react";
import Sidebar from "../componants/Sidebar";
function Dashboard() {
  const items = [
    {
      icon: "/public/icon .png",
      name: "Dashboard",
    },
    {
      icon: "/public/icon .png",
      name: "Home",
    },
    {
      icon: "/public/icon .png",
      name: "Data",
    },
    {
      icon: "/public/icon .png",
      name: "Setting",
    },
    {
      icon: "/public/icon .png",
      name: "Logout",
    },
  ];
  return (
    <>
      <div className="bg-[#E1D9D1] min-h-svh w-60">
        <div className=" flex justify-center items-center font-bold py-3">
          Aptivion Technology
        </div>
        <div className="flex flex-col h-8 w-8 mx-2 gap-5 py-5">
          {items.map((data, index) => (
            <img key={index} src={data.icon} alt="icon" />
          ))}
          {items.map((namedata, index) => {
            <button className="text-black">
              <h1>{namedata.name}</h1>
            </button>;
          })}
        </div>
        
      </div>
    </>
  );
}
export default Dashboard;

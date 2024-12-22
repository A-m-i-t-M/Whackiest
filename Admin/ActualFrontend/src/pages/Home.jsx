import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import images from "../assets/bg_new.jpg";

export default function Home() {
  const [purohit, setPurohit] = useState({ name: "", price: "" });
  const [item, setItem] = useState({ name: "", price: "" });
  const [service, setService] = useState({ name: "", price: "" });
  const [liveStreamLink, setLiveStreamLink] = useState({ link: "" });
  const [isLinkSubmitted, setIsLinkSubmitted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLiveStreamLink = async () => {
      try {
        const res = await fetch("backend/livestream/admin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        if (data.live[0].link) {
          setLiveStreamLink({ link: data.live[0].link });
          setIsLinkSubmitted(true);
        }
      } catch (error) {
        console.log("We messed up");
      }
    };

    fetchLiveStreamLink();
  }, []);

  const handleChangePurohit = (e) => {
    setPurohit({
      ...purohit,
      [e.target.id]: e.target.value,
    });
  };

  const handleChangeItem = (e) => {
    setItem({
      ...item,
      [e.target.id]: e.target.value,
    });
  };

  const handleChangeService = (e) => {
    setService({
      ...service,
      [e.target.id]: e.target.value,
    });
  };

  const handleChangeLink = (e) => {
    setLiveStreamLink({
      ...liveStreamLink,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmitPurohit = async (e) => {
    try {
      const res = await fetch("/backend/purohit/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purohit),
      });
      const data = await res.json();

      if (data.success === false) {
        console.log("Error hua bc");
        return;
      }
      console.log("Success");
    } catch (error) {
      console.log("Error hua bc");
    }
  };

  const handleSubmitItem = async (e) => {
    try {
      const res = await fetch("/backend/itemm/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      const data = await res.json();

      if (data.success === false) {
        console.log("Error hua bc");
        return;
      }
      console.log("Success");
    } catch (error) {
      console.log("Error hua bc");
    }
  };

  const handleSubmitService = async (e) => {
    try {
      const res = await fetch("/backend/service/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(service),
      });
      const data = await res.json();

      if (data.success === false) {
        console.log("Error hua bc");
        return;
      }
      console.log("Success");
    } catch (error) {
      console.log("Error hua bc");
    }
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch("/backend/auth/signout");
      const data = await res.json();

      if (data.success === false) {
        console.log(data.error);
      }

      console.log("Signed out");
      navigate("/");
    } catch (error) {
      console.log("Couldn't sign out");
    }
  };

  const handleViewBookings = async () => {
    try {
      navigate("/view-admin-bookings");
    } catch (error) {
      console.log("Cant see the bookings macha");
    }
  };

  const handleLinkSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/backend/livestream/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(liveStreamLink),
      });
      const data = await res.json();

      if (data.success === false) {
        console.log("Error hua bc");
        return;
      }
      setIsLinkSubmitted(true);
      console.log("Success");
    } catch (error) {
      console.log("Error hua bc");
    }
  };

  const handleDeleteLink = async () => {
    try {
      const res = await fetch("/backend/livestream/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete item");
      }
      setLiveStreamLink({ link: "" });
      setIsLinkSubmitted(false);
    } catch (error) {
      console.log("was not able to delete macha");
    }
  };

  const handleFAQ = async()=>{
    try{
      navigate("/admin-ques");
    }catch(error){
      console.log("Couldnt go to admin questions");
      
    }
  }

  return (
    <div
      style={{
        backgroundImage: `url(${images})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div className=" bg-neutral-200 bg-opacity-80 mx-auto p-4 rounded-xl shadow-lg w-full max-w-4xl dark:bg-gray-900">
        <div className="flex flex-row items-center align-middle">
          <h1 className="text-center font-bold uppercase text-2xl mb-5 dark:text-purple-300">
            Current Temple
          </h1>
          <button className='border border-yellow-400 py-2 px-4 rounded-lg h-12 ml-56 mb-10 dark:bg-neutral-300' onClick={handleFAQ}>FAQs</button>
        </div>
        

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
          <div className="border border-gray-900 rounded-xl dark:bg-slate-500 bg-slate-200 p-4">
            <h3 className="text-center uppercase font-semibold dark:text-white text-orange-400">
              Add Purohits
            </h3>
            <form className="my-5" onSubmit={handleSubmitPurohit}>
              <div className="flex flex-col justify-center gap-5">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Purohit Name"
                  className="border p-3 rounded-xl text-gray-600"
                  onChange={handleChangePurohit}
                />
                <input
                  type="text"
                  name="price"
                  id="price"
                  placeholder="Hourly Charge"
                  className="border p-3 rounded-xl text-gray-600"
                  onChange={handleChangePurohit}
                />
                <button className="border rounded-xl dark:bg-slate-700 bg-slate-400 w-40 self-center dark:text-white text-black py-2 border-black">
                  Add Purohit
                </button>
              </div>
            </form>
          </div>

          <div className="border border-gray-900 rounded-xl dark:bg-slate-500 bg-slate-200 p-4">
            <h3 className="text-center uppercase font-semibold dark:text-white text-orange-400">Add Items</h3>
            <form className="my-5" onSubmit={handleSubmitItem}>
              <div className="flex flex-col justify-center gap-5">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Item Name"
                  className="border p-3 rounded-xl text-gray-600"
                  onChange={handleChangeItem}
                />
                <input
                  type="text"
                  name="price"
                  id="price"
                  placeholder="Item Price"
                  className="border p-3 rounded-xl text-gray-600"
                  onChange={handleChangeItem}
                />
                <button className="border rounded-xl dark:bg-slate-700 bg-slate-400 w-40 self-center dark:text-white text-black py-2 border-black">
                  Add Item
                </button>
              </div>
            </form>
          </div>

          <div className="border border-gray-900 rounded-xl dark:bg-slate-500 bg-slate-200 p-4">
            <h3 className="text-center uppercase font-semibold dark:text-white text-orange-400">
              Add Services
            </h3>
            <form className="my-5" onSubmit={handleSubmitService}>
              <div className="flex flex-col justify-center gap-5">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Service Name"
                  className="border p-3 rounded-xl text-gray-600"
                  onChange={handleChangeService}
                />
                <input
                  type="text"
                  name="price"
                  id="price"
                  placeholder="Service Price"
                  className="border p-3 rounded-xl text-gray-600"
                  onChange={handleChangeService}
                />
                <button className="border rounded-xl dark:bg-slate-700 bg-slate-400 w-40 self-center dark:text-white text-black py-2 border-black">
                  Add Service
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="w-full border border-gray-900 rounded-xl dark:bg-slate-500 bg-slate-200 p-4 mb-5">
          <h3 className="text-left uppercase font-semibold dark:text-white text-orange-400">
            Add Live Stream Link
          </h3>
          {!isLinkSubmitted ? (
            <div className="flex gap-4 justify-between mt-1 align-middle">
              <input
                type="text"
                name="link"
                id="link"
                placeholder="Live Stream Link"
                className="w-3/4 rounded-xl p-3 mt-1 border "
                onChange={handleChangeLink}
              />
              <button
                type="button"
                onClick={handleLinkSubmit}
                className="border rounded-xl bg-slate-700 self-center text-white py-2 px-6"
              >
                Submit
              </button>
            </div>
          ) : (
            <div className="flex gap-4 justify-between mt-1 align-middle">
              <span className="w-3/4 p-3 mt-1 text-black border rounded-xl dark:border-purple-300 dark:bg-white dark:text-black border-black bg-slate-400">
                {liveStreamLink.link}
              </span>
              <button
                type="button"
                onClick={handleDeleteLink}
                className="border rounded-xl bg-red-700 self-center text-white py-2 px-6 border-red-700"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Updated buttons section */}
        {/* Updated buttons section */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-5">
          <Link to={"/review"} className="w-full sm:w-auto">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-700 w-full sm:w-auto">
              View Details
            </button>
          </Link>
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-700 w-full sm:w-auto"
            onClick={handleViewBookings}
          >
            Bookings
          </button>
          <button
            className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-700 w-full sm:w-auto"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

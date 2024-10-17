import { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import PrintIcon from "@mui/icons-material/Print";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

function Invoice() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [bookings, setBookings] = useState(null);
  console.log(bookings);

  const [loading, setLoading] = useState(true);

  // Fetch bookings by id
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}upbookings/${id}`
        );
        setBookings(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [id]);

  // Automatically set price based on room type
  const [unitPrice, setUnitPrice] = useState(0);
  useEffect(() => {
    if (bookings) {
      const { typeroom, checkin, checkout } = bookings; // Destructure typeroom from bookings
      setNumberOfDays(calculateDays(checkin, checkout));
      switch (typeroom) {
        case "Single Bad (Non A/c)":
          setUnitPrice(70);
          break;
        case "Single Bad (A/c)":
          setUnitPrice(110);
          break;
        case "Double Bad (Non A/c)":
          setUnitPrice(140);
          break;
        case "Double Bad (A/c)":
          setUnitPrice(200);
          break;
        case "Dining":
          setUnitPrice(90);
          break;
        case "Hall-1 (300 capacity)":
          setUnitPrice(170000);
          break;
        case "Hall-2 (700 capacity)":
          setUnitPrice(270000);
          break;
        default:
          setUnitPrice(0);
          break;
      }
    }
  }, [bookings]);

  // calculate day
  const [numberOfDays, setNumberOfDays] = useState(0);
  const calculateDays = (checkinDate, checkoutDate) => {
    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);
    const timeDifference = checkout - checkin; // Difference in milliseconds
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  };

  // Calculate total amount
  let totalAmount = 0; // Initialize totalAmount
  if (bookings) {
    totalAmount =
      parseFloat(bookings.price) + 170 * (numberOfDays * bookings.person); // 700 id food charge
  }

  // rederect to the home
  const navigation = useNavigate();
  const handlehome = () => {
    navigation("/");
  };

  // Convert into PDF
  const invoiceRef = useRef();
  const handlePrint = () => {
    html2canvas(invoiceRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); // Set to portrait A4 size
      const imgWidth = 210; // A4 width in mm
      const pageHeight = pdf.internal.pageSize.height; // PDF page height
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate height based on width
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("invoice.pdf");
    });
  };

  // Conditional rendering based on loading and bookings state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!bookings) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">No booking found.</p>
      </div>
    );
  }

  // Render the invoice if bookings data is found
  return (
    <div className="bg-gray-100 py-10 px-4 All-background-img text-black min-h-screen w-screen bg-cover bg-center flex flex-col items-center justify-start relative">
      <div
        ref={invoiceRef}
        className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-10 relative"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            VK Hotel Invoice
          </h1>
          <h2 className="text-xl font-semibold text-gray-600">
            From {bookings.city}
          </h2>
        </div>
        {/* Guest and Hotel Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Guest Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Guest Information
            </h3>
            <p className="text-gray-600">Name: {bookings.name}</p>
            <p className="text-gray-600">
              Check-in: {new Date(bookings.checkin).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              Check-out: {new Date(bookings.checkout).toLocaleDateString()}
            </p>
            <p className="text-gray-600">Room Type: {bookings.typeroom}</p>
          </div>
          {/* Hotel Info */}
          <div className="text-right">
            <h3 className="text-lg font-semibold text-gray-700">
              Hotel Information
            </h3>
            <p className="text-gray-600">VK Hotel,</p>
            <p className="text-gray-600">123 Address,</p>
            <p className="text-gray-600">{bookings.city}, India</p>
            <p className="text-gray-600">Phone: +91 1234567890</p>
          </div>
        </div>
        {/* Invoice Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Invoice Details
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto border-collapse mb-6">
              <thead>
                <tr>
                  <th className="border-b-2 py-2 text-gray-800">Description</th>
                  <th className="border-b-2 py-2 text-gray-800">Unit Price</th>
                  <th className="border-b-2 py-2 text-gray-800">Person</th>
                  <th className="border-b-2 py-2 text-gray-800">Days</th>
                  <th className="border-b-2 py-2 text-gray-800">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 border-b text-gray-600">
                    {bookings.typeroom}
                  </td>
                  <td className="py-3 border-b text-gray-600">₹ {unitPrice}</td>
                  <td className="py-3 border-b text-gray-600">
                    {bookings.person}
                  </td>
                  <td className="py-3 border-b text-gray-600">
                    {numberOfDays}
                  </td>
                  <td className="py-3 border-b text-gray-600">
                    ₹ {bookings.price}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 border-b text-gray-600">
                    Food Charges
                  </td>
                  <td className="py-3 border-b text-gray-600">₹ 170</td>
                  <td className="py-3 border-b text-gray-600">
                    {bookings.person}
                  </td>
                  <td className="py-3 border-b text-gray-600">
                    {numberOfDays}
                  </td>
                  <td className="py-3 border-b text-gray-600">
                    ₹ {170 * (numberOfDays * bookings.person)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Totals */}
        <div className="text-right mb-6">
          <p className="text-gray-600">
            Subtotal: <span className="font-semibold">₹ {totalAmount}</span>
          </p>
          <p className="text-gray-600">
            Tax (18%):{" "}
            <span className="font-semibold">
              ₹ {Math.ceil(totalAmount * 0.18)}
            </span>
          </p>
          <p className="text-gray-800 text-xl font-semibold">
            Total: ₹ {totalAmount + Math.ceil(totalAmount * 0.18)}
          </p>
        </div>
        {/* Footer */}
        <div className="text-center border-t pt-4">
          <p className="text-gray-600">Thank you for choosing VK Hotel!</p>
          <p className="text-gray-600">
            If you have any questions regarding this invoice, please contact us
            at +91 1234567890 or email us at VKHOTEL@gmail.com
          </p>
        </div>
      </div>
      {/* Centered Print button */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          className="bg-blue-600 text-white rounded-full px-6 py-3 text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
          onClick={handlePrint}
        >
          <PrintIcon className="w-6 h-6 inline-block mr-2" /> Download Invoice
        </button>
        <button
          className="bg-green-600 text-white rounded-full px-6 py-3 text-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-lg"
          onClick={handlehome}
        >
          Home
        </button>
      </div>
    </div>
  );
}

export default Invoice;

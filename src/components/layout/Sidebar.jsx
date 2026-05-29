import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { doSignOut } from "../../services/auth";

export default function Sidebar({ page, setPage, onLogout }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const userName =
    currentUser?.user?.displayName ||
    currentUser?.displayName ||
    currentUser?.user?.email ||
    currentUser?.email ||
    "Guest";

  const handleSignOut = async () => {
    try {
      await doSignOut();
      if (typeof onLogout === "function") {
        onLogout();
      }
      navigate("/");
    } catch (error) {
      console.error("Sign-out failed:", error);
    }
  };

  const item = (name, label) => (
    <button
      onClick={() => setPage(name)}
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm w-full
      ${page === name ? "bg-accentLight text-accentText" : "text-gray-600 hover:bg-gray-100"}`}
    >
      {label}
    </button>
  );



  return (
    <aside className="w-50 bg-white border-r flex flex-col">
      <div className="p-4 font-semibold">MiniCRM</div>

      <div className="p-2 space-y-1">
        <div className="text-xs text-gray-400 px-2">Overview</div>
        {item("dashboard", "Dashboard")}
      </div>

      <div className="p-2 space-y-1">
        <div className="text-xs text-gray-400 px-2">Sales</div>
        {item("leads", "Leads")}
        {item("quotes", "Quotations")}
      </div>

      <div className="mt-auto p-3 border-t pb-8 bg-white relative z-10">
        <p>{userName}</p>
        <button
          onClick={handleSignOut}
          className="text-xs text-gray-500 hover:text-black"
        >
          Logout?
        </button>
      </div>
    </aside>
  );
}
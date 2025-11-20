// "use client";

// import { logout } from "@/service/authService";
// import clsx from "clsx";
// import { ChevronRight, Crown, LogOut } from "lucide-react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { useState } from "react";
// import AlertModal from "@/components/share/AlertModal";

// interface UserSidebarProps {
//   user: any;
//   onPaymentClick?: () => void; // new callback prop
// }

// const UserSidebar = ({ user, onPaymentClick }: UserSidebarProps) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [alertOpen, setAlertOpen] = useState(false);
//   const [alertData, setAlertData] = useState({ title: "", message: "" });

//   const handleLogout = async () => {
//     try {
//       await logout();
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("userData");
//       toast.success("Successfully logged out!");
//       router.push("/");
//     } catch (error) {
//       toast.error("Logout failed!");
//       console.error("Logout failed:", error);
//     }
//   };

//   const handleRestrictedAction = (title: string, message: string) => {
//     setAlertData({ title, message });
//     setAlertOpen(true);
//   };

//   const handleMessagesClick = () => {
//     const plan = user?.plan?.plan_name || "Basics";

//     // Only restrict Basics users
//     if (plan === "Basics") {
//       handleRestrictedAction(
//         "Access Restricted",
//         "Sorry, you are using a Basics membership. You are not allowed to send or view messages. Please upgrade your membership to unlock this feature."
//       );
//     } else {
//       router.push("/user/messages");
//     }
//   };

//   const menuItems = [
//     { name: "Dashboard", path: "/user/dashboard" },
//     { name: "Edit Profile", path: "/user/edit-profile" },
//     { name: "Photo Management", path: "/user/photos" },
//     { name: "Messages ", path: "/user/messages" },
//     { name: "Payment", path: "" }, // leave path empty because it will trigger modal
//   ];

//   const plan = user?.plan?.plan_name || "Basics";
//   const upgradeMapping: Record<string, string | null> = {
//     Basics: "Premium",
//     Premium: "Elite",
//     Elite: "Vip",
//     Vip: null,
//   };
//   const nextPlan = upgradeMapping[plan] || null;

//   return (
//     <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-72 bg-gradient-to-br from-gray-950 to-rose-700 border-r border-gray-100 shadow-[4px_0_12px_-4px_rgba(0,0,0,0.1)] flex flex-col items-center p-6 z-40">
//       {/* Profile Section */}
//       <div className="flex flex-col items-center mb-6 mt-3">
//         {user?.profile_picture ? (
//           <img
//             src={user.profile_picture}
//             alt={user.name}
//             className="w-20 h-20 rounded-full object-cover ring-4 ring-white/10 shadow-lg mb-2"
//           />
//         ) : (
//           <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center text-white text-3xl font-bold mb-2 ring-4 ring-white/10 shadow-lg">
//             {user?.name?.charAt(0).toUpperCase()}
//           </div>
//         )}
//         <h3 className="text-base font-semibold text-gray-100">{user?.name}</h3>
//         {user?.phone_number && (
//           <p className="text-xs text-gray-300 mt-1">{user.phone_number}</p>
//         )}
//         <span className="bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full mt-1">
//           Online
//         </span>
//       </div>

//       {/* Membership Progress */}
//       <div className="w-full mb-4">
//         <div className="flex justify-between text-xs text-gray-300 mb-1">
//           <span>Membership</span>
//           <span className="text-amber-400 font-semibold">{plan}</span>
//         </div>
//         <div className="w-full bg-gray-800 rounded-full h-2">
//           <div
//             className="bg-gradient-to-r from-rose-500 to-pink-500 h-2 rounded-full"
//             style={{
//               width:
//                 plan === "Free"
//                   ? "10%"
//                   : plan === "Basics"
//                   ? "30%"
//                   : plan === "Premium"
//                   ? "60%"
//                   : plan === "Elite"
//                   ? "90%"
//                   : "100%",
//             }}
//           ></div>
//         </div>
//       </div>

//       {nextPlan && (
//         <button
//           onClick={onPaymentClick}
//           className="w-full mb-5 bg-gradient-to-r from-rose-600 to-pink-600 text-white py-2 rounded-lg font-semibold hover:from-rose-700 hover:to-pink-700 transition-all flex items-center justify-center space-x-2 text-sm shadow-sm"
//         >
//           <Crown className="h-4 w-4" />
//           <span>Upgrade to {nextPlan}</span>
//         </button>
//       )}

//       {/* Sidebar Menu */}
//       <nav className="w-full space-y-1 flex-1">
//         {menuItems.map((item) => {
//           const isActive = pathname === item.path;

//           if (item.name === "Payment") {
//             return (
//               <button
//                 key={item.name}
//                 onClick={onPaymentClick}
//                 className="w-full flex items-center justify-between py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 text-gray-300 hover:bg-rose-50/10 hover:text-rose-300"
//               >
//                 <span>{item.name}</span>
//                 <ChevronRight className="h-4 w-4" />
//               </button>
//             );
//           }

//           if (item.name.startsWith("Messages")) {
//             return (
//               <button
//                 key={item.name}
//                 onClick={handleMessagesClick}
//                 className={clsx(
//                   "w-full flex items-center justify-between py-2 px-3 rounded-md text-sm font-medium transition-all duration-200",
//                   isActive
//                     ? "bg-rose-600 text-white shadow-sm"
//                     : "text-gray-300 hover:bg-rose-50/10 hover:text-rose-300"
//                 )}
//               >
//                 <span>{item.name}</span>
//                 <ChevronRight
//                   className={clsx(
//                     "h-4 w-4 transition-transform duration-200",
//                     isActive && "rotate-90"
//                   )}
//                 />
//               </button>
//             );
//           }

//           return (
//             <Link key={item.name} href={item.path}>
//               <button
//                 className={clsx(
//                   "w-full flex items-center justify-between py-2 px-3 rounded-md text-sm font-medium transition-all duration-200",
//                   isActive
//                     ? "bg-rose-600 text-white shadow-sm"
//                     : "text-gray-300 hover:bg-rose-50/10 hover:text-rose-300"
//                 )}
//               >
//                 <span>{item.name}</span>
//                 <ChevronRight
//                   className={clsx(
//                     "h-4 w-4 transition-transform duration-200",
//                     isActive && "rotate-90"
//                   )}
//                 />
//               </button>
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Logout */}
//       <button
//         onClick={handleLogout}
//         className="w-full flex items-center justify-between text-white hover:text-red-600 hover:bg-red-50/10 py-2 px-3 rounded-md transition-all text-sm font-medium"
//       >
//         <span>Logout</span>
//         <LogOut className="h-4 w-4" />
//       </button>

//       {/* Shared Alert Modal */}
//       <AlertModal
//         isOpen={alertOpen}
//         onClose={() => setAlertOpen(false)}
//         title={alertData.title}
//         message={alertData.message}
//         actionLabel="OK"
//       />
//     </aside>
//   );
// };

// export default UserSidebar;




"use client";

import { logout } from "@/service/authService";
import clsx from "clsx";
import { ChevronRight, Crown, LogOut, X } from "lucide-react"; // Added X icon
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import AlertModal from "@/components/share/AlertModal";

interface UserSidebarProps {
  user: any;
  isOpen?: boolean; // New prop to control open/close state
  onClose?: () => void; // New prop to handle close
  onPaymentClick?: () => void;
}

const UserSidebar = ({ user, isOpen = false, onClose, onPaymentClick }: UserSidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertData, setAlertData] = useState({ title: "", message: "" });

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userData");
      toast.success("Successfully logged out!");
      router.push("/");
    } catch (error) {
      toast.error("Logout failed!");
      console.error("Logout failed:", error);
    }
  };

  const handleRestrictedAction = (title: string, message: string) => {
    setAlertData({ title, message });
    setAlertOpen(true);
  };

  const handleMessagesClick = () => {
    const plan = user?.plan?.plan_name || "Basics";

    if (plan === "Basics") {
      handleRestrictedAction(
        "Access Restricted",
        "Sorry, you are using a Basics membership. You are not allowed to send or view messages. Please upgrade your membership to unlock this feature."
      );
    } else {
      router.push("/user/messages");
      onClose?.(); // Close sidebar on mobile after navigation
    }
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    onClose?.(); // Close sidebar on mobile after navigation
  };

  const menuItems = [
    { name: "Dashboard", path: "/user/dashboard" },
    { name: "Edit Profile", path: "/user/edit-profile" },
    { name: "Messages", path: "/user/messages" },
    { name: "Payment", path: "" },
  ];

  const plan = user?.plan?.plan_name || "Basics";
  const upgradeMapping: Record<string, string | null> = {
    Basics: "Premium",
    Premium: "Elite",
    Elite: "Vip",
    Vip: null,
  };
  const nextPlan = upgradeMapping[plan] || null;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={clsx(
        "fixed top-0 left-0 h-full w-72 bg-gradient-to-br from-gray-950 to-rose-700 border-r border-gray-100 shadow-2xl flex flex-col items-center p-6 z-50 transition-transform duration-300 ease-in-out",
        "lg:top-16 lg:h-[calc(100vh-4rem)] lg:translate-x-0", // Desktop styles
        isOpen ? "translate-x-0" : "-translate-x-full" // Mobile toggle
      )}>
        {/* Close Button for Mobile */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 text-gray-300 hover:text-white p-1"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Profile Section */}
        <div className="flex flex-col items-center mb-6 mt-8 lg:mt-3">
          {user?.profile_picture ? (
            <img
              src={user.profile_picture}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-white/10 shadow-lg mb-2"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center text-white text-3xl font-bold mb-2 ring-4 ring-white/10 shadow-lg">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <h3 className="text-base font-semibold text-gray-100">{user?.name}</h3>
          {user?.phone_number && (
            <p className="text-xs text-gray-300 mt-1">{user.phone_number}</p>
          )}
          <span className="bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full mt-1">
            Online
          </span>
        </div>

        {/* Membership Progress */}
        <div className="w-full mb-4">
          <div className="flex justify-between text-xs text-gray-300 mb-1">
            <span>Membership</span>
            <span className="text-amber-400 font-semibold">{plan}</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-rose-500 to-pink-500 h-2 rounded-full"
              style={{
                width:
                  plan === "Free"
                    ? "10%"
                    : plan === "Basics"
                    ? "30%"
                    : plan === "Premium"
                    ? "60%"
                    : plan === "Elite"
                    ? "90%"
                    : "100%",
              }}
            ></div>
          </div>
        </div>

        {nextPlan && (
          <button
            onClick={() => {
              onPaymentClick?.();
              onClose?.();
            }}
            className="w-full mb-5 bg-gradient-to-r from-rose-600 to-pink-600 text-white py-2 rounded-lg font-semibold hover:from-rose-700 hover:to-pink-700 transition-all flex items-center justify-center space-x-2 text-sm shadow-sm"
          >
            <Crown className="h-4 w-4" />
            <span>Upgrade to {nextPlan}</span>
          </button>
        )}

        {/* Sidebar Menu */}
        <nav className="w-full space-y-1 flex-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;

            if (item.name === "Payment") {
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    onPaymentClick?.();
                    onClose?.();
                  }}
                  className="w-full flex items-center justify-between py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 text-gray-300 hover:bg-rose-50/10 hover:text-rose-300"
                >
                  <span>{item.name}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              );
            }

            if (item.name.startsWith("Messages")) {
              return (
                <button
                  key={item.name}
                  onClick={handleMessagesClick}
                  className={clsx(
                    "w-full flex items-center justify-between py-2 px-3 rounded-md text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-rose-600 text-white shadow-sm"
                      : "text-gray-300 hover:bg-rose-50/10 hover:text-rose-300"
                  )}
                >
                  <span>{item.name}</span>
                  <ChevronRight
                    className={clsx(
                      "h-4 w-4 transition-transform duration-200",
                      isActive && "rotate-90"
                    )}
                  />
                </button>
              );
            }

            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={clsx(
                  "w-full flex items-center justify-between py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 text-left",
                  isActive
                    ? "bg-rose-600 text-white shadow-sm"
                    : "text-gray-300 hover:bg-rose-50/10 hover:text-rose-300"
                )}
              >
                <span>{item.name}</span>
                <ChevronRight
                  className={clsx(
                    "h-4 w-4 transition-transform duration-200",
                    isActive && "rotate-90"
                  )}
                />
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={() => {
            handleLogout();
            onClose?.();
          }}
          className="w-full flex items-center justify-between text-white hover:text-red-600 hover:bg-red-50/10 py-2 px-3 rounded-md transition-all text-sm font-medium"
        >
          <span>Logout</span>
          <LogOut className="h-4 w-4" />
        </button>

        {/* Shared Alert Modal */}
        <AlertModal
          isOpen={alertOpen}
          onClose={() => setAlertOpen(false)}
          title={alertData.title}
          message={alertData.message}
          actionLabel="OK"
        />
      </aside>
    </>
  );
};

export default UserSidebar;
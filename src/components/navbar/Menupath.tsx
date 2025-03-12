// import {
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem,
//   Button,
// } from "@heroui/react";
// import { Link } from "@heroui/react";
// import { ChevronDown } from "lucide-react";
// import { categories } from "../../lib/categories";

// const Menupath = () => {
//   return (
//     <div className="py-4 ">
//       <div className="flex gap-4 justify-around">
//         <div>
//           <Dropdown backdrop="blur">
//             <DropdownTrigger>
//               <Button variant="bordered">
//                 <ChevronDown />
//                 หมวดหมู่สินค้า
//               </Button>
//             </DropdownTrigger>
//             <DropdownMenu aria-label="Static Actions" variant="faded">
//               {categories.map((item) => {
//                 return (
//                     <DropdownItem key={item.id} href={item.href}>
//                       <div className="flex gap-2">
//                       <span>{item.icon}</span>
//                       {item.name}
//                       </div>
//                     </DropdownItem>
//                 );
//               })}
//             </DropdownMenu>
//           </Dropdown>
//         </div>

//         <div className="hidden sm:flex gap-4 justify-center">
//           <div>
//             <Link color="foreground" href="/">
//               หน้าแรก
//             </Link>
//           </div>
//           <div>
//             <Link aria-current="page" href="computer">
//               คอมพิวเตอร์เซต
//             </Link>
//           </div>
//           <div>
//             <Link color="foreground" href="diy">
//               จัดสเปกคอม
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Menupath;



import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { Link } from "@heroui/react";
import { ChevronDown } from "lucide-react";
import { categories } from "../../lib/categories";

const Menupath = () => {
  return (
    <div className="py-2">
      <div className="flex gap-4 justify-between items-center max-w-5xl mx-auto">
        <Dropdown backdrop="blur" className="rounded-lg ">
          <DropdownTrigger>
            <Button
              variant="bordered"
              className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronDown className="w-5 h-5" />
              หมวดหมู่สินค้า
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Categories"
            variant="faded"
            className="bg-white rounded-lg"
          >
            {categories.map((item) => (
              <DropdownItem
                key={item.id}
                href={item.href}
                className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <span className="flex gap-2">{item.icon} {item.name}</span>
                
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <div className="hidden sm:flex gap-6">
          <Link
            href="/"
            className="text-gray-700 hover:text-red-600 font-medium transition-colors"
          >
            หน้าแรก
          </Link>
          <Link
            href="#"
            className="text-gray-700 hover:text-red-600 font-medium transition-colors"
          >
            คอมพิวเตอร์เซต
          </Link>
          <Link
            href="/diy"
            className="text-gray-700 hover:text-red-600 font-medium transition-colors"
          >
            จัดสเปกคอม
          </Link>
          <Link
            href="/Bio"
            className="text-gray-700 hover:text-red-600 font-medium transition-colors"
          >
            ติดต่อ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menupath;
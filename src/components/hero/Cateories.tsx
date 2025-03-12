import Link from "next/link";
import { categories } from "../../lib/categories";

const Cateories = () => {
  return (
    <div className="w-full">
      <div className="w-full max-w-[1200px] mx-auto text-left mt-6 pl-4">
        <span className="flex gap-2 items-center ">
          <svg
            className="injected-svg"
            xmlns="http://www.w3.org/2000/svg"
            id="glyph"
            height="18"
            viewBox="0 0 64 64"
            width="18"
            data-src="/assets/images/icons/categories.svg"
            // xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="m29 11v14a4 4 0 0 1 -4 4h-14a4 4 0 0 1 -4-4v-14a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4zm24-4h-14a4 4 0 0 0 -4 4v14a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4v-14a4 4 0 0 0 -4-4zm-28 28h-14a4 4 0 0 0 -4 4v14a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4v-14a4 4 0 0 0 -4-4zm21 0a11 11 0 1 0 11 11 11 11 0 0 0 -11-11z"
              fill="#E94560"
            ></path>
          </svg>
          <h1 className="text-base font-bold">หมวดหมู่สินค้า</h1>
        </span>
      </div>

      <div className="w-full max-w-[1200px] mx-auto text-left mt-6 pl-4 cursor-pointer">
        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-7 gap-4">
          {categories.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              className="flex hover:shadow-medium items-center justify-center bg-white gap-2 p-2 min-h-[60px] h-auto w-full text-center rounded-md"
            >
              {item.icon}
              <span className="whitespace-nowrap flex">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Cateories;

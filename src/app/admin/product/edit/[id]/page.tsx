// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import toast from "react-hot-toast";
// import NavBarAdmin from "@/components/admin/NavBarAdmin";
// import { X } from "lucide-react";

// export default function EditProductPage({ params,}: { params: { id: string };}) {
//   const router = useRouter();
//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const [category, setCategory] = useState<any[]>([]);
//   const [imgId, setImgId] = useState()

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     price: "",
//     quantity: "",
//     category: "",
//     image: null as File | null,
//   });

//   const fetchProduct = async () => {
//     try {
//       const response = await fetch(`/api/product/fetchproductid/${params.id}`, {
//         method: "GET",
//       });

//       if (!response.ok) {
//         throw new Error("Product not found");
//       }

//       const data = await response.json();
//       console.log(data);

//       setForm({
//         title: data.title || "",
//         description: data.description || "",
//         price: data.price || "",
//         quantity: data.quantity || "",
//         category: data.categoryId || "",
//         image: null,
//       });

//       if (data.images && data.images.length > 0) {
//         setPreviewImage(data.images[0].url);
//         setImgId(data.images[0].id);
//         console.log(imgId); 
//       }
//     } catch (error) {
//       console.error("Error fetching product:", error);
//     }
//   };


//   const fetchCategory = async () => {
//     try {
//       const response = await fetch("/api/product/fetchcategory", {
//         method: "GET",
//       });
//       const data = await response.json();
//       setCategory(data || []);
//     } catch (error) {
//       console.log(error);
//       setCategory([]);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!params.id) {
//       toast.error("ไม่พบ ID สินค้า");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", form.title);
//     formData.append("description", form.description);
//     formData.append("price", form.price);
//     formData.append("quantity", form.quantity);
//     formData.append("category", form.category);

//     if (
//       !form.title ||
//       !form.description ||
//       !form.price ||
//       !form.quantity ||
//       !form.category
//     ) {
//       toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
//       return;
//     }

//     if (form.image) formData.append("image", form.image);

//     try {
//       const response = await fetch(`/api/product/updateproduct/${params.id}`, {
//         method: "PUT",
//         body: formData,
//       });

//       if (response.ok) {
//         toast.success("อัปเดตสินค้าสำเร็จ!");
//         router.push("/admin/product/add");
//       } else {
//         throw new Error("อัปเดตสินค้าไม่สำเร็จ");
//       }
//     } catch (error) {
//       toast.error("เกิดข้อผิดพลาด!");
//       console.error("Update Error:", error);
//     }
//   };

//   const extractFileName = (url: string) => {
//     if (!url) return null;
//     const parts = url.split("/");
//     return parts.length > 0 ? parts.pop() : null;
//   };
  
//   const handleDeleteImage = async (imageUrl: string, productId?: string) => {
//     const imageId = extractFileName(imageUrl); 
  
//     if (!imageId) {
//       toast.error("ไม่พบ ID ของรูปภาพ");
//       return;
//     }
  
//     const handleDeleteImageInStorage = async (id: string) => {
//       try {
//         const response = await fetch(`/api/product/deleteproductimageinstorage/${id}`, {
//           method: "DELETE",
//         });
//         if (!response.ok) {
//           const textData = await response.text();
//           console.error("Error response:", textData);
//           throw new Error(textData || "เกิดข้อผิดพลาดในการลบรูปภาพ");
//         }
//         toast.success("ลบรูปสินค้าสำเร็จ");
//         setPreviewImage(null); 
//       } catch (error) {
//         console.error("Error deleting image:", error);
//         toast.error("เกิดข้อผิดพลาดในการลบรูปภาพ");
//       }
//     };
  
//     const handleDeleteImageInTeBle = async (id: Number) => {
//       try {
//         const response = await fetch(`/api/product/deleteproductimageinteble/${id}`, {
//           method: "DELETE",
//         });
  
//         if (!response.ok) {
//           const textData = await response.text();
//           console.error("Error response:", textData);
//           throw new Error(textData || "เกิดข้อผิดพลาดในการลบข้อมูลจากฐานข้อมูล");
//         }
  
//         toast.success("ลบข้อมูลจากฐานข้อมูลสำเร็จ");
//       } catch (error) {
//         console.error("Error deleting data from table:", error);
//         toast.error("เกิดข้อผิดพลาดในการลบข้อมูลจากฐานข้อมูล");
//       }
//     };
  
//     try {
//       await Promise.all([
//         handleDeleteImageInStorage(imageId),
//         handleDeleteImageInTeBle(Number(imgId))       
//       ]);
//     } catch (error) {
//       console.error("❌ Error occurred while deleting image and data:", error);
//       toast.error("เกิดข้อผิดพลาดในการลบข้อมูล");
//     }
//   };

  

//   useEffect(() => {
//     fetchProduct();
//     fetchCategory();
//   }, []);

//   return (
//     <>
//       <NavBarAdmin />
//       <div className="container mx-auto p-8 bg-white shadow-lg rounded-xl">
//         <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
//           <h1 className="text-3xl font-bold text-center text-gray-700">
//             แก้ไขสินค้า
//           </h1>
//           <p className="text-center text-gray-500">อัปเดตข้อมูลสินค้าของคุณ</p>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div>
//               <label className="block text-sm font-medium text-gray-600">
//                 ชื่อสินค้า
//               </label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 className="mt-2 block w-full border border-gray-300 rounded-lg p-3"
//                 value={form.title}
//                 onChange={(e) => setForm({ ...form, title: e.target.value })}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600">
//                 รายละเอียดสินค้า
//               </label>
//               <textarea
//                 className="mt-2 block w-full border border-gray-300 rounded-lg p-3"
//                 rows={4}
//                 value={form.description}
//                 onChange={(e) =>
//                   setForm({ ...form, description: e.target.value })
//                 }
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600">
//                 ราคา (บาท)
//               </label>
//               <input
//                 type="number"
//                 className="mt-2 block w-full border border-gray-300 rounded-lg p-3"
//                 value={form.price}
//                 onChange={(e) => setForm({ ...form, price: e.target.value })}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600">
//                 จำนวนสินค้า
//               </label>
//               <input
//                 type="number"
//                 className="mt-2 block w-full border border-gray-300 rounded-lg p-3"
//                 value={form.quantity}
//                 onChange={(e) => setForm({ ...form, quantity: e.target.value })}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600">
//                 หมวดหมู่สินค้า
//               </label>
//               <select
//                 className="mt-2 block w-full border border-gray-300 rounded-lg p-3"
//                 value={form.category || ""}
//                 onChange={(e) => setForm({ ...form, category: e.target.value })}
//               >
//                 <option value="" disabled>
//                   เลือกหมวดหมู่
//                 </option>
//                 {category.length > 0 &&
//                   category.map((item: any, index: number) => (
//                     <option key={index} value={item.id}>
//                       {item.name}
//                     </option>
//                   ))}
//               </select>
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-600">
//                 อัปโหลดรูป
//               </label>

//               {previewImage && (
//                 <div className="relative w-32 h-32">
//                   <img
//                     src={previewImage}
//                     alt="Product"
//                     className="w-32 h-32 object-cover mb-2 rounded-lg"
//                   />

//                   <button
//                     type="button"
//                     onClick={() => handleDeleteImage(previewImage)}
//                     className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600"
//                   >
//                     <X size={16} />
//                   </button>
//                 </div>
//               )}

//               <input
//                 type="file"
//                 onChange={(e) => {
//                   if (e.target.files?.[0]) {
//                     setForm({ ...form, image: e.target.files[0] });
//                     setPreviewImage(URL.createObjectURL(e.target.files[0]));
//                   }
//                 }}
//                 className="block w-full"
//               />
//             </div>
            
//           </div>
//           <div className="text-center">
//             <button
//               type="submit"
//               className="w-full md:w-auto px-8 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-600"
//             >
//               บันทึกการเปลี่ยนแปลง
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation"; // Replace useSearchParams with useParams
import toast from "react-hot-toast";
import NavBarAdmin from "@/components/admin/NavBarAdmin";
import { X } from "lucide-react";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams(); // Access the id directly from useParams
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [category, setCategory] = useState<any[]>([]);
  const [imgId, setImgId] = useState();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    image: null as File | null,
  });

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/product/fetchproductid/${id}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Product not found");
      }

      const data = await response.json();
      console.log(data);

      setForm({
        title: data.title || "",
        description: data.description || "",
        price: data.price || "",
        quantity: data.quantity || "",
        category: data.categoryId || "",
        image: null,
      });

      if (data.images && data.images.length > 0) {
        setPreviewImage(data.images[0].url);
        setImgId(data.images[0].id);
        console.log(imgId);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await fetch("/api/product/fetchcategory", {
        method: "GET",
      });
      const data = await response.json();
      setCategory(data || []);
    } catch (error) {
      console.log(error);
      setCategory([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) {
      toast.error("ไม่พบ ID สินค้า");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("quantity", form.quantity);
    formData.append("category", form.category);

    if (
      !form.title ||
      !form.description ||
      !form.price ||
      !form.quantity ||
      !form.category
    ) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (form.image) formData.append("image", form.image);

    try {
      const response = await fetch(`/api/product/updateproduct/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        toast.success("อัปเดตสินค้าสำเร็จ!");
        router.push("/admin/product/add");
      } else {
        throw new Error("อัปเดตสินค้าไม่สำเร็จ");
      }
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด!");
      console.error("Update Error:", error);
    }
  };

  const extractFileName = (url: string) => {
    if (!url) return null;
    const parts = url.split("/");
    return parts.length > 0 ? parts.pop() : null;
  };

  const handleDeleteImage = async (imageUrl: string, productId?: string) => {
    const imageId = extractFileName(imageUrl);

    if (!imageId) {
      toast.error("ไม่พบ ID ของรูปภาพ");
      return;
    }

    const handleDeleteImageInStorage = async (id: string) => {
      try {
        const response = await fetch(`/api/product/deleteproductimageinstorage/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          const textData = await response.text();
          console.error("Error response:", textData);
          throw new Error(textData || "เกิดข้อผิดพลาดในการลบรูปภาพ");
        }
        toast.success("ลบรูปสินค้าสำเร็จ");
        setPreviewImage(null);
      } catch (error) {
        console.error("Error deleting image:", error);
        toast.error("เกิดข้อผิดพลาดในการลบรูปภาพ");
      }
    };

    const handleDeleteImageInTeBle = async (id: Number) => {
      try {
        const response = await fetch(`/api/product/deleteproductimageinteble/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const textData = await response.text();
          console.error("Error response:", textData);
          throw new Error(textData || "เกิดข้อผิดพลาดในการลบข้อมูลจากฐานข้อมูล");
        }

        toast.success("ลบข้อมูลจากฐานข้อมูลสำเร็จ");
      } catch (error) {
        console.error("Error deleting data from table:", error);
        toast.error("เกิดข้อผิดพลาดในการลบข้อมูลจากฐานข้อมูล");
      }
    };

    try {
      await Promise.all([
        handleDeleteImageInStorage(imageId),
        handleDeleteImageInTeBle(Number(imgId)),
      ]);
    } catch (error) {
      console.error("❌ Error occurred while deleting image and data:", error);
      toast.error("เกิดข้อผิดพลาดในการลบข้อมูล");
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchCategory();
  }, []);

  return (
    <>
      <NavBarAdmin />
      <div className="container mx-auto p-8 bg-white shadow-lg rounded-xl">
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-700">
            แก้ไขสินค้า
          </h1>
          <p className="text-center text-gray-500">อัปเดตข้อมูลสินค้าของคุณ</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                ชื่อสินค้า
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="mt-2 block w-full border border-gray-300 rounded-lg p-3"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                รายละเอียดสินค้า
              </label>
              <textarea
                className="mt-2 block w-full border border-gray-300 rounded-lg p-3"
                rows={4}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                ราคา (บาท)
              </label>
              <input
                type="number"
                className="mt-2 block w-full border border-gray-300 rounded-lg p-3"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                จำนวนสินค้า
              </label>
              <input
                type="number"
                className="mt-2 block w-full border border-gray-300 rounded-lg p-3"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                หมวดหมู่สินค้า
              </label>
              <select
                className="mt-2 block w-full border border-gray-300 rounded-lg p-3"
                value={form.category || ""}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="" disabled>
                  เลือกหมวดหมู่
                </option>
                {category.length > 0 &&
                  category.map((item: any, index: number) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                อัปโหลดรูป
              </label>

              {previewImage && (
                <div className="relative w-32 h-32">
                  <img
                    src={previewImage}
                    alt="Product"
                    className="w-32 h-32 object-cover mb-2 rounded-lg"
                  />

                  <button
                    type="button"
                    onClick={() => handleDeleteImage(previewImage)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setForm({ ...form, image: e.target.files[0] });
                    setPreviewImage(URL.createObjectURL(e.target.files[0]));
                  }
                }}
                className="block w-full"
              />
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-600"
            >
              บันทึกการเปลี่ยนแปลง
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
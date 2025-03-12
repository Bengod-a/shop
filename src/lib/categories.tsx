import {
  Cpu,
  Monitor,
  HardDrive,
  MemoryStick,
} from "lucide-react";
import { Icon } from "@iconify/react";

type Category = {
  id: number;
  name: string;
  icon: React.ReactNode;
  href: string;
};

export const categories: Category[] = [
  { id: 1, name: "ซีพียู", icon: <Cpu size={18} />, href: "/category/cpu" },
  { id: 2, name: "เมนบอร์ด", icon: <Icon icon="ant-design:control-twotone" width="24" height="24" />, href: "/category/board" },
  { id: 3, name: "การ์ดจอ", icon: <Icon icon="bi:gpu-card" width="16" height="16" />, href: "/category/gpu" },
  { id: 4, name: "แรม", icon: <MemoryStick size={18} />, href: "/category/ram" },
  { id: 5, name: "ฮาร์ดดิสก์/SSD", icon: <HardDrive size={18} />, href: "/category/harddisk" },
  { id: 6, name: "พาวเวอร์ซัพพลาย", icon: <Icon icon="ic:baseline-power" width="24" height="24" />, href: "/category/power" },
  { id: 7, name: "เคส", icon: <Icon icon="ph:computer-tower-duotone" width="24" height="24" />, href: "/category/case" },
  { id: 8, name: "ชุดระบายความร้อน", icon: <Icon icon="bi:fan" width="24" height="24" />, href: "/category/fan" },
  { id: 9, name: "เมาส์", icon: <Icon icon="material-symbols-light:mouse-outline" width="24" height="24" />, href: "/category/mouse" },
  { id: 10, name: "คีย์บอร์ด", icon: <Icon icon="material-symbols-light:keyboard-outline-rounded" width="24" height="24" />, href: "/category/keyboard" },
  { id: 11, name: "จอมอนิเตอร์", icon: <Monitor size={18} />, href: "/category/monitor" },
  // { id: 12, name: "อุปกรณ์เสริม", icon: <Icon icon="famicons:game-controller-outline" width="24" height="24" />, href: "/category/card" },
  { id: 12, name: "จัดสเปกคอม", icon: <Icon icon="codicon:tools" width="16" height="16" />, href: "/diy" },
];
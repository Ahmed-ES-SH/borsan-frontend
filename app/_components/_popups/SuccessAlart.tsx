import { getTranslations } from "@/app/_helpers/helpers";
import { UseVariables } from "@/app/context/VariablesContext";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { GiTireIronCross } from "react-icons/gi";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

interface Props {
  showAlart: boolean;
  Message: string;
  onClose: () => void;
}

export default function SuccessAlart({ showAlart, Message, onClose }: Props) {
  const [barWidth, setBarWidth] = useState(100);
  const { locale } = UseVariables();
  const { success } = getTranslations(locale);
  useEffect(() => {
    if (!showAlart) return; // لا تفعل شيء إذا لم يكن التنبيه ظاهراً

    setBarWidth(100); // إعادة تعيين الشريط إلى 100% عند ظهور التنبيه

    const interval = setInterval(() => {
      setBarWidth((prev) => {
        if (prev <= 10) {
          clearInterval(interval);
          return 0;
        }
        return prev - 10;
      });
    }, 600);

    return () => clearInterval(interval); // تنظيف `setInterval` عند إغلاق التنبيه
  }, [showAlart]);

  useEffect(() => {
    if (barWidth === 0) {
      onClose();
    }
  }, [barWidth, onClose]);

  return (
    <AnimatePresence>
      {showAlart && (
        <motion.div
          style={{ direction: "ltr" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="w-[80%] max-md:w-[98%] h-[100px] max-md:h-[120px] fixed top-28 left-1/2 -translate-x-1/2 rounded-t-md shadow-xl bg-white z-[99999999]"
        >
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center h-full gap-2">
              <div className="w-24 h-full bg-green-400 text-white flex items-center justify-center rounded-tl-md">
                <IoCheckmarkCircleOutline className="size-8" />
              </div>
              <div className="flex flex-col gap-2">
                <h1>{success}</h1>
                <p className="text-second_text">{Message}</p>
              </div>
            </div>
          </div>
          <div
            className="h-[4px] bg-green-400 duration-300"
            style={{ width: `${barWidth}%` }}
          ></div>
          <div
            onClick={onClose}
            className="w-8 h-8 cursor-pointer flex bg-red-300  items-center justify-center rounded-bl-md absolute right-0 top-0"
          >
            <GiTireIronCross className="size-4 text-white" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

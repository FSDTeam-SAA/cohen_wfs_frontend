import { Mail, MapPin } from "lucide-react";
import React from "react";

const addresses = [
  {
    title: "Our Address",
    detail: "Witklip Farm, Graafwater, 8120",
    icon: <MapPin />,
  },
  {
    title: "Email",
    detail: "admin@witklipfarm.com",
    icon: <Mail />,
  },
];

export default function ContactSidebar() {
  return (
    <div className="lg:space-y-10 space-y-4">
      <h3 className="headline">Get In Touch</h3>
      <div className="lg:space-y-6 space-y-3">
        {addresses.map((address, index) => (
          <div className="flex gap-3 items-start" key={index}>
            <div className="lg:w-12 w-10 lg:h-12 h-10 text-primary bg-primary/20 rounded-md flex items-center justify-center">
              {address.icon}
            </div>
            <div className="">
              <h4 className="text-lg lg:text-xl font-semibold text-primary">
                {address.title}
              </h4>
              <p>{address.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
 
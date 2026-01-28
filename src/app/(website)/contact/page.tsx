import CommonHero from "@/components/shared/common-hero";
import ContactSidebar from "@/components/shared/contact-sidebar";
import React from "react";

export default function Enquiry() {
  return (
    <main>
      <CommonHero
        title="Contact Us"
        description="Get in touch with our team. We're here to answer your questions and discuss partnership opportunities."
      />
      <section className="py-10 lg:py-24">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-1">
            <ContactSidebar />
          </div>
          <div className="col-span-2">
            <div className="bg-white shadow-lg rounded-lg p-8">Form Part</div>
          </div>
        </div>
      </section>
    </main>
  );
}

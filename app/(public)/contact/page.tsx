import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { ContactForm } from "../components/contact-form";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main>
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white">
              Contact Us
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
              Have a question or a project in mind? We&apos;d love to hear from
              you.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:col-span-2">
                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-10">
                  <h2 className="text-3xl font-bold mb-6">Send a Message</h2>
                  <ContactForm />
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8">
                    <h3 className="text-2xl font-bold mb-6">Contact Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="mt-1 p-2 bg-blue-500/10 rounded-lg text-blue-400">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Address</h4>
                          <p className="text-slate-400">
                            123 Entertainment Blvd,
                            <br />
                            Lagos, Nigeria
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="mt-1 p-2 bg-blue-500/10 rounded-lg text-blue-400">
                          <Mail className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Email</h4>
                          <p className="text-slate-400 hover:text-blue-400 transition-colors">
                            <a href="mailto:info@ambassadors.com">
                              info@ambassadors.com
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="mt-1 p-2 bg-blue-500/10 rounded-lg text-blue-400">
                          <Phone className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Phone</h4>
                          <p className="text-slate-400 hover:text-blue-400 transition-colors">
                            <a href="tel:+1234567890">+1 (234) 567-890</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

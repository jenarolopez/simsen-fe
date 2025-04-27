import Image from "next/image";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { countryCode } from "../../../lib/contryCodes";


export default function HeroSection() {
  return (
    <section className="relative w-full flex items-center py-10">
      <Image
        aria-hidden
        src="/images/hero.png"
        alt="Travel Background"
        fill={true}
        objectFit="cover"
        className="absolute"
      />

      <div className="max-w-[1800px] px-10 md:px-[5rem] ">
        <h1 className="text-3xl font-cursive text-white z-20 relative">
          Simsem
        </h1>

        <div className="relative z-20 items-center justify-center h-full grid grid-cols-1 md:grid-cols-2">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Book your <span className="text-yellow-400 font-bold">FREE</span>{" "}
              <br />
              authentic experiences with <br /> verified locals!
            </h1>
            <p className="text-lg mb-6">
              Are you a passionate{" "}
              <span className="text-yellow-400">travel creator</span> looking to
              explore the captivating culture, rich history, and stunning
              landscapes of the Middle East?
            </p>
          </div>
          <div className="flex items-center flex-row justify-center">
            <div className="bg-white w-full md:w-[420px] rounded-[15px] flex">
              <div className="bg-white rounded-lg shadow-xl p-6 w-full">
                <h3 className="text-[24px] text-[#0D2E61] font-semibold mb-4">
                  Book your free tours with verified locals.
                </h3>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="fullName">Full Name</label>
                    <Input id="fullName" placeholder="Enter your full name"  />
                  </div>

                  <div>
                    <label htmlFor="email">Email Address</label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone">Phone Number</label>
                    <div className="flex">
                      <select className="bg-gray-50 border border-[#5F0F4026] text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                        {
                          countryCode.map(code => <option key={code.code} value={code.code}>{code.code} {code.dial_code}</option>)
                        }
                      </select>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 555-5555"
                        className="rounded-l-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="referral">How did you hear about us?</label>
                    <select
                      id="referral"
                      className="flex h-10 w-full rounded-md border border-input border-[#5F0F4026] bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <option value="" disabled selected>
                        Select an option
                      </option>
                      <option value="social">Social Media</option>
                      <option value="friend">Friend</option>
                      <option value="search">Search Engine</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="experience">Select Experience</label>
                    <select
                      id="experience"
                      className="flex h-10 w-full rounded-md border border-input border-[#5F0F4026] bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <option value="" disabled selected>
                        Select Experience
                      </option>
                      <option value="culture">Cultural Tour</option>
                      <option value="food">Food Experience</option>
                      <option value="adventure">Adventure</option>
                    </select>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo */}
    </section>
  );
}

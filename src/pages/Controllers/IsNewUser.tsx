import thumb1 from "../../assets/Thumbail1.png";
import thumb2 from "../../assets/Thumbnail2.png";

export default function IsNewUser({
  setIsNewUser,
}: {
  setIsNewUser: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const setIsNewToFalse = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/isNew/setIsNewFalse/40`,
        {
          method: "PUT",
        }
      );
      const data = await response.json();
      console.log("Set isNew to false:", data);
      setIsNewUser(false);
    } catch (error) {
      console.error("Error setting isNew to false:", error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center bg-transparent z-50 p-4 ">
        <div className="bg-gray-950 rounded-lg shadow-lg max-w-2xl w-full text-center overflow-y-auto max-h-[90vh] p-6 sm:p-8 lg:shadow-md lg:shadow-amber-900/20">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-white/70">
            New Release!
          </h2>
          <p className=" text-sm sm:text-base md:text-lg mb-6 md:mb-8 text-white/60">
            We're excited to announce that a new react tutorial is on its way!
            Starting with the basics and progressing to advanced topics, this
            tutorial is designed to help you master React step by step.
          </p>

          {/* Features - Scrollable Container */}
          <div className="flex flex-col gap-6 md:gap-8 mb-8 max-h-[50vh] md:max-h-[55vh] overflow-y-auto pr-2">
            {/* Tutorials Card - Picture Left */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <div className="w-full md:w-1/2 h-32 sm:h-40 md:h-48 bg-gray-950 rounded-lg flex items-center justify-center border-2 border-dashed border-amber-700/70 shrink-0">
                <div className="w-full h-full">
                  <img
                    src={thumb1}
                    alt="Tutorials Thumbnail"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 text-left md:text-left">
                <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold mb-2">
                  Introduction To React
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-white/60">
                  Dive through to know what is React, its core concepts, and why
                  we use it for building dynamic web applications.
                </p>
              </div>
            </div>

            {/* Profile Card - Picture Right */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-4 md:gap-6">
              <div className="w-full md:w-1/2 h-32 sm:h-40 md:h-48 bg-gray-950 rounded-lg flex items-center justify-center border-2 border-dashed border-amber-700/70 shrink-0">
                <div className="w-full h-full text-center">
                  <img
                    src={thumb2}
                    alt="Profile Thumbnail"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 text-left md:text-left">
                <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold mb-2">
                  React Setup
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-white/60">
                  Learn how to set up a React development environment using Vite
                  and later on Typescript and TailwindCSS for efficient coding.
                </p>
              </div>
            </div>
          </div>  

          <button
            onClick={setIsNewToFalse}
            className="w-full sm:w-auto bg-amber-700/70 text-white px-6 sm:px-8 py-2 sm:py-3 rounded text-sm sm:text-base md:text-lg font-medium hover:bg-amber-700 transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}

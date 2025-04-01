"use client";

const LogInModal = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 w-full h-full flex justify-center items-center bg-black/50 backdrop-blur-md z-50 p-4">
      <form className="relative flex flex-col gap-2.5 p-4 sm:p-5 border border-gray-300 rounded-lg bg-gray-50 shadow-md w-full max-w-[300px] text-black overflow-auto">
        <button
          onClick={closeModal}
          className="absolute top-0 right-1 bg-transparent border-none text-base cursor-pointer"
          type="button"
        >
          X
        </button>

        <p className="mt-0 mb-0 text-center text-[#626775] sm:text-base">
          Please Sign Up or Log In to an existing Account
        </p>

        <input
          type="text"
          placeholder="Username"
          className="text-center py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3a833d] w-full text-sm sm:text-base"
        />

        <input
          type="password"
          placeholder="Password"
          className="text-center py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3a833d] w-full text-sm sm:text-base"
        />

        <button
          type="submit"
          className="py-2 px-3 bg-[#3a833d] hover:bg-[#45a049] text-[white] border-none rounded-lg cursor-pointer text-center w-full mt-1 text-sm sm:text-base"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LogInModal;

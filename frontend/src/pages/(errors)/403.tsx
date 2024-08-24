const Page403 = () => {
  return (
    <section className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600 dark:text-blue-500">
            403
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            FORBIDDEN
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            The page you're looking for doesn't exist or is temporarily
            unavailable.
            <br />
            Perhaps, it will be available in the near future.{" "}
          </p>
          <a
            href="/"
            className="inline-flex text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-900 my-4"
          >
            Back to Homepage
          </a>
        </div>
      </div>
    </section>
  );
};

export default Page403;

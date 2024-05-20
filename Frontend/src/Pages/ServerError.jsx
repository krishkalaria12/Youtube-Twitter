
export default function ServerError() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#070707] px-4 py-12 text-white">
        <div className="mx-auto max-w-md space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="text-6xl font-bold">500</h1>
            <p className="text-2xl font-medium">Internal Server Error</p>
          </div>
          <p className="text-lg text-gray-400">
            Oops, something went wrong on our end. Please try again later or contact support if the issue persists.
          </p>
          <img
            alt="Error illustration"
            className="mx-auto rounded-lg"
            height={300}
            src="/500.svg"
            style={{
              aspectRatio: "400/300",
              objectFit: "cover",
            }}
            width={400}
          />
        </div>
      </div>
    )
  }
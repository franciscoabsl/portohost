const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        🚧 <strong>Dashboard Under Construction</strong> 🚧
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Thank you for your patience! We are currently building and enhancing our
        dashboard to provide you with a better experience.
      </p>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Coming Soon:
      </h2>
      <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
        <li>
          <strong>Overview of Properties:</strong> Easily view and manage all
          your properties in one place.
        </li>
        <li>
          <strong>User Management:</strong> Add, edit, and view user details.
        </li>
        <li>
          <strong>Booking Transactions:</strong> Track and manage all booking
          activities.
        </li>
        <li>
          <strong>Detailed Reports:</strong> Access comprehensive reports and
          analytics.
        </li>
      </ul>
      <p className="text-lg text-gray-600">
        Stay tuned for updates, and feel free to reach out if you have any
        questions or need assistance in the meantime!
      </p>
    </div>
  );
};

export default Home;

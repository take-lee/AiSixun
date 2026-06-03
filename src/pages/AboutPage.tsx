const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="h-6 bg-gray-300 mb-4 w-24" />
          <div className="h-8 bg-gray-300 mb-2 w-64" />
          <div className="h-5 bg-gray-200 w-80" />
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="h-80 bg-gray-100" />
            <div className="space-y-6">
              <div className="h-8 bg-gray-300 w-64" />
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-6 bg-gray-200" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-300 mb-4 w-48" />
            <div className="h-5 bg-gray-200 w-80 mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="text-center">
                <div className="h-16 bg-gray-300 mx-auto mb-4 w-16" />
                <div className="h-6 bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="h-8 bg-gray-300 mb-8 w-48" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-36 bg-gray-100" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

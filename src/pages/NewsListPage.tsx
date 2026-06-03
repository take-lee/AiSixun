const NewsListPage = () => {
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-40 bg-gray-100" />
              ))}
            </div>
            <div className="space-y-6">
              <div className="h-6 bg-gray-300 w-32" />
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="h-20 bg-gray-100" />
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-12">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="h-10 w-10 bg-gray-200" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsListPage;

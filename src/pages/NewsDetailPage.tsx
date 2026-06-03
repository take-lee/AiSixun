const NewsDetailPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="h-6 bg-gray-300 mb-4 w-24" />
          <div className="h-8 bg-gray-300 mb-4 w-full" />
          <div className="flex gap-4 mb-6">
            <div className="h-4 bg-gray-200 w-24" />
            <div className="h-4 bg-gray-200 w-32" />
          </div>
          <div className="h-64 bg-gray-100 mb-8" />
          <div className="space-y-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-6 bg-gray-200" />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div className="h-8 bg-gray-300 w-48" />
            <div className="h-10 bg-gray-300 w-36" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-40 bg-white border border-gray-200" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsDetailPage;

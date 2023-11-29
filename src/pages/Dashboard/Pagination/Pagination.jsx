// Pagination.jsx component
const Pagination = ({ totalUsers, usersPerPage, currentPage, paginate }) => {
    const pageNumbers = Math.ceil(totalUsers / usersPerPage);
  
    return (
      <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing {(currentPage - 1) * usersPerPage + 1} to{' '}
              {Math.min(currentPage * usersPerPage, totalUsers)} of {totalUsers} results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              {Array.from({ length: pageNumbers }).map((_, index) => (
                <a
                  key={index + 1}
                  href="#"
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === index + 1 ? 'bg-gray-200' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Pagination;
  
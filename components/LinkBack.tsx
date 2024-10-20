import React from 'react';

import Link from 'next/link';

const LinkBack = () => {
  return (
    <div className="flex justify-center">
      <Link
        href="/"
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Back to Search Page
      </Link>
    </div>
  );
};

export default LinkBack;

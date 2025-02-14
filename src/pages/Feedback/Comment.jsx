import React, { useState } from 'react';

export const Comment = () => {
  const [activeTab, setActiveTab] = useState('comments');

  // Sample data
  const comments = [
    {
      id: 1,
      user: 'User One',
      foodName: 'Pizza Margherita',
      text: 'This is a great comment!',
      timestamp: '2023-10-15 14:30',
    },
    {
      id: 2,
      user: 'User Two',
      foodName: 'Spaghetti Carbonara',
      text: 'Really insightful!',
      timestamp: '2023-10-14 09:15',
    },
  ];

  const reviews = [
    { id: 1, user: 'User Three', rating: 5, text: 'Loved it!' },
    { id: 2, user: 'User Four', rating: 4, text: 'Pretty good.' },
  ];

  return (
    <div className="w-full mx-auto mt-10 shadow-sm rounded-lg overflow-hidden">
      {/* Tabs - Smaller and aligned to the top left */}
      <div className="flex border-b w-1/4">
        <button
          className={`flex-1 p-2 text-sm ${activeTab === 'comments' ? 'bg-blue-400 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('comments')}
        >
          Comments
        </button>
        <button
          className={`flex-1 p-2 text-sm ${activeTab === 'reviews' ? 'bg-blue-400 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'comments' && (
          <div className="w-2/4">
            {comments.map(comment => (
              <div key={comment.id} className="mb-4 p-2 bg-white rounded-lg shadow">
                {/* Food Name */}
                <div className="font-bold text-lg mb-1">{comment.foodName}</div>
                {/* User and Comment */}
                <div className="flex items-center mb-2">
                  <i className="text-blue-400 mr-2 fa fa-user" />
                  <span className="font-semibold">{comment.user}</span>
                </div>
                <p className="mb-2">{comment.text}</p>
                {/* Date and Time */}
                <div className="text-sm text-gray-500">{comment.timestamp}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && reviews.map(review => (
          <div key={review.id} className="mb-4 p-4 bg-white rounded-lg shadow w-2/4">
            <div className="flex items-center mb-2">
              <i className="text-blue-400 mr-2 fa fa-user" />
              <span className="font-semibold">{review.user}</span>
              <span className="ml-2 text-yellow-500">{'★'.repeat(review.rating)}</span>
            </div>
            <p>{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
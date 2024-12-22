import React from 'react';
import PropTypes from 'prop-types';

const QuestionPreview = ({ questions }) => {
  const renderQuestion = (question, index) => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            <p className="text-lg font-medium text-gray-900">{index + 1}. {question.text}</p>
            <div className="space-y-2 ml-4">
              {question.options.map((option, i) => (
                <div key={i} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label className="text-gray-700">{option}</label>
                </div>
              ))}
            </div>
          </div>
        );
      case 'checkbox':
        return (
          <div className="space-y-3">
            <p className="text-lg font-medium text-gray-900">{index + 1}. {question.text}</p>
            <div className="space-y-2 ml-4">
              {question.options.map((option, i) => (
                <div key={i} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name={`question-${index}`}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="text-gray-700">{option}</label>
                </div>
              ))}
            </div>
          </div>
        );
      case 'short-text':
        return (
          <div className="space-y-3">
            <p className="text-lg font-medium text-gray-900">{index + 1}. {question.text}</p>
            <input
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Short answer text"
            />
          </div>
        );
      case 'long-text':
        return (
          <div className="space-y-3">
            <p className="text-lg font-medium text-gray-900">{index + 1}. {question.text}</p>
            <textarea
              rows="4"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Long answer text"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Survey Preview</h2>
      {questions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No questions added yet</p>
          <p className="text-gray-400 text-sm mt-2">Questions will appear here as you add them</p>
        </div>
      ) : (
        <div className="space-y-8">
          {questions.map((question, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-lg">
              {renderQuestion(question, index)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

QuestionPreview.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired
};

export default QuestionPreview; 
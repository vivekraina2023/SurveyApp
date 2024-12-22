import React, { useState } from 'react';
import Navbar from './Navbar';
import QuestionDesigner from './QuestionDesigner';
import QuestionPreview from './QuestionPreview';

const SurveyDesigner = ({ setIsAuthenticated }) => {
  const [questions, setQuestions] = useState([]);

  const addQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  return (
    <div>
      <Navbar setIsAuthenticated={setIsAuthenticated} />
      <div className="survey-designer">
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">
              Survey Designer
            </h1>
            <div className="space-y-8">
              <QuestionDesigner onAddQuestion={addQuestion} />
              <QuestionPreview questions={questions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyDesigner; 
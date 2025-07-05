import React, { useState } from 'react';

function Survey({ onClose }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questions = [
    {
      id: 'experience',
      type: 'rating',
      question: 'How would you rate your overall shopping experience?',
      description: 'Your feedback helps us improve our service for everyone.',
      options: [
        { value: 5, label: 'Excellent' },
        { value: 4, label: 'Good' },
        { value: 3, label: 'Average' },
        { value: 2, label: 'Poor' },
        { value: 1, label: 'Very Poor' }
      ]
    },
    {
      id: 'findProducts',
      type: 'rating',
      question: 'How easy was it to find the products you were looking for?',
      description: 'Help us understand how intuitive our search and navigation are.',
      options: [
        { value: 5, label: 'Very Easy' },
        { value: 4, label: 'Easy' },
        { value: 3, label: 'Neutral' },
        { value: 2, label: 'Difficult' },
        { value: 1, label: 'Very Difficult' }
      ]
    },
    {
      id: 'features',
      type: 'multiple',
      question: 'Which features did you find most helpful?',
      description: 'Select all that apply - this helps us prioritize improvements.',
      options: [
        { value: 'search', label: 'Search functionality' },
        { value: 'filters', label: 'Product filters' },
        { value: 'images', label: 'Product images' },
        { value: 'descriptions', label: 'Product descriptions' },
        { value: 'reviews', label: 'Customer reviews' },
        { value: 'pricing', label: 'Clear pricing' }
      ]
    },
    {
      id: 'recommend',
      type: 'rating',
      question: 'How likely are you to recommend TechVibe to a friend?',
      description: 'Your recommendation means the world to us!',
      options: [
        { value: 5, label: 'Very Likely' },
        { value: 4, label: 'Likely' },
        { value: 3, label: 'Neutral' },
        { value: 2, label: 'Unlikely' },
        { value: 1, label: 'Very Unlikely' }
      ]
    },
    {
      id: 'feedback',
      type: 'text',
      question: 'Any additional feedback or suggestions?',
      description: 'Share your thoughts on how we can make your experience even better.',
      placeholder: 'Your feedback is valuable to us...'
    }
  ];

  const handleResponse = (questionId, value) => {
    setResponses(prev => {
      if (questions[currentQuestion].type === 'multiple') {
        const currentValues = prev[questionId] || [];
        const newValues = currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value];
        return { ...prev, [questionId]: newValues };
      }
      return { ...prev, [questionId]: value };
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Simulate API submission
    console.log('Survey responses:', responses);
    setIsSubmitted(true);
    
    // Close survey after showing thank you message
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (isSubmitted) {
    return (
      <div className="survey-overlay">
        <div className="survey-modal">
          <div className="survey-success">
            <div className="success-icon">🎉</div>
            <h2>Thank You!</h2>
            <p>Your feedback has been submitted successfully.</p>
            <p>We truly appreciate you taking the time to help us improve TechVibe.</p>
            <div className="closing-message">
              <p>As a token of our appreciation, check your email for a special discount code!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="survey-overlay">
      <div className="survey-modal">
        <div className="survey-header">
          <h2>Share Your Experience</h2>
          <button onClick={onClose} className="close-button">×</button>
        </div>
        
        <div className="survey-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="progress-text">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>

        <div className="survey-content">
          <div className="question-container">
            <h3>{currentQ.question}</h3>
            <p className="question-description">{currentQ.description}</p>
            
            <div className="answer-options">
              {currentQ.type === 'rating' && (
                <div className="rating-options">
                  {currentQ.options.map(option => (
                    <label key={option.value} className="rating-option">
                      <input
                        type="radio"
                        name={currentQ.id}
                        value={option.value}
                        checked={responses[currentQ.id] === option.value}
                        onChange={() => handleResponse(currentQ.id, option.value)}
                      />
                      <span className="rating-label">
                        <span className="rating-value">{option.value}</span>
                        <span className="rating-text">{option.label}</span>
                      </span>
                    </label>
                  ))}
                </div>
              )}
              
              {currentQ.type === 'multiple' && (
                <div className="multiple-options">
                  {currentQ.options.map(option => (
                    <label key={option.value} className="checkbox-option">
                      <input
                        type="checkbox"
                        value={option.value}
                        checked={(responses[currentQ.id] || []).includes(option.value)}
                        onChange={() => handleResponse(currentQ.id, option.value)}
                      />
                      <span className="checkbox-label">{option.label}</span>
                    </label>
                  ))}
                </div>
              )}
              
              {currentQ.type === 'text' && (
                <div className="text-option">
                  <textarea
                    value={responses[currentQ.id] || ''}
                    onChange={(e) => handleResponse(currentQ.id, e.target.value)}
                    placeholder={currentQ.placeholder}
                    rows="4"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="survey-actions">
          <button 
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="survey-button secondary"
          >
            Previous
          </button>
          
          {currentQuestion < questions.length - 1 ? (
            <button 
              onClick={handleNext}
              className="survey-button primary"
            >
              Next
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              className="survey-button primary"
            >
              Submit Feedback
            </button>
          )}
        </div>

        <div className="survey-footer">
          <p>Your responses help us create a better shopping experience for everyone.</p>
        </div>
      </div>
    </div>
  );
}

export default Survey;
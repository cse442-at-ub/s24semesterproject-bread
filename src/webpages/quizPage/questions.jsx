import './QuizPage.css'; // Assuming your CSS file is named Quiz.css


const questions = [
    {
      question: "When starting a new topic, you prefer a professor who:",
      options: [
        "A. Breaks down complex concepts into understandable parts.",
        "B. Introduces interactive tools and technologies.",
        "C. Begins with a comprehensive lecture on the topic.",
        "D. Encourages group activities to explore the topic.",
        "E. Presents a challenging problem to solve using the topic."
      ]
    },
    {
      question: "Your ideal study material format is:",
      options: [
        "A. Personalized notes or study guides.",
        "B. Digital resources and online courses.",
        "C. Textbooks and academic papers.",
        "D. Collaborative study groups and forums.",
        "E. Real-world case studies and examples."
      ]
    },
    {
      question: "During lectures, you prefer:",
      options: [
        "A. Frequent check-ins to ensure understanding.",
        "B. The use of multimedia presentations and visuals.",
        "C. Detailed note-taking and traditional lectures.",
        "D. Interactive discussions and peer feedback.",
        "E. Debates and critical analysis tasks."
      ]
    },
    {
      question: "The type of assignments you find most enriching are:",
      options: [
        "A. Projects with step-by-step feedback.",
        "B. Creative assignments using new software or methods.",
        "C. Standard essays and problem sets.",
        "D. Group projects with peer evaluations.",
        "E. Independent research projects with minimal guidance."
      ]
    },
    {
      question: "Feedback on your work should be:",
      options: [
        "A. Supportive, with constructive suggestions.",
        "B. Innovative, offering creative improvements.",
        "C. Direct, with clear indications of right or wrong.",
        "D. Collaborative, including feedback from peers.",
        "E. Challenging, pushing you to do better."
      ]
    },
    {
      question: "You appreciate a professor who emphasizes:",
      options: [
        "A. Emotional intelligence and personal development.",
        "B. Technological literacy and digital skills.",
        "C. Academic rigor and discipline.",
        "D. Teamwork and communication skills.",
        "E. Independent thinking and self-reliance."
      ]
    },
    {
      question: "Classroom technology use is important to you because it:",
      options: [
        "A. Can offer personalized learning experiences.",
        "B. Keeps the material engaging and interactive.",
        "C. Is not as important as the quality of the lectures.",
        "D. Facilitates collaboration and group work.",
        "E. Can be used to simulate real-world challenges."
      ]
    },
    {
      question: "You're most likely to participate in class when:",
      options: [
        "A. The environment is supportive and non-judgmental.",
        "B. Activities involve using new tools or platforms.",
        "C. The discussion is focused and lecture-based.",
        "D. The format is open and encourages sharing.",
        "E. You're challenged with a thought-provoking question."
      ]
    },
    {
      question: "The pace of the course should be:",
      options: [
        "A. Adjustable, with room for individual exploration.",
        "B. Fast, with lots of new concepts and technologies.",
        "C. Steady, covering all material with depth.",
        "D. Flexible, allowing for collaborative learning.",
        "E. Intensive, pushing you to learn quickly and efficiently."
      ]
    },
    {
      question: "In a professor, you value:",
      options: [
        "A. Empathy and understanding of student needs.",
        "B. A forward-thinking approach to teaching.",
        "C. A strong focus on foundational knowledge.",
        "D. The ability to foster a sense of community.",
        "E. High expectations and academic rigor."
      ]
    },
    {
      question: "When studying, you prefer:",
      options: [
        "A. Detailed guides and outlines.",
        "B. Interactive quizzes and flashcards.",
        "C. Reading from textbooks and writing notes.",
        "D. Group study sessions and discussion boards.",
        "E. Applying concepts to solve complex problems."
      ]
    },
    {
      question: "Your approach to learning is best described as:",
      options: [
        "A. Reflective, learning from feedback and experiences.",
        "B. Experimental, trying out new methods and technologies.",
        "C. Systematic, following a structured study plan.",
        "D. Collaborative, learning with and from others.",
        "E. Autodidactic, pursuing knowledge independently."
      ]
    },
    {
      question: "The ideal class size for you is:",
      options: [
        "A. Small, for personalized attention.",
        "B. Medium, with room for tech integration and group work.",
        "C. Large, focusing on lectures and note-taking.",
        "D. Any size, as long as there's interaction.",
        "E. Size doesn't matter; challenges and rigor are key."
      ]
    },
    {
      question: "Your main goal in a course is to:",
      options: [
        "A. Develop a close relationship with the professor and peers.",
        "B. Learn in a cutting-edge, innovative environment.",
        "C. Gain a deep understanding of the subject matter.",
        "D. Experience a diverse and interactive learning community.",
        "E. Be pushed to your academic limits."
      ]
    },
    {
      question: "When faced with a difficult concept, you:",
      options: [
        "A. Seek one-on-one help from the professor.",
        "B. Look for online resources and tutorials.",
        "C. Study more until you understand it on your own.",
        "D. Discuss it with classmates to gain different perspectives.",
        "E. Take it as a challenge and work harder to master it."
      ]
    },
    {
      question: "The role of extracurricular activities in your education is:",
      options: [
        "A. To build personal connections and soft skills.",
        "B. To explore new technologies and innovative ideas.",
        "C. Less important than academic performance.",
        "D. Essential for teamwork and leadership skills.",
        "E. A way to challenge yourself outside of class."
      ]
    },
    {
      question: "When selecting courses, your primary consideration is:",
      options: [
        "A. The professor's reputation for being supportive and helpful.",
        "B. The use of new technologies and teaching methods in the course.",
        "C. The course's focus on traditional academic rigor.",
        "D. Opportunities for group work and discussions.",
        "E. The level of challenge and intellectual stimulation."
      ]
    },
    {
      question: "The learning environment you thrive in is:",
      options: [
        "A. Warm and inclusive.",
        "B. Dynamic and tech-savvy.",
        "C. Quiet and focused.",
        "D. Collaborative and social.",
        "E. Competitive and high-stakes."
      ]
    },
    {
      question: "Your preferred method of communication with professors is:",
      options: [
        "A. Face-to-face meetings for personal guidance.",
        "B. Email or online platforms featuring multimedia resources.",
        "C. Formal, primarily within scheduled class times.",
        "D. Any method, as long as it facilitates group collaboration.",
        "E. Direct and challenging, pushing you to articulate your thoughts clearly."
      ]
    },
    {
      question: "The most important quality in a professor is:",
      options: [
        "A. Compassion and understanding.",
        "B. Innovation and a willingness to try new things.",
        "C. Mastery of the subject and the ability to convey it clearly.",
        "D. The ability to create a sense of community and collaboration.",
        "E. The capacity to inspire and challenge."
      ]
    }
  ];

export default questions;